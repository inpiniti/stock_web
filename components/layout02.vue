<script setup lang="ts">
const { market } = useSelected();
const { status, getSeoul, getKosdaq, getNasdaq } = useLive();
const { allPredict } = useAiModel();

const markets = [
  { value: "seoul", label: "KOSPI" },
  { value: "kosdaq", label: "KOSDAQ" },
  { value: "nasdaq", label: "NASDAQ" },
];

// 함수 매핑 객체
const marketFunctions: { [key: string]: () => Promise<void> } = {
  seoul: getSeoul,
  kosdaq: getKosdaq,
  nasdaq: getNasdaq,
};

const fetchMarketData = async (newMarket: string) => {
  market.value = newMarket;
  const fetchFunction = marketFunctions[newMarket];
  if (fetchFunction) {
    await fetchFunction();
  } else {
    console.error(`No fetch function found for market: ${newMarket}`);
  }
};
</script>
<template>
  <DevOnly>
    <div
      class="absolute top-0 left-0 z-30 w-full h-full text-red-500 border border-red-500 pointer-events-none"
    >
      02
    </div>
  </DevOnly>
  <Card>
    <ColCover class="gap-1 p-1">
      <Badge
        v-for="item in markets"
        :key="item.value"
        class="text-base cursor-pointer"
        :class="market == item.value ? '' : 'border-0'"
        :variant="market == item.value ? 'default' : 'outline'"
        @click="fetchMarketData(item.value)"
      >
        <p
          v-if="status == 'pending' && market == item.value"
          class="w-full text-center"
        >
          <font-awesome icon="circle-notch" spin />
        </p>
        <p v-else>
          {{ item.label }}
        </p>
      </Badge>
    </ColCover>
  </Card>
</template>
