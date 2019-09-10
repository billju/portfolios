<template>
<div class="psr">
    <svg style="width:0;height:0">
      <linearGradient id="gradient" y1="1" y2="0">
        <stop offset="0%" stop-color="#447799"></stop>
        <stop offset="100%" stop-color="#112266"></stop>
      </linearGradient>
    </svg>
    <svg ref="sine" class="waveform" viewbox="0 0 100 100" @click="setMarker('sine')">
      <path d="M20 50 Q35 0,50 50 Q65 100,80 50" fill="url(#gradient)"></path>
    </svg>
    <svg ref="square" class="waveform" viewbox="0 0 100 100" @click="setMarker('square')">
      <polyline points="20,70 20,30 50,30 50,70 80,70 80,30" fill="url(#gradient)"></polyline>
    </svg>
    <svg ref="pulse" class="waveform" viewbox="0 0 100 100" @click="setMarker('pulse')">
      <polyline points="20,60 35,30 50,30 50,70 80,70 80,30" fill="url(#gradient)"></polyline>
    </svg>
    <svg ref="triangle" class="waveform" viewbox="0 0 100 100" @click="setMarker('triangle')">
      <polyline points="20,50 35,30 65,70 80,50" fill="url(#gradient)"></polyline>
    </svg>
    <svg ref="sawtooth" class="waveform" viewbox="0 0 100 100" @click="setMarker('sawtooth')">
      <polyline points="20,65 50,30 50,70 80,35" fill="url(#gradient)"></polyline>
    </svg>
    <svg ref="random" class="waveform" viewbox="0 0 100 100" @click="setMarker('random')">
      <rect x="25" y="25" rx="10" ry="10" width="50" height="50"></rect>
      <circle cx="60" cy="40" r="4"></circle>
      <circle cx="50" cy="50" r="4"></circle>
      <circle cx="40" cy="60" r="4"></circle>
    </svg>
    <div class="square-marker" :style="markerStyle"></div>
</div>
</template>

<script>
export default {
    name: 'osc',
    props: {
      'audioContext':{},
      'detune':{type:Number,default:0},
      'adsr':{type:Object},
      'output': {}
    },
    data(){
      return{
        type:'sine', markerStyle: {}, osc: {}, gainNode: {},
      }
    },
    methods: {
        oscStart(freq){
            // refresh queue
            let now = this.audioContext.currentTime,
                osc = this.osc
            this.gainNode[freq] = this.createGainNode(now)
            // ensure osc.freq is stopped
            if(freq in this.osc){this.osc[freq].stop(now)}
            // create waveform
            if(this.type=='random'){
                var sampleRate = this.audioContext.sampleRate
                var bufferSize = 2 * sampleRate;
                var noiseBuffer = this.audioContext.createBuffer(1, bufferSize, sampleRate);
                var output = noiseBuffer.getChannelData(0);
                for (var i = 0; i < bufferSize; i++) {output[i] = Math.random() * 2 - 1}
                var whiteNoise = this.audioContext.createBufferSource();
                whiteNoise.buffer = noiseBuffer;
                whiteNoise.loop = true;
                this.osc[freq] = whiteNoise
            }else{
                this.osc[freq] = this.audioContext.createOscillator()
                if(this.type=='pulse'){
                    var powerDownArray = Array.from(Array(30).keys(),x=>1/(1+x));
                    var real = new Float32Array(powerDownArray);
                    var imag = new Float32Array(real.length);
                    var customWave = this.audioContext.createPeriodicWave(real, imag);
                    this.osc[freq].setPeriodicWave(customWave);
                }else{
                    this.osc[freq].type = this.type
                }
                this.osc[freq].frequency.value = freq
                this.osc[freq].detune.value = this.detune
            }
            // connect audio context nodes
            osc[freq].connect(this.gainNode[freq])
            osc[freq].start(now)
            let outputNode = this.output==undefined?this.audioContext.destination:this.output
            this.gainNode[freq].connect(outputNode)
        },
        oscStop(freq){
            if(freq in this.osc){
                let now = this.audioContext.currentTime
                this.gainNode[freq].gain.linearRampToValueAtTime(0,now+this.adsr.r)
                this.osc[freq].stop(now+this.adsr.r)
            }
        },
        createGainNode(now){
            let adsr = Object.assign({a:0,aq:0.5,d:1,dq:0.5,s:1,r:0,rq:0.5},this.adsr)
            let gainNode = this.audioContext.createGain()
            let gain = gainNode.gain
            gain.linearRampToValueAtTime(0, now)
            gain.linearRampToValueAtTime(1-adsr.aq, now+adsr.a*0.5)
            gain.linearRampToValueAtTime(1, now+adsr.a)
            gain.linearRampToValueAtTime(adsr.d+(1-adsr.d)*adsr.dq, now+adsr.a+adsr.s*0.5)
            gain.linearRampToValueAtTime(adsr.d, now+adsr.a+adsr.s)
            return gainNode
        },
        setMarker(waveform){
            this.type = waveform
            let child = this.$refs[waveform].getBoundingClientRect(),
                parent = this.$refs[waveform].parentNode.getBoundingClientRect()
            this.markerStyle = {left:child.x-parent.x+'px',top:child.y-parent.y+'px'}
        },
        modulate(){
            for(let freq in this.osc){
                this.osc[freq].detune.value = this.detune
            }
        }
    },
    mounted(){
        window.addEventListener('resize',this.setMarker(this.type))
    },
    beforeDestroy(){
        window.removeEventListener('resize',this.setMarker(this.type))
    }
}
</script>

<style>
.psr{
    position: relative;
}

.square-marker {
  position: absolute;
  padding: 45px;
  border: 5px solid #fff;
  top: 0;
  left: 0;
  transition: 0.5s;
}

svg.waveform {
  width: 100px;
  display: inline-block;
  cursor: pointer;
}
svg.waveform path, svg.waveform polyline {
  stroke-width: 3px;
  stroke: #16FFBD;
}
svg.waveform rect {
  fill: #16FFBD;
}
svg.waveform circle {
  fill: #112266;
}
</style>