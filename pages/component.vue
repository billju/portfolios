<template>
<div>
    <input type="text" v-model="date">
    <datepicker v-model="date"/>
    <input type="text" v-model="clock">
    <clockpicker v-model="clock"/>
    <input type="text" v-model="dial">
    <dialpicker v-model="dial"/>
</div>
</template>

<script>
import datepicker from '~/components/datepicker.vue'
import clockpicker from '~/components/clockpicker.vue'
import dialpicker from '~/components/dialpicker.vue'
export default {
    components: {datepicker,clockpicker,dialpicker},
    data(){
        return{
            date:'', clock:'', dial: '',
        }
    }
}
</script>

<style>

</style>