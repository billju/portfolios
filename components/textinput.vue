<template>
<div class="d-flex align-items-center my-1">
    <div class="input-label">{{label}}</div>
    <div class="input-text">
        <input class="input-text" type="text" :name="name" v-model="value" :placeholder="placeholder"
            @input="$emit('input',$event.target.value)" @focusout="validate"/>
        <transition name="bounceIn">
            <div class="text-danger" v-if="!valid">{{alert}}</div>
        </transition>
    </div>
</div>
</template>

<script>
export default {
    name: 'text-input',
    props: {label: String, name: String, placeholder: String, rules: Boolean},
    data(){
        return{
            value: '', valid: true, alert: '',
        }
    },
    methods: {
        validate(){
            this.valid = true
            let rules = [
                v => !!v || 'required',
                v => /.+@.+[.]com/.test(v) || 'invalid format'
            ]
            for(let fn of rules){
                let result = fn(this.value)
                if(result!==true){
                    this.alert = result
                    this.valid = false
                    return
                }
            }
        }
    }
}
</script>

<style scoped>
input[type="text"] {
    width: 100%;
    padding: 5px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #aaa;
}
input[type="text"]:focus{
    outline: none;
}
.d-flex {
    display: flex;
}
.align-items-center {
    align-items: center;
}
.input-label {
    line-height: 30px;
    width: 80px;
}
.input-text {
    width: calc(100% - 50px);
}
.text-danger{
    color: red;
    text-align: left;
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