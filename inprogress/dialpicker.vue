<template>
<div ref="picker" class="dialpicker">   
  <div class="border"></div>
  <transition :name="swipeUp?'swipe-up':'swipe-down'">
    <div class="dial" :key="hour" @mousedown="handelEventStart($event,'hour')" @touchstart="handelEventStart($event,'hour')">
      <div class="text-muted rotate-60" @click="setOffset('hour',23,-2)">{{ getOffset('hour',23,-2) | two }}</div>
      <div class="text-muted rotate-30" @click="setOffset('hour',23,-1)">{{ getOffset('hour',23,-1) | two }}</div>
      <div class="text-light font-weight-bold"> {{ hour | two }}</div>
      <div class="text-muted rotate-330" @click="setOffset('hour',23,1)">{{ getOffset('hour',23,1) | two }}</div>
      <div class="text-muted rotate-300" @click="setOffset('hour',23,2)">{{ getOffset('hour',23,2) | two }}</div>
    </div>
  </transition>
  <transition :name="swipeUp?'swipe-up':'swipe-down'">
    <div class="dial right" :key="minute" @mousedown="handelEventStart($event,'minute')" @touchstart="handelEventStart($event,'minute')">
      <div class="text-muted rotate-60" @click="setOffset('minute',59,-2)">{{ getOffset('minute',59,-2) | two }}</div>
      <div class="text-muted rotate-30" @click="setOffset('minute',59,-1)">{{ getOffset('minute',59,-1) | two }}</div>
      <div class="text-light font-weight-bold">{{ minute | two }}</div>
      <div class="text-muted rotate-330" @click="setOffset('minute',59,1)">{{ getOffset('minute',59,1) | two }}</div>
      <div class="text-muted rotate-300" @click="setOffset('minute',59,2)">{{ getOffset('minute',59,2) | two }}</div>
    </div>
  </transition>
</div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 24
    },
    container: {}
  },
  data(){
    return {
      hour: 0, minute: 0, swipeUp: false, bindedContainer: {},
      eventdown: null, clientY: 0, accY: 0, threshold: 10,
    }
  },
  methods: {
    getOffset(key,max,i){
      return this[key]+i>max?0:this[key]+i<0?max:this[key]+i
    },
    setOffset(key,max,i){
      this.swipeUp = i>0?true:false
      this[key] = this[key]+i>max?0:this[key]+i<0?max:this[key]+i
    },
    handelEventStart(e,key){
      this.clientY = e.clientY==undefined?e.targetTouches[0].pageY:e.clientY
      this.eventdown = key
      if(this.bindedContainer!=this.container){
          this.bindedcontainer = this.container?this.container:this.$refs.picker
          this.bindedcontainer.addEventListener('mousemove',this.handleEventMove)
          this.bindedcontainer.addEventListener('mouseup',this.handleEventEnd)
          this.bindedcontainer.addEventListener('mouseleave',this.handleEventEnd)
          this.bindedcontainer.addEventListener('touchmove',this.handleEventMove,{ passive: false })
          this.bindedcontainer.addEventListener('touchend',this.handleEventEnd,{ passive: false })
          this.bindedContainer=this.container
      }
    },
    handleEventMove(e){
      if(this.eventdown){
        e.preventDefault()
        if(e.clientY){
          this.accY += e.clientY-this.clientY
          this.clientY = e.clientY
        }else{
          this.accY += e.targetTouches[0].pageY-this.clientY
          this.clientY = e.targetTouches[0].pageY
        }
        if(Math.abs(this.accY)>this.threshold){
          let i = this.accY<0?1:-1
          if(this.eventdown=='hour'){this.setOffset('hour',23,i)}
          if(this.eventdown=='minute'){this.setOffset('minute',59,i)}
          this.accY = 0
          this.$emit('input',this.time)
        }
      }
    },
    handleEventEnd(){
      this.eventdown=null
    },
    two(value){return ('0'+value).substr(-2)},
  },
  computed:{
    time(){
      return this.two(this.hour)+':'+this.two(this.minute)
    }
  },
  filters:{
    two(value){return ('0'+value).substr(-2)}
  },
  mounted(){

  }
}
</script>

<style scoped>
.dialpicker{
  position: relative;
  width: 200px;
  height: 200px;
  background: #00bcd4;
  display: flex;
  align-items: center;
  color: #fff;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 24px;
  user-select: none;
}
.border {
  width: 100%;
  height: 28px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
}
.dial{
  position: absolute;
  width: 50%;
  text-align: center;
  cursor: pointer;
}
.right{
  right: 0;
}
.rotate-30 {
  transform: rotateX(30deg);
  opacity: 0.8;
}
.rotate-60 {
  transform: rotateX(60deg) translateY(30%);
  opacity: 0.3;
}
.rotate-300 {
  transform: rotateX(-60deg) translateY(-30%);
  opacity: 0.3;
}
.rotate-330 {
  transform: rotateX(-30deg);
  opacity: 0.8;
}

.swipe-up-enter-active {
  z-index: 50;
  animation: swipe-up 0.2s ease-out;
}

.swipe-up-leave-active {
  position: absolute;
  z-index: 99;
  animation: swipe-down 0.2s ease-in reverse;
}

.swipe-down-enter-active {
  z-index: 99;
  animation: swipe-down 0.2s ease-out;
}

.swipe-down-leave-active {
  position: absolute;
  z-index: 50;
  animation: swipe-up 0.2s ease-in reverse;
}

@keyframes swipe-up {
  0% {
    transform: translateY(33%);
    opacity: 0;
  }
}
@keyframes swipe-down {
  0% {
    transform: translateY(-33%);
    opacity: 0;
  }
}
</style>