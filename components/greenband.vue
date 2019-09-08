<template>
<div class="d-flex" id="greenband" @input="handleInput()">
  <div class="settings">
    <div class="input_box">
      <label class="bold">週期{{cycle | norm_3digit}}秒</label>
      <input type="range" min="30" max="200" v-model.number="cycle"/>
    </div>
    <div class="input_box">
      <label class="bold">北{{north_speed}}KMH</label>
      <input type="range" min="10" max="99" v-model.number="north_speed"/>
    </div>
    <div class="input_box">
      <label class="bold">增減路口</label>
      <input type="button" value="+" @click="add_intersection();resize();"/>
      <input type="button" value="-" @click="del_intersection();resize();"/>
    </div>
    <div class="input_box">
      <label class="bold">南{{(south_speed)}}KMH</label>
      <input type="range" min="10" max="99" v-model.number="south_speed"/>
    </div>
    <div class="band_box">
      <div class="bold">北向綠燈帶寬</div>
      <div class="bar" v-bind:style="north_green_bar"></div>
      <div class="bold">{{north_green_band}}</div>
    </div>
    <div class="band_box">
      <div class="bold">南向綠燈帶寬</div>
      <div class="bar" v-bind:style="south_green_bar"></div>
      <div class="bold">{{south_green_band}}</div>
    </div>
    <div class="band_box">
      <div class="bold">總綠燈帶效率</div>
      <div class="bar" v-bind:style="total_green_bar"></div>
      <div class="bold">{{green_band+'%'}}</div>
    </div>
    <div class="road_settings">
      <div class="range_box" v-for="(item,i) in range_items" :key="i">
        <label>綠燈時間{{item.green_length | norm_3digit}}秒</label>
        <input type="range" min="0" v-bind:max="cycle" v-model.number="item.green_length"/>
        <label>時差{{('00'+item.offset).substr(-3)}}秒</label>
        <input type="range" min="0" v-bind:max="cycle-1" v-model.number="item.offset"/><br/>
        <label v-if="item.id&gt;0">路口距離{{item.interval*kmh_to_ms/3.6 | norm_4digit}}公尺</label>
        <input v-if="item.id&gt;0" type="range" min="10" max="400" v-model.number="item.interval"/>
      </div>
    </div>
  </div>
  <canvas ref="canvas"></canvas>
</div>
</template>

<script>
export default {
  data(){
      return{
        ctx: null,
        kmh_to_ms: 10.8,
        reso: 1, //定義解析度，越高畫面跑起來越卡
        cycle: 50,
        north_speed: 60,
        south_speed: 60,
        input_idx: 2,
        north_green_band: 20,
        south_green_band: 20,
        green_band: 40,
        range_items: [
        {id: 1, green_length: 25, offset: 25, interval: 200},
        {id: 0, green_length: 25, offset: 0, interval: 0},
        ],
      }
  },
  methods: {
    add_intersection: function(){
      this.range_items.unshift({id: this.input_idx, green_length: 25, offset: 25, interval: 200});
      //this.$refs.canvas.height *= (input_idx+1)/input_idx;
      this.input_idx++;
      
    },
    del_intersection: function(){
      this.range_items.shift();
      //this.$refs.canvas.height *= input_idx/(input_idx+1);
      this.input_idx--;
    },
    draw_phase: function(offset, y, green_length){
      var cycle = this.cycle;
      var repeat_times = Math.ceil(this.$refs.canvas.width/cycle);
      this.ctx.lineWidth = 10;
      for(var i=-1;i<repeat_times;i++){
        //畫綠線
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'green';
        var x = offset+i*cycle
        this.ctx.moveTo( x*this.reso, y);
        this.ctx.lineTo( (x+green_length)*this.reso, y);
        this.ctx.stroke();
        //畫紅線
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'red';
        var x = offset+i*cycle;
        this.ctx.moveTo( (x+green_length)*this.reso, y);
        this.ctx.lineTo( (x+cycle)*this.reso, y);
        this.ctx.stroke();
      }
    },//vue.js不能呼叫外面的函式，一定要寫進來
    draw_green_band: function(first_offset, north_green_band, south_green_band){
      var cycle = this.cycle;
      this.ctx.beginPath();
      this.ctx.lineWidth = this.reso;
      this.ctx.strokeStyle = '#80ff00';//light green
      for(var i=0;i<north_green_band.length;i++){
        var x = north_green_band[i];
        var trace_distance = this.$refs.canvas.height/this.north_speed*this.kmh_to_ms
        this.ctx.moveTo( (first_offset+x)*this.reso, this.$refs.canvas.height);
        this.ctx.lineTo( (first_offset+x+trace_distance)*this.reso, 0);
        this.ctx.stroke();
      }
      this.ctx.beginPath();
      this.ctx.lineWidth = this.reso;
      this.ctx.strokeStyle = '#00ff00';//light green
      for(var i=0;i<south_green_band.length;i++){
        var x = south_green_band[i];
        var trace_distance = this.$refs.canvas.height/this.south_speed*this.kmh_to_ms
        var cycle_across = 2;
        this.ctx.moveTo( (first_offset + x + cycle_across*cycle - trace_distance)*this.reso, 0);
        this.ctx.lineTo( (first_offset + x + cycle_across*cycle)*this.reso, this.$refs.canvas.height);
        this.ctx.stroke();
      }
    },
    calculate_green_band: function(){
      var y = this.$refs.canvas.height-5;
      var culmulative_interval = 0;
      var north_green_band, south_green_band, first_offset;
      for(var i=this.range_items.length-1;i>=0;i--){
        var item = this.range_items[i];
        if(i==this.range_items.length-1){
          first_offset = item.offset;
          north_green_band = Array.from(Array(item.green_length).keys());
          south_green_band = Array.from(Array(item.green_length).keys());
          this.draw_phase(item.offset, y, item.green_length);
        }
        else{
          y -= item.interval;
          culmulative_interval += item.interval;
          this.draw_phase(item.offset, y, item.green_length);
          //計算北向與南向綠燈帶
          var north_offset = Math.floor( (item.offset - culmulative_interval/this.north_speed*this.kmh_to_ms - first_offset) % this.cycle);
          var south_offset = Math.floor( (item.offset + culmulative_interval/this.south_speed*this.kmh_to_ms - first_offset) % this.cycle);
          north_offset = (north_offset>0)?north_offset:this.cycle + north_offset;
          south_offset = (south_offset>0)?south_offset:this.cycle + south_offset;
          var north_green = Array.from(Array(item.green_length).keys(),x=>(north_offset+x)%this.cycle);
          north_green_band = north_green_band.filter(x=>north_green.indexOf(x)!==-1);
          var south_green = Array.from(Array(item.green_length).keys(),x=>(south_offset+x)%this.cycle);
          south_green_band = south_green_band.filter(x=>south_green.indexOf(x)!==-1);
        }
      }
      this.draw_green_band(first_offset, north_green_band, south_green_band);
      this.north_green_band = north_green_band.length;
      this.south_green_band = south_green_band.length;
      this.green_band = Math.round((north_green_band.length+south_green_band.length)/2/this.cycle*100,2);
    },
    resize(){
      this.reso = Math.floor(this.range_items.length/2)
      this.$refs.canvas.width = 450*this.reso
      this.$refs.canvas.height = 450*this.reso
      this.calculate_green_band()
    },
    handleInput(){
        this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
        this.calculate_green_band();
    }
  },
  computed:{
    north_green_bar(){
      return {width: this.north_green_band/this.cycle*250+'px'}
    },
    south_green_bar(){
      return {width: this.south_green_band/this.cycle*250+'px'}
    },
    total_green_bar(){
      return {width: this.green_band*2+'px'}
    },
  },
  filters:{
    norm_3digit(value){
      return ('00'+value).substr(-3);
    },
    norm_4digit(value){
      return ('000'+value).substr(-4);
    },
  },
  mounted(){
    this.ctx = this.$refs.canvas.getContext('2d');
    //this.$refs.canvas.style.height = 高度隨flex變動
    this.$refs.canvas.width = 450*this.reso
    this.$refs.canvas.height = 450*this.reso
    this.calculate_green_band();
  }
}
</script>

<style scoped>
#greenband {
  margin: 0 auto;
  max-width: 900px;
  font-family: "微軟正黑體";
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.d-flex {
  display: flex;
  background: #009973;
}

.settings {
  border: solid 5px #00664d;
  min-height: 450px;
  max-width: 450px;
  display: flex;
  flex-wrap: wrap;
}

.input_box {
  box-shadow: 0 0 0 3px #00664d inset;
  width: 50%;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
}

.bold {
  font-size: 20px;
  margin-left: 10px;
}

.band_box {
  box-shadow: 0 0 0 3px #00664d inset;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
}

.bar {
  height: 20px;
  width: 50px;
  margin-top: 5px;
  margin-left: 5px;
  background-color: #fff;
}

.road_settings {
  width: 100%;
  box-shadow: 0 0 0 3px #00664d inset;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

.range_box {
  margin: 10px;
}

canvas {
  border: solid 5px #00664d;
  background-color: white;
  width: 450px;
}

input {
  background-color: #00664d;
  color: white;
}

input[type="button"] {
  text-align: center;
  margin-left: 5px;
  width: 50px;
  height: 20px;
  border: none;
  cursor: pointer;
}

input[type="range"] {
  -webkit-appearance: none;
  margin-left: 5px;
  width: 100px;
  height: 20px;
  overflow: hidden;
  outline: none;
  background: none;
}

::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 20px;
  background: #fff;
}

::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  background: #00664d;
}

::-moz-range-track{
  background: #00664d;
}
::-ms-track{
  background: #00664d;
}

@media (max-width: 900px) {
  #greenband {
    flex-direction: column-reverse;
    zoom: 0.8;
  }
}

</style>