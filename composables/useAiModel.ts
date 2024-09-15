export const useAiModel = () => {
  const model = useState<IModel[]>("model", () => []);
  const status = ref("success");

  const getModel = async (sector: string) => {
    status.value = "pending";
    model.value =
      (
        await useSupabase()
          .from("ai_models")
          .select("*")
          .eq("market_sector", sector)
      ).data ?? [];
    status.value = "success";
  };

  return {
    model,
    status,
    getModel,
  };
};
