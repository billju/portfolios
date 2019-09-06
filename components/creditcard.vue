<template>
<div :style="{color:color}">
    <div class="d-flex align-items-center my-1">
        <div class="input-label text-bold">卡號</div>
        <div class="input-text">
            <div class="d-flex align-items-center">
            <input class="input-number" type="number" v-model="card.c1" placeholder="****" @input="card.c1=limitLength($event,4,'c2')" @focus="card.c1=''" ref="c1" :style="{border:`2px solid ${color}`}"/>
            <div class="text-bold mx-1">-</div>
            <input class="input-number" type="number" v-model="card.c2" placeholder="****" @input="card.c2=limitLength($event,4,'c3')" @focus="card.c2=''" ref="c2" :style="{border:`2px solid ${color}`}"/>
            <div class="text-bold mx-1">-</div>
            <input class="input-number" type="number" v-model="card.c3" placeholder="****" @input="card.c3=limitLength($event,4,'c4')" @focus="card.c3=''" ref="c3" :style="{border:`2px solid ${color}`}"/>
            <div class="text-bold mx-1">-</div>
            <input class="input-number" type="number" v-model="card.c4" placeholder="****" @input="card.c4=limitLength($event,4,'MM')" @focus="card.c4=''" ref="c4" :style="{border:`2px solid ${color}`}"/>
            </div>
            <transition name="bounceIn">
                <div class="text-danger" v-if="submit&&!validation.cardNumber">請填入正確格式</div>
            </transition>
        </div>
    </div>
    <div class="d-flex align-items-center my-1">
        <div class="input-label text-bold">有效年限</div>
        <div class="input-text">
            <div class="d-flex align-items-center">
            <input class="input-number" type="number" v-model="card.MM" placeholder="MM" @input="card.MM=limitLength($event,2,'YY')" @focus="card.MM=''" ref="MM" :style="{border:`2px solid ${color}`}"/>
            <div class="text-bold mx-1">/</div>
            <input class="input-number" type="number" v-model="card.YY" placeholder="YY" @input="card.YY=limitLength($event,2,'securityCode')" @focus="card.YY=''" ref="YY" :style="{border:`2px solid ${color}`}"/>
            </div>
            <transition name="bounceIn">
                <div class="text-danger" v-if="submit&&!validation.YYMM">請填入年月後兩碼</div>
            </transition>
        </div>
    </div>
    <div class="d-flex align-items-center my-1">
        <div class="input-label text-bold">安全碼</div>
        <div class="input-text">
            <div class="d-flex align-items-center">
                <input class="input-number" type="number" v-model="card.securityCode" placeholder="***" @input="card.securityCode=limitLength($event,3,'')" @focus="card.securityCode=''" ref="securityCode" :style="{border:`2px solid ${color}`}"/>
            </div>
            <transition name="bounceIn">
                <div class="text-danger" v-if="submit&&!validation.securityCode">請填數三位數字</div>
            </transition>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'credit-card-input',
    props: {submit:Boolean,theme:String},
    data(){
        return{
            card: {
                c1:'',c2:'',c3:'',c4:'',MM:'',YY:'',securityCode:''
            }
        }
    },
    methods: {
        limitLength(e,num,nextRef){
            if(e.target.value.length>=num&&nextRef){
                if(this.$refs[nextRef].value==''){
                    this.$refs[nextRef].focus()  
                }
            }
            return e.target.value.length>num?e.target.value.slice(-num):e.target.value
        },
    },
    computed:{
        color(){
            return this.theme?this.theme:'#000'
        }
    }
}
</script>

<style scoped>
.d-flex{
    display: flex;
}
.align-items-center{
    align-items: center;
}
.text-bold{
    font-weight: bold;
}
.input-label{
    line-height: 30px;
    padding-left: 5px;
    width: 80px;
}
.input-text{
    width: calc(100% - 50px);
}
.input-number{
    border: 2px solid #000;
    border-radius: 5px;
    width: 50px;
    height: 22px;
    text-align: center;
}
input[type="number"]:focus{
    outline: none;
}
input[type="number"]::-webkit-inner-spin-button{
    -webkit-appearance: none
}
</style>