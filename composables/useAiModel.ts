import * as tf from "@tensorflow/tfjs";

export const useAiModel = () => {
  const { live, lives } = useLive();
  const { favoriteLives } = useFavoritesLive();

  // 셀렉티드 된 모델
  const model = useState<IModel[]>("model", () => []);
  const models = useState<any>("models", () => {});
  const predicts = useState<any[]>("predicts", () => []);
  const status = ref("success");

  const fetchModelFromSupabase = async (sector: string) => {
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

    model.value = data.map((modelData: any) => {
      return {
        ...modelData,
        model: decodeByteaToJson(modelData.model),
        weights: decodeByteaToJson(modelData.weights),
      };
    });

    status.value = "success";
    return model.value;
  };

  const getModels = async () => {
    const modelsDataSet: any = {}; // Initialize an empty object to hold the dataset
    for (const sector of marketSectors) {
      const modelData = await fetchModelFromSupabase(sector); // Await the async call to getModel
      modelsDataSet[sector] = modelData; // Assign the returned data to the corresponding sector key
    }
    models.value = modelsDataSet; // Assign the dataset to the models ref
    return models.value; // Return the dataset
  };

  const getModel = (sector: string) => {
    model.value = models.value[sector];
    return model.value;
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
    status.value = "pending";

    setTimeout(async () => {
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

      // predict 필드의 합산 값을 기준으로 정렬합니다.
      updatedLives.sort((a, b) => {
        const sumA = a.predict.reduce((acc, curr) => acc + curr.predict, 0);
        const sumB = b.predict.reduce((acc, curr) => acc + curr.predict, 0);
        return sumB - sumA; // 큰 순서대로 정렬
      });

      // lives.value를 업데이트합니다.
      lives.value = updatedLives;
      status.value = "success";
    });
  };

  // 관심종목 예측
  const favoritePredict = async () => {
    status.value = "pending";

    setTimeout(async () => {
      const inputDataArray = favoriteLives.value.map((live) => live);
      const predictions = await predict(inputDataArray);

      const updatedLives = favoriteLives.value.map((live, index) => {
        const prediction = predictions.map((p) => ({
          ago: p.ago,
          predict: p.predict[index],
        }));
        return {
          ...live,
          predict: prediction,
        };
      });

      // predict 필드의 합산 값을 기준으로 정렬합니다.
      updatedLives.sort((a, b) => {
        const sumA = a.predict.reduce((acc, curr) => acc + curr.predict, 0);
        const sumB = b.predict.reduce((acc, curr) => acc + curr.predict, 0);
        return sumB - sumA; // 큰 순서대로 정렬
      });

      // lives.value를 업데이트합니다.
      favoriteLives.value = updatedLives;
      status.value = "success";
    });
  };

  const predict = async (inputDataArray: any[]) => {
    if (model.value.length === 0) {
      throw new Error("No model found for the specified sector");
    }

    // 입력 데이터를 전처리합니다.
    const inputTensorDataArray = inputDataArray.map(preprocess);
    const inputTensorData = tf.concat(inputTensorDataArray, 0);

    const predictions = model.value.map(async (aiModel: IModel) => {
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

  const getPredictionFromModel = async (modelDatas: IModel[]) => {
    const predictions = modelDatas.map(async (modelData) => {
      const model = await loadModel(modelData);
      const inputTensor = preprocess(live.value);
      const predictionArray = model.predict(inputTensor) as tf.Tensor;
      return {
        ago: modelData.ago,
        predict: Array.from(predictionArray.dataSync()),
      };
    });

    const result = await Promise.all(predictions);
    const sortedResult = result.sort(sortByAgo);
    return sortedResult;
  };

  const timeUnits: any = {
    h: 1,
    d: 24,
    w: 24 * 7,
    y: 8760, // 24*365 hours in a year
  };

  const sortByAgo = (a: { ago: string }, b: { ago: string }) => {
    const regex = /([hdwy])(\d+)/; // 단위와 숫자를 분리하는 정규 표현식
    const matchA = a.ago.match(regex);
    const matchB = b.ago.match(regex);

    if (!matchA || !matchB) {
      return 0;
    }

    const numA = parseInt(matchA[2]); // 숫자 추출 부분 수정
    const unitA = matchA[1]; // 단위 추출 부분 수정
    const numB = parseInt(matchB[2]); // 숫자 추출 부분 수정
    const unitB = matchB[1]; // 단위 추출 부분 수정

    const valueA = numA * timeUnits[unitA];
    const valueB = numB * timeUnits[unitB];

    return valueA - valueB;
  };

  return {
    model,
    models,
    status,
    predicts,
    allPredict,
    favoritePredict,
    getModel,
    getModels,
    predict,
    getPredictionFromModel,
  };
};
