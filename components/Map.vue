<template>
  <div>
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
    <GmapMap
      :center="myCoordinates"
      :zoom="zoom"
      class="w-full bg-gray-500 h-full"
      ref="mapRef"
      :options="options"
      @dragend="handleDrag"
    >
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      ></gmap-info-window>

      <!-- <cluster> -->
      <!-- <Gmap-Marker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
        @click="markerInfo(marker, index)"
      ></Gmap-Marker>-->
      <Gmap-Marker
        @dragend="updateCoordinates"
        v-if="this.place"
        @click="showInfo()"
        :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng()
        }"
        :draggable="true"
        :icon="{ url: require('../static/img/g-marker.png') }"
      ></Gmap-Marker>
      <!-- </cluster> -->
      <gmap-polygon :options="polygonOptions" :paths="paths"></gmap-polygon>
    </GmapMap>
    <!-- "top: 0; right: 0; width: calc(100% - 100px); position: absolute; z-index: 100" -->
    <div v-if="!hamburger" class="w-full flex justify-center autocomplete">
      <gmap-autocomplete
        placeholder="Type an address Ex. Filellinon 10, Athens, Greece"
        class="shadow appearance-none border rounded lg:w-2/6 xl:w-2/6 md:w-2/4 sm:w-3/4 w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        @place_changed="setPlace"
      ></gmap-autocomplete>
      <!-- Hidden till it's functional -->
      <button
        :disabled="!markedMarker"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
        :class="[markedMarker ? '' : 'opacity-50 cursor-not-allowed']"
        @click="addButton"
      >
        Add
      </button>
    </div>
    <div class="relative h-full w-full" v-if="!hamburger">
      <div class="absolute bottom-0 right-0 h-64 w-16" style="text-align: left">
        <button
          :disabled="!finishedLoading"
          @click="
            buttons.ote.isOn = !buttons.ote.isOn;
            showCabinets('ote');
            buttons.ote.isOn
              ? (buttons.ote.text = '✔ OTE')
              : (buttons.ote.text = 'OTE');
          "
          :class="[
            buttons.ote.isOn ? 'bg-blue-300' : 'bg-blue-700',
            finishedLoading ? '' : 'opacity-50 cursor-not-allowed'
          ]"
          style="position: fixed; z-index: 999; bottom: 600px"
          class="hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          <img :src="markerIcons.OTE" />
        </button>
        <button
          :disabled="!finishedLoading"
          @click="
            buttons.wind.isOn = !buttons.wind.isOn;
            showCabinets('wind');
            buttons.wind.isOn
              ? (buttons.wind.text = '✔ WIND')
              : (buttons.wind.text = 'WIND');
          "
          :class="[
            buttons.wind.isOn ? 'bg-blue-400' : 'bg-blue-500',
            finishedLoading ? '' : 'opacity-50 cursor-not-allowed'
          ]"
          style="position: fixed; z-index: 999; bottom: 550px"
          class="hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
        >
          <img :src="markerIcons.WIND" />
        </button>
        <button
          :disabled="!finishedLoading"
          @click="
            buttons.vf.isOn = !buttons.vf.isOn;
            showCabinets('vf');
            buttons.vf.isOn
              ? (buttons.vf.text = '✔ Vodafone')
              : (buttons.vf.text = 'Vodafone');
          "
          :class="[
            buttons.vf.isOn ? 'bg-red-300' : 'bg-red-700',
            finishedLoading ? '' : 'opacity-50 cursor-not-allowed'
          ]"
          style="position: fixed; z-index: 999; bottom: 500px"
          class="hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
        >
          <img :src="markerIcons.Vodafone" />
        </button>
        <button
          :disabled="!finishedLoading"
          @click="
            buttons.rurcon.isOn = !buttons.rurcon.isOn;
            showCabinets('rurcon');
            buttons.rurcon.isOn
              ? (buttons.rurcon.text = '✔')
              : (buttons.rurcon.text = '');
          "
          :class="[
            buttons.rurcon.isOn ? 'bg-orange-300' : 'bg-orange-800',
            finishedLoading ? '' : 'opacity-50 cursor-not-allowed'
          ]"
          style="position: fixed; z-index: 999; bottom: 450px"
          class="hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          <img :src="markerIcons.RURALCONNECT" />
        </button>
      </div>
    </div>

    <!-- <div v-if="debugging" style="z-index: 999;">
      <div
        style="max-width: 800px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between"
      >
        <div>
          <h1>Your coordinates:</h1>
          <p>{{ myCoordinates.lat }} Latitude, {{ myCoordinates.lng }} Longitude</p>
        </div>
        <div>
          <h1>Map coordinates:</h1>
          <p>
            {{ mapCoordinates.lat }} Latitude,
            {{ mapCoordinates.lng }} Longitude
          </p>
        </div>
      </div>
    </div>-->
    <div
      class="rounded relative h-48 w-36 left-2 invisible lg:visible xl:visible"
      style="position: relative; top: 250px; z-index: 999;"
    >
      <div
        class="rounded bg-white shadow-md h-48 w-36 p-6 flex flex-col justify-around justify-items-center"
      >
        <div>
          <p class="text-base text-gray-600 flex justify-center items-center">
            Cabinets
          </p>
        </div>
        <div>
          <p
            class="text-2xl text-gray-700 font-bold flex justify-center items-center"
          >
            <animated-number
              :value="numberOfCabinets"
              :duration="3000"
              round="1"
            />
          </p>
        </div>
        <div>
          <p class="text-base text-gray-600 flex justify-center items-center">
            Centers
          </p>
        </div>
        <div>
          <p
            class="text-2xl text-gray-700 font-bold flex justify-center items-center"
          >
            <animated-number
              :value="numberOfCenters"
              :duration="5000"
              round="1"
            />
          </p>
        </div>
      </div>
    </div>
    <div class="w-full text-base text-white flex justify-center email">
      hello@fttx.gr
    </div>
  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import AnimatedNumber from "animated-number-vue";
import axios from "axios";
import * as MarkerClusterer from "marker-clusterer-plus";
import { clusterStyle, mapStyle } from "../static/options";
import borders from "../static/borders";

export default {
  data() {
    return {
      isLoading: false,
      fullPage: true,
      map: null,
      myCoordinates: {
        lat: 37.9432,
        lng: 23.6709
      },
      zoom: 10,
      options: {
        styles: mapStyle
      },
      buttons: {
        ote: {
          isOn: false,
          text: "OTE"
        },
        wind: {
          isOn: false,
          text: "WIND"
        },
        vf: {
          isOn: false,
          text: "Vodafone"
        },
        rurcon: {
          isOn: false,
          text: "Rural Connect"
        }
      },
      numberOfCabinets: 0,
      numberOfCenters: 0,
      storedMarkers: [],
      markerCluster: null,
      debugging: true,
      paths: [],
      polygons: [],
      polygonOptions: {
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.01
      },
      markers: [],
      place: null,
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      openInfoWindow: null,
      infoOptions: {
        content: null,
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      markerIcons: {
        Vodafone: require("../static/img/vf-marker-minified.png"),
        OTE: require("../static/img/ote-marker-minified.png"),
        WIND: require("../static/img/wind-marker-minified.png"),
        RURALCONNECT: require("../static/img/rurcon-marker-minified.png")
      },
      markedMarker: null,
      hamburger: false,
      finishedLoading: false,
      cabinetQuery: null,
      dslam: null,
      cabinetData: null
    };
  },
  components: {
    Loading,
    AnimatedNumber
  },
  // SSR LOADING
  async fetch() {
    // DSLAM LOADING
    let dslam = await axios
      .get("https://api.fttx.gr/api/v1/centers?limit=0&approved=true")
      .then(r => r);

    this.dslam = dslam.data.data;
    this.numberOfCenters = dslam.data.data.length;

    // CABINET LOADING
    const initialize = async () => {
      const results = await axios
        .get(`https://api.fttx.gr/api/v1/cabinets?limit=0&approved=true`)
        .then(r => r);
      const cabinets = results.data.data.filter(d => d.type !== "DSLAM");
      this.numberOfCabinets = cabinets.length;
      this.cabinetData = cabinets;
    };
    await initialize();
  },
  created() {
    // does the user have a saved center? use it instead of the default
    if (localStorage.center) {
      this.myCoordinates = JSON.parse(localStorage.center);
    } else {
      // get user's coordinates from browser request
      this.$getLocation({})
        .then(coordinates => {
          this.myCoordinates = coordinates;
        })
        .catch(error => alert(error));
    }

    // does the user have a saved zoom? use it instead of the default
    if (localStorage.zoom) {
      this.zoom = parseInt(localStorage.zoom);
    }
  },
  async mounted() {
    this.isLoading = true;
    let ref = this;

    // add the map to a data object
    await this.$refs.mapRef.$mapPromise.then(map => (this.map = map));
    this.$root.$on("hamburgerState", state => {
      this.hamburger = state;
    });

    // cabinet query start
    if (process.client) {
      const cabQuery = "cabinet?id=";
      if (window.location.href.includes(cabQuery)) {
        const cabId = window.location.href.split(cabQuery)[1];
        let c = await axios
          .get(`https://api.fttx.gr/api/v1/cabinets/${cabId}`)
          .then(r => r);
        c = c.data.data;
        const marker = new google.maps.Marker({
          position: c.position,
          map: this.map,
          icon: this.markerIcons[c.isp]
        });
        marker.db = c;
        ref.infoWindow(marker);
        marker.addListener("click", function() {
          ref.infoWindow(marker);
        });
        this.myCoordinates = {
          lat: c.position.lat,
          lng: c.position.lng
        };
        this.zoom = 17;
        this.cabinetQuery = cabId;
      }
    }
    // cabinet query end
    this.dslam.forEach(d => {
      d.infoText = `NAME: <strong><b>${d.name}</b></strong><br>Center ID: <strong><b>${d.id}</b></strong><br>Center Database ID: ${d._id}`;
      const marker = new google.maps.Marker({
        position: d.position,
        map: this.map,
        icon: require("../static/img/ote-marker-center-minified.png")
      });
      marker.db = d;
      const infowindow = new google.maps.InfoWindow({
        content: d.infoText
      });
      marker.addListener("click", function() {
        this.showInfo;
        infowindow.open(this.map, marker);
      });
      this.markers.push(marker);
    });
    this.clusterMyMarkers();
    // DSLAM LOADING END -- POLYGON LOADING START
    borders.forEach(e => {
      let storedPoly = new google.maps.Polygon({
        paths: e[0],
        strokeColor: "#FFF",
        strokeOpacity: 0,
        strokeWeight: 2,
        fillColor: "#FFF",
        fillOpacity: 0,
        map: this.map
      });
      this.polygons.push(storedPoly);
      this.paths.push(e[0]);
    });
    this.isLoading = false;
    // POLYGON LOADING END -- LOAD EVERYTHING ELSE BUT INVISIBLE (NOTE: This part here is what causing the initial lag spike because there's just too much data. Working on it.)

    this.cabinetData.forEach(d => {
      // check if a cabinet is queried and if it's stored in cabinetQuery, exclude it from loading because it's already loaded.
      if (this.cabinetQuery && d._id === this.cabinetQuery) return;
      const marker = new google.maps.Marker({
        position: d.position,
        map: this.map,
        icon: this.markerIcons[d.isp]
      });
      marker.setVisible(false);
      marker.db = d;
      marker.addListener("click", function() {
        ref.infoWindow(marker);
      });
      this.markers.push(marker);
    });
    this.$toast.info("Loading cabinets...");
    this.storedMarkers.push("OTE");
    this.storedMarkers.push("Vodafone");
    this.storedMarkers.push("WIND");
    this.storedMarkers.push("RURALCONNECT");
    this.finishedLoading = true;
  },
  methods: {
    async showCabinets(cab) {
      let ref = this;
      const format = {
        ote: "OTE",
        wind: "WIND",
        vf: "Vodafone",
        rurcon: "RURALCONNECT"
      };

      if (this.buttons[cab].isOn) {
        let temp = [];
        if (this.storedMarkers.includes(format[cab])) {
          const c = this.markers.filter(m => m.db.isp === format[cab]);
          c.forEach(ca => {
            temp.push(ca);
            ca.setVisible(true);
          });
        } else {
          let c = await axios
            .get(
              `https://api.fttx.gr/api/v1/cabinets?isp=${format[cab]}&limit=0&approved=true`
            )
            .then(r => r);

          this.storedMarkers.push(format[cab]);
          c.data.data.forEach(d => {
            const dslams = this.markers.filter(d => d.db.type === "DSLAM");
            let ak;
            const marker = new google.maps.Marker({
              position: d.position,
              map: this.map,
              icon: this.markerIcons[format[cab]]
            });
            marker.db = d;
            marker.addListener("click", function() {
              ref.infoWindow(marker);
            });
            this.markers.push(marker);
            temp.push(marker);
          });
        }
        this.markerCluster.addMarkers(temp);
        this.$toast.success(`Loaded ${format[cab]} cabinets`);
        // this.clusterMyMarkers();
      }
      if (!this.buttons[cab].isOn) {
        let c = this.markers.filter(d => d.db.isp === format[cab]);
        c.forEach(ca => {
          ca.setVisible(false);
        });
        this.clusterMyMarkers("clear");
        this.$toast.warning(`Unloaded ${format[cab]} cabinets`);
      }
    },
    infoWindow(marker) {
      if (this.openInfoWindow) {
        this.openInfoWindow.close();
        this.openInfoWindow = null;
      }
      let ak;
      this.polygons.forEach(p => {
        if (
          google.maps.geometry.poly.containsLocation(marker.getPosition(), p)
        ) {
          this.markers.forEach(m => {
            if (m.db.name) {
              if (
                google.maps.geometry.poly.containsLocation(m.getPosition(), p)
              ) {
                ak = m;
              }
            }
          });
        }
      });
      const text = `Cabinet ID: <strong><b>${
        marker.db.id
      }</strong></b><br>ISP: <strong><b>${
        marker.db.isp
      }</strong></b><br>A/K: <strong><b>${
        ak ? ak.db.name : "Unknown"
      }</strong></b><br>Type: <strong><b>${
        marker.db.type
      }</strong></b><br>Cabinet Database ID: ${
        marker.db._id
      }<br><a style="font-weight: bold; color: purple;" target="_blank" href="${
        marker.db.img_url
      }">Click Here for image</a><br><a style="font-weight: bold; color: purple;" target="_blank" href="https://fttx.gr/cabinet?id=${
        marker.db._id
      }">URL to this Cabinet</a>`;
      const infowindow = new google.maps.InfoWindow({
        content: text
      });
      infowindow.open(this.map, marker);
      this.openInfoWindow = infowindow;
    },
    clusterMyMarkers(action = "default") {
      const clusterOptions = {
        gridSize: 40,
        maxZoom: 15
        // styles: clusterStyle,
      };
      if (action === "default") {
        if (!this.markerCluster) {
          this.markerCluster = new MarkerClusterer(
            this.map,
            this.markers.filter(d => d.visible === true),
            clusterOptions
          );
        } else {
          this.markerCluster.clearMarkers();
          this.markerCluster = null;
          this.markerCluster = new MarkerClusterer(
            this.map,
            this.markers.filter(d => d.visible === true),
            clusterOptions
          );
        }
      } else if (action === "clear") {
        this.markerCluster.removeMarkers(
          this.markers.filter(d => d.visible === false)
        );
      }
    },
    addButton() {
      if (this.markedMarker) {
        const pos = {
          lat: this.markedMarker.position.lat(),
          lng: this.markedMarker.position.lng()
        };
        localStorage.add = JSON.stringify(pos);
        this.$emit("setPage", "add");
      }
    },
    setDescription(description) {
      this.description = description;
    },
    setPlace(place) {
      this.myCoordinates = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      this.zoom = 18;
      this.place = place;
    },
    usePlace(place) {
      if (this.place) {
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng()
          },
          infoText: this.place.formatted_address
        });
        this.place = null;
      }
    },
    updateCoordinates(location) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ latLng: location.latLng }, (result, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          this.place = result[0];
        }
      });
      if (this.infoWinOpen) this.infoWinOpen = false;
    },
    handleDrag() {
      // get center and zoom level, store in localstorage
      let center = {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng()
      };
      let zoom = this.map.getZoom();

      localStorage.center = JSON.stringify(center);
      localStorage.zoom = zoom;
    },
    markerInfo(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoOptions.content = marker.infoText;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    showInfo() {
      const position = {
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng()
      };
      this.infoWindowPos = position;
      this.infoWinOpen = !this.infoWinOpen;

      var distances = [];
      var closest = -1;
      for (var i = 0; i < this.markers.length; i++) {
        var d = google.maps.geometry.spherical.computeDistanceBetween(
          this.markers[i].position,
          this.place.geometry.location
        );
        distances[i] = d;
        if (closest == -1 || d < distances[closest]) {
          closest = i;
        }
      }
      const cabinet = this.markers[closest];
      const dis = google.maps.geometry.spherical.computeDistanceBetween(
        this.markers[closest].position,
        this.place.geometry.location
      );

      this.infoOptions.content = `<a style="color: purple">Closest cabinet is <strong><b>${dis.toFixed(
        2
      )} meters</b></strong> away<br>ISP: <strong><b>${
        cabinet.db.isp
      }</b></strong><br>Type: <strong><b>${
        cabinet.db.type
      }</strong></b><br>Cabinet ID: <strong><b>${
        cabinet.db.id
      }</strong></b><br>Cabinet Database ID: ${
        cabinet.db._id
      }<br>Address of Cabinet: ${cabinet.db.address.full}</a>`;
      this.markedMarker = cabinet;
    }
  },
  computed: {
    mapCoordinates() {
      if (!this.map) {
        return {
          lat: 0,
          lng: 0
        };
      }

      return {
        lat: this.map
          .getCenter()
          .lat()
          .toFixed(4),
        lng: this.map
          .getCenter()
          .lng()
          .toFixed(4)
      };
    }
  },
  async created() {
    const ref = this;
    //
  }
};
</script>

<style scoped lang="postcss">
.vue-map-container {
  position: fixed;
}
.autocomplete {
  position: absolute;
  top: 70px;
  z-index: 999;
}
.email {
  position: absolute;
  bottom: 0px;
  z-index: 0;
}
</style>
