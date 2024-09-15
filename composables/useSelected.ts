export const useSelected = () => {
  const market = useState("market", () => "seoul");
  const sector = useState("sector", () => "all");
  const isInterest = useState("isInterest", () => false);
  const isLive = useState("isLive", () => true);
  const search = useState("search", () => "");
  const stockList = useState("stockList", () => []);

  return {
    market,
    sector,
    isInterest,
    isLive,
    search,
    stockList,
  };
};
