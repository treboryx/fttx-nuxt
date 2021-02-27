<template>
  <Map
    :cabinetData="cabinetData"
    :dslam="dslam"
    :numberOfCabinets="numberofCabinets"
    :numberOfCenters="numberofCenters"
  />
</template>

<script>
import Map from "../components/Map";
import axios from "axios";

export default {
  components: {
    Map
  },
  async asyncData() {
    // DSLAM LOADING
    let dslam = await axios
      .get("https://api.fttx.gr/api/v1/centers?limit=0&approved=true")
      .then(r => r);

    // Cabinets
    const results = await axios
      .get(`https://api.fttx.gr/api/v1/cabinets?limit=0&approved=true`)
      .then(r => r);
    const cabinets = results.data.data.filter(d => d.type !== "DSLAM");

    return {
      dslam: dslam.data.data,
      numberOfCenters: dslam.data.data.length,
      numberOfCabinets: cabinets.length,
      cabinetData: cabinets
    };
  }
};
</script>
