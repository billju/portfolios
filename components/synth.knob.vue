<template>
<div ref="knob" class="knob" @mousedown="handleEventStart"
    @touchstart="handleEventStart" @touchmove="handleEventMove" @touchend="handleEventEnd" @touchcancel="handleEventEnd">
    <div class="knob-dial" :style="{transform: 'rotate('+Math.round(-132+pct*264)+'deg)'}">
      <div class="knob-glans"></div>
    </div>
    <svg viewbox="0 0 100 100">
      <path d="M20,76 A 40 40 0 1 1 80 76" stroke="#333" fill="none"></path>
      <path d="M20,76 A 40 40 0 1 1 80 76" stroke="#16FFBD" :stroke-dashoffset="Math.round(184-pct*184)" fill="none"></path>
    </svg>
    <div class="knob-label">{{label}}</div>
</div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
    name: 'knob',
    props: {
        'max':{type:Number,default:1},
        'min':{type:Number,default:0},
        'step':{type:Number,default:0.01},
        'value':Number,
        'label':String,
        'container':{}
    },
    data(){
        return{
            val:0.5, clientX:0, clientY: 0, active: false, bindedContainer: {},
        }
    },
    methods: {
        handleEventStart(e){
            this.active = true
            this.clientX = e.clientX==undefined?e.targetTouches[0].pageX:e.clientX
            this.clientY = e.clientY==undefined?e.targetTouches[0].pageY:e.clientY
            if(this.bindedContainer!=this.container){
                this.bindedcontainer = this.container?this.container:this.$refs.knob
                this.bindedcontainer.addEventListener('mousemove',this.handleEventMove)
                this.bindedcontainer.addEventListener('mouseup',this.handleEventEnd)
                this.bindedcontainer.addEventListener('mouseleave',this.handleEventEnd)
                this.bindedContainer=this.container
            }
        },
        handleEventMove(e){
            if(this.active){
                e.preventDefault()
                let clientX = e.clientX==undefined?e.targetTouches[0].pageX:e.clientX,
                    clientY = e.clientY==undefined?e.targetTouches[0].pageY:e.clientY,
                    max = this.max==undefined?1:this.max,
                    min = this.min==undefined?0:this.min,
                    movedX = clientX-this.clientX,
                    movedY = clientY-this.clientY
                this.val+= (movedX-movedY)*(max-min)*0.005
                this.val = (this.val>max)?max:(this.val<min)?min:this.val
                // knob.dash = Math.round(184-reg*184)
                // knob.deg = Math.round(-132+reg*264)
                let emitValue = Math.round(this.val/this.step)*this.step
                emitValue =  emitValue.toFixed(12)*1//deal with float flush
                this.$emit('input',emitValue)
                this.clientX = clientX;
                this.clientY = clientY;
            }
        },
        handleEventEnd(){
            this.active = false
        }
    },
    computed:{
        pct(){
            let max = this.max==undefined?1:this.max,
                min = this.min==undefined?0:this.min,
                val = this.value==undefined?this.val:this.value
            val = (val>max)?max:(val<min)?min:val
            return (val-min)/(max-min)
        }
    }
}
</script>

<style scoped>
.knob {
  width: 100px;
  height: 100px;
  position: relative;
  display: inline-block;
  margin-bottom: 10px;
  cursor: pointer;
}

.knob-dial {
  position: absolute;
  width: 72%;
  height: 72%;
  top: 14%;
  left: 14%;
  background: #447799;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
  border-radius: 50%;
  transform: rotate(-132deg);
}

.knob-glans {
  position: absolute;
  height: 20%;
  width: 6%;
  top: 15%;
  left: 50%;
  background: #fff;
}

.knob-label {
  position: absolute;
  color: #fff;
  top: 90%;
  width: 100%;
  text-align: center;
}

svg path {
  stroke-width: 10px;
  stroke-dasharray: 184;
  transition: 0.15s;
}
</style>