export const useFavoritesLive = () => {
  const { userFavorites } = useUserFavorites();
  const favoriteLives = useState<ILive[]>("favoriteLives", () => []);

  const getFavoriteLives = async () => {
    const names = JSON.parse(userFavorites.value.favorite_stocks);

    const [seoulData, kosdaqData, nasdaqData] = await Promise.all([
      useSupabase().from("seoul_live").select("*").in("name", names),
      //useDrizzle().select().from(pgTableSeoulLive).in("name", names),
      useSupabase().from("kosdaq_live").select("*").in("name", names),
      //useDrizzle().select().from(pgTableKosdaqLive).in("name", names),
      useSupabase().from("nasdaq_live").select("*").in("name", names),
      //useDrizzle().select().from(pgTableNasdaqLive).in("name", names),
    ]);

    favoriteLives.value = [
      ...(seoulData.data ?? []),
      ...(kosdaqData.data ?? []),
      ...(nasdaqData.data ?? []),
    ];
  };

  return {
    favoriteLives,
    getFavoriteLives,
  };
};
