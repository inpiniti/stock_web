<script setup lang="ts">
const { live } = useLive();
const { market, sectors } = useSelected();
const { models, getPredictionFromModel } = useAiModel();
const { userFavorites, getUserFavorites, setUserFavorites } =
  useUserFavorites();
const { user } = useSign();
const { getFavoriteLives } = useFavoritesLive();

const markets = [
  { value: "seoul", label: "KOSPI" },
  { value: "kosdaq", label: "KOSDAQ" },
  { value: "nasdaq", label: "NASDAQ" },
];

const selectedMarketLabel = computed(() => {
  const selectedMarket = markets.find((m) => m.value === market.value);
  return selectedMarket ? selectedMarket.label : "Unknown";
});

const allPredicts = ref<any>([]);
const marketPredicts = ref<any>([]);
const sectorPredicts = ref<any>([]);

// 관심목록에 등록되어 있는지 여부 확인
const isFavorite = computed(() => {
  if (userFavorites.value === undefined) return false;
  const favorites = JSON.parse(userFavorites.value.favorite_stocks);
  return favorites.includes(live.value.name);
});

watchEffect(async () => {
  if (
    models.value === undefined ||
    sectors.value[2] === "" ||
    models.value.length === 0
  ) {
    sectorPredicts.value = [];
  } else {
    allPredicts.value = await getPredictionFromModel(
      models.value[sectors.value[0]]
    );
    marketPredicts.value = await getPredictionFromModel(
      models.value[sectors.value[1]]
    );
    sectorPredicts.value = await getPredictionFromModel(
      models.value[sectors.value[2]]
    );
  }
});

const registerFavorite = async () => {
  const jsonFavorites = JSON.parse(
    userFavorites.value?.favorite_stocks ?? "[]"
  );
  jsonFavorites.push(live.value.name);

  const strFavorites = JSON.stringify(jsonFavorites);

  await setUserFavorites({
    user_id: user.value.id,
    favorite_stocks: strFavorites,
  });

  await getUserFavorites(user.value.id);
  await getFavoriteLives();
};

const removeFromFavorites = async () => {
  const jsonFavorites = JSON.parse(
    userFavorites.value?.favorite_stocks ?? "[]"
  ).filter((stock: string) => stock !== live.value.name);

  const strFavorites = JSON.stringify(jsonFavorites);

  await setUserFavorites({
    user_id: user.value.id,
    favorite_stocks: strFavorites,
  });
  await getUserFavorites(user.value.id);
  await getFavoriteLives();
};
</script>
<template>
  <DevOnly>
    <div
      class="absolute top-0 left-0 z-30 w-full h-full text-red-500 border border-red-500 pointer-events-none"
    >
      11
    </div>
  </DevOnly>
  <Card class="relative h-[584px] p-5 overflow-hidden bg-opacity-50">
    <video
      autoplay
      muted
      loop
      class="absolute inset-0 top-0 left-0 object-cover w-full h-full"
    >
      <source src="/bgvideo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <!-- 반투명한 검정색 오버레이 -->
    <div
      class="absolute inset-0 top-0 left-0 z-10 w-full h-full bg-white opacity-50"
    ></div>
    <!-- 카드 내용 -->
    <ColCover class="relative z-20 gap-5 text-white">
      <Fix>
        <RowCover class="gap-3 text-2xl">
          <RowCover class="gap-3 text-2xl">
            <Button variant="outline" class="border-red-500 w-fit text-primary">
              {{ live.name }}
            </Button>
            <Button class="w-fit">{{ selectedMarketLabel }}</Button>
            <Button variant="outline" class="border-red-500 w-fit text-primary">
              {{ live.sector_tr }}
            </Button>
            <Button class="w-fit">{{ live.description }}</Button>
          </RowCover>
          <Fix>
            <Button @click="removeFromFavorites" v-if="isFavorite">
              <font-awesome icon="star" class="mr-2" />
              관심종목 제거
            </Button>
            <Button @click="registerFavorite" v-else>
              <font-awesome :icon="['far', 'star']" class="mr-2" />
              관심종목 등록
            </Button>
          </Fix>
        </RowCover>
      </Fix>
      <Fix>
        <RowCover class="items-end gap-2">
          <div class="p-3 text-black rounded-lg backdrop-blur-xl w-fit">
            <ColCover>
              <p class="text-xs">가격 / 거래 변화량</p>
              <RowCover class="items-end">
                <TypographyH3 class="text-primary">
                  {{ live.close }}
                </TypographyH3>
                <p class="pl-1 text-xs">{{ live.currency }}</p>
                <TypographyH3 class="px-2 font-thin">/</TypographyH3>
                <TypographyH3 class="text-primary">
                  {{ live.volume_change?.toFixed(2) }}
                </TypographyH3>
                <p class="pl-1 text-xs">%</p>
              </RowCover>
            </ColCover>
          </div>
          <div class="p-3 text-black rounded-lg backdrop-blur-xl w-fit">
            <ColCover class="gap-1">
              <p class="text-xs">주간 변화량</p>
              <RowCover class="gap-2">
                <div class="px-2 py-1 text-white rounded-md bg-primary">
                  {{ live?.perf_w?.toFixed(2) }} %
                </div>
              </RowCover>
            </ColCover>
          </div>
          <div class="p-3 text-black rounded-lg backdrop-blur-xl w-fit">
            <ColCover class="gap-1">
              <p class="text-xs">순이익율</p>
              <RowCover class="gap-2">
                <div class="px-2 py-1 text-white rounded-md bg-primary">
                  {{ live?.net_margin_ttm?.toFixed(2) }} %
                </div>
              </RowCover>
            </ColCover>
          </div>
          <div class="p-3 text-black rounded-lg backdrop-blur-xl w-fit">
            <ColCover class="gap-1">
              <p class="text-xs">전체추천, M&A추천, 기타추천:</p>
              <RowCover class="gap-2">
                <div class="px-2 py-1 text-white rounded-md bg-primary">
                  {{ live.recommend_all?.toFixed(2) }}
                </div>
                <div class="px-2 py-1 bg-white rounded-md text-primary">
                  {{ live.recommend_m_a?.toFixed(2) }}
                </div>
                <div class="px-2 py-1 bg-white rounded-md text-primary">
                  {{ live.recommend_other?.toFixed(2) }}
                </div>
              </RowCover>
            </ColCover>
          </div>
        </RowCover>
      </Fix>
      <Fix
        v-for="(pre, index) in [allPredicts, marketPredicts, sectorPredicts]"
      >
        <ColCover>
          <Fix class="text-black">
            <div class="text-xl font-bold">{{ sectors[index] }} AI 모듈</div>
            <div class="text-xs">
              {{
                index == 0
                  ? "모든 주식 데이터를 학습한 인공지능 모듈입니다."
                  : index == 1
                  ? "특정 시장의 데이터만 학습한 인공지능 모듈입니다."
                  : "특정 섹터의 데이터만 학습한 인공지능 모듈입니다."
              }}
            </div>
          </Fix>
          <RowCover class="gap-2">
            <div
              class="p-3 text-black rounded-lg backdrop-blur-xl w-fit"
              v-for="(item, index) in pre"
            >
              <ColCover class="gap-1">
                <p class="text-xs">
                  {{
                    item.ago == "h1"
                      ? "1시간"
                      : item.ago == "d1"
                      ? "1일"
                      : item.ago == "d2"
                      ? "2일"
                      : item.ago == "d3"
                      ? "3일"
                      : item.ago == "d4"
                      ? "4일"
                      : item.ago == "d5"
                      ? "5일"
                      : item.ago == "d6"
                      ? "6일"
                      : item.ago == "w1"
                      ? "일주일"
                      : ""
                  }}
                  뒤 상승율 %:
                </p>
                <RowCover class="items-end">
                  <TypographyP>
                    {{ (item.predict * 100).toFixed(2) }}%
                  </TypographyP>
                </RowCover>
              </ColCover>
            </div>
          </RowCover>
        </ColCover>
      </Fix>
    </ColCover>
  </Card>
</template>
