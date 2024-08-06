export const useSelected = () => {
  const market = useState("market", () => "seoul");
  const module = useState("module", () => "all");
  const isInterest = useState("isInterest", () => false);
  const isLive = useState("isLive", () => true);
  const search = useState("search", () => "");
  const stockList = useState("stockList", () => []);

  return {
    market,
    module,
    isInterest,
    isLive,
    search,
    stockList,
  };
};
