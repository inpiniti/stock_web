<script setup lang="ts">
const data = ref([
  {
    name: "애플",
    description: "+0.11",
    sector_tr: "+0.05%",
    close: "222.77",
  },
  {
    name: "알리바바 ADR",
    description: "+0.68",
    sector_tr: "+0.80%",
    close: "85.49",
  },
  {
    name: "테슬라",
    description: "+1.68",
    sector_tr: "+0.74%",
    close: "229.81",
  },
  {
    name: "S&P 500",
    description: "+41.60",
    sector_tr: "+0.75%",
    close: "5,595.80",
  },
  {
    name: "금",
    description: "+10.10",
    sector_tr: "+0.39%",
    close: "2,590.80",
  },
]);
</script>
<template>
  <DevOnly>
    <div
      class="absolute top-0 left-0 z-30 w-full h-full text-red-500 border border-red-500 pointer-events-none"
    >
      23
    </div>
  </DevOnly>
  <Card class="p-5 h-96 w-96">
    <ColCover class="gap-2">
      <TypographyH4>주요 주식</TypographyH4>
      <ColCover class="gap-1 overflow-y-scroll">
        <div
          class="p-2 px-5 text-xs rounded-lg bg-neutral-100"
          v-for="seoul in data"
        >
          <RowCover class="gap-3">
            <Fix class="flex items-center text-neutral-500 whitespace-nowrap">
              {{ seoul.name }}
            </Fix>
            <Fix class="flex items-center text-neutral-500">
              {{ seoul.description }}
            </Fix>
            <Fix class="flex items-center">
              <Badge>{{ seoul.sector_tr }}</Badge>
            </Fix>
            <Full class="flex items-center justify-end font-bold">
              {{ seoul.close }}
            </Full>
          </RowCover>
        </div>
      </ColCover>
    </ColCover>
  </Card>
</template>
