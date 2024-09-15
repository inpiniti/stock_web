export const useLive = () => {
  const lives = useState<ILive[]>("lives", () => []);
  const live = useState<ILive>("live", () => <ILive>{});
  const status = useState("status", () => "success");

  const getSeoul = async () => {
    status.value = "pending";
    lives.value =
      (await useSupabase().from("seoul_live").select("*")).data ?? [];
    live.value = lives.value[0];
    status.value = "success";
  };
  const getKosdaq = async () => {
    status.value = "pending";
    lives.value =
      (await useSupabase().from("kosdaq_live").select("*")).data ?? [];
    live.value = lives.value[0];
    status.value = "success";
  };
  const getNasdaq = async () => {
    status.value = "pending";
    lives.value =
      (await useSupabase().from("nasdaq_live").select("*")).data ?? [];
    live.value = lives.value[0];
    status.value = "success";
  };

  return {
    live,
    lives,
    status,
    getSeoul,
    getKosdaq,
    getNasdaq,
  };
};
