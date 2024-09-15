<script setup lang="ts">
const { live } = useLive();
const { market, sector_kr } = useSelected();
const { predicts } = useAiModel();

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
            {{ sector_kr }}
          </Button>
        </RowCover>
      </Fix>
      <Fix>
        <RowCover class="items-end gap-2">
          <div class="backdrop-blur-xl rounded-lg p-3 w-fit text-black">
            <ColCover>
              <p class="text-xs">가격 / 거래 변화량</p>
              <RowCover class="items-end">
                <TypographyH3 class="text-primary">
                  {{ live.close }}
                </TypographyH3>
                <p class="text-xs pl-1">{{ live.currency }}</p>
                <TypographyH3 class="font-thin px-2">/</TypographyH3>
                <TypographyH3 class="text-primary">
                  {{ live.volume_change?.toFixed(2) }}
                </TypographyH3>
                <p class="text-xs pl-1">%</p>
              </RowCover>
            </ColCover>
          </div>
          <div class="backdrop-blur-xl rounded-lg p-3 w-fit text-black">
            <ColCover class="gap-1">
              <p class="text-xs">주간 변화량</p>
              <RowCover class="gap-2">
                <div class="bg-primary px-2 py-1 rounded-md text-white">
                  {{ live?.perf_w?.toFixed(2) }} %
                </div>
              </RowCover>
            </ColCover>
          </div>
          <div class="backdrop-blur-xl rounded-lg p-3 w-fit text-black">
            <ColCover class="gap-1">
              <p class="text-xs">순이익율</p>
              <RowCover class="gap-2">
                <div class="bg-primary px-2 py-1 rounded-md text-white">
                  {{ live?.net_margin_ttm?.toFixed(2) }} %
                </div>
              </RowCover>
            </ColCover>
          </div>
          <div class="backdrop-blur-xl rounded-lg p-3 w-fit text-black">
            <ColCover class="gap-1">
              <p class="text-xs">전체추천, M&A추천, 기타추천:</p>
              <RowCover class="gap-2">
                <div class="bg-primary px-2 py-1 rounded-md text-white">
                  {{ live.recommend_all?.toFixed(2) }}
                </div>
                <div class="text-primary px-2 py-1 rounded-md bg-white">
                  {{ live.recommend_m_a?.toFixed(2) }}
                </div>
                <div class="text-primary px-2 py-1 rounded-md bg-white">
                  {{ live.recommend_other?.toFixed(2) }}
                </div>
              </RowCover>
            </ColCover>
          </div>
        </RowCover>
      </Fix>
      <Fix>
        <RowCover class="gap-2">
          <div
            class="backdrop-blur-xl rounded-lg p-3 w-fit text-black"
            v-for="(predict, index) in predicts"
          >
            <ColCover class="gap-1">
              <p class="text-xs">
                {{
                  predict.ago == "h1"
                    ? "1시간"
                    : predict.ago == "d1"
                    ? "1일"
                    : predict.ago == "d2"
                    ? "2일"
                    : predict.ago == "d3"
                    ? "3일"
                    : predict.ago == "d4"
                    ? "4일"
                    : predict.ago == "d5"
                    ? "5일"
                    : predict.ago == "d6"
                    ? "6일"
                    : predict.ago == "w1"
                    ? "일주일"
                    : ""
                }}
                뒤 상승율 %:
              </p>
              <RowCover class="items-end">
                <TypographyP>
                  {{ (predict.predict * 100).toFixed(2) }}%
                </TypographyP>
              </RowCover>
            </ColCover>
          </div>
        </RowCover>
      </Fix>
    </ColCover>
  </Card>
</template>
