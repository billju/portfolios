<template>
<div class="table-container">
    <table class="table table-bordered table-hover" v-if="toggle">
      <tbody>
        <tr>
          <th v-for="(col,ci) in column.cols" :key="ci" :rowspan="col.rowspan" :colspan="col.colspan" 
            @click="toggleColumn(col.name)" :class="selected.includes(col.name)?'active':''"> 
            <div>{{col.name}}</div><small>({{col.type}})</small>
          </th>
        </tr>
        <tr>
          <th v-for="(subcol,ci) in column.subcols" :key="ci">{{subcol.sub}}</th>
        </tr>
        <tr v-for="(row,ri) in rows" :key="ri">
          <td v-for="(col,ci) in column.flatcols" :key="ci" @click="$emit('create-table',{name:col.name,type:col.type,data:row[col.name]})">{{flatParser(row,col) | overflowClip}}</td>
        </tr>
      </tbody>
    </table>
    <table class="table table-bordered table-hover" v-else>
      <tbody>
        <tr v-for="(col,ci) in column.flatcols" :key="ci">
          <th v-if="col.rowspan" :rowspan="col.rowspan" :colspan="col.sub!=undefined?1:2"
            @click="toggleColumn(col.name)" :class="selected.includes(col.name)?'active':''">
            <div>{{col.name}}</div><small>({{col.type}})</small>
          </th>
          <th v-if="col.sub!=undefined">{{col.sub}}</th>
          <td v-for="(row,ri) in rows" :key="ri" @click="$emit('create-table',{name:col.name,type:col.type,data:row[col.name]})">{{flatParser(row,col) | overflowClip}}</td>
        </tr>
    </tbody>
    </table>
</div>
</template>

<script>
export default {
    name: 'json-table',
    props: {
      'rows': {
          type: [Array,Object],
          default: ()=>([])
      },
      'toggle': Boolean, 
    },
    data(){return{selected:[]}},
    methods: {
        flatParser(row, col){
            return col.sub!=undefined?row[col.name][col.sub]:row[col.name]
        },
        columnParser(firstRow){
            let cols = Object.keys(firstRow).map(name=>{
                let val = firstRow[name]
                let isObject = val instanceof Object
                let isArray = val instanceof Array
                let isNested = isObject&&!isArray
                let type = isNested?'Object':isArray?'Array':typeof val
                return {
                    name: name,
                    isNested: isNested,
                    rowspan: isNested?1:2,
                    colspan: isNested?Object.keys(val).length:1,
                    subcols: isNested?Object.keys(val).map((sub,i,arr)=>({name,sub,type,rowspan:i==0?arr.length:0})):[],
                    type: type,
                    select: false
                }
            })
            let subcols = cols.flatMap(x=>x.subcols)
            let flatcols = cols.flatMap(x=>x.isNested?x.subcols:{name:x.name,type:x.type,rowspan:1})
            return {cols,subcols,flatcols}
        },
        toggleColumn(name){
            this.selected = this.selected.includes(name)?this.selected.filter(x=>x!=name):[...this.selected,name]
        },
    },
    computed: {
        column(){
            let firstRow = Array.isArray(this.rows)&&this.rows.length>0?this.rows[0]:[]
            let cols = Object.keys(firstRow).map(name=>{
                let val = firstRow[name]
                let isObject = val instanceof Object
                let isArray = val instanceof Array
                let isNested = isObject&&!isArray
                let type = isNested?'Object':isArray?'Array':typeof val
                return {
                    name: name,
                    isNested: isNested,
                    rowspan: isNested?1:2,
                    colspan: isNested?Object.keys(val).length:1,
                    subcols: isNested?Object.keys(val).map((sub,i,arr)=>({name,sub,type,rowspan:i==0?arr.length:0})):[],
                    type: type
                }
            })
            let subcols = cols.flatMap(x=>x.subcols)
            let flatcols = cols.flatMap(x=>x.isNested?x.subcols:{name:x.name,type:x.type,rowspan:1})
            return {cols,subcols,flatcols}
        },
    },
    filters:{
        overflowClip(obj){
          let str = JSON.stringify(obj)
          return str?str.length>200?str.substr(0,200)+'...':str:''
        }
    },
}
</script>

<style scoped>
table {
  border-collapse: collapse;
}

tr:hover {
  color: #212529;
  background-color: rgba(0, 0, 0, 0.075);
}
th{
  cursor: pointer;
}

th, td {
  border: 1px solid #dee2e6;
  font-size: 0.8em;
  padding: 2px 5px;
}

.active {
  background: pink;
}
</style>