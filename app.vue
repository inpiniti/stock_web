<script setup lang="ts">
const { sector } = useSelected();
const { live, lives, getSeoul } = useLive();
const { getModel, getModels } = useAiModel();
const { getModelsPrice } = useAiModelPrice();
const { user } = useSign();

const { getUserFavorites } = useUserFavorites();
const { getFavoriteLives } = useFavoritesLive();

onMounted(async () => {
  try {
    user.value = (await useSupabase().auth.getUser()).data.user;
    if (user.value) {
      getUserFavorites(user.value.id);
    }
    await getSeoul();
    console.log("getSeoul");
    await getModels();
    console.log("getModels");
    //await getModelsPrice();
    //console.log("getModelsPrice");
    //getFavoriteLives();
    console.log("getFavoriteLives", sector.value);
    getModel(sector.value);
    console.log("getModel");
    live.value = lives.value[0];
  } catch (e) {
    console.log(e);
  }
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
