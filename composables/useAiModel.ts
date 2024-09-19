import * as tf from "@tensorflow/tfjs";

export const useAiModel = () => {
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

    // console.log("modelData.weights", modelData.weights);

    // // 각 가중치를 Tensor로 변환 (여기서는 예시로 각 가중치의 shape와 dtype을 알고 있다고 가정)
    // // 실제로는 modelWeights.map에서 얻은 weightSpecs 정보를 사용해야 합니다.
    // const tensors = JSON.parse(JSON.stringify(modelData.weights)).map(
    //   (arr: any) => {
    //     // Assuming arr is an object with numeric values, but could also have non-numeric properties
    //     const numericValues = Object.values(arr).filter(
    //       (value) => typeof value === "number"
    //     ) as number[];
    //     return tf.tensor(numericValues);
    //   }
    // );

    // // Tensor 배열을 ArrayBuffer로 변환
    // const weightData = await Promise.all(
    //   tensors.map((t: any) => t.data())
    // ).then((data) => {
    //   // 모든 Tensor 데이터를 하나의 Float32Array에 병합
    //   let merged = new Float32Array(
    //     data.reduce((acc, val) => acc.concat(Array.from(val)), [])
    //   );
    //   return merged.buffer;
    // });

    // // 모델을 메모리에서 로드합니다.
    // const model = await tf.loadLayersModel(
    //   tf.io.fromMemory({
    //     modelTopology: modelJson,
    //     weightData: weightData,
    //   })
    // );

    // // 모델의 요약 정보를 출력합니다.
    // model.summary();

    // // 모델의 가중치를 출력합니다.
    // const weights = model.getWeights();
    // weights.forEach((weight, index) => {
    //   console.log(`Weight ${index}:`, weight.dataSync());
    // });

    // return model;
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

  const predict = async (inputData: any) => {
    if (models.value.length === 0) {
      throw new Error("No model found for the specified sector");
    }

    // 입력 데이터를 전처리합니다.
    const inputTensorData = preprocess(inputData);

    const predictions = models.value.map(async (aiModel: IModel) => {
      const tfModel = await loadModel(aiModel);

      console.log("model summary:");
      tfModel.summary();

      inputTensorData.print();

      const modelPrediction = tfModel.predict(inputTensorData) as tf.Tensor;
      const predictionArray = modelPrediction.dataSync(); // 예측 결과를 배열로 변환

      // // 모델의 가중치를 출력합니다.
      const weights = tfModel.getWeights();
      weights.forEach((weight, index) => {
        console.log(`Weight ${index}:`, weight.dataSync());
      });
      console.log("predictionArray", predictionArray);

      return {
        ago: aiModel.ago,
        predict: predictionArray[0],
      };
    });

    const result = await Promise.all(predictions);
    predicts.value = result.sort(sortByAgo);
    return predicts.value;
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
    getModel,
    predict,
  };
};
