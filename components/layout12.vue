<script setup lang="ts">
const { live, filterLives } = useLive();

const { predict, allPredict, status } = useAiModel();
const selectLive = (newLive: ILive) => {
  live.value = newLive;
  predict([live.value]);
};
</script>
<template>
  <DevOnly>
    <div
      class="absolute top-0 left-0 z-30 w-full h-full text-red-500 border border-red-500 pointer-events-none"
    >
      12
    </div>
  </DevOnly>
  <Card class="px-5 pt-5 overflow-hidden h-96">
    <ColCover class="gap-2">
      <Fix>
        <RowCover class="items-center justify-between w-full">
          <TypographyH4>Stock List</TypographyH4>
          <Button @click="allPredict">
            <p v-if="status == 'pending'" class="text-center w-full">
              <font-awesome icon="circle-notch" spin />
            </p>
            <p v-else>
              전종목 예측 (전종목 예측은 브라우져의 자원을 많이 소모하는
              작업입니다. 주의해주세요.)
            </p>
          </Button>
        </RowCover>
      </Fix>
      <Full>
        <ColCover class="gap-1 overflow-y-scroll">
          <div
            class="p-2 px-5 text-xs rounded-lg bg-neutral-100 cursor-pointer hover:bg-neutral-50"
            v-for="live in filterLives"
            :key="live.name"
            @click="selectLive(live)"
          >
            <RowCover class="gap-5">
              <Fix class="flex items-center w-10 text-neutral-500">
                <Avatar class="border">
                  <AvatarImage
                    :src="`https://s3-symbol-logo.tradingview.com/${live.logoid}--big.svg`"
                    alt="@radix-vue"
                  />
                  <AvatarFallback>{{
                    live.description?.slice(0, 2)
                  }}</AvatarFallback>
                </Avatar>
              </Fix>
              <Fix class="flex items-center w-10 text-neutral-500">
                {{ live.name }}
              </Fix>
              <Fix class="flex items-center text-neutral-500">
                {{ live.description }}
              </Fix>
              <Fix class="flex items-center">
                <Badge>{{ live.sector_tr }}</Badge>
              </Fix>
              <Fix class="flex items-center" v-for="item in live?.predict">
                {{ (item.predict * 100).toFixed(0) }}%
              </Fix>
              <Full class="flex items-center justify-end font-bold">
                {{ live.close }}
              </Full>
            </RowCover>
          </div>
        </ColCover>
      </Full>
    </ColCover>
  </Card>
</template>
