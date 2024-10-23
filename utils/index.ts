import { pgTable, text, numeric, timestamp } from "drizzle-orm/pg-core";

export const pgTableKosdaqLive = pgTable("kosdaq_live", {
  name: text("name").notNull(),
  description: text("description"),
  logoid: text("logoid"),
  update_mode: text("update_mode"),
  type: text("type"),
  close: numeric("close"),
  pricescale: numeric("pricescale"),
  minmov: numeric("minmov"),
  fractional: text("fractional"),
  minmove2: numeric("minmove2"),
  currency: text("currency"),
  change: numeric("change"),
  volume: numeric("volume").notNull(),
  relative_volume_10d_calc: numeric("relative_volume_10d_calc"),
  market_cap_basic: numeric("market_cap_basic"),
  fundamental_currency_code: text("fundamental_currency_code"),
  price_earnings_ttm: numeric("price_earnings_ttm"),
  earnings_per_share_diluted_ttm: numeric("earnings_per_share_diluted_ttm"),
  earnings_per_share_diluted_yoy_growth_ttm: numeric(
    "earnings_per_share_diluted_yoy_growth_ttm"
  ),
  dividends_yield_current: numeric("dividends_yield_current"),
  sector_tr: text("sector_tr"),
  market: text("market"),
  sector: text("sector"),
  recommendation_mark: numeric("recommendation_mark"),
  exchange: text("exchange"),
  perf_w: numeric("perf_w"),
  perf_1_m: numeric("perf_1_m"),
  perf_3_m: numeric("perf_3_m"),
  perf_6_m: numeric("perf_6_m"),
  perf_y_t_d: numeric("perf_y_t_d"),
  perf_y: numeric("perf_y"),
  perf_5_y: numeric("perf_5_y"),
  perf_10_y: numeric("perf_10_y"),
  perf_all: numeric("perf_all"),
  volatility_w: numeric("volatility_w"),
  volatility_m: numeric("volatility_m"),
  premarket_close: numeric("premarket_close"),
  premarket_change: numeric("premarket_change"),
  premarket_gap: numeric("premarket_gap"),
  premarket_volume: numeric("premarket_volume"),
  gap: numeric("gap"),
  volume_change: numeric("volume_change"),
  postmarket_close: numeric("postmarket_close"),
  postmarket_change: numeric("postmarket_change"),
  postmarket_volume: numeric("postmarket_volume"),
  perf_1_y_market_cap: numeric("perf_1_y_market_cap"),
  price_earnings_growth_ttm: numeric("price_earnings_growth_ttm"),
  price_sales_current: numeric("price_sales_current"),
  price_book_fq: numeric("price_book_fq"),
  price_to_cash_f_operating_activities_ttm: numeric(
    "price_to_cash_f_operating_activities_ttm"
  ),
  price_free_cash_flow_ttm: numeric("price_free_cash_flow_ttm"),
  price_to_cash_ratio: numeric("price_to_cash_ratio"),
  enterprise_value_current: numeric("enterprise_value_current"),
  enterprise_value_to_revenue_ttm: numeric("enterprise_value_to_revenue_ttm"),
  enterprise_value_to_ebit_ttm: numeric("enterprise_value_to_ebit_ttm"),
  enterprise_value_ebitda_ttm: numeric("enterprise_value_ebitda_ttm"),
  dps_common_stock_prim_issue_fy: numeric("dps_common_stock_prim_issue_fy"),
  dps_common_stock_prim_issue_fq: numeric("dps_common_stock_prim_issue_fq"),
  dividends_yield: numeric("dividends_yield"),
  dividend_payout_ratio_ttm: numeric("dividend_payout_ratio_ttm"),
  dps_common_stock_prim_issue_yoy_growth_fy: numeric(
    "dps_common_stock_prim_issue_yoy_growth_fy"
  ),
  continuous_dividend_payout: numeric("continuous_dividend_payout"),
  continuous_dividend_growth: numeric("continuous_dividend_growth"),
  gross_margin_ttm: numeric("gross_margin_ttm"),
  operating_margin_ttm: numeric("operating_margin_ttm"),
  pre_tax_margin_ttm: numeric("pre_tax_margin_ttm"),
  net_margin_ttm: numeric("net_margin_ttm"),
  free_cash_flow_margin_ttm: numeric("free_cash_flow_margin_ttm"),
  return_on_assets_fq: numeric("return_on_assets_fq"),
  return_on_equity_fq: numeric("return_on_equity_fq"),
  return_on_invested_capital_fq: numeric("return_on_invested_capital_fq"),
  research_and_dev_ratio_ttm: numeric("research_and_dev_ratio_ttm"),
  sell_gen_admin_exp_other_ratio_ttm: numeric(
    "sell_gen_admin_exp_other_ratio_ttm"
  ),
  total_assets_fq: numeric("total_assets_fq"),
  total_current_assets_fq: numeric("total_current_assets_fq"),
  cash_n_short_term_invest_fq: numeric("cash_n_short_term_invest_fq"),
  total_liabilities_fq: numeric("total_liabilities_fq"),
  total_debt_fq: numeric("total_debt_fq"),
  net_debt_fq: numeric("net_debt_fq"),
  total_equity_fq: numeric("total_equity_fq"),
  current_ratio_fq: numeric("current_ratio_fq"),
  quick_ratio_fq: numeric("quick_ratio_fq"),
  debt_to_equity_fq: numeric("debt_to_equity_fq"),
  cash_n_short_term_invest_to_total_debt_fq: numeric(
    "cash_n_short_term_invest_to_total_debt_fq"
  ),
  cash_f_operating_activities_ttm: numeric("cash_f_operating_activities_ttm"),
  cash_f_investing_activities_ttm: numeric("cash_f_investing_activities_ttm"),
  cash_f_financing_activities_ttm: numeric("cash_f_financing_activities_ttm"),
  free_cash_flow_ttm: numeric("free_cash_flow_ttm"),
  capital_expenditures_ttm: numeric("capital_expenditures_ttm"),
  recommend_all: numeric("recommend_all"),
  recommend_m_a: numeric("recommend_m_a"),
  recommend_other: numeric("recommend_other"),
  r_s_i: numeric("r_s_i"),
  mom: numeric("mom"),
  a_o: numeric("a_o"),
  c_c_i20: numeric("c_c_i20"),
  stoch_k: numeric("stoch_k"),
  stoch_d: numeric("stoch_d"),
  created_at: timestamp("created_at").notNull(),
});

export const pgTableNasdaqLive = pgTable("nasdaq_live", {
  name: text("name").notNull(),
  description: text("description"),
  logoid: text("logoid"),
  update_mode: text("update_mode"),
  type: text("type"),
  close: numeric("close"),
  pricescale: numeric("pricescale"),
  minmov: numeric("minmov"),
  fractional: text("fractional"),
  minmove2: numeric("minmove2"),
  currency: text("currency"),
  change: numeric("change"),
  volume: numeric("volume").notNull(),
  relative_volume_10d_calc: numeric("relative_volume_10d_calc"),
  market_cap_basic: numeric("market_cap_basic"),
  fundamental_currency_code: text("fundamental_currency_code"),
  price_earnings_ttm: numeric("price_earnings_ttm"),
  earnings_per_share_diluted_ttm: numeric("earnings_per_share_diluted_ttm"),
  earnings_per_share_diluted_yoy_growth_ttm: numeric(
    "earnings_per_share_diluted_yoy_growth_ttm"
  ),
  dividends_yield_current: numeric("dividends_yield_current"),
  sector_tr: text("sector_tr"),
  market: text("market"),
  sector: text("sector"),
  recommendation_mark: numeric("recommendation_mark"),
  exchange: text("exchange"),
  perf_w: numeric("perf_w"),
  perf_1_m: numeric("perf_1_m"),
  perf_3_m: numeric("perf_3_m"),
  perf_6_m: numeric("perf_6_m"),
  perf_y_t_d: numeric("perf_y_t_d"),
  perf_y: numeric("perf_y"),
  perf_5_y: numeric("perf_5_y"),
  perf_10_y: numeric("perf_10_y"),
  perf_all: numeric("perf_all"),
  volatility_w: numeric("volatility_w"),
  volatility_m: numeric("volatility_m"),
  premarket_close: numeric("premarket_close"),
  premarket_change: numeric("premarket_change"),
  premarket_gap: numeric("premarket_gap"),
  premarket_volume: numeric("premarket_volume"),
  gap: numeric("gap"),
  volume_change: numeric("volume_change"),
  postmarket_close: numeric("postmarket_close"),
  postmarket_change: numeric("postmarket_change"),
  postmarket_volume: numeric("postmarket_volume"),
  perf_1_y_market_cap: numeric("perf_1_y_market_cap"),
  price_earnings_growth_ttm: numeric("price_earnings_growth_ttm"),
  price_sales_current: numeric("price_sales_current"),
  price_book_fq: numeric("price_book_fq"),
  price_to_cash_f_operating_activities_ttm: numeric(
    "price_to_cash_f_operating_activities_ttm"
  ),
  price_free_cash_flow_ttm: numeric("price_free_cash_flow_ttm"),
  price_to_cash_ratio: numeric("price_to_cash_ratio"),
  enterprise_value_current: numeric("enterprise_value_current"),
  enterprise_value_to_revenue_ttm: numeric("enterprise_value_to_revenue_ttm"),
  enterprise_value_to_ebit_ttm: numeric("enterprise_value_to_ebit_ttm"),
  enterprise_value_ebitda_ttm: numeric("enterprise_value_ebitda_ttm"),
  dps_common_stock_prim_issue_fy: numeric("dps_common_stock_prim_issue_fy"),
  dps_common_stock_prim_issue_fq: numeric("dps_common_stock_prim_issue_fq"),
  dividends_yield: numeric("dividends_yield"),
  dividend_payout_ratio_ttm: numeric("dividend_payout_ratio_ttm"),
  dps_common_stock_prim_issue_yoy_growth_fy: numeric(
    "dps_common_stock_prim_issue_yoy_growth_fy"
  ),
  continuous_dividend_payout: numeric("continuous_dividend_payout"),
  continuous_dividend_growth: numeric("continuous_dividend_growth"),
  gross_margin_ttm: numeric("gross_margin_ttm"),
  operating_margin_ttm: numeric("operating_margin_ttm"),
  pre_tax_margin_ttm: numeric("pre_tax_margin_ttm"),
  net_margin_ttm: numeric("net_margin_ttm"),
  free_cash_flow_margin_ttm: numeric("free_cash_flow_margin_ttm"),
  return_on_assets_fq: numeric("return_on_assets_fq"),
  return_on_equity_fq: numeric("return_on_equity_fq"),
  return_on_invested_capital_fq: numeric("return_on_invested_capital_fq"),
  research_and_dev_ratio_ttm: numeric("research_and_dev_ratio_ttm"),
  sell_gen_admin_exp_other_ratio_ttm: numeric(
    "sell_gen_admin_exp_other_ratio_ttm"
  ),
  total_assets_fq: numeric("total_assets_fq"),
  total_current_assets_fq: numeric("total_current_assets_fq"),
  cash_n_short_term_invest_fq: numeric("cash_n_short_term_invest_fq"),
  total_liabilities_fq: numeric("total_liabilities_fq"),
  total_debt_fq: numeric("total_debt_fq"),
  net_debt_fq: numeric("net_debt_fq"),
  total_equity_fq: numeric("total_equity_fq"),
  current_ratio_fq: numeric("current_ratio_fq"),
  quick_ratio_fq: numeric("quick_ratio_fq"),
  debt_to_equity_fq: numeric("debt_to_equity_fq"),
  cash_n_short_term_invest_to_total_debt_fq: numeric(
    "cash_n_short_term_invest_to_total_debt_fq"
  ),
  cash_f_operating_activities_ttm: numeric("cash_f_operating_activities_ttm"),
  cash_f_investing_activities_ttm: numeric("cash_f_investing_activities_ttm"),
  cash_f_financing_activities_ttm: numeric("cash_f_financing_activities_ttm"),
  free_cash_flow_ttm: numeric("free_cash_flow_ttm"),
  capital_expenditures_ttm: numeric("capital_expenditures_ttm"),
  recommend_all: numeric("recommend_all"),
  recommend_m_a: numeric("recommend_m_a"),
  recommend_other: numeric("recommend_other"),
  r_s_i: numeric("r_s_i"),
  mom: numeric("mom"),
  a_o: numeric("a_o"),
  c_c_i20: numeric("c_c_i20"),
  stoch_k: numeric("stoch_k"),
  stoch_d: numeric("stoch_d"),
  created_at: timestamp("created_at").notNull(),
});

export const pgTableSeoulLive = pgTable("seoul_live", {
  name: text("name").notNull(),
  description: text("description"),
  logoid: text("logoid"),
  update_mode: text("update_mode"),
  type: text("type"),
  close: numeric("close"),
  pricescale: numeric("pricescale"),
  minmov: numeric("minmov"),
  fractional: text("fractional"),
  minmove2: numeric("minmove2"),
  currency: text("currency"),
  change: numeric("change"),
  volume: numeric("volume").notNull(),
  relative_volume_10d_calc: numeric("relative_volume_10d_calc"),
  market_cap_basic: numeric("market_cap_basic"),
  fundamental_currency_code: text("fundamental_currency_code"),
  price_earnings_ttm: numeric("price_earnings_ttm"),
  earnings_per_share_diluted_ttm: numeric("earnings_per_share_diluted_ttm"),
  earnings_per_share_diluted_yoy_growth_ttm: numeric(
    "earnings_per_share_diluted_yoy_growth_ttm"
  ),
  dividends_yield_current: numeric("dividends_yield_current"),
  sector_tr: text("sector_tr"),
  market: text("market"),
  sector: text("sector"),
  recommendation_mark: numeric("recommendation_mark"),
  exchange: text("exchange"),
  perf_w: numeric("perf_w"),
  perf_1_m: numeric("perf_1_m"),
  perf_3_m: numeric("perf_3_m"),
  perf_6_m: numeric("perf_6_m"),
  perf_y_t_d: numeric("perf_y_t_d"),
  perf_y: numeric("perf_y"),
  perf_5_y: numeric("perf_5_y"),
  perf_10_y: numeric("perf_10_y"),
  perf_all: numeric("perf_all"),
  volatility_w: numeric("volatility_w"),
  volatility_m: numeric("volatility_m"),
  premarket_close: numeric("premarket_close"),
  premarket_change: numeric("premarket_change"),
  premarket_gap: numeric("premarket_gap"),
  premarket_volume: numeric("premarket_volume"),
  gap: numeric("gap"),
  volume_change: numeric("volume_change"),
  postmarket_close: numeric("postmarket_close"),
  postmarket_change: numeric("postmarket_change"),
  postmarket_volume: numeric("postmarket_volume"),
  perf_1_y_market_cap: numeric("perf_1_y_market_cap"),
  price_earnings_growth_ttm: numeric("price_earnings_growth_ttm"),
  price_sales_current: numeric("price_sales_current"),
  price_book_fq: numeric("price_book_fq"),
  price_to_cash_f_operating_activities_ttm: numeric(
    "price_to_cash_f_operating_activities_ttm"
  ),
  price_free_cash_flow_ttm: numeric("price_free_cash_flow_ttm"),
  price_to_cash_ratio: numeric("price_to_cash_ratio"),
  enterprise_value_current: numeric("enterprise_value_current"),
  enterprise_value_to_revenue_ttm: numeric("enterprise_value_to_revenue_ttm"),
  enterprise_value_to_ebit_ttm: numeric("enterprise_value_to_ebit_ttm"),
  enterprise_value_ebitda_ttm: numeric("enterprise_value_ebitda_ttm"),
  dps_common_stock_prim_issue_fy: numeric("dps_common_stock_prim_issue_fy"),
  dps_common_stock_prim_issue_fq: numeric("dps_common_stock_prim_issue_fq"),
  dividends_yield: numeric("dividends_yield"),
  dividend_payout_ratio_ttm: numeric("dividend_payout_ratio_ttm"),
  dps_common_stock_prim_issue_yoy_growth_fy: numeric(
    "dps_common_stock_prim_issue_yoy_growth_fy"
  ),
  continuous_dividend_payout: numeric("continuous_dividend_payout"),
  continuous_dividend_growth: numeric("continuous_dividend_growth"),
  gross_margin_ttm: numeric("gross_margin_ttm"),
  operating_margin_ttm: numeric("operating_margin_ttm"),
  pre_tax_margin_ttm: numeric("pre_tax_margin_ttm"),
  net_margin_ttm: numeric("net_margin_ttm"),
  free_cash_flow_margin_ttm: numeric("free_cash_flow_margin_ttm"),
  return_on_assets_fq: numeric("return_on_assets_fq"),
  return_on_equity_fq: numeric("return_on_equity_fq"),
  return_on_invested_capital_fq: numeric("return_on_invested_capital_fq"),
  research_and_dev_ratio_ttm: numeric("research_and_dev_ratio_ttm"),
  sell_gen_admin_exp_other_ratio_ttm: numeric(
    "sell_gen_admin_exp_other_ratio_ttm"
  ),
  total_assets_fq: numeric("total_assets_fq"),
  total_current_assets_fq: numeric("total_current_assets_fq"),
  cash_n_short_term_invest_fq: numeric("cash_n_short_term_invest_fq"),
  total_liabilities_fq: numeric("total_liabilities_fq"),
  total_debt_fq: numeric("total_debt_fq"),
  net_debt_fq: numeric("net_debt_fq"),
  total_equity_fq: numeric("total_equity_fq"),
  current_ratio_fq: numeric("current_ratio_fq"),
  quick_ratio_fq: numeric("quick_ratio_fq"),
  debt_to_equity_fq: numeric("debt_to_equity_fq"),
  cash_n_short_term_invest_to_total_debt_fq: numeric(
    "cash_n_short_term_invest_to_total_debt_fq"
  ),
  cash_f_operating_activities_ttm: numeric("cash_f_operating_activities_ttm"),
  cash_f_investing_activities_ttm: numeric("cash_f_investing_activities_ttm"),
  cash_f_financing_activities_ttm: numeric("cash_f_financing_activities_ttm"),
  free_cash_flow_ttm: numeric("free_cash_flow_ttm"),
  capital_expenditures_ttm: numeric("capital_expenditures_ttm"),
  recommend_all: numeric("recommend_all"),
  recommend_m_a: numeric("recommend_m_a"),
  recommend_other: numeric("recommend_other"),
  r_s_i: numeric("r_s_i"),
  mom: numeric("mom"),
  a_o: numeric("a_o"),
  c_c_i20: numeric("c_c_i20"),
  stoch_k: numeric("stoch_k"),
  stoch_d: numeric("stoch_d"),
  created_at: timestamp("created_at").notNull(),
});

export const pgAiModel = pgTable("ai_models", {
  model_id: numeric("model_id").notNull(),
  model: text("model"),
  market_sector: text("market_sector"),
  ago: text("ago"),
  weights: text("weights"), // weights 필드 추가
});

export const toCamelCase = (str: string | undefined): string => {
  if (typeof str !== "string") {
    return "";
  }
  return str
    .toLowerCase()
    .split(" ")
    .map((word, index) =>
      index === 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join("");
};

export const decodeByteaToJson = (byteaString: string) => {
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

export const decodeBufferToJson = (buffer: {
  type: string;
  data: number[];
}): any => {
  const base64String = btoa(String.fromCharCode(...buffer.data));
  const jsonString = atob(base64String);
  return JSON.parse(jsonString);
};
