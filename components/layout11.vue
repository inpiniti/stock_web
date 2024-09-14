<script setup lang="ts">
const { market } = useSelected();

const markets = [
  { value: "seoul", label: "KOSPI" },
  { value: "kosdaq", label: "KOSDAQ" },
  { value: "nasdaq", label: "NASDAQ" },
];

const selectedMarketLabel = computed(() => {
  const selectedMarket = markets.find((m) => m.value === market.value);
  return selectedMarket ? selectedMarket.label : "Unknown";
});
</script>
<template>
  <DevOnly>
    <div
      class="absolute z-30 top-0 left-0 w-full h-full border-red-500 border text-red-500 pointer-events-none"
    >
      11
    </div>
  </DevOnly>
  <Card class="relative bg-opacity-50 overflow-hidden h-full p-5">
    <video
      autoplay
      muted
      loop
      class="absolute top-0 left-0 inset-0 w-full h-full object-cover"
    >
      <source src="/bgvideo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <!-- 반투명한 검정색 오버레이 -->
    <div
      class="absolute top-0 left-0 inset-0 w-full h-full bg-white opacity-50 z-10"
    ></div>
    <!-- 카드 내용 -->
    <ColCover class="relative z-20 text-white gap-5">
      <Fix>
        <RowCover class="gap-3 text-2xl">
          <Button class="w-fit">{{ selectedMarketLabel }}</Button>
          <Button variant="outline" class="w-fit text-primary border-red-500">
            테크놀로지 서비스
          </Button>
        </RowCover>
      </Fix>
      <Fix>
        <div class="backdrop-blur-xl rounded-lg p-3 w-fit text-black">
          <ColCover>
            <p class="text-xs">가격 / 거래량:</p>
            <RowCover class="items-end">
              <TypographyH3 class="text-primary">53,400</TypographyH3>
              <p class="text-xs pl-1">KRW</p>
              <TypographyH3 class="font-thin px-2">/</TypographyH3>
              <TypographyH3 class="text-primary">3.106</TypographyH3>
              <p class="text-xs pl-1">M</p>
            </RowCover>
          </ColCover>
        </div>
      </Fix>
      <Fix>
        <div class="backdrop-blur-xl rounded-lg p-3 w-fit text-black">
          <ColCover class="gap-1">
            <p class="text-xs">변화 %:</p>
            <RowCover class="items-end">
              <TypographyH3>+0.75</TypographyH3> <TypographyP>%</TypographyP>
            </RowCover>
            <RowCover class="gap-2">
              <div class="bg-primary px-2 py-1 rounded-md text-white">1.2%</div>
              <div class="text-primary px-2 py-1 rounded-md bg-white">5.1%</div>
            </RowCover>
          </ColCover>
        </div>
      </Fix>
    </ColCover>
  </Card>
</template>
