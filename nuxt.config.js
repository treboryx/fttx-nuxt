export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "FTTx.gr - Cabinets all around Greece!",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "FTTx Cabinets Map. Έλεγχος διαθεσιμότητας VDSL"
      },
      {
        name: "keywords",
        content:
          "fttx, fttc, ftth, greece, athens, OTE, WIND, Vodafone, Rural Connect, Έλεγχος διαθεσιμότητας VDSL Ελλάδα"
      },
      {
        name: "author",
        content: "treboryx"
      },
      { property: "og:title", content: "FTTx.gr" },
      {
        property: "og:description",
        content: "FTTx Cabinets Map. Έλεγχος διαθεσιμότητας VDSL"
      },
      {
        property: "og:url",
        content: "https://fttx.gr"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ src: "https://kit.fontawesome.com/7dfe1f2920.js" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["@/plugins/google-maps", { src: "~plugins/ga.js", mode: "client" }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/dotenv", "vue-toastification/nuxt"],
  toast: {
    transition: "Vue-Toastification__bounce",
    maxToasts: 3,
    newestOnTop: true,
    position: "top-right",
    timeout: 4000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: false,
    draggable: true,
    draggablePercent: 0.7,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        tailwindcss: {},
        autoprefixer: {}
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true
        }
      }
    }
  },
  env: {
    VUE_APP_GOOGLE_MAPS_API_KEY:
      process.env.NODE_ENV === "development"
        ? process.env.VUE_APP_GOOGLE_MAPS_API_KEY
        : "AIzaSyBg4wE12cEcuWJGQMbKNnb6m2CUTydSZSY"
  }
  // to be used only if the website is running with a github url
  // router: {
  //   base: "/fttx-nuxt/"
  // }
};
