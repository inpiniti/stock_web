export const useAiModel = () => {
  const getModel = async () => {
    return (
      await useSupabase()
        .from("ai_models")
        .select("*")
        .eq("market_sector", "all")
        .eq("ago", "h1")
    ).data;
  };

  return {
    getModel,
  };
};
