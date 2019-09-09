<template>
  <div style="width: 100%">
    <div class="input-group">
      <div class="input-group-text">{{title}}</div>
      <div class="input-group-text">
        <switcher v-model="displayToggle"/>
      </div>
      <input type="number" v-model.number="maxLength"/>
      <div class="input-group-text" @click="$emit('close-table',title)">
        <div class="close"></div>
      </div>
    </div>
    <div class="overflow-x">
      <json2table :rows="slicedRows" :toggle="displayToggle" @create-table="$emit('create-table',$event)"/>
    </div>
  </div>
</template>

<script>
import switcher from './switcher.vue';
import json2table from './json2table.vue';
export default {
    name: 'json-table-container',
    components: {json2table,switcher},
    props: {
      'rows': [Array,Object], 
      'title': String
    },
    data(){
      return{
            displayToggle:false,
            maxLength: 10,
        }
    },
    computed:{
      slicedRows(){
        return Array.isArray(this.rows)?this.rows.slice(0,this.maxLength):this.rows
      }
    }
}
</script>

<style scoped>
button {
  border: 1px solid #ccc;
  background: #333;
  color: #fff;
  padding: 5px 10px;
}

textarea {
  resize: none;
}

input[type="number"] {
  width: 60px;
  padding-left: 5px;
}

input[type="text"] {
  max-width: 100px;
  padding-left: 5px;
}

.input-group {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}

.input-group-text {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  background: #dee2e6;
}
.close{
    position: absolute;
    width: 12px;
    height: 12px;
    cursor: pointer;
    opacity: 0.3;
}
.close:hover{
    opacity: 1;
}
.close::before, .close::after {
    content: "";
    position: absolute;
    left: 5px;
    height: 16px;
    width: 2px;
    background-color: #000;
    transform: rotate(45deg);
}
.close::after{
    transform: rotate(-45deg);
}
.overflow-x{
  width: 100%;
  overflow-x: scroll;
}
.form-control {
  flex: 1 1 auto;
  outline: 0;
  border: 1px solid #ced4da;
  line-height: 1.5;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  color: #495057;
  outline: 0;
  background: #fff;
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>