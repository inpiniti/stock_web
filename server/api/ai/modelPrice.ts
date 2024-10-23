import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    return useDrizzle()
      .select()
      .from(pgAiModelsPrice)
      .where(eq(pgAiModelsPrice.market_sector, "all"));
  } catch (error) {
    console.log("error", error);
    return error;
  }
});
