export const useLive = () => {
  const getSeoul = async () => {
    return (await useSupabase().from("seoul_live").select("*")).data;
  };
  const getKosdaq = async () => {
    return (await useSupabase().from("kosdaq_live").select("*")).data;
  };
  const getNasdaq = async () => {
    return (await useSupabase().from("nasdaq_live").select("*")).data;
  };

  return {
    getSeoul,
    getKosdaq,
    getNasdaq,
  };
};
