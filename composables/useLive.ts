export const useLive = () => {
  const lives = useState<any>("lives", () => []);
  const status = useState("status", () => "success");

  const getSeoul = async () => {
    status.value = "pending";
    lives.value = (await useSupabase().from("seoul_live").select("*")).data;
    status.value = "success";
    //return (await useSupabase().from("seoul_live").select("*")).data;
  };
  const getKosdaq = async () => {
    status.value = "pending";
    lives.value = (await useSupabase().from("kosdaq_live").select("*")).data;
    status.value = "success";
    //return (await useSupabase().from("kosdaq_live").select("*")).data;
  };
  const getNasdaq = async () => {
    status.value = "pending";
    lives.value = (await useSupabase().from("nasdaq_live").select("*")).data;
    status.value = "success";
    //return (await useSupabase().from("nasdaq_live").select("*")).data;
  };

  return {
    lives,
    status,
    getSeoul,
    getKosdaq,
    getNasdaq,
  };
};
