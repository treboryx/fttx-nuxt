<template>
  <Map :dslam="dslam" />
</template>

<script>
import Map from "../components/Map";
import axios from "axios";

export default {
  components: {
    Map,
  },
  async asyncData() {
    // DSLAM LOADING
    let dslam = await axios
      .get("https://api.fttx.gr/api/v1/centers?limit=0&approved=true")
      .then((r) => r);

    return {
      dslam: dslam.data.data,
    };
  },
};
</script>
