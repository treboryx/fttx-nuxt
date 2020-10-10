<template>
  <div>
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10"
                src="@/static/img/fttx-logo.png"
                alt="FTTx.gr logo"
              />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline">
                <nuxt-link
                  to="/"
                  :class="[
                    this.$route.name == 'index' ? 'text-white bg-gray-900' : '',
                    'text-gray-300'
                  ]"
                  @click.prevent="currentPage('index')"
                  class="px-3 py-2 rounded-md text-sm font-medium hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  ><i class="fas fa-map-marked-alt"></i> Map</nuxt-link
                >
                <nuxt-link
                  to="/add"
                  :class="[
                    this.$route.name == 'add' ? 'text-white bg-gray-900' : '',
                    'text-gray-300'
                  ]"
                  @click.prevent="currentPage('add')"
                  class="ml-4 px-3 py-2 rounded-md text-sm font-medium hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  ><i class="fas fa-plus-circle"></i> Add Cabinet</nuxt-link
                >
                <nuxt-link
                  to="/speed"
                  :class="[
                    this.$route.name == 'speed' ? 'text-white bg-gray-900' : '',
                    'text-gray-300'
                  ]"
                  @click.prevent="currentPage('speed')"
                  class="ml-4 px-3 py-2 rounded-md text-sm font-medium hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  ><i class="fas fa-tachometer-alt"></i> Test Your
                  Speed</nuxt-link
                >
                <a
                  href="https://github.com/fttx-gr"
                  class="text-gray-300 ml-4 px-3 py-2 rounded-md text-sm font-medium hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  ><i class="fab fa-github"></i> GitHub</a
                >
              </div>
            </div>
          </div>
          <!-- Bell Icon for news Hidden till I make it functional -->
          <!-- <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button
                class="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                aria-label="Notifications"
              >
                <svg
                  class="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
            </div>
          </div> -->
          <div class="-mr-2 flex md:hidden" style="z-index: 9999">
            <!-- Mobile menu button -->
            <button
              @click.prevent="hamburgerClick()"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <!-- Menu open: "hidden", Menu closed: "block" -->
              <svg
                :class="hamburger ? 'hidden' : 'block'"
                class="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <!-- Menu open: "block", Menu closed: "hidden" -->
              <svg
                :class="hamburger ? 'block' : 'hidden'"
                class="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div :class="hamburger ? 'block' : 'hidden'">
        <!-- hidde hamburger whenever you navigate to another page via the menu -->
        <div class="px-2 pt-2 pb-3 sm:px-3" @click.prevent="hamburgerClick()">
          <nuxt-link
            to="/"
            :class="
              this.$route.name === 'index'
                ? 'text-white bg-gray-900'
                : 'text-gray-300'
            "
            class="block px-3 py-2 rounded-md text-base font-medium text-white focus:outline-none focus:text-white focus:bg-gray-700"
            ><i class="fas fa-map-marked-alt"></i> Map</nuxt-link
          >
          <nuxt-link
            to="/add"
            :class="
              this.$route.name == 'add'
                ? 'text-white bg-gray-900'
                : 'text-gray-300'
            "
            class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
            ><i class="fas fa-plus-circle"></i> Add Cabinet</nuxt-link
          >
          <nuxt-link
            to="/speed/"
            :class="[
              this.$route.name == 'speed' ? 'text-white bg-gray-900' : '',
              'text-gray-300'
            ]"
            @click.prevent="currentPage('speed')"
            class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
            ><i class="fas fa-tachometer-alt"></i> Test Your Speed</nuxt-link
          >
          <a
            href="https://github.com/fttx-gr"
            class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
            ><i class="fab fa-github"></i> GitHub</a
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      currPage: this.$route.path === "/" ? "map" : "",
      profileDropdown: false,
      vcoConfig: {
        events: ["dblclick", "click"],
        isActive: true
      },
      hamburger: false
    };
  },
  methods: {
    currentPage(page) {
      this.currPage = page;
    },
    hamburgerClick() {
      this.hamburger = !this.hamburger;
      this.$root.$emit("hamburgerState", this.hamburger);
    }
  }
};
</script>
<style scoped lang="postcss">
html,
body {
  margin: 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter {
  transform: translateY(-50px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
