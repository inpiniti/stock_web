<script setup lang="ts">
const { market } = useSelected();
const { getSeoul, getKosdaq, getNasdaq } = useLive();
const { getModel } = useAiModel();

const itemsPerPage = ref(100);
const currentPage = ref(1);

const paginatedData = computed(() => {
  if (!data.value || !Array.isArray(data.value)) {
    return [];
  } else {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return data.value.slice(start, end);
  }
});

const pending = ref(false);
const data: any = ref([]);
const model: any = ref([]);

onMounted(async () => {
  getData();
  //model.value = await getModel();
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
    currentPage.value = 1;
    getData();
  }
);
</script>

<template>
  <ClientOnly fallback-tag="span" fallback="Loading comments...">
    <div class="absolute top-0 left-0 text-red-500">Live</div>
  </ClientOnly>
  <div v-if="pending" class="flex items-center justify-center h-full">
    Loading ...
  </div>
  <div v-else class="flex flex-col h-full divide-y">
    <div class="grow-[0] h-full overflow-y-scroll">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>name</TableHead>
            <TableHead>description</TableHead>
            <TableHead>close</TableHead>
            <TableHead>sector</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="seoul in paginatedData" :key="seoul.name">
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
    </div>

    <div class="flex gap-2 p-1 shrink-0">
      <Pagination
        v-slot="{ page }"
        :total="Math.ceil(((data?.length || 0) * 10) / itemsPerPage)"
        :sibling-count="1"
        show-edges
        :default-page="1"
        v-model:page="currentPage"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst />
          <PaginationPrev />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="w-10 h-10 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext />
          <PaginationLast />
        </PaginationList>
      </Pagination>
      <div class="relative">
        <Input class="w-fit" v-model="itemsPerPage" type="number" />
        <sapn class="absolute top-2 right-2"> row </sapn>
      </div>
    </div>
  </div>
</template>
