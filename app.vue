<script setup lang="ts">
const { sector } = useSelected();
const { live, lives, getSeoul } = useLive();
const { getModel, getModels, allPredict } = useAiModel();

onMounted(async () => {
  await getModels();
  await Promise.all([getSeoul(), getModel(sector.value)]);
  live.value = lives.value[0];
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
