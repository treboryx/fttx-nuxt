<template>
  <div class="content">
    <iframe
      style="border: none"
      width="100%"
      height="100%"
      src="http://fttx.speedtestcustom.com"
    ></iframe>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "FTTx.gr - Speedtest",
    };
  },
};
</script>

<style scoped>
.content {
  position: absolute;
}
</style>