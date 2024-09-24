<script setup lang="ts">
const { sector } = useSelected();
const { live, getSeoul } = useLive();
const { getModel, predict } = useAiModel();

onMounted(async () => {
  await Promise.all([getSeoul(), getModel(sector.value)]);
  predict([live.value]);
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
