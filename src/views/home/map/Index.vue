<template>
  <van-row class="index">
    <van-row>
      <img src="@/assets/image/index.png" />
      <div class="img_button2" @click="goIndex3"></div>
      <div class="img_button3" @click="goIndex2"></div>
    </van-row>
    <van-row class="search flex flex_align_center">
      <van-row class="search_input flex flex_align_center">
        <van-icon name="arrow-left" />
        <van-field v-model="keywords" placeholder="请输入用户名" />
        <span class="search_text">筛选</span>
      </van-row>
      <van-row class="search_icon flex flex_align_center" @click="showInput">
        <van-icon name="search" />
      </van-row>
    </van-row>
    <!-- <baidu-map
      class="baidu_map_view"
      :center="center"
      :zoom="zoom"
      :mapStyle="mapStyle"
      @ready="handler"
    ></baidu-map>-->
  </van-row>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      keywords: "",
      center: { lng: 0, lat: 0 },
      zoom: 11,
      mapStyle: {
        styleJson: [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              color: "#ccd6d7ff"
            }
          },
          {
            featureType: "green",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              color: "#dee5e5ff"
            }
          },
          {
            featureType: "building",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "building",
            elementType: "geometry.fill",
            stylers: {
              color: "#d1dbdbff"
            }
          },
          {
            featureType: "building",
            elementType: "geometry.stroke",
            stylers: {
              color: "#aab6b6ff"
            }
          },
          {
            featureType: "subwaystation",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              color: "#888fa0ff"
            }
          },
          {
            featureType: "education",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              color: "#e1e7e7ff"
            }
          },
          {
            featureType: "medical",
            elementType: "geometry",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "scenicspots",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              color: "#d1dbdbff"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              weight: 4
            }
          },
          {
            featureType: "highway",
            elementType: "geometry.fill",
            stylers: {
              color: "#ffffffff"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#cacfcfff"
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "highway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999ff"
            }
          },
          {
            featureType: "highway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff"
            }
          },
          {
            featureType: "highway",
            elementType: "labels.icon",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry",
            stylers: {
              visibility: "on",
              weight: 2
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry.fill",
            stylers: {
              color: "#fbfffeff"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry.stroke",
            stylers: {
              color: "#cacfcfff"
            }
          },
          {
            featureType: "arterial",
            elementType: "labels",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "arterial",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999ff"
            }
          },
          {
            featureType: "arterial",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff"
            }
          },
          {
            featureType: "local",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              weight: 1
            }
          },
          {
            featureType: "local",
            elementType: "geometry.fill",
            stylers: {
              color: "#fbfffeff"
            }
          },
          {
            featureType: "local",
            elementType: "geometry.stroke",
            stylers: {
              color: "#cacfcfff"
            }
          },
          {
            featureType: "local",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "local",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999ff"
            }
          },
          {
            featureType: "local",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff"
            }
          },
          {
            featureType: "railway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              weight: 1
            }
          },
          {
            featureType: "railway",
            elementType: "geometry.fill",
            stylers: {
              color: "#9494941a"
            }
          },
          {
            featureType: "railway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#ffffff1a"
            }
          },
          {
            featureType: "subway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              weight: 1
            }
          },
          {
            featureType: "subway",
            elementType: "geometry.fill",
            stylers: {
              color: "#c3bed433"
            }
          },
          {
            featureType: "subway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#ffffff33"
            }
          },
          {
            featureType: "subway",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "subway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#979c9aff"
            }
          },
          {
            featureType: "subway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff"
            }
          },
          {
            featureType: "continent",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "continent",
            elementType: "labels.icon",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "continent",
            elementType: "labels.text.fill",
            stylers: {
              color: "#333333ff"
            }
          },
          {
            featureType: "continent",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff"
            }
          },
          {
            featureType: "city",
            elementType: "labels.icon",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "city",
            elementType: "labels",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "city",
            elementType: "labels.text.fill",
            stylers: {
              color: "#454d50ff"
            }
          },
          {
            featureType: "city",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff"
            }
          },
          {
            featureType: "town",
            elementType: "labels.icon",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "town",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "town",
            elementType: "labels.text.fill",
            stylers: {
              color: "#454d50ff"
            }
          },
          {
            featureType: "town",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff"
            }
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: {
              color: "#fbfffeff"
            }
          },
          {
            featureType: "poilabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "districtlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "poilabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999ff"
            }
          },
          {
            featureType: "districtlabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#888fa0ff"
            }
          },
          {
            featureType: "transportation",
            elementType: "geometry",
            stylers: {
              color: "#d1dbdbff",
              visibility: "off"
            }
          },
          {
            featureType: "companylabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "restaurantlabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "lifeservicelabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "carservicelabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "financelabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "otherlabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "village",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "district",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "land",
            elementType: "geometry",
            stylers: {
              color: "#edf3f3ff"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#cacfcfff"
            }
          },
          {
            featureType: "provincialway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#cacfcfff"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#cacfcfff"
            }
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: {
              color: "#cacfcfff"
            }
          },
          {
            featureType: "subwaylabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "subwaylabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "tertiarywaysign",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "tertiarywaysign",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "provincialwaysign",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "provincialwaysign",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "nationalwaysign",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "nationalwaysign",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "highwaysign",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "highwaysign",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry.fill",
            stylers: {
              color: "#fbfffeff"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999ff"
            }
          },
          {
            featureType: "provincialway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999ff"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999ff"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff"
            }
          },
          {
            featureType: "highway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "6"
            }
          },
          {
            featureType: "highway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "7"
            }
          },
          {
            featureType: "highway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "8"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "6"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "7"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "8"
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "6"
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "7"
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "8"
            }
          },
          {
            featureType: "nationalway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "6"
            }
          },
          {
            featureType: "nationalway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "7"
            }
          },
          {
            featureType: "nationalway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "8"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "6"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "7"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "8"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "6"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "7"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "8"
            }
          },
          {
            featureType: "provincialway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "8,8",
              level: "8"
            }
          },
          {
            featureType: "provincialway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "8,8",
              level: "8"
            }
          },
          {
            featureType: "provincialway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "8,8",
              level: "8"
            }
          },
          {
            featureType: "cityhighway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "6"
            }
          },
          {
            featureType: "cityhighway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "7"
            }
          },
          {
            featureType: "cityhighway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "8"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "6"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "7"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "8"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "6"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "7"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,8",
              level: "8"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry.fill",
            stylers: {
              color: "#fbfffeff"
            }
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: {
              color: "#8f5a33ff"
            }
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff"
            }
          },
          {
            featureType: "country",
            elementType: "labels.text.fill",
            stylers: {
              color: "#8f5a33ff"
            }
          },
          {
            featureType: "country",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff"
            }
          },
          {
            featureType: "country",
            elementType: "labels.text",
            stylers: {
              fontsize: 28
            }
          },
          {
            featureType: "manmade",
            elementType: "geometry",
            stylers: {
              color: "#dfe7e7ff",
              visibility: "off"
            }
          },
          {
            featureType: "provincialway",
            elementType: "geometry.fill",
            stylers: {
              color: "#fbfffeff"
            }
          },
          {
            featureType: "tertiaryway",
            elementType: "geometry.fill",
            stylers: {
              color: "#fbfffeff"
            }
          },
          {
            featureType: "manmade",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999ff"
            }
          },
          {
            featureType: "manmade",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff"
            }
          },
          {
            featureType: "scenicspots",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999ff"
            }
          },
          {
            featureType: "scenicspots",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff"
            }
          },
          {
            featureType: "airportlabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999ff"
            }
          },
          {
            featureType: "airportlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "scenicspotslabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999ff"
            }
          },
          {
            featureType: "scenicspotslabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "educationlabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999ff"
            }
          },
          {
            featureType: "educationlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "medicallabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999ff"
            }
          },
          {
            featureType: "medicallabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "companylabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "restaurantlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "hotellabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "hotellabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "shoppinglabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "shoppinglabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "lifeservicelabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "carservicelabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "transportationlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "transportationlabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "financelabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "entertainment",
            elementType: "geometry",
            stylers: {
              color: "#d1dbdbff",
              visibility: "off"
            }
          },
          {
            featureType: "estate",
            elementType: "geometry",
            stylers: {
              color: "#d1dbdbff",
              visibility: "off"
            }
          },
          {
            featureType: "shopping",
            elementType: "geometry",
            stylers: {
              color: "#d1dbdbff",
              visibility: "off"
            }
          },
          {
            featureType: "education",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999ff"
            }
          },
          {
            featureType: "education",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff"
            }
          },
          {
            featureType: "medical",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff"
            }
          },
          {
            featureType: "transportation",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999ff"
            }
          },
          {
            featureType: "transportation",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff"
            }
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "manmade",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "water",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "education",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "scenicspots",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "transportation",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "provincialway",
            elementType: "geometry",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "provincialway",
            elementType: "labels",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "scenicspotsway",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "universityway",
            elementType: "geometry",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "vacationway",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "roadarrow",
            elementType: "labels.icon",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "airportlabel",
            elementType: "labels",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "scenicspotslabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "educationlabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "entertainmentlabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "entertainmentlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "estatelabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "estatelabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "businesstowerlabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "businesstowerlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "governmentlabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "governmentlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "local",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          }
        ]
        // styleJson: [
        //   {
        //     featureType: "water",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       color: "#ccd6d7ff"
        //     }
        //   },
        //   {
        //     featureType: "green",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       color: "#dee5e5ff"
        //     }
        //   },
        //   {
        //     featureType: "building",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "building",
        //     elementType: "geometry.fill",
        //     stylers: {
        //       color: "#d1dbdbff"
        //     }
        //   },
        //   {
        //     featureType: "building",
        //     elementType: "geometry.stroke",
        //     stylers: {
        //       color: "#aab6b6ff"
        //     }
        //   },
        //   {
        //     featureType: "subwaystation",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       color: "#888fa0ff"
        //     }
        //   },
        //   {
        //     featureType: "education",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       color: "#e1e7e7ff"
        //     }
        //   },
        //   {
        //     featureType: "medical",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "on"
        //     }
        //   },
        //   {
        //     featureType: "scenicspots",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       color: "#d1dbdbff"
        //     }
        //   },
        //   {
        //     featureType: "highway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       weight: 4
        //     }
        //   },
        //   {
        //     featureType: "highway",
        //     elementType: "geometry.fill",
        //     stylers: {
        //       color: "#ffffffff"
        //     }
        //   },
        //   {
        //     featureType: "highway",
        //     elementType: "geometry.stroke",
        //     stylers: {
        //       color: "#cacfcfff"
        //     }
        //   },
        //   {
        //     featureType: "highway",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "highway",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#999999ff"
        //     }
        //   },
        //   {
        //     featureType: "highway",
        //     elementType: "labels.text.stroke",
        //     stylers: {
        //       color: "#ffffffff"
        //     }
        //   },
        //   {
        //     featureType: "highway",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "on"
        //     }
        //   },
        //   {
        //     featureType: "arterial",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "on",
        //       weight: 2
        //     }
        //   },
        //   {
        //     featureType: "arterial",
        //     elementType: "geometry.fill",
        //     stylers: {
        //       color: "#fbfffeff"
        //     }
        //   },
        //   {
        //     featureType: "arterial",
        //     elementType: "geometry.stroke",
        //     stylers: {
        //       color: "#cacfcfff"
        //     }
        //   },
        //   {
        //     featureType: "arterial",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "on"
        //     }
        //   },
        //   {
        //     featureType: "arterial",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#999999ff"
        //     }
        //   },
        //   {
        //     featureType: "arterial",
        //     elementType: "labels.text.stroke",
        //     stylers: {
        //       color: "#ffffffff"
        //     }
        //   },
        //   {
        //     featureType: "local",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       weight: 1
        //     }
        //   },
        //   {
        //     featureType: "local",
        //     elementType: "geometry.fill",
        //     stylers: {
        //       color: "#fbfffeff"
        //     }
        //   },
        //   {
        //     featureType: "local",
        //     elementType: "geometry.stroke",
        //     stylers: {
        //       color: "#cacfcfff"
        //     }
        //   },
        //   {
        //     featureType: "local",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "local",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#999999ff"
        //     }
        //   },
        //   {
        //     featureType: "local",
        //     elementType: "labels.text.stroke",
        //     stylers: {
        //       color: "#ffffffff"
        //     }
        //   },
        //   {
        //     featureType: "railway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       weight: 1
        //     }
        //   },
        //   {
        //     featureType: "railway",
        //     elementType: "geometry.fill",
        //     stylers: {
        //       color: "#9494941a"
        //     }
        //   },
        //   {
        //     featureType: "railway",
        //     elementType: "geometry.stroke",
        //     stylers: {
        //       color: "#ffffff1a"
        //     }
        //   },
        //   {
        //     featureType: "subway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       weight: 1
        //     }
        //   },
        //   {
        //     featureType: "subway",
        //     elementType: "geometry.fill",
        //     stylers: {
        //       color: "#c3bed433"
        //     }
        //   },
        //   {
        //     featureType: "subway",
        //     elementType: "geometry.stroke",
        //     stylers: {
        //       color: "#ffffff33"
        //     }
        //   },
        //   {
        //     featureType: "subway",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "subway",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#979c9aff"
        //     }
        //   },
        //   {
        //     featureType: "subway",
        //     elementType: "labels.text.stroke",
        //     stylers: {
        //       color: "#ffffffff"
        //     }
        //   },
        //   {
        //     featureType: "continent",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "continent",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "on"
        //     }
        //   },
        //   {
        //     featureType: "continent",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#333333ff"
        //     }
        //   },
        //   {
        //     featureType: "continent",
        //     elementType: "labels.text.stroke",
        //     stylers: {
        //       color: "#ffffffff"
        //     }
        //   },
        //   {
        //     featureType: "city",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "on"
        //     }
        //   },
        //   {
        //     featureType: "city",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "on"
        //     }
        //   },
        //   {
        //     featureType: "city",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#454d50ff"
        //     }
        //   },
        //   {
        //     featureType: "city",
        //     elementType: "labels.text.stroke",
        //     stylers: {
        //       color: "#ffffffff"
        //     }
        //   },
        //   {
        //     featureType: "town",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "on"
        //     }
        //   },
        //   {
        //     featureType: "town",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "town",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#454d50ff"
        //     }
        //   },
        //   {
        //     featureType: "town",
        //     elementType: "labels.text.stroke",
        //     stylers: {
        //       color: "#ffffffff"
        //     }
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "geometry.fill",
        //     stylers: {
        //       color: "#fbfffeff"
        //     }
        //   },
        //   {
        //     featureType: "poilabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "districtlabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "poilabel",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#999999ff"
        //     }
        //   },
        //   {
        //     featureType: "districtlabel",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#888fa0ff"
        //     }
        //   },
        //   {
        //     featureType: "transportation",
        //     elementType: "geometry",
        //     stylers: {
        //       color: "#d1dbdbff",
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "companylabel",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "restaurantlabel",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "lifeservicelabel",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "carservicelabel",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "financelabel",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "otherlabel",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "village",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "district",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "land",
        //     elementType: "geometry",
        //     stylers: {
        //       color: "#edf3f3ff"
        //     }
        //   },
        //   {
        //     featureType: "nationalway",
        //     elementType: "geometry.stroke",
        //     stylers: {
        //       color: "#cacfcfff"
        //     }
        //   },
        //   {
        //     featureType: "provincialway",
        //     elementType: "geometry.stroke",
        //     stylers: {
        //       color: "#cacfcfff"
        //     }
        //   },
        //   {
        //     featureType: "cityhighway",
        //     elementType: "geometry.stroke",
        //     stylers: {
        //       color: "#cacfcfff"
        //     }
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "geometry.stroke",
        //     stylers: {
        //       color: "#cacfcfff"
        //     }
        //   },
        //   {
        //     featureType: "subwaylabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "subwaylabel",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "tertiarywaysign",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "tertiarywaysign",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "provincialwaysign",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "provincialwaysign",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "nationalwaysign",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "nationalwaysign",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "highwaysign",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "highwaysign",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "nationalway",
        //     elementType: "geometry.fill",
        //     stylers: {
        //       color: "#fbfffeff"
        //     }
        //   },
        //   {
        //     featureType: "nationalway",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#999999ff"
        //     }
        //   },
        //   {
        //     featureType: "provincialway",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#999999ff"
        //     }
        //   },
        //   {
        //     featureType: "cityhighway",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#999999ff"
        //     }
        //   },
        //   {
        //     featureType: "cityhighway",
        //     elementType: "labels.text.stroke",
        //     stylers: {
        //       color: "#ffffffff"
        //     }
        //   },
        //   {
        //     featureType: "highway",
        //     stylers: {
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "6"
        //     }
        //   },
        //   {
        //     featureType: "highway",
        //     stylers: {
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "7"
        //     }
        //   },
        //   {
        //     featureType: "highway",
        //     stylers: {
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "8"
        //     }
        //   },
        //   {
        //     featureType: "highway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "6"
        //     }
        //   },
        //   {
        //     featureType: "highway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "7"
        //     }
        //   },
        //   {
        //     featureType: "highway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "8"
        //     }
        //   },
        //   {
        //     featureType: "highway",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "6"
        //     }
        //   },
        //   {
        //     featureType: "highway",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "7"
        //     }
        //   },
        //   {
        //     featureType: "highway",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "8"
        //     }
        //   },
        //   {
        //     featureType: "nationalway",
        //     stylers: {
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "6"
        //     }
        //   },
        //   {
        //     featureType: "nationalway",
        //     stylers: {
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "7"
        //     }
        //   },
        //   {
        //     featureType: "nationalway",
        //     stylers: {
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "8"
        //     }
        //   },
        //   {
        //     featureType: "nationalway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "6"
        //     }
        //   },
        //   {
        //     featureType: "nationalway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "7"
        //     }
        //   },
        //   {
        //     featureType: "nationalway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "8"
        //     }
        //   },
        //   {
        //     featureType: "nationalway",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "6"
        //     }
        //   },
        //   {
        //     featureType: "nationalway",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "7"
        //     }
        //   },
        //   {
        //     featureType: "nationalway",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "8"
        //     }
        //   },
        //   {
        //     featureType: "provincialway",
        //     stylers: {
        //       curZoomRegionId: "0",
        //       curZoomRegion: "8,8",
        //       level: "8"
        //     }
        //   },
        //   {
        //     featureType: "provincialway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "8,8",
        //       level: "8"
        //     }
        //   },
        //   {
        //     featureType: "provincialway",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "8,8",
        //       level: "8"
        //     }
        //   },
        //   {
        //     featureType: "cityhighway",
        //     stylers: {
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "6"
        //     }
        //   },
        //   {
        //     featureType: "cityhighway",
        //     stylers: {
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "7"
        //     }
        //   },
        //   {
        //     featureType: "cityhighway",
        //     stylers: {
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "8"
        //     }
        //   },
        //   {
        //     featureType: "cityhighway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "6"
        //     }
        //   },
        //   {
        //     featureType: "cityhighway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "7"
        //     }
        //   },
        //   {
        //     featureType: "cityhighway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "8"
        //     }
        //   },
        //   {
        //     featureType: "cityhighway",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "6"
        //     }
        //   },
        //   {
        //     featureType: "cityhighway",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "7"
        //     }
        //   },
        //   {
        //     featureType: "cityhighway",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off",
        //       curZoomRegionId: "0",
        //       curZoomRegion: "6,8",
        //       level: "8"
        //     }
        //   },
        //   {
        //     featureType: "cityhighway",
        //     elementType: "geometry.fill",
        //     stylers: {
        //       color: "#fbfffeff"
        //     }
        //   },
        //   {
        //     featureType: "water",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#8f5a33ff"
        //     }
        //   },
        //   {
        //     featureType: "water",
        //     elementType: "labels.text.stroke",
        //     stylers: {
        //       color: "#ffffffff"
        //     }
        //   },
        //   {
        //     featureType: "country",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#8f5a33ff"
        //     }
        //   },
        //   {
        //     featureType: "country",
        //     elementType: "labels.text.stroke",
        //     stylers: {
        //       color: "#ffffffff"
        //     }
        //   },
        //   {
        //     featureType: "country",
        //     elementType: "labels.text",
        //     stylers: {
        //       fontsize: 28
        //     }
        //   },
        //   {
        //     featureType: "manmade",
        //     elementType: "geometry",
        //     stylers: {
        //       color: "#dfe7e7ff",
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "provincialway",
        //     elementType: "geometry.fill",
        //     stylers: {
        //       color: "#fbfffeff"
        //     }
        //   },
        //   {
        //     featureType: "tertiaryway",
        //     elementType: "geometry.fill",
        //     stylers: {
        //       color: "#fbfffeff"
        //     }
        //   },
        //   {
        //     featureType: "manmade",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#999999ff"
        //     }
        //   },
        //   {
        //     featureType: "manmade",
        //     elementType: "labels.text.stroke",
        //     stylers: {
        //       color: "#ffffffff"
        //     }
        //   },
        //   {
        //     featureType: "scenicspots",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#999999ff"
        //     }
        //   },
        //   {
        //     featureType: "scenicspots",
        //     elementType: "labels.text.stroke",
        //     stylers: {
        //       color: "#ffffffff"
        //     }
        //   },
        //   {
        //     featureType: "airportlabel",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#999999ff"
        //     }
        //   },
        //   {
        //     featureType: "airportlabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "on"
        //     }
        //   },
        //   {
        //     featureType: "scenicspotslabel",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#999999ff"
        //     }
        //   },
        //   {
        //     featureType: "scenicspotslabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "educationlabel",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#999999ff"
        //     }
        //   },
        //   {
        //     featureType: "educationlabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "medicallabel",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#999999ff"
        //     }
        //   },
        //   {
        //     featureType: "medicallabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "on"
        //     }
        //   },
        //   {
        //     featureType: "companylabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "restaurantlabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "hotellabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "hotellabel",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "shoppinglabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "shoppinglabel",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "lifeservicelabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "carservicelabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "transportationlabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "transportationlabel",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "financelabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "entertainment",
        //     elementType: "geometry",
        //     stylers: {
        //       color: "#d1dbdbff",
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "estate",
        //     elementType: "geometry",
        //     stylers: {
        //       color: "#d1dbdbff",
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "shopping",
        //     elementType: "geometry",
        //     stylers: {
        //       color: "#d1dbdbff",
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "education",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#999999ff"
        //     }
        //   },
        //   {
        //     featureType: "education",
        //     elementType: "labels.text.stroke",
        //     stylers: {
        //       color: "#ffffffff"
        //     }
        //   },
        //   {
        //     featureType: "medical",
        //     elementType: "labels.text.stroke",
        //     stylers: {
        //       color: "#ffffffff"
        //     }
        //   },
        //   {
        //     featureType: "transportation",
        //     elementType: "labels.text.fill",
        //     stylers: {
        //       color: "#999999ff"
        //     }
        //   },
        //   {
        //     featureType: "transportation",
        //     elementType: "labels.text.stroke",
        //     stylers: {
        //       color: "#ffffffff"
        //     }
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "manmade",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "water",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "education",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "scenicspots",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "transportation",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "nationalway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "nationalway",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "provincialway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "provincialway",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "cityhighway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "cityhighway",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "scenicspotsway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "universityway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "vacationway",
        //     elementType: "geometry",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "roadarrow",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "on"
        //     }
        //   },
        //   {
        //     featureType: "airportlabel",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "on"
        //     }
        //   },
        //   {
        //     featureType: "scenicspotslabel",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "educationlabel",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "entertainmentlabel",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "entertainmentlabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "estatelabel",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "estatelabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "businesstowerlabel",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "businesstowerlabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "governmentlabel",
        //     elementType: "labels",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   },
        //   {
        //     featureType: "governmentlabel",
        //     elementType: "labels.icon",
        //     stylers: {
        //       visibility: "off"
        //     }
        //   }
        // ]
      }
    };
  },
  created() {},
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 121.533818364278;
      this.center.lat = 31.3154308373997;
      this.zoom = 15;
    },
    goIndex2() {
      this.$router.push({ path: "/home/index2" });
    },
    goIndex3() {
      this.$router.push({ path: "/home/Children" });
    },

    // 搜索图标点击事件
    showInput() {}
  }
};
</script>
<style>
.search .van-cell:not(:last-child)::after {
  border-bottom: none;
}
</style>
<style scoped>
.index img {
  width: 100vw;
  height: 98vh;
}
.img_button2 {
  width: 30vw;
  height: 10vw;
  /* border: 1px solid #333; */
  position: absolute;
  top: 42vh;
  left: 30vw;
}
.img_button3 {
  width: 30vw;
  height: 10vw;
  /* border: 1px solid #333; */
  position: absolute;
  top: 17vh;
  right: 3vw;
}
.index {
  position: relative;
}
.baidu_map_view {
  width: 100%;
  height: 99.9vh;
}
.BMap_stdMpPan,
.BMap_stdMpZoom .BMap_button,
.BMap_stdMpSliderBgTop,
.BMap_stdMpSliderBar,
.BMap_stdMpSliderBgBot,
.anchorBL {
  width: 0 !important;
  height: 0 !important;
}

/* 搜索开始 */
.search {
  position: fixed;
  top: 3.5rem;
  right: 1rem;
  /* left: 0.5rem; */
  height: 2rem;
  /* background: #fff; */
  border-radius: 0.25rem;
}
.search_icon {
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  background: #fff;
  justify-content: center;
  margin-left: 0.3rem;
}
.search_icon .van-icon {
  font-size: 1.2rem;
  font-weight: bold;
  color: #3399ff;
}
.search_input {
  /* width: 78vw; */
  width: calc(100vw - 4rem);
  display: none;
}
.search_input .van-icon {
  color: #a8aec1;
}
.search_input .van-cell {
  font-size: 0.625rem;
  border-bottom: none;
}
.search_text {
  width: 3rem;
  border-right: 1px solid #ccc;
  padding-right: 0.3rem;

  font-size: 0.625rem;
}
</style>
