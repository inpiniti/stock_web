<script setup lang="ts">
const { sector } = useSelected();
const { live, lives, getSeoul } = useLive();
const { getModel, allPredict } = useAiModel();

onMounted(async () => {
  await Promise.all([getSeoul(), getModel(sector.value)]);
  await allPredict();
  live.value = lives.value[0];
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
