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
      class="absolute z-30 top-0 left-0 w-full h-full border-red-500 border text-red-500 pointer-events-none"
    >
      12
    </div>
  </DevOnly>
  <Card class="h-96 overflow-hidden">
    <ColCover>
      <Table>
        <TableBody>
          <TableRow v-for="seoul in data" :key="seoul.name">
            <TableCell>
              {{ seoul.name }}
            </TableCell>
            <TableCell>{{ seoul.description }}</TableCell>
            <TableCell>{{ seoul.close }}</TableCell>
            <TableCell>
              {{ seoul.sector_tr }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ColCover>
  </Card>
</template>
