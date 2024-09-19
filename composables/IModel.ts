export interface IModel {
  model_id: number; // 모델 ID
  model: any; // 모델 데이터 (bytea 형식)
  weights: any; // 가중치 데이터 (bytea 형식)
  market_sector: string; // 시장 섹터
  ago: string; // 시간 경과
}

const market_sector = [
  "all",
  "commercialServices",
  "communications",
  "consumerDurables",
  "consumerNonDurables",
  "consumerServices",
  "distributionServices",
  "electronicTechnology",
  "energyMinerals",
  "finance",
  "healthServices",
  "healthTechnology",
  "industrialServices",
  "kosdaq",
  "miscellaneous",
  "nasdaq",
  "nonEnergyMinerals",
  "processIndustries",
  "producerManufacturing",
  "retailTrade",
  "seoul",
  "technologyServices",
  "transportation",
  "utilities",
];

const ago = ["d1", "d3", "d4", "d5", "h1", "w1"];
