<script setup lang="ts">
const { favoritePredict } = useAiModel();
const { favoriteLives, getFavoriteLives } = useFavoritesLive();

const interval = ref<ReturnType<typeof setInterval> | null>(null);

onMounted(async () => {
  // 1분에 한번씩 데이터를 가져옵니다.
  interval.value = setInterval(async () => {
    await getFavoriteLives();
    await favoritePredict();
  }, 60000);
});

onUnmounted(() => {
  if (interval.value !== null) {
    clearInterval(interval.value);
  }
});
</script>
<template>
  <DevOnly>
    <div
      class="absolute top-0 left-0 z-30 w-full h-full text-red-500 border border-red-500 pointer-events-none"
    >
      22
    </div>
  </DevOnly>
  <Card class="p-5 h-full w-96">
    <ColCover class="gap-2">
      <TypographyH4>관심 종목</TypographyH4>
      <ColCover class="gap-1 overflow-y-scroll">
        <div
          class="p-2 px-5 text-xs rounded-lg bg-neutral-100"
          v-for="live in favoriteLives"
        >
          <RowCover class="gap-3">
            <Fix class="flex items-center text-neutral-500 whitespace-nowrap">
              {{ live.name }}
            </Fix>
            <Fix class="flex items-center" v-for="item in live?.predict">
              {{ (item.predict * 100).toFixed(0) }}%
            </Fix>
          </RowCover>
        </div>
      </ColCover>
    </ColCover>
  </Card>
</template>
