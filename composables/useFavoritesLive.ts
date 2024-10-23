import { eq } from "drizzle-orm";

export const useFavoritesLive = () => {
  const { userFavorites } = useUserFavorites();
  const favoriteLives = useState<ILive[]>("favoriteLives", () => []);

  const getFavoriteLives = async () => {
    try {
      const names = JSON.parse(userFavorites.value.favorite_stocks);

      const [seoulData, kosdaqData, nasdaqData] = await Promise.all([
        //useSupabase().from("seoul_live").select("*").in("name", names),
        useDrizzle()
          .select()
          .from(pgTableSeoulLive)
          .where(eq(pgTableSeoulLive.name, names)),
        //useSupabase().from("kosdaq_live").select("*").in("name", names),
        useDrizzle()
          .select()
          .from(pgTableKosdaqLive)
          .where(eq(pgTableSeoulLive.name, names)),
        //useSupabase().from("nasdaq_live").select("*").in("name", names),
        useDrizzle()
          .select()
          .from(pgTableNasdaqLive)
          .where(eq(pgTableSeoulLive.name, names)),
      ]);

      favoriteLives.value = [
        ...(seoulData.data ?? []),
        ...(kosdaqData.data ?? []),
        ...(nasdaqData.data ?? []),
      ];
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    favoriteLives,
    getFavoriteLives,
  };
};
