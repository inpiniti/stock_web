export default defineEventHandler(async (event) => {
  try {
    return useDrizzle().select().from(pgTableKosdaqLive);
  } catch (error) {
    console.log("error", error);
    return error;
  }
});
