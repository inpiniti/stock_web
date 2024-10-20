export const useLive = () => {
  const lives = useState<ILive[]>("lives", () => []);
  const live = useState<ILive>("live", () => <ILive>{});
  const status = useState("status", () => "success");

  const { search } = useSelected();
  const filterLives = computed(() => {
    return lives.value.filter((live) => {
      const searchValue = search.value.toLowerCase();
      return (
        live.name.toLowerCase().includes(searchValue) ||
        live.description.toLowerCase().includes(searchValue) ||
        live.logoid.toLowerCase().includes(searchValue)
      );
    });
  });

  const fetchData = async (url: string): Promise<ILive[]> => {
    status.value = "pending";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: ILive[] = await response.json();
      status.value = "success";
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      status.value = "error";
      return [];
    }
  };

  const getSeoul = async () => {
    const data = await fetchData("/api/live/seoul");
    lives.value = data;
    //(await useSupabase().from("seoul_live").select("*")).data ?? [];
    //useDrizzle().select().from(pgTableSeoulLive);
  };
  const getKosdaq = async () => {
    const data = await fetchData("/api/live/kosdaq");
    lives.value = data;
    //(await useSupabase().from("kosdaq_live").select("*")).data ?? [];
    //useDrizzle().select().from(pgTableKosdaqLive);
  };
  const getNasdaq = async () => {
    const data = await fetchData("/api/live/nasdaq");
    lives.value = data;
    //(await useSupabase().from("nasdaq_live").select("*")).data ?? [];
    //useDrizzle().select().from(pgTableNasdaqLive);
  };

  return {
    live,
    lives,
    filterLives,
    status,
    getSeoul,
    getKosdaq,
    getNasdaq,
  };
};
