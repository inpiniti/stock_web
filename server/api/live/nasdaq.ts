export default defineEventHandler(async (event) => {
  try {
    return useDrizzle().select().from(pgTableNasdaqLive);
  } catch (error) {
    console.log("error", error);
    return error;
  }
});
