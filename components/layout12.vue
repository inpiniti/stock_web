<script setup lang="ts">
const { market } = useSelected();
const { getSeoul, getKosdaq, getNasdaq } = useLive();
const { getModel } = useAiModel();

const pending = ref(false);
const data: any = ref([]);
const model: any = ref([]);

onMounted(async () => {
  getData();
  model.value = await getModel();
});

const getData = async () => {
  if (market.value === "seoul") {
    pending.value = true;
    data.value = await getSeoul();
    pending.value = false;
  } else if (market.value === "kosdaq") {
    pending.value = true;
    data.value = await getKosdaq();
    pending.value = false;
  } else if (market.value === "nasdaq") {
    pending.value = true;
    data.value = await getNasdaq();
    pending.value = false;
  }
};

watch(
  () => market.value,
  () => {
    getData();
  }
);
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
      <TypographyH4>Stock List</TypographyH4>
      <ColCover class="gap-1 overflow-y-scroll">
        <div
          class="p-2 text-xs rounded-lg bg-neutral-100"
          v-for="seoul in data"
        >
          <RowCover class="gap-5">
            <Fix class="flex items-center w-10 text-neutral-500">
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
