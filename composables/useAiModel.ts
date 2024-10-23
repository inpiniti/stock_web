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
