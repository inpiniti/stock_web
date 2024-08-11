export const useAiModel = () => {
  const getModel = async () => {
    return (await useSupabase().from("ai_model").select("*")).data;
  };

  return {
    getModel,
  };
};
