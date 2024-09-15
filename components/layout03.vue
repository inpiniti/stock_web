<script setup lang="ts">
const { sector } = useSelected();
const { status, getModel } = useAiModel();

const selectSector = (newSector: string) => {
  sector.value = newSector;
  getModel(sector.value);
};
</script>
<template>
  <DevOnly>
    <div
      class="absolute z-30 top-0 left-0 w-full h-full border-red-500 border text-red-500 pointer-events-none"
    >
      03
    </div>
  </DevOnly>
  <Card class="bg-primary text-white p-2 h-full">
    <ColCover>
      <Fix>
        <RowCover class="items-end">
          <ColCover class="p-1">
            <TypographyH3> AI Model </TypographyH3>
          </ColCover>
        </RowCover>
      </Fix>
      <Full>
        <ColCover class="overflow-y-scroll gap-2">
          <Badge
            class="cursor-pointer hover:bg-white hover:text-primary"
            :class="sector == key ? 'bg-white text-primary' : ''"
            v-for="(value, key) in sectorList"
            :key="key"
            @click="selectSector(key)"
          >
            <p
              v-if="status == 'pending' && sector == key"
              class="text-center w-full"
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
