<template>
<div :style="{color:color}">
    <div class="d-flex align-items-center my-1">
        <div class="input-label text-bold">卡號</div>
        <div class="input-text">
            <div class="d-flex align-items-center">
            <input class="input-number" type="number" v-model="card.c1" placeholder="****" @input="limitLength($event,4,'c1','c2')" @focus="card.c1=''" ref="c1" :style="{border:`2px solid ${color}`}"/>
            <div class="text-bold mx-1">-</div>
            <input class="input-number" type="number" v-model="card.c2" placeholder="****" @input="limitLength($event,4,'c2','c3')" @focus="card.c2=''" ref="c2" :style="{border:`2px solid ${color}`}"/>
            <div class="text-bold mx-1">-</div>
            <input class="input-number" type="number" v-model="card.c3" placeholder="****" @input="limitLength($event,4,'c3','c4')" @focus="card.c3=''" ref="c3" :style="{border:`2px solid ${color}`}"/>
            <div class="text-bold mx-1">-</div>
            <input class="input-number" type="number" v-model="card.c4" placeholder="****" @input="limitLength($event,4,'c4','MM')" @focus="card.c4=''" ref="c4" :style="{border:`2px solid ${color}`}"/>
            </div>
            <transition name="bounceIn">
                <div class="text-danger" v-if="invalid.cardNumber">請填入正確格式</div>
            </transition>
        </div>
    </div>
    <div class="d-flex align-items-center my-1">
        <div class="input-label text-bold">有效年限</div>
        <div class="input-text">
            <div class="d-flex align-items-center">
            <input class="input-number" type="number" v-model="card.MM" placeholder="MM" @input="limitLength($event,2,'MM','YY')" @focus="card.MM=''" ref="MM" :style="{border:`2px solid ${color}`}"/>
            <div class="text-bold text-center">/</div>
            <input class="input-number" type="number" v-model="card.YY" placeholder="YY" @input="limitLength($event,2,'YY','securityCode')" @focus="card.YY=''" ref="YY" :style="{border:`2px solid ${color}`}"/>
            </div>
            <transition name="bounceIn">
                <div class="text-danger" v-if="invalid.MMYY">請填入年月後兩碼</div>
            </transition>
        </div>
    </div>
    <div class="d-flex align-items-center my-1">
        <div class="input-label text-bold">安全碼</div>
        <div class="input-text">
            <div class="d-flex align-items-center">
                <input class="input-number" type="number" v-model="card.securityCode" placeholder="***" @input="limitLength($event,3,'securityCode','')" @focus="card.securityCode=''" ref="securityCode" :style="{border:`2px solid ${color}`}"/>
            </div>
            <transition name="bounceIn">
                <div class="text-danger" v-if="invalid.securityCode">請填數三位數字</div>
            </transition>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'credit-card-input',
    props: {
        submit:Boolean,
        color: {
            type:String,
            default: '#000'
        }
    },
    data(){
        return{
            card: {
                c1:'',c2:'',c3:'',c4:'',MM:'',YY:'',securityCode:''
            },
            invalid: {
                cardNumber:false, MMYY: false, securityCode: false
            }
        }
    },
    methods: {
        limitLength(e,num,cardKey,nextRef){
            if(e.target.value.length>=num&&nextRef){
                if(this.$refs[nextRef].value==''){
                    this.$refs[nextRef].focus()  
                }
            }
            this.card[cardKey] = e.target.value.length>num?e.target.value.slice(-num):e.target.value
            this.clearRule()
            this.sendValue()
        },
        sendValue(){
            this.$emit('input',{
                cardNumber: this.card.c1+this.card.c2+this.card.c3+this.card.c4,
                MM: this.card.MM,
                YY: this.card.YY,
                securityCode: this.card.securityCode
            })
        },
        clearRule(){
            Object.keys(this.invalid).map(key=>this.invalid[key]=false)
        },
        validate(){  
            this.clearRule()
            window.setTimeout(()=>{
                Object.assign(this.invalid,{
                    cardNumber: (this.card.c1+this.card.c2+this.card.c3+this.card.c4).length<16,
                    MMYY: (this.card.MM+this.card.YY).length<4,
                    securityCode: this.card.securityCode.length<3
                })
                return Object.keys(this.invalid).every(key=>this.invalid[key]==false)
            },100)
        }
    },
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
.text-center{
    text-align: center;
}
.text-danger{
    color: red;
}
.input-label{
    line-height: 30px;
    padding-left: 5px;
    width: 80px;
    font-size: 1.1em;
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
.bounceIn-enter-active {
    animation: bounceIn 0.5s;
}
@keyframes bounceIn {
    0% {
        opacity: 0;
        transform: scale3d(0.3, 0.3, 0.3);
    }
    20% {
        transform: scale3d(1.1, 1.1, 1.1);
    }
    40% {
        transform: scale3d(0.9, 0.9, 0.9);
    }
    60% {
        opacity: 1;
        transform: scale3d(1.03, 1.03, 1.03);
    }
    80% {
        transform: scale3d(0.97, 0.97, 0.97);
    }
    100% {
        opacity: 1;
        transform: scale3d(1, 1, 1);
    }
}
</style>