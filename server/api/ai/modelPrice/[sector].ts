import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const sector = String(getRouterParam(event, "sector"));
  try {
    return useDrizzle()
      .select()
      .from(pgAiModelsPrice)
      .where(eq(pgAiModelsPrice.market_sector, sector));
  } catch (error) {
    console.log("error", error);
    return error;
  }
});
