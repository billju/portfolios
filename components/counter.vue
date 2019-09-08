<template>
<div class="d-flex">
    <div class="btn btn-outline" @click="minus()">-</div>
    <input :type="type" :min="min" :max="max" :value="value" @input="$emit('input',$event.target.value)">
    <div class="btn btn-outline" @click="add()">+</div>
</div>
</template>

<script>
export default {
    name: 'counter',
    props: {
        type: {
            type: String,
            default: 'number'
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 9999
        },
        value: {}
    },
    data(){
        return {
            count: 0
        }
    },
    methods: {
        add(){
            if(this.type=='number'){
                this.count = this.count>=this.max?this.count:this.count+1
                this.$emit('input',this.count)
            }
            this.$emit('add')
        },
        minus(){
            if(this.type=='number'){
                this.count = this.count<=this.min?this.count:this.count-1
                this.$emit('input',this.count)
            }
            this.$emit('minus')
        }
    }
}
</script>

<style scoped>
.d-flex{
    display: flex;
}
input{
    text-align: center;
    border: 1px solid #aaa;
}
.btn{
    padding: 2px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    transition: 0.3s;
}
.btn-outline{
    font-size: 1.5em;
    font-weight: bold;
    border: 1px solid #000;
}
.btn-outline:hover{
    background: #333;
    color: #fff;
}
input[type="number"]::-webkit-inner-spin-button{
    -webkit-appearance: none
}
</style>