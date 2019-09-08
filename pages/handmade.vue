<template>
<div>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <h1>date-picker</h1>
                <table><tbody>
                    <tr><th>bind</th><th>type</th><th>demo</th></tr>
                    <tr><td>months</td><td>Array</td><td>Jan~Dec</td></tr>
                    <tr><td>weekdays</td><td>Array</td><td>日~六</td></tr>
                </tbody></table>
                <table><tbody>
                    <tr><th>emit</th><th>type</th><th>demo</th></tr>
                    <tr><td>value</td><td>String</td><td>{{date}}</td></tr>
                </tbody></table>
            </div>
            <div class="col-6">
                <datepicker v-model="date"/>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <h1>clock-picker</h1>
                <table><tbody>
                    <tr><th>emit</th><th>type</th><th>demo</th></tr>
                    <tr><td>value</td><td>String</td><td>{{clock}}</td></tr>
                </tbody></table>
            </div>
            <div class="col-6">
                <clockpicker v-model="clock"/>
            </div>
        </div>
        
        <div class="row">
            <div class="col-6">
                <h1>dial-picker</h1>
                <table><tbody>
                    <tr><th>emit</th><th>type</th><th>demo</th></tr>
                    <tr><td>value</td><td>String</td><td>{{dial}}</td></tr>
                </tbody></table>
            </div>
            <div class="col-6">
                <dialpicker v-model="dial"/>
            </div>
        </div>

        <div class="row">
            <div class="col-4">
                <h1>daterange-picker</h1>
                <table><tbody>
                    <tr><th>bind</th><th>type</th><th>demo</th></tr>
                    <tr><td>banned</td><td>String</td><td>{{rangeBind.banned}}</td></tr>
                    <tr><td>lowerBound</td><td>Date</td><td>{{rangeBind.lb | toLocaleString}}</td></tr>
                    <tr><td>upperBound</td><td>Date</td><td>{{rangeBind.ub | toLocaleString}}</td></tr>
                </tbody></table>
                <table><tbody>
                    <tr><th>emit</th><th>type</th><th>demo</th></tr>
                    <tr><td>value.start</td><td>Date</td><td>{{daterange.start | toLocaleString}}</td></tr>
                    <tr><td>value.end</td><td>Date</td><td>{{daterange.end | toLocaleString}}</td></tr>
                    <tr><td>value.select</td><td>Array</td><td>
                        <ul><li v-for="select in daterange.select" :key="select">{{select}}</li></ul>    
                    </td></tr>
                </tbody></table>
            </div>
            <div class="col-8">
                <daterangepicker v-model="daterange" :banned="rangeBind.banned" :lb="rangeBind.lb" :ub="rangeBind.ub"/>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <h1>stepper</h1>
                <table><tbody>
                    <tr><th>bind</th><th>type</th><th>demo</th></tr>
                    <tr><td>steps</td><td>Array</td><td>
                        <ul><li v-for="(step,si) in stp.steps" :key="si">{{step}}</li></ul>
                        <counter type="text" v-model="stp.input" @add="stp.steps.push(stp.input)" @minus="stp.steps.pop()"/>
                    </td></tr>
                    <tr><td>index</td><td>Number</td><td>
                        <counter type="number" v-model="stp.index" :min="0" :max="stp.steps.length-1"/>
                    </td></tr>
                    <tr><td>background</td><td>String</td><td></td></tr>
                </tbody></table>
            </div>
            <div class="col-12">
                <stepper :steps="stp.steps" :index="stp.index*1"/>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <h1>creditcard</h1>
                <p>可以自動換格輸入</p>
                <table><tbody>
                    <tr><th>emit</th><th>type</th><th>demo</th></tr>
                    <tr><td>value.cardNumber</td><td>String</td><td>{{creditCard.cardNumber}}</td></tr>
                    <tr><td>value.MM</td><td>String</td><td>{{creditCard.MM}}</td></tr>
                    <tr><td>value.YY</td><td>String</td><td>{{creditCard.YY}}</td></tr>
                    <tr><td>value.securityCode</td><td>String</td><td>{{creditCard.securityCode}}</td></tr>
                </tbody></table>
                <table><tbody>
                    <tr><th>ref methods</th><th>return</th><th>demo</th></tr>
                    <tr><td>validate</td><td>Boolean</td><td><button class="btn btn-outline" @click="validate()">點我驗證</button></td></tr>
                </tbody></table>
            </div>
            <div class="col-6">
                <creditcard ref="creditCard" v-model="creditCard"/>
            </div>
        </div>

        <div class="row">
            <div class="col-6">
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
                <p>將json轉成表格方便閱覽，並且可以標註特定欄位</p>
                <table><tbody>
                    <tr><th>bind</th><th>type</th><th>說明</th></tr>
                    <tr><td>rows</td><td>Array</td><td>輸入資料</td></tr>
                    <tr><td>toggle</td><td>Boolean</td><td>切換橫向或直向</td></tr>
                    <tr><td>maxLen</td><td>Number</td><td>最大顯示筆數</td></tr>
                    <tr><th>emit</th><th>type</th><th>說明</th></tr>
                    <tr><td>create-table</td><td>Object</td><td>點擊td的事件</td></tr>
                </tbody></table>
                <div class="col-12">
                    <textarea class="col-12" v-model="url"></textarea>
                    <progressbar v-if="onProgress"/>
                </div>
                <div>
                    <button class="btn btn-outline" @click="getPtx()">GET</button>
                    <span>上方TEXTAREA的網址</span>
                </div>
            </div>
            <div class="col-6">
                <json2container v-for="(value,name) in tables" :key="name" :rows="value" :title="name" @create-table="createTable" @close-table="closeTable"/>
            </div>
        </div>
    </div>
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
import switcher from '~/components/switcher.vue'
import counter from '~/components/counter.vue'
import progressbar from '~/components/progressbar.vue'
import json2table from '~/components/json2table.vue'
import json2container from '~/components/json2container.vue'
import navbar from '~/components/navbar.vue'
export default {
    components: {datepicker,clockpicker,dialpicker,daterangepicker,stepper,creditcard,switcher,counter,progressbar,json2container,navbar},
    data(){
        return{
            date:'', clock:'', dial: '', 
            rangeBind: {banned:['2019/9/29'],lb:new Date(),ub:new Date()},
            daterange: {start:'',end:'',select:[]}, 
            stp: {steps: ['購物車','付款方式','完成訂單'],index: 0,background: 'cyan',input:''},
            creditCard: {},
            onProgress: false, url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/Schedule/InterCity?$top=5&$format=JSON',
            tables: {},
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
        }
    },
    filters: {
        toLocaleString(v){
            return v?v.toLocaleString():''
        }
    },
    mounted(){
        let ms = new Date().getTime()
        this.rangeBind.lb.setTime(ms-24*60*60*1000)
        this.rangeBind.ub.setTime(ms+60*24*60*60*1000)
    }
}
</script>

<style scoped>
body{
    background: #fff;
}
.container{
    max-width: 1280px;
    margin: 0 auto;
    min-height: 100vh;
    padding-top: 55px;
}
textarea{
    border: 1px solid #aaa;
}
table{
    border-collapse: collapse;
    margin-top: 10px;
}
tr:hover {
  background-color: rgba(0, 0, 0, 0.075);
}
th, td{
    border: 1px solid #000;
    padding: 5px 10px;
}
td.flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
}
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

.row{
    display: flex;
    flex-wrap: wrap
}
.col-4, .col-6, .col-8, .col-12{
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.col-4{
    width: calc(100% * 4 / 12);;
}
.col-6{
    width: calc(100% * 6 / 12);;
}
.col-8{
    width: calc(100% * 8 / 12);
}
.col-12{
    width: 100%;
}
@media screen and (max-width: 600px){
    .col-4, .col-6, .col-8{
        width: 100%;
    }
}
</style>