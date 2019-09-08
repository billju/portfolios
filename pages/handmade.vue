<template>
<div>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <h1>date-picker</h1>
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
                    <tr><td>banned</td><td>String</td><td></td></tr>
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
                <daterangepicker v-model="daterange"/>
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
                <stepper :steps="stp.steps" :index="stp.index"/>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <h1>creditcard</h1>
                <p>可以自動換格輸入</p>
                <table><tbody>
                    <tr><th>emit</th><th>type</th><th>demo</th></tr>
                    <tr><td>value.cardNumber</td><td>String</td><td></td></tr>
                    <tr><td>value.MM</td><td>Number</td><td></td></tr>
                    <tr><td>value.YY</td><td>Number</td><td></td></tr>
                    <tr><td>value.securityCode</td><td>Number</td><td></td></tr>
                </tbody></table>
                <table><tbody>
                    <tr><th>ref methods</th><th>return</th><th>demo</th></tr>
                    <tr><td>validate</td><td>Boolean</td><td><button @click="validate()">驗證</button></td></tr>
                </tbody></table>
            </div>
            <div class="col-6">
                <creditcard ref="creditCard"/>
            </div>
        </div>

        <div class="row">
            <div class="col-4">
                <h1>json2table</h1>
                <p></p>
                <table><tbody>
                    <tr><th>emit</th><th>type</th><th>demo</th></tr>
                    <tr><td>rows</td><td>Array</td><td></td></tr>
                    <tr><td>toggle</td><td>Boolean</td><td class="flex-center"><switcher v-model="jsonTable.toggle"/></td></tr>
                    <tr><td>maxLen</td><td>Number</td><td><input type="number"></td></tr>
                </tbody></table>
            </div>
            <div class="col-8">
                <!-- <json2table :rows="jsonTable.rows" :toggle="jsonTable.toggle"/> -->
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <h1>json2container</h1>
                <p></p>
                <table><tbody>
                    <tr><th>emit</th><th>type</th><th>demo</th></tr>
                    <tr><td>value.c1~c4</td><td>String</td><td></td></tr>
                </tbody></table>
            </div>
            <div class="col-8">
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
import json2table from '~/components/json2table.vue'
import json2container from '~/components/json2container.vue'
import navbar from '~/components/navbar.vue'
export default {
    components: {datepicker,clockpicker,dialpicker,daterangepicker,stepper,creditcard,switcher,counter,json2table,navbar},
    data(){
        return{
            date:'', clock:'', dial: '', daterange: {}, 
            stp: {steps: ['購物車','付款方式','完成訂單'],index: 0,background: 'cyan',input:''},
            jsonTable: {rows:[{bang:'cool'}],toggle:false},
        }
    },
    methods: {
        validate(){
            this.$refs.creditCard.validate()
        }
    },
    filters: {
        toLocaleString(v){
            return v?v.toLocaleString():''
        }
    }
}
</script>

<style>
*{
    font-family: 微軟正黑體;
}
</style>
<style scoped>
.container{
    max-width: 1280px;
    margin: 0 auto;
    min-height: 100vh;
    padding-top: 55px;
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