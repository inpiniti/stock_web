import * as tf from "@tensorflow/tfjs";

export const useAiModel = () => {
  const { live, lives } = useLive();

  const models = useState<IModel[]>("model", () => []);
  const predicts = useState<any[]>("predicts", () => []);
  const status = ref("success");

  const getModel = async (sector: string) => {
    status.value = "pending";
    const { data, error } = await useSupabase()
      .from("ai_models")
      .select("*")
      .eq("market_sector", sector);

    if (error) {
      console.error("Error fetching models:", error);
      status.value = "error";
      return;
    }

    models.value = data.map((modelData: any) => {
      return {
        ...modelData,
        model: decodeByteaToJson(modelData.model),
        weights: decodeByteaToJson(modelData.weights),
      };
    });

    status.value = "success";
  };

  const decodeByteaToJson = (byteaString: string) => {
    try {
      // bytea 문자열에서 \x를 제거하고, 16진수 문자열을 디코딩합니다.
      const hexString = byteaString.slice(2);
      const byteArray = hexString
        ? new Uint8Array(
            hexString.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
          )
        : new Uint8Array(0);
      const jsonString = new TextDecoder().decode(byteArray);
      return JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to decode bytea string:", e);
      return null;
    }
  };

  function proxyToObject(proxy: any): any {
    if (Array.isArray(proxy)) {
      return proxy.map((item) => proxyToObject(item));
    } else if (proxy !== null && typeof proxy === "object") {
      const obj: any = {};
      for (const key in proxy) {
        if (proxy.hasOwnProperty(key)) {
          obj[key] = proxyToObject(proxy[key]);
        }
      }
      return obj;
    } else {
      return proxy;
    }
  }

  const loadModel = async (modelData: IModel) => {
    const modelJson = modelData.model;
    const weightsJson = modelData.weights;

    const model = await tf.models.modelFromJSON(modelJson);

    const weightsArray = proxyToObject(weightsJson);
    const weightTensors = weightsArray.map((weight: any, index: number) => {
      const shape: any = model.weights[index].shape;

      // weight 객체의 값을 배열로 변환
      const weightValues = Object.values(weight).map((value) => Number(value));

      return tf.tensor(weightValues, shape);
    });

    model.setWeights(weightTensors);

    return model;
  };

  const preprocess = (data: any) => {
    const selectedFields = [
      "operating_margin_ttm",
      "relative_volume_10d_calc",
      "enterprise_value_to_revenue_ttm",
      "volatility_w",
      "volatility_m",
      "dividends_yield_current",
      "gap",
      "volume_change",
      "pre_tax_margin_ttm",
      "perf_1_y_market_cap",
      "perf_w",
      "perf_1_m",
      "perf_3_m",
      "perf_6_m",
      "perf_y_t_d",
      "perf_y",
      "perf_5_y",
      "perf_10_y",
      "recommend_all",
      "recommend_m_a",
      "recommend_other",
      "r_s_i",
      "mom",
      "c_c_i20",
      "stoch_k",
      "stoch_d",
    ];

    const feature = selectedFields.map((field) => {
      const value = data[field];
      return isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    }) as number[];

    return tf.tensor2d([feature]);
  };

  // 전종목 예측
  const allPredict = async () => {
    const inputDataArray = lives.value.map((live) => live);
    const predictions = await predict(inputDataArray);

    const updatedLives = lives.value.map((live, index) => {
      const prediction = predictions.map((p) => ({
        ago: p.ago,
        predict: p.predict[index],
      }));
      return {
        ...live,
        predict: prediction,
      };
    });

    // lives.value를 업데이트합니다.
    lives.value = updatedLives;
  };

  const predict = async (inputDataArray: any[]) => {
    if (models.value.length === 0) {
      throw new Error("No model found for the specified sector");
    }

    // 입력 데이터를 전처리합니다.
    const inputTensorDataArray = inputDataArray.map(preprocess);
    const inputTensorData = tf.concat(inputTensorDataArray, 0);

    const predictions = models.value.map(async (aiModel: IModel) => {
      // 모델을 로드합니다.
      const tfModel = await loadModel(aiModel);

      // 모델을 사용해 입력 데이터를 예측합니다.
      const modelPrediction = tfModel.predict(inputTensorData) as tf.Tensor;
      const predictionArray = modelPrediction.dataSync(); // 예측 결과를 배열로 변환

      return {
        ago: aiModel.ago,
        predict: Array.from(predictionArray),
      };
    });

    const result = await Promise.all(predictions);
    return result.sort(sortByAgo);
  };

  const timeUnits: any = {
    h: 1,
    d: 24,
    w: 24 * 7,
  };

  const sortByAgo = (a: { ago: string }, b: { ago: string }) => {
    const unitA = a.ago.slice(-1);
    const unitB = b.ago.slice(-1);
    const valueA = parseInt(a.ago) * timeUnits[unitA];
    const valueB = parseInt(b.ago) * timeUnits[unitB];
    return valueA - valueB;
  };

  return {
    models,
    status,
    predicts,
    allPredict,
    getModel,
    predict,
  };
};
