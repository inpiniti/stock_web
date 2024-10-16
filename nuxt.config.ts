// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@vesp/nuxt-fontawesome"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  fontawesome: {
    icons: {
      solid: [
        "spray-can-sparkles",
        "globe",
        "bolt",
        "suitcase-medical",
        "money-check-dollar",
        "microchip",
        "weight-scale",
        "truck",
        "industry",
        "magnifying-glass",
        "memory",
        "comments",
        "cogs",
        "store",
        "shopping-cart",
        "user-friends",
        "truck-loading",
        "plug",
        "hard-hat",
        "store-alt",
        "cloud-sun",
        "ellipsis-h",
        "circle-info",
        "earth-americas",
        "spinner",
        "circle-notch",
        "comment",
        "star",
      ],
      regular: ["star"],
    },
  },
  // 서버 설정 추가
  devServer: {
    port: 3001,
  },
});
