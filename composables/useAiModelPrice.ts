import * as tf from "@tensorflow/tfjs";

export const useAiModelPrice = () => {
  const { live } = useLive();
  const modelsPrice = useState<any>("modelsPrice", () => {});

  const getModelFromDB = async (sector: string) => {
    const response = await fetch(`/api/ai/modelPrice/${sector}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const models = data.map((modelData: any) => {
      return {
        ...modelData,
        model: decodeBufferToJson(modelData.model),
        weights: decodeBufferToJson(modelData.weights),
      };
    });

    console.log("models", models);
    return models;
  };

  // 모든 ai 모델 가져오기
  const getModelsPrice = async () => {
    try {
      const modelsDataSet: any = {}; // Initialize an empty object to hold the dataset
      for (const sector of marketSectors) {
        const modelData = await getModelFromDB(sector); // Await the async call to getModel
        modelsDataSet[sector] = modelData; // Assign the returned data to the corresponding sector key
      }
      console.log("modelsDataSet", modelsDataSet);
      //modelsPrice.value = modelsDataSet; // Assign the dataset to the models ref
      console.log("modelsPrice", modelsPrice.value);
      //return modelsPrice.value; // Return the dataset
    } catch (error) {
      console.error(error);
    }
  };

  // 선택된 live 데이터로 예측
  const getPredictionFromModelPrice = async (modelDatas: IModel[]) => {
    const predictions = modelDatas.map(async (modelData) => {
      console.log("getPredictionFromModelPrice");
      const model = await loadModel(modelData);
      const inputTensor = preprocess(live.value);
      const predictionArray = model.predict(inputTensor) as tf.Tensor;
      return {
        ago: modelData.ago,
        predict: Array.from(predictionArray.dataSync()),
      };
    });

    console.log("predictions", predictions);

    const result = await Promise.all(predictions);

    console.log("result", result);

    const sortedResult = result.sort(sortByAgo);

    console.log("sortedResult", sortedResult);
    return sortedResult;
  };

  return {
    modelsPrice,
    getModelsPrice,
    getPredictionFromModelPrice,
    getModelFromDB,
  };
};
