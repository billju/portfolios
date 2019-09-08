<template>
  <div ref="container" class="container">
    <!-- <freecell :steps="['送出訂單','付款方式','完成訂單']" :index="0" background="#00bcd4"/> -->
    <waveform :audioContext="ctx" :input="this.biquadFilter"/>
    <spectrum :audioContext="ctx" :input="this.biquadFilter"/>
    <osc ref="osc" :adsr="{a:0,d:1,s:0.5,r:0.5}" :audioContext="ctx" :detune="detune" :volume="0.2" :output="this.masterGain"/>
    <pianokey @oscStart="oscStart" @oscStop="oscStop"/>
    <knob label="detune" :container="container" :min="-100" :max="100" v-model="detune" @input="oscMod()"/>
    <knob label="volume" :container="container" :min="0" :max="1" @input="masterGain.gain.value=$event"/>
    <knob label="filter" :container="container" :min="5" :max="14" v-model="pow" @input="biquadFilter.frequency.value=Math.pow(2,$event)"/>
    <div ref="map" id="map"></div>
  </div>
</template>

<script>
import pianokey from '~/components/synth.key.vue'
import osc from '~/components/synth.osc.vue'
import waveform from '~/components/synth.waveform.vue'
import spectrum from '~/components/synth.spectrum.vue'
import knob from '~/components/synth.knob.vue'
import {EzMap,TileLayer} from '~/plugins/ezmap.js'

export default {
  components: {
     waveform,spectrum,osc,pianokey,knob
  },
  data(){
    return{
      ctx: {}, masterGain:{}, biquadFilter:{}, container: null, detune: 0, pow: 14,
    }
  },
  methods: {
    oscStart(freq){
      this.$refs.osc.oscStart(freq)
    },
    oscStop(freq){
      this.$refs.osc.oscStop(freq)
    },
    oscMod(){
      this.$refs.osc.modulate()
    },
  },
  beforeMount(){
    this.ctx = new (window.AudioContext || window.webkitAudioContext)()
    this.masterGain = this.ctx.createGain()
    this.biquadFilter = this.ctx.createBiquadFilter()
    this.masterGain.connect(this.biquadFilter)
    this.biquadFilter.connect(this.ctx.destination)
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
