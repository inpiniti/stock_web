<script setup lang="ts">
const { sector } = useSelected();
const { live, getSeoul } = useLive();
const { getModel, allPredict } = useAiModel();

onMounted(async () => {
  await Promise.all([getSeoul(), getModel(sector.value)]);
  allPredict();
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
