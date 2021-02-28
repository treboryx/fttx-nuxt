<template>
  <div class="w-full absolute flex items-center justify-center pt-64">
    <div class="max-w-md">
      <div class="text-5xl font-dark font-bold">404</div>
      <p class="text-2xl md:text-3xl font-light leading-normal mb-4">
        Sorry we couldn't find this page.
      </p>
      <a href="/">
        <button
          class="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-gray-800 active:bg-blue-600 hover:bg-gray-600"
        >
          <i class="fas fa-long-arrow-alt-right pr-2"></i> Home
        </button></a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "NuxtError",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500;
    },
    message() {
      return this.error.message || "This page could not be found";
    }
  },
  head() {
    return {
      title: this.message,
      meta: [
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1.0,minimum-scale=1.0"
        }
      ]
    };
  }
};
</script>

<style></style>
