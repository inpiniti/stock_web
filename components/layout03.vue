<script setup lang="ts">
const { sector } = useSelected();
const { live, lives } = useLive();
const { status, getModel, allPredict } = useAiModel();

const selectSector = async (newSector: string) => {
  sector.value = newSector;
  await getModel(sector.value);
  live.value =
    lives.value.find((l: ILive) => l.name === live.value.name) ||
    lives.value[0];
  //predict([live.value]);
};
</script>
<template>
  <DevOnly>
    <div
      class="absolute top-0 left-0 z-30 w-full h-full text-red-500 border border-red-500 pointer-events-none"
    >
      03
    </div>
  </DevOnly>
  <Card class="h-full p-2 text-white bg-primary">
    <ColCover>
      <Fix>
        <RowCover class="items-end">
          <ColCover class="p-1">
            <TypographyH3> AI Model </TypographyH3>
          </ColCover>
        </RowCover>
      </Fix>
      <Full>
        <ColCover class="gap-2 overflow-y-scroll">
          <Badge
            class="cursor-pointer hover:bg-white hover:text-primary"
            :class="sector == key ? 'bg-white text-primary' : ''"
            v-for="(value, key) in sectorList"
            :key="key"
            @click="selectSector(key)"
          >
            <p
              v-if="status == 'pending' && sector == key"
              class="w-full text-center"
            >
              <font-awesome icon="circle-notch" spin />
            </p>
            <p v-else>
              {{ value }}
            </p>
          </Badge>
        </ColCover>
      </Full>
    </ColCover>
  </Card>
</template>
