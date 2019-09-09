<template>
<div class="psr" :style="{minWidth}">
    <div class="d-inline-block" v-for="(pk,pi) in pianoKeys" :key="pi" 
        :class="pk.black?'black-key':'white-key'" :style="{color:pk.press?'white':'#666'}" 
        @mousedown="handleEventStart(pk)" @mouseup="handleEventEnd(pk)" @mouseleave="handleEventEnd(pk)">
        <div class="keychar">{{pk.char}}</div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        pianoKeys: {
            type: Array,
            default: () => ([
                {char: 'Z', pitch: -9, black:false, press:false},
                {char: 'S', pitch: -8, black:true, press:false},
                {char: 'X', pitch: -7, black:false, press:false},
                {char: 'D', pitch: -6, black:true, press:false},
                {char: 'C', pitch: -5, black:false, press:false},
                {char: 'V', pitch: -4, black:false, press:false},
                {char: 'G', pitch: -3, black:true, press:false},
                {char: 'B', pitch: -2, black:false, press:false},
                {char: 'H', pitch: -1, black:true, press:false},
                {char: 'N', pitch: 0, black:false, press:false},
                {char: 'J', pitch: 1, black:true, press:false},
                {char: 'M', pitch: 2, black:false, press:false},
                {char: 'Q', pitch: 3, black:false, press:false},
                {char: '2', pitch: 4, black:true, press:false},
                {char: 'W', pitch: 5, black:false, press:false},
                {char: '3', pitch: 6, black:true, press:false},
                {char: 'E', pitch: 7, black:false, press:false},
                {char: 'R', pitch: 8, black:false, press:false},
                {char: '5', pitch: 9, black:true, press:false},
                {char: 'T', pitch: 10, black:false, press:false},
                {char: '6', pitch: 11, black:true, press:false},
                {char: 'Y', pitch: 12, black:false, press:false},
                {char: '7', pitch: 13, black:true, press:false},
                {char: 'U', pitch: 14, black:false, press:false},
                {char: 'I', pitch: 15, black:false, press:false},
                {char: '9', pitch: 16, black:true, press:false},
                {char: 'O', pitch: 17, black:false, press:false},
                {char: '0', pitch: 18, black:true, press:false},
                {char: 'P', pitch: 19, black:false, press:false},
                {char: '[', pitch: 20, black:false, press:false},
                {char: '=', pitch: 21, black:true, press:false},
                {char: ']', pitch: 22, black:false, press:false},
            ]),
        }
    },
    methods:{
        handleEventStart(pk){
            let freq = 440*Math.pow(2,pk.pitch/12)
            this.$emit('oscStart',freq.toFixed(2)*1)
            pk.press=true
        },
        handleEventEnd(pk){
            if(pk.press){
                let freq = 440*Math.pow(2,pk.pitch/12)
                this.$emit('oscStop',freq.toFixed(2)*1)
                pk.press=false
            }
        }
    },
    computed: {
        minWidth(){
            return this.pianoKeys.filter(k=>!k.black).length*30+'px'
        }
    },
    mounted(){
        window.addEventListener('keydown',e=>{
            let keyChar = e.key.toUpperCase();
            let idx = this.pianoKeys.findIndex(x=>x.char==keyChar)
            if(idx!==-1){
                if(!this.pianoKeys[idx].press){
                    let freq = 440*Math.pow(2,this.pianoKeys[idx].pitch/12)
                    this.pianoKeys[idx].press = true
                    this.$emit('oscStart',freq.toFixed(2)*1)
                }
            }
        });
        window.addEventListener('keyup',e=>{
            let keyChar = e.key.toUpperCase();
            let idx = this.pianoKeys.findIndex(x=>x.char==keyChar)
            if(idx!==-1){
                let freq = 440*Math.pow(2,this.pianoKeys[idx].pitch/12)
                this.pianoKeys[idx].press = false
                this.$emit('oscStop',freq.toFixed(2)*1)
            }
        });
    }
}
</script>

<style scoped>
.psr{
    position: relative;
}

.d-inline-block {
  display: inline-block;
  border: 1px solid #fff;
}

.white-key {
  width: 30px;
  height: 120px;
  position: relative;
  z-index: 69;
  background: #111;
  cursor: pointer;
  user-select: none;
}

.black-key {
  width: 20px;
  height: 80px;
  position: absolute;
  top: 0;
  margin-left: -10px;
  margin-right: -10px;
  z-index: 99;
  background: #16FFBD;
  cursor: pointer;
  user-select: none;
}

.keychar {
  position: absolute;
  bottom: 5px;
  width: 100%;
  text-align: center;
}
</style>