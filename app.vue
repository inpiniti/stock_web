<script setup lang="ts">
const { sector } = useSelected();
const { live, lives, getSeoul } = useLive();
const { getModel, getModels } = useAiModel();
const { user } = useSign();

const { getUserFavorites } = useUserFavorites();

onMounted(async () => {
  user.value = (await useSupabase().auth.getUser()).data.user;
  if (user.value) {
    getUserFavorites(user.value.id);
  }
  await getSeoul();
  await getModels();
  getModel(sector.value);
  live.value = lives.value[0];
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
