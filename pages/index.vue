<template>
  <div ref="container" class="container">
    <!-- <freecell :steps="['送出訂單','付款方式','完成訂單']" :index="0" background="#00bcd4"/> -->
    <!-- <waveform :audioContext="ctx" :input="this.masterGain"/>
    <osc ref="osc" :adsr="{a:0,d:1,s:0.5,r:0.5}" :audioContext="ctx" :output="this.masterGain"/>
    <pianokey @oscStart="oscStart" @oscStop="oscStop"/>
    <knob ref="knob" label="volume" :container="container"/> -->
    <div ref="map" id="map"></div>
  </div>
</template>

<script>
import freecell from '~/components/carousel.vue'
import pianokey from '~/components/synth.key.vue'
import osc from '~/components/synth.osc.vue'
import waveform from '~/components/synth.spectrum.vue'
import knob from '~/components/synth.knob.vue'
import {EzMap,TileLayer} from '~/plugins/ezmap.js'

export default {
  components: {
    freecell, waveform,osc,pianokey,knob
  },
  data(){
    return{
      ctx: {}, masterGain: {}, container: null,
    }
  },
  methods: {
    oscStart(freq){
      this.$refs.osc.oscStart(freq)
    },
    oscStop(freq){
      this.$refs.osc.oscStop(freq)
    },
  },
  beforeMount(){
    this.ctx = new (window.AudioContext || window.webkitAudioContext)()
    this.masterGain = this.ctx.createGain()
    this.masterGain.connect(this.ctx.destination)
  },
  mounted(){
    this.container = this.$refs.container
    // let map = new EzMap(this.$refs.map,{})
    // map.addLayer(new TileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP/default/EPSG:3857/EPSG:3857:{z}/{y}/{x}',{maxZoom:15}))
  }
}
</script>

<style>
*{
  font-family: 微軟正黑體;
}
#map{
  width: 100%;
  height: 100vh;
}
body{
  margin: 0;
  padding: 0;
  background: #222;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  padding: 0;
}

</style>
