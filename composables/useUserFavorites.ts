export const useUserFavorites = () => {
  const userFavorites = ref<IUserFavorites>();

  const getUserFavorites = async () => {
    const temp: IUserFavorites[] = (
      await useSupabase().from("user_favorites").select("*")
    ).data ?? [<IUserFavorites>{}];
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
