// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "shadcn-nuxt",
    "nuxt-icon",
    "@pinia/nuxt",
    "dayjs-nuxt",
    [
      "@vee-validate/nuxt",
      {
        autoImports: true,
      },
    ],
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Lato: {
            wght: [300, 400, 700],
            ital: [300],
          },
        },
      },
    ],
    "@nuxt/ui",
  ],

  shadcn: {
    prefix: "Ui",
    componentDir: "./components/ui",
  },

  pinia: {
    storesDirs: ["./stores/**"],
  },

  compatibilityDate: "2024-07-03",
});
