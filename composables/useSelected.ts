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

  const sectors = computed(() => {
    const live = useState<ILive>("live", () => <ILive>{});
    return ["all", market.value, toCamelCase(live.value.sector)];
  });

  return {
    market,
    sector,
    sectors,
    sector_kr,
    isInterest,
    isLive,
    search,
    stockList,
  };
};
