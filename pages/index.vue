<template>
<div class="bg-dark">
    <div ref="map" id="map"></div>
    <navbar/>
</div>
</template>

<script>
import {EzMap,TileLayer} from '~/plugins/ezmap.js'
import navbar from '~/components/navbar.vue'

export default {
  components: {
     navbar
  },
  data(){
    return{
      
    }
  },
  methods: {
    
  },
  mounted(){
    let map = new EzMap(this.$refs.map,{})
    map.addLayer(new TileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP/default/EPSG:3857/EPSG:3857:{z}/{y}/{x}',{maxZoom:15}))
  }
}
</script>

<style>
*{
  font-family: 微軟正黑體;
}
body{
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
#map{
  width: 100%;
  height: 100vh;
}
.bg-dark{
  padding-top: 50px;
  background: #222;
}
</style>
