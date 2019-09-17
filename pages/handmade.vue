<template>
<div ref="container">
    <div class="dark pt-50"><div class="row">
        <div class="col col-sm-12 col-md-6">
            <h1 v-if="$store.state.language=='zh'">頻譜與波形</h1>
            <h1 v-if="$store.state.language=='en'">Spectrum &amp; Wavefrom</h1>
            <p v-if="$store.state.language=='zh'">透過快速傅立葉轉換而視覺化波形的組件</p>
            <p v-if="$store.state.language=='en'">Wave visualization components that transfer signal to visualizable shape by fast fourier transfrom.</p>
            <table><tbody>
                <tr><th>bind</th><th>type</th><th>description</th></tr>
                <tr><td>audioContext</td><td>Object</td><td>naive audioContext class</td></tr>
                <tr><td>input</td><td>Object</td><td>audio node input</td></tr>
            </tbody></table>
        </div>
        <div class="col col-sm-12 col-md-6">
            <spectrum :audioContext="ctx" :input="this.biquadFilter"/>
            <waveform :audioContext="ctx" :input="this.biquadFilter"/>
        </div>
        <div class="col col-sm-12 col-md-6">
            <h1 v-if="$store.state.language=='zh'">振盪器</h1>
            <h1 v-if="$store.state.language=='en'">Oscillator</h1>
            <p v-if="$store.state.language=='zh'">含波封配置的音波產生器</p>
            <p v-if="$store.state.language=='en'">A waveform generator which includes envelope modulation.</p>
            <table><tbody>
                <tr><th>bind</th><th>type</th><th>description</th></tr>
                <tr><td>audioContext</td><td>Object</td><td>naive audioContext class</td></tr>
                <tr><td>output</td><td>Object</td><td>audio node output</td></tr>
                <tr><td>detune</td><td>Number</td><td>frequency fine tune</td></tr>
                <tr><td>adsr</td><td>Object</td><td>the mode volume changed over time</td></tr>
                <tr><th>ref method</th><th>return</th><th>description</th></tr>
                <tr><td>oscStart</td><td>undefined</td><td>play the oscillator</td></tr>
                <tr><td>oscStop</td><td>undefined</td><td>stop the oscillator</td></tr>
                <tr><td>modulate</td><td>undefined</td><td>control the acitating oscillator</td></tr>
            </tbody></table>
        </div>
        <div class="col col-sm-12 col-md-6">
            <osc ref="osc" :adsr="adsr" :audioContext="ctx" :detune="detune" :output="this.masterGain"/>    
        </div>
        <div class="col col-sm-12 col-md-6">
            <h1 v-if="$store.state.language=='zh'">合成器琴鍵</h1>
            <h1 v-if="$store.state.language=='en'">Pianokey</h1>
            <p v-if="$store.state.language=='zh'">專門偵測使用者操作事件的組件</p>
            <p v-if="$store.state.language=='en'">Pianokey is specified for dealing with user inputs.</p>
            <table><tbody>
                <tr><th>bind</th><th>type</th><th>description</th></tr>
                <tr><td>pianoKeys</td><td>Array</td><td>follows the format below</td></tr>
                <tr><td colspan="3">{char:'Z', pitch: -9, black: false, press:false}</td></tr>
                <tr><th>emit</th><th>type</th><th>demo</th></tr>
                <tr><td>oscStart</td><td>Number</td><td>{{startFreq.toFixed(2)}}</td></tr>
                <tr><td>oscStop</td><td>Number</td><td>{{endFreq.toFixed(2)}}</td></tr>
            </tbody></table>
        </div>
        <div class="col col-sm-12 col-md-6">
            <div class="overflow-x">
                <pianokey @oscStart="oscStart" @oscStop="oscStop"/>
            </div>
        </div>
        <div class="col col-sm-12 col-md-6">
            <h1 v-if="$store.state.language=='zh'">旋鈕</h1>
            <h1 v-if="$store.state.language=='en'">Knob</h1>
            <p v-if="$store.state.language=='zh'">直覺的範圍數字選擇器</p>
            <p v-if="$store.state.language=='en'">Knob can make selecting a number from given range more intuitively.</p>
            <table><tbody>
                <tr><th>bind</th><th>type</th><th>description</th></tr>
                <tr><td>max</td><td>Number</td><td>upper bound</td></tr>
                <tr><td>min</td><td>Number</td><td>lower bound</td></tr>
                <tr><td>step</td><td>Number</td><td>value ticks</td></tr>
                <tr><td>value</td><td>Number</td><td>input value</td></tr>
                <tr><td>label</td><td>String</td><td>title under the knob</td></tr>
                <tr><td>container</td><td>HTMLElement</td><td>component wrapper</td></tr>
                <tr><th>emit</th><th>type</th><th>demo</th></tr>
                <tr><td>value</td><td>Number</td><td>{{volume}}</td></tr>
            </tbody></table>
        </div>
        <div class="col col-sm-12 col-md-6">
            <div class="flex-center">
                <knob label="ATTACK" :container="container" :min="0" :max="1" v-model="adsr.a"/>
                <knob label="DECAY" :container="container" :min="0" :max="1" v-model="adsr.d"/>
                <knob label="SUSTAIN" :container="container" :min="0" :max="1" v-model="adsr.s"/>
                <knob label="RELEASE" :container="container" :min="0" :max="1" v-model="adsr.r"/>
            </div>
            <div class="flex-center">
                <knob label="DETUNE" :container="container" :min="-100" :max="100" v-model="detune" @input="oscMod()"/>
                <knob label="VOLUME" :container="container" :min="0" :max="0.3" v-model="volume" @input="masterGain.gain.value=$event"/>
                <knob label="FILTER" :container="container" :min="5" :max="14" v-model="pow" @input="biquadFilter.frequency.value=Math.pow(2,$event)"/>
            </div>
        </div>
    </div></div>
    <div class="light"><div class="row">
        <div class="col col-sm-12 col-md-6">
            <h1 v-if="$store.state.language=='zh'">日期挑選器</h1>
            <h1 v-if="$store.state.language=='en'">Datepicker</h1>
            <p v-if="$store.state.language=='zh'">配有年月日且可自由更換語系格式的月曆，點選中上方的按鈕切換輸入模式</p>
            <p v-if="$store.state.language=='en'">Please click the outline styled button to toggle selection mode.</p>
            <table><tbody>
                <tr><th>bind</th><th>type</th><th>demo</th></tr>
                <tr><td>months</td><td>Array</td><td>Jan~Dec</td></tr>
                <tr><td>weekdays</td><td>Array</td><td>日~六</td></tr>
                <tr><th>emit</th><th>type</th><th>demo</th></tr>
                <tr><td>value</td><td>String</td><td>{{date}}</td></tr>
            </tbody></table>
        </div>
        <div class="col col-sm-12 col-md-6">
            <datepicker v-model="date"/>
        </div>
    </div></div>
    <!-- <div class="light-grey"><div class="row">
        <div class="col col-sm-12 col-md-6">
            <h1>clock-picker</h1>
            <p>24小時制的時間選擇工具</p>
            <table><tbody>
                <tr><th>emit</th><th>type</th><th>demo</th></tr>
                <tr><td>value</td><td>String</td><td>{{clock}}</td></tr>
            </tbody></table>
            <clockpicker v-model="clock"/>
        </div>
        <div class="col col-sm-12 col-md-6">
            <h1>dial-picker</h1>
            <p>滾輪式時間選擇工具</p>
            <table><tbody>
                <tr><th>bind</th><th>type</th><th>demo</th></tr>
                <tr><td>container</td><td>HTMLElement</td><td>template>div</td></tr>
                <tr><th>emit</th><th>type</th><th>demo</th></tr>
                <tr><td>value</td><td>String</td><td>{{dial}}</td></tr>
            </tbody></table>
            <dialpicker v-model="dial" :container="container"/>
        </div>
    </div></div> -->

    <div class="light"><div class="row">
        <div class="col col-sm-12 col-lg-4">
            <h1 v-if="$store.state.language=='zh'">日期範圍挑選器</h1>
            <h1 v-if="$store.state.language=='en'">Date-range-picker</h1>
            <p v-if="$store.state.language=='zh'">旅程、旅館、機票預訂的通用組件</p>
            <p v-if="$store.state.language=='en'">A general-purpose component for itinerary, hotel and flight reservation.</p>
            <table><tbody>
                <tr><th>bind</th><th>type</th><th>demo</th></tr>
                <tr><td>banned</td><td>String</td><td>{{rangeBind.banned}}</td></tr>
                <tr><td>lb(lower bound)</td><td>Date</td><td>{{rangeBind.lb | toLocaleString}}</td></tr>
                <tr><td>ub(upper bound)</td><td>Date</td><td>{{rangeBind.ub | toLocaleString}}</td></tr>
                <tr><th>emit</th><th>type</th><th>demo</th></tr>
                <tr><td>value.start</td><td>Date</td><td>{{daterange.start | toLocaleString}}</td></tr>
                <tr><td>value.end</td><td>Date</td><td>{{daterange.end | toLocaleString}}</td></tr>
                <tr><td>value.select</td><td>Array</td><td>
                    <ul><li v-for="select in daterange.select" :key="select">{{select}}</li></ul>    
                </td></tr>
            </tbody></table>
        </div>
        <div class="col col-sm-12 col-lg-8">
            <daterangepicker v-model="daterange" :banned="rangeBind.banned" :lb="rangeBind.lb" :ub="rangeBind.ub"/>
        </div>
    </div></div>

    <div class="light-grey"><div class="row">
        <div class="col col-sm-12">
            <stepper :steps="stp.steps" :index="stp.index*1" :background="color.primary"/>
        </div>
        <div class="col col-sm-12 col-lg-4">
            <h1 v-if="$store.state.language=='zh'">步驟提示</h1>
            <h1 v-if="$store.state.language=='en'">Stepper</h1>
            <p v-if="$store.state.language=='zh'">付款或教學的通用組件</p>
            <p v-if="$store.state.language=='en'">A general-purpose component for payment and instruction.</p>
            <table><tbody>
                <tr><th>bind</th><th>type</th><th>demo</th></tr>
                <tr><td>steps</td><td>Array</td><td>
                    <ul><li v-for="(step,si) in stp.steps" :key="si">{{step}}</li></ul>
                    <counter type="text" v-model="stp.input" @add="stp.steps.push(stp.input)" @minus="stp.steps.pop()" :background="color.light"/>
                </td></tr>
                <tr><td>index</td><td>Number</td><td>
                    <counter type="number" v-model="stp.index" :min="0" :max="stp.steps.length-1" :background="color.light"/>
                </td></tr>
                <tr><td>background</td><td>String</td><td><colorpicker v-model="color"/></td></tr>
            </tbody></table>
        </div>
        <div class="col col-sm-12 col-md-6 col-lg-4">
            <h1 v-if="$store.state.language=='zh'">信用卡輸入</h1>
            <h1 v-if="$store.state.language=='en'">Credit card</h1>
            <p v-if="$store.state.language=='zh'">配有自動換行與驗證的輸入框</p>
            <p v-if="$store.state.language=='en'">Input boxes that can switch to the next one automatically. Of course, validation function is included.</p>
            <table><tbody>
                <tr><th>emit</th><th>type</th><th>demo</th></tr>
                <tr><td>value.cardNumber</td><td>String</td><td>{{creditCard.cardNumber}}</td></tr>
                <tr><td>value.MM</td><td>String</td><td>{{creditCard.MM}}</td></tr>
                <tr><td>value.YY</td><td>String</td><td>{{creditCard.YY}}</td></tr>
                <tr><td>value.securityCode</td><td>String</td><td>{{creditCard.securityCode}}</td></tr>
                <tr><th>ref methods</th><th>return</th><th>demo</th></tr>
                <tr><td>validate</td><td>Boolean</td><td><button class="btn btn-outline" @click="validate()">CLICK ME</button></td></tr>
            </tbody></table>
        </div>
        <div class="col col-sm-12 col-md-6 col-lg-4">
            <creditcard ref="creditCard" v-model="creditCard"/>
        </div>
    </div></div>

    <div class="light"><div class="row">
        <div class="col col-sm-12 col-lg-6">
            <h1 v-if="$store.state.language=='zh'">JSON轉表格包裝器</h1>
            <h1 v-if="$store.state.language=='en'">Json2container</h1>
            <p v-if="$store.state.language=='zh'">提供子元件控制選項的高階組件，點擊陣列或是物件格式的的資料框來生產新的表格</p>
            <p v-if="$store.state.language=='en'">Json2container provides child component with control options. Try to click the grid with type of "Array" or "Object" to create more tables.</p>
            <table><tbody>
                <tr><th>bind</th><th>type</th><th>description</th></tr>
                <tr><td>rows</td><td>Array</td><td>JSON</td></tr>
                <tr><td>title</td><td>String</td><td>key value of JSON</td></tr>
                <tr><th>emit</th><th>type</th><th>description</th></tr>
                <tr><td>create-table</td><td>Object</td><td>emit child event again</td></tr>
                <tr><td>close-table</td><td>String</td><td>clear the table</td></tr>
            </tbody></table>

            <h1 v-if="$store.state.language=='zh'">JSON轉表格</h1>
            <h1 v-if="$store.state.language=='en'">Json2table</h1>
            <p v-if="$store.state.language=='zh'">將大量JSON資料轉換成二維可視化的格式，點選欄位還可以標記</p>
            <p v-if="$store.state.language=='en'">Json2table which transfers massive JSON data to readable two-dimensional table format. Table columns can be highlighted by clicking.</p>
            <table><tbody>
                <tr><th>bind</th><th>type</th><th>description</th></tr>
                <tr><td>rows</td><td>Array</td><td>JSON</td></tr>
                <tr><td>toggle</td><td>Boolean</td><td>switch table direction</td></tr>
                <tr><th>emit</th><th>type</th><th>description</th></tr>
                <tr><td>create-table</td><td>Object</td><td>the event of clicking on "td"</td></tr>
                <tr><td colspan="3" class="pa-0">
                    <textarea class="col col-sm-12" v-model="url"/>
                    <progressbar v-if="onProgress"/>
                </td></tr>
                <tr><td colspan="3">
                    <button class="btn btn-outline" @click="getPtx()">GET</button>
                    <span>url of TEXTAREA</span>
                </td></tr>
            </tbody></table>
        </div>
        <div class="col col-sm-12 col-lg-6">
            <json2container v-for="(value,name) in tables" :key="name" :rows="value" :title="name" @create-table="createTable" @close-table="closeTable"/>
        </div>
    </div></div>
    <footer class="light-grey">
        <span>Watch this project on </span>
        <a href="https://github.com/billju/portfolios">https://github.com/billju/portfolios</a>
    </footer>
    <navbar/>
</div>
</template>

<script>
import datepicker from '~/components/datepicker.vue'
// import clockpicker from '~/components/clockpicker.vue'
// import dialpicker from '~/components/dialpicker.vue'
import daterangepicker from '~/components/daterangepicker.vue'

import stepper from '~/components/stepper.vue'
import creditcard from '~/components/creditcard.vue'
import counter from '~/components/counter.vue'
import colorpicker from '~/components/colorpicker.vue'

import switcher from '~/components/switcher.vue'
import progressbar from '~/components/progressbar.vue'
import json2table from '~/components/json2table.vue'
import json2container from '~/components/json2container.vue'

import pianokey from '~/components/synth.key.vue'
import osc from '~/components/synth.osc.vue'
import waveform from '~/components/synth.waveform.vue'
import spectrum from '~/components/synth.spectrum.vue'
import knob from '~/components/synth.knob.vue'

import navbar from '~/components/navbar.vue'
import ogImage from '~/static/og-image.jpg'
export default {
    components: {
        datepicker,daterangepicker,
        // clockpicker,dialpicker,
        stepper,creditcard,counter,colorpicker,
        switcher,progressbar,json2container,
        waveform,spectrum,osc,pianokey,knob,
        navbar,
    },
    head(){
        return {
            title: 'chuboy',
            meta: [
                {hid:'og-image', property:'og-image', content: ogImage},
                {hid:'description', name:'description', content:"Chuboy's hademade components collection, including knob, datepicker, date range picker, stepper and validation."}
            ]
        }
    },
    data(){
        return{
            date:'', clock:'', dial: '', container: undefined,
            rangeBind: {banned:['2019/9/29'],lb:new Date(),ub:new Date()},
            daterange: {start:'',end:'',select:[]}, 
            stp: {steps: ['Shopping cart','Payment','Finished'],index: 0,background: 'cyan',input:''},
            creditCard: {}, color: {text:'cyan',primary:'#00bcd4',light:'#b2ebf2',dark:'#006064'},
            onProgress: false, url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/Schedule/InterCity?$top=5&$format=JSON',
            tables: {},
            ctx: {}, masterGain:{}, volume:0.05, biquadFilter:{}, pow: 14,
            detune: 0, adsr: {a:0,d:1,s:0.5,r:0.5}, startFreq: 0, endFreq: 0,
        }
    },
    methods: {
        validate(){
            this.$refs.creditCard.validate()
        },
        getPtx(){
            this.onProgress = true
            var xhr = new XMLHttpRequest()
            xhr.open('GET',this.url)
            xhr.onload = ()=>{
                this.onProgress = false
                try{
                let result = JSON.parse(xhr.responseText)
                    if(result instanceof Array){
                        this.tables.response = result
                    }else{
                        alert(JSON.stringify(result))
                    }
                }catch(e){
                    alert(e)
                }
            }
            xhr.send()
        },
        createTable(payload){
            if(payload.type=='Array'||payload.type=='Object'){
                let name = `${payload.name} (${payload.type})`
                this.$set(this.tables,name,payload.data)
            }
        },
        closeTable(title){
            this.$delete(this.tables,title)
        },
        oscStart(freq){
            this.startFreq = freq
            this.$refs.osc.oscStart(freq)
        },
        oscStop(freq){
            this.endFreq = freq
            this.$refs.osc.oscStop(freq)
        },
        oscMod(){
            this.$refs.osc.modulate()
        },
    },
    filters: {
        toLocaleString(v){
            return v?v.toLocaleString():''
        }
    },
    beforeMount(){
        this.ctx = new (window.AudioContext || window.webkitAudioContext)()
        this.masterGain = this.ctx.createGain()
        this.biquadFilter = this.ctx.createBiquadFilter()
        this.masterGain.connect(this.biquadFilter)
        this.masterGain.gain.value = 0.05
        this.biquadFilter.frequency.value = Math.pow(2,14)
        this.biquadFilter.connect(this.ctx.destination)
    },
    mounted(){
        let ms = new Date().getTime()
        this.rangeBind.lb.setTime(ms-24*60*60*1000)
        this.rangeBind.ub.setTime(ms+60*24*60*60*1000)
        this.container = this.$refs.container
        this.getPtx()
    }
}
</script>
<style>
*{
    font-family: 微軟正黑體;
}
body{
    overflow-x: hidden
}
</style>
<style scoped>
.pt-50{
    padding-top: 50px;
}
footer{
    padding: 10px 0;
    text-align: center;
}
/* color */
.light-grey{
    background: #f5f5f5;
}
.light h1, .light-grey h1{
    box-shadow: 0 -10px 0 0 #b2ebf2 inset
}
.dark{
    background: #222;
    color: #fff;
}
/* native */
p{
    white-space: pre-wrap;
    margin: 10px;
}
textarea{
    padding: 5px;
    min-width: 400px;
}
/* table */
table{
    border-collapse: collapse;
    margin-top: 10px;
    margin-bottom: 10px;
}
tr:hover {
  background: rgba(0, 0, 0, 0.075);
}
.dark tr:hover {
  background: rgba(255, 255, 255, 0.2);
}
th{
    border-top: 2px solid #999;
    border-bottom: 2px solid #999;
    text-align: center;
    padding: 5px 10px;
}
td{
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    text-align: center;
    padding: 5px 10px;
}
.dark th, .dark td{
    border: 1px solid #fff;
}
td.flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
}
td.pa-0{
    padding: 0;
}
/* button */
.btn{
    padding: 5px 10px;
    display: inline-block;
    user-select: none;
    cursor: pointer;
    transition: 0.3s;
}
.btn-outline{
    font-weight: bold;
    border: 1px solid #000;
}
.btn-outline:hover{
    background: #333;
    color: #fff;
}
.overflow-x{
    max-width: 100%;
    overflow-x: scroll;
}
/* flex */
.flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.row{
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    padding-top: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #aaa;
}
.col{
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -ms-flex-positive: 1;
    flex-grow: 1;
    max-width: 100%;
}
.col-sm-12{
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
}
@media screen and (min-width: 768px){
    .col-md-4{
        -ms-flex: 0 0 33.333333%;
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
    }
    .col-md-6{
        -ms-flex: 0 0 50%;
        flex: 0 0 50%;
        max-width: 50%;
    }
    .col-md-8{
        -ms-flex: 0 0 66.666667%;
        flex: 0 0 66.666667%;
        max-width: 66.666667%;
    }
    .col-md-12{
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
        max-width: 100%;
    }
}
@media screen and (min-width: 992px){
    .col-lg-4{
        -ms-flex: 0 0 33.333333%;
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
    }
    .col-lg-6{
        -ms-flex: 0 0 50%;
        flex: 0 0 50%;
        max-width: 50%;
    }
    .col-lg-8{
        -ms-flex: 0 0 66.666667%;
        flex: 0 0 66.666667%;
        max-width: 66.666667%;
    }
}

</style>