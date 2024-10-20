// https://stock-server-mocha.vercel.app/api/live/seoul
export default defineEventHandler(async (event) => {
  try {
    return useDrizzle().select().from(pgTableSeoulLive);
  } catch (error) {
    console.log("error", error);
    return error;
  }
});
