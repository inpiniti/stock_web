export const useSelected = () => {
  const market = useState("market", () => "seoul");
  const sector = useState("sector", () => "all");
  const isInterest = useState("isInterest", () => false);
  const isLive = useState("isLive", () => true);
  const search = useState("search", () => "");
  const stockList = useState("stockList", () => []);

  const sector_kr = computed(() => {
    return sectorList[sector.value];
  });

  return {
    market,
    sector,
    sector_kr,
    isInterest,
    isLive,
    search,
    stockList,
  };
};
