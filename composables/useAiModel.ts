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

  const loadModel = async (modelData: IModel) => {
    const modelJson = modelData.model;

    console.log("modelData.weights", modelData.weights);

    // modelData.weights도 JSON 형식으로 가정하고 처리합니다.
    const weightsArray = Array.isArray(modelData.weights)
      ? modelData.weights.map(
          (weight: any) => new Float32Array(Object.values(weight))
        )
      : [];

    console.log("weightsArray", weightsArray);

    // weightSpecs 생성
    const weightSpecs = weightsArray.map((weight, index) => ({
      name: `weight_${index}`,
      shape: [weight.length],
      dtype: "float32",
    }));

    // weightData 생성
    const weightData = new Float32Array(weightsArray.flat());

    // 모델을 메모리에서 로드합니다.
    const model = await tf.loadLayersModel(
      tf.io.fromMemory({ modelTopology: modelJson, weightSpecs, weightData })
    );

    // 모델의 요약 정보를 출력합니다.
    model.summary();

    // 모델의 가중치를 출력합니다.
    const weights = model.getWeights();
    weights.forEach((weight, index) => {
      console.log(`Weight1 ${index}:`, weight.dataSync());
    });

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

    console.log("Preprocessed feature:", feature); // 전처리된 데이터를 출력하여 확인

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

      const modelPrediction = tfModel.predict(inputTensorData) as tf.Tensor;
      const predictionArray = modelPrediction.dataSync(); // 예측 결과를 배열로 변환
      console.log("Prediction array:", predictionArray); // 예측 결과를 출력하여 확인
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
