export default defineEventHandler(async (event) => {
  try {
    const response = await fetch(
      "https://stock-server-mocha.vercel.app/api/live/nasdaq"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
});
