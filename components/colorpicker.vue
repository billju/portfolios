<template>
<select v-model="color" @change="$emit('input',color)" :style="{background:color.light}">
    <option v-for="c in colors" :key="c.text" :value="c" :style="{background:c.light}">{{c.text}}</option>
</select>
</template>

<script>
export default {
    data(){
        return{
            color: {},
            colors: [
                {text:'red',primary:'#f44336',light:'#ffcdd2',dark:'#b71c1c'},
                {text:'pink',primary:'#e91e63',light:'#f8bbd0',dark:'#880e4f'},
                {text:'purple',primary:'#9c27b0',light:'#e1bee7',dark:'#4a148c'},
                {text:'deep-purple',primary:'#673ab7',light:'#d1c4e9',dark:'#311b92'},
                {text:'indigo',primary:'#3f51b5',light:'#c5cae9',dark:'#1a237e'},
                {text:'blue',primary:'#2196f3',light:'#bbdefb',dark:'#0d47a1'},
                {text:'light-blue',primary:'#03a9f4',light:'#b3e5fc',dark:'#01579b'},
                {text:'cyan',primary:'#00bcd4',light:'#b2ebf2',dark:'#006064'},
                {text:'teal',primary:'#009688',light:'#b2dfdb',dark:'#004d40'},
                {text:'green',primary:'#4caf50',light:'#c8e6c9',dark:'#1b5e20'},
                {text:'light-green',primary:'#8bc34a',light:'#dcedc8',dark:'#33691e'},
                {text:'lime',primary:'#cddc39',light:'#f0f4c3',dark:'#827717'},
                {text:'yellow',primary:'#ffeb3b',light:'#fff9c4',dark:'#f57f17'},
                {text:'amber',primary:'#ffc107',light:'#ffecb3',dark:'#ff6f00'},
                {text:'orange',primary:'#ff9800',light:'#ffe0b2',dark:'#e65100'},
                {text:'deep-orange',primary:'#ff5722',light:'#ffccbc',dark:'#bf360c'},
                {text:'brown',primary:'#795548',light:'#d7ccc8',dark:'#3e2723'},
                {text:'grey',primary:'#9e9e9e',light:'#f5f5f5',dark:'#212121'},
                {text:'blue-grey',primary:'#607d8b',light:'#cfd8dc',dark:'#263238'},
            ]
        }
    }
}
</script>

<style scoped>
select{
    border: 1px solid #000;
    padding: 5px 10px;
    text-align: center;
}
</style>