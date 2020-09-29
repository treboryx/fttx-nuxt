<template>
  <div>
    <div class="md:flex md:justify-center mb-6 flex justify-center mt-8">
      <form class="w-5/6 max-w-lg" @submit.prevent="submit">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-id"
              >Cabinet ID</label
            >
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-id"
              type="number"
              required
              v-model="id"
            />
            <!-- border-red-500 -->
            <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-isp"
              >ISP</label
            >
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-isp"
                required
                v-model="isp"
              >
                <option>OTE</option>
                <option>Vodafone</option>
                <option>WIND</option>
                <option>RURALCONNECT</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-lat"
              >Latitude</label
            >
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-lat"
              type="number"
              step="any"
              v-model="lat"
            />
            <!-- border-red-500 -->
            <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-lng"
              >Longtitude</label
            >
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-lng"
              type="number"
              step="any"
              v-model="lng"
            />
            <!-- border-red-500 -->
            <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-img"
              >Image URL</label
            >
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-img"
              type="text"
              placeholder="Ex. https://imgur.com/"
              v-model="img"
            />
            <!-- border-red-500 -->
            <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-type"
              >Type</label
            >
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-type"
                required
                v-model="type"
              >
                <option>ADSL</option>
                <option>VDSL</option>
                <option>FTTH</option>
                <option>RURALCONNECT</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-name"
              >Your name</label
            >
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-name"
              type="text"
              placeholder="Optional"
              v-model="name"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-email"
              >Email</label
            >
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-email"
              type="text"
              placeholder="Optional"
              v-model="email"
            />
          </div>
        </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  head() {
    return {
      title: "FTTx.gr - Add a cabinet in the map",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Add a FTTx cabinet in the map and contribute to the database"
        }
      ]
    };
  },
  data() {
    return {
      id: null,
      isp: null,
      lat: null,
      lng: null,
      type: null,
      img: null,
      name: null,
      email: null,
      success: false,
      failed: false,
      error: null
    };
  },
  methods: {
    async submit() {
      const data = {
        id: Number(this.id),
        isp: this.isp,
        position: { lat: Number(this.lat), lng: Number(this.lng) },
        type: this.type,
        img: this.img,
        username: this.name,
        email: this.email
      };
      try {
        if (this.type === "RURALCONNECT") data.type = "RURCON";
        const res = await axios({
          method: "post",
          url: "https://api.fttx.gr/api/v1/cabinets",
          headers: { "content-type": "application/json" },
          data
        });
        this.$toast.success(
          "Submitted! Thanks for submitting a new cabinet! It's pending approval now..."
        );
        this.error = res.data;
      } catch (e) {
        this.failed = true;
        this.$toast.error(
          "Uh-oh! Something went wrong while trying to submit a new Cabinet. Make sure you have actual coordinates."
        );
      }
    }
  },
  mounted() {
    if (localStorage.add) {
      const pos = JSON.parse(localStorage.add);
      this.lat = pos.lat;
      this.lng = pos.lng;
    }
  }
};
</script>
