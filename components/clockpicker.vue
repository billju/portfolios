<template>
  <div class="clockpicker" :style="{width: size+'px', height: size+'px'}">
    <div class="clock" @mousedown="mousedown=true" @mouseup="mousedown=false" @mouseleave="mousedown=false">
      <div class="hour-niddle" :style="{transform:'rotate('+hour/hours.length*360+'deg)',boxShadow:shadow}"></div>
      <div class="minute-niddle" :style="{transform:'rotate('+minute/minutes.length*360+'deg)',boxShadow:shadow}"></div>
      <div class="center-dot" :style="{boxShadow:shadow}"></div>
      <div class="number" v-for="h in hours" :key="'h'+h" :style="hourStyle(h)" @mouseover="handleMouseover('hour',hours.length-1,h)" @mousedown="hour=h">{{h}}</div>
      <div class="number" v-for="m in minutes" :key="'m'+m" :style="minuteStyle(m)" @mouseover="handleMouseover('minute',minutes.length-1,m)" @mousedown="minute=m">{{(m%5==0||minute==m)?m:''}}</div>
    </div>
  </div>  
</template>

<script>
export default {
props: {size:{type:Number,default:280}},
data(){
    return {
      hours: Array.from(Array(24).keys()),
      minutes: Array.from(Array(60).keys()),
      hour: 0,
      minute: 0,
      mousedown: false,
      swipeUp: true,
      color: '#00bcd4',
      shadow: '0 0 5px 2px rgba(255,255,255,0.3)',
    }
  },
  methods:{
    getOffset(key,max,i){
      return this[key]+i>max?0:this[key]+i<0?max:this[key]+i
    },
    setOffset(key,max,i){
      this.swipeUp = i>0?true:false
      this[key] = this[key]+i>max?0:this[key]+i<0?max:this[key]+i
      this.$emit('input', this.time)
    },
    handleMouseover(key,max,i){
      if(this.mousedown){
        this.swipeUp = (i>this[key])?true:false
        // 0 to max && max to 0 are different
        this.swipeUp = (i==0&&this[key]==max)||(i==max&&this[key]==0)?!this.swipeUp:this.swipeUp
        this[key] = i
        this.$emit('input', this.time)
      }
    },
    hourStyle(num){
      let den = this.hours.length, center=this.size/2, r = this.size*0.35-15
      return {
        top: center-r*Math.sin((num/den+1/4)*Math.PI*2)+'px',
        left: center-r*Math.cos((num/den+1/4)*Math.PI*2)+'px',
        color: this.hour==num?'white':'#333',
        background: this.hour==num?this.color:'transparent'
      }
    },
    minuteStyle(num){
      let den=this.minutes.length, center=this.size/2, r = this.size*0.45-15
      return {
        top: center-r*Math.sin((num/den+1/4)*Math.PI*2)+'px',
        left: center-r*Math.cos((num/den+1/4)*Math.PI*2)+'px',
        color: this.minute==num?'white':'black',
        background: this.minute==num?this.color:'transparent'
      }
    },
    two(value){return ('0'+value).substr(-2)},
  },
  computed:{
    time(){
      return this.two(this.hour)+':'+this.two(this.minute)
    }
  }
}
</script>

<style scoped>
.clockpicker{
  background: #b2ebf2;
  padding-top: 20px;
  padding-bottom: 20px;
  position: relative;
  user-select: none;
  overflow: hidden;
  font-family: sans-serif;
  font-weight: bold;
}
.hour{
  position: absolute;
  font-size: 20px;
  cursor: pointer;
  left: 5px;
  bottom: 0;
}
.minute{
  position: absolute;
  font-size: 20px;
  cursor: pointer;
  right: 5px;
  bottom: 0;
}
.clock {
  position: relative;
  user-select: none;
  width: calc( 100% -30px);
  height: calc( 100% - 30px);
  border-radius: 50%;
  margin: 15px;
}

.number {
  position: absolute;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  cursor: pointer;
  transform: translate(-100%,-170%);
}

.center-dot {
  position: absolute;
  top: calc( 50% - 5px);
  left: calc( 50% - 5px);
  padding: 5px;
  border-radius: 50%;
  background: #000;
}

.hour-niddle {
  height: 35%;
  position: absolute;
  top: 15%;
  left: calc( 50% - 1px);
  border: 1px solid #000;
  transform-origin: center bottom;
}

.minute-niddle {
  height: 45%;
  position: absolute;
  top: 5%;
  left: calc( 50% - 1px);
  border: 1px solid #000;
  transform-origin: center bottom;
}
</style>