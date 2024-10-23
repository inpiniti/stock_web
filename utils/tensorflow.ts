import * as tf from "@tensorflow/tfjs";

// ai 모델 로드
export const loadModel = async (modelData: IModel) => {
  const modelJson = modelData.model;
  const weightsJson = modelData.weights;

  console.log("modelJson", modelJson);
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

// proxy 객체를 일반 객체로 변환
// ai 모델 로드 시 사용
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

// 전처리
export const preprocess = (data: any) => {
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

const timeUnits: any = {
  h: 1,
  d: 24,
  w: 24 * 7,
  y: 8760, // 24*365 hours in a year
};

// 시간 단위별로 정렬
// ai 모델을 시간 순으로 정렬하기 위해 사용
export const sortByAgo = (a: { ago: string }, b: { ago: string }) => {
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
