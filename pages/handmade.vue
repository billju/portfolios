<template>
<div ref="container">
    <div class="dark pt-50"><div class="row">
        <div class="col col-sm-12 col-md-6">
            <h1>Spectrum &amp; Wavefrom</h1>
            <p>頻譜與波型顯示組件，輸入音頻並且做快速傅立葉轉換來呈現波形</p>
            <table><tbody>
                <tr><th>bind</th><th>type</th><th>說明</th></tr>
                <tr><td>audioContext</td><td>Object</td><td>原生音頻類別</td></tr>
                <tr><td>input</td><td>Object</td><td>音頻節點輸入</td></tr>
            </tbody></table>
        </div>
        <div class="col col-sm-12 col-md-6">
            <spectrum :audioContext="ctx" :input="this.biquadFilter"/>
            <waveform :audioContext="ctx" :input="this.biquadFilter"/>
        </div>
        <div class="col col-sm-12 col-md-6">
            <h1>Oscillator</h1>
            <p>振盪器</p>
            <table><tbody>
                <tr><th>bind</th><th>type</th><th>說明</th></tr>
                <tr><td>audioContext</td><td>Object</td><td>原生音頻類別</td></tr>
                <tr><td>output</td><td>Object</td><td>音頻節點輸出</td></tr>
                <tr><td>detune</td><td>Number</td><td>解諧(頻率微調)</td></tr>
                <tr><td>adsr</td><td>Object</td><td>波封(音量隨時間變化的模式)</td></tr>
                <tr><th>ref method</th><th>return</th><th>說明</th></tr>
                <tr><td>oscStart</td><td>undefined</td><td>播放振盪器</td></tr>
                <tr><td>oscStop</td><td>undefined</td><td>停止振盪器</td></tr>
                <tr><td>modulate</td><td>undefined</td><td>調變(控制播放中的振盪器)</td></tr>
            </tbody></table>
        </div>
        <div class="col col-sm-12 col-md-6">
            <osc ref="osc" :adsr="adsr" :audioContext="ctx" :detune="detune" :output="this.masterGain"/>    
        </div>
        <div class="col col-sm-12 col-md-6">
            <h1>Pianokey</h1>
            <p></p>
            <table><tbody>
                <tr><th>bind</th><th>type</th><th>說明</th></tr>
                <tr><td>pianoKeys</td><td>Array</td><td>琴鍵物件</td></tr>
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
            <h1>Knob</h1>
            <p></p>
            <table><tbody>
                <tr><th>bind</th><th>type</th><th>說明</th></tr>
                <tr><td>max</td><td>Number</td><td>最大值</td></tr>
                <tr><td>min</td><td>Number</td><td>最小值</td></tr>
                <tr><td>step</td><td>Number</td><td>刻度</td></tr>
                <tr><td>value</td><td>Number</td><td>數值</td></tr>
                <tr><td>label</td><td>String</td><td>底下的標籤</td></tr>
                <tr><td>container</td><td>HTMLElement</td><td>包裝器</td></tr>
                <tr><th>emit</th><th>type</th><th>demo</th></tr>
                <tr><td>value</td><td>Number</td><td>{{volume}}</td></tr>
            </tbody></table>
        </div>
        <div class="col col-sm-12 col-md-6">
            <div>
                <knob label="ATTACK" :container="container" :min="0" :max="1" v-model="adsr.a"/>
                <knob label="DECAY" :container="container" :min="0" :max="1" v-model="adsr.d"/>
                <knob label="SUSTAIN" :container="container" :min="0" :max="1" v-model="adsr.s"/>
                <knob label="RELEASE" :container="container" :min="0" :max="1" v-model="adsr.r"/>
            </div>
            <div>
                <knob label="DETUNE" :container="container" :min="-100" :max="100" v-model="detune" @input="oscMod()"/>
                <knob label="VOLUME" :container="container" :min="0" :max="0.3" v-model="volume" @input="masterGain.gain.value=$event"/>
                <knob label="FILTER" :container="container" :min="5" :max="14" v-model="pow" @input="biquadFilter.frequency.value=Math.pow(2,$event)"/>
            </div>
        </div>
    </div></div>
    <div class="light"><div class="row">
        <div class="col col-sm-12 col-md-6">
            <h1>date-picker</h1>
            <p>日期選擇器，點擊中上方的大按鈕可以切換成選擇年月</p>
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
    <div class="light-grey"><div class="row">
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
    </div></div>

    <div class="light"><div class="row">
        <div class="col col-sm-12 col-lg-4">
            <h1>daterange-picker</h1>
            <p>日期範圍選擇器，旅行飯店機票通用</p>
            <table><tbody>
                <tr><th>bind</th><th>type</th><th>實例</th></tr>
                <tr><td>banned</td><td>String</td><td>{{rangeBind.banned}}</td></tr>
                <tr><td>lb(lower bound)</td><td>Date</td><td>{{rangeBind.lb | toLocaleString}}</td></tr>
                <tr><td>ub(upper bound)</td><td>Date</td><td>{{rangeBind.ub | toLocaleString}}</td></tr>
                <tr><th>emit</th><th>type</th><th>實例</th></tr>
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
            <h1>stepper</h1>
            <p>步驟提示欄位，結帳教學指導通用</p>
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
            <h1>creditcard</h1>
            <p>信用卡輸入、自動換格</p>
            <table><tbody>
                <tr><th>emit</th><th>type</th><th>demo</th></tr>
                <tr><td>value.cardNumber</td><td>String</td><td>{{creditCard.cardNumber}}</td></tr>
                <tr><td>value.MM</td><td>String</td><td>{{creditCard.MM}}</td></tr>
                <tr><td>value.YY</td><td>String</td><td>{{creditCard.YY}}</td></tr>
                <tr><td>value.securityCode</td><td>String</td><td>{{creditCard.securityCode}}</td></tr>
                <tr><th>ref methods</th><th>return</th><th>demo</th></tr>
                <tr><td>validate</td><td>Boolean</td><td><button class="btn btn-outline" @click="validate()">點我驗證</button></td></tr>
            </tbody></table>
        </div>
        <div class="col col-sm-12 col-md-6 col-lg-4">
            <creditcard ref="creditCard" v-model="creditCard"/>
        </div>
    </div></div>

    <div class="light"><div class="row">
        <div class="col col-sm-12 col-lg-6">
            <h1>json2container</h1>
            <p>提供子元件控制項，點擊Array或Object格式的方框可以產生子表格</p>
            <table><tbody>
                <tr><th>bind</th><th>type</th><th>說明</th></tr>
                <tr><td>rows</td><td>Array</td><td>JSON資料</td></tr>
                <tr><td>title</td><td>String</td><td>JSON的key值</td></tr>
                <tr><th>emit</th><th>type</th><th>說明</th></tr>
                <tr><td>create-table</td><td>Object</td><td>將事件再往上傳</td></tr>
                <tr><td>close-table</td><td>String</td><td>關閉表格</td></tr>
            </tbody></table>

            <h1>json2table</h1>
            <p>將json轉成表格方便閱覽，點擊欄位名稱可以反白標註</p>
            <table><tbody>
                <tr><th>bind</th><th>type</th><th>說明</th></tr>
                <tr><td>rows</td><td>Array</td><td>輸入資料</td></tr>
                <tr><td>toggle</td><td>Boolean</td><td>切換橫向或直向</td></tr>
                <tr><td>maxLen</td><td>Number</td><td>最大顯示筆數</td></tr>
                <tr><th>emit</th><th>type</th><th>說明</th></tr>
                <tr><td>create-table</td><td>Object</td><td>點擊td的事件</td></tr>
                <tr><td colspan="3" class="pa-0">
                    <textarea class="col col-sm-12" v-model="url"/>
                    <progressbar v-if="onProgress"/>
                </td></tr>
                <tr><td colspan="3">
                    <button class="btn btn-outline" @click="getPtx()">GET</button>
                    <span>上方TEXTAREA的網址</span>
                </td></tr>
            </tbody></table>
        </div>
        <div class="col col-sm-12 col-lg-6">
            <json2container v-for="(value,name) in tables" :key="name" :rows="value" :title="name" @create-table="createTable" @close-table="closeTable"/>
        </div>
    </div></div>
    <navbar/>
</div>
</template>

<script>
import datepicker from '~/components/datepicker.vue'
import clockpicker from '~/components/clockpicker.vue'
import dialpicker from '~/components/dialpicker.vue'
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
export default {
    components: {
        datepicker,clockpicker,dialpicker,daterangepicker,
        stepper,creditcard,counter,colorpicker,
        switcher,progressbar,json2container,
        waveform,spectrum,osc,pianokey,knob,
        navbar,
    },
    head(){
        return {
            title: 'chuboy',
            meta: [
                {hid:'description', name:'description', content:'My awesome portfolios'}
            ]
        }
    },
    data(){
        return{
            date:'', clock:'', dial: '', container: undefined,
            rangeBind: {banned:['2019/9/29'],lb:new Date(),ub:new Date()},
            daterange: {start:'',end:'',select:[]}, 
            stp: {steps: ['購物車','付款方式','完成訂單'],index: 0,background: 'cyan',input:''},
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
</style>
<style scoped>
.pt-50{
    padding-top: 50px;
}
/* color */
.light{
    
}
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
    white-space: pre;
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