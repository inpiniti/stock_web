<script setup lang="ts">
const { market } = useSelected();
const apiUrl = computed(() => `/api/live/${market.value}`);
const { data, error, status } = await useLazyFetch<any[]>(apiUrl, {
  immediate: true,
});
const pending = computed(() => status.value === "pending");

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
</script>

<template>
  <div v-if="pending">Loading ...</div>
  <div v-else-if="error">Error loading data</div>
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

    <div class="shrink-0 p-1 flex gap-2">
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
