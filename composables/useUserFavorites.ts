export const useUserFavorites = () => {
  const userFavorites = useState<IUserFavorites>("userFavorites");

  const getUserFavorites = async (user_id: string) => {
    const req = (
      await useSupabase()
        .from("user_favorites")
        .select("*")
        .eq("user_id", user_id)
    ).data;
    const temp: IUserFavorites[] = req ?? [<IUserFavorites>{}];
    userFavorites.value = temp[0] ?? <IUserFavorites>{};
  };

  const setUserFavorites = async (userFavorites: IUserFavorites) => {
    await useSupabase().from("user_favorites").upsert(userFavorites);
  };

  return {
    userFavorites,
    getUserFavorites,
    setUserFavorites,
  };
};
