<template>
<div class="date-range-picker">
    <div class="arrow" @click="setLastMonth()">＜</div>
    <div class="d-flex flex-wrap justify-content-center">
      <div class="my-2">
        <div class="text-center text-bold pa-2">{{months[prev.m-1]}} {{prev.y}}</div>
        <table>
          <tbody>
            <tr>
              <th v-for="(wd, wi) in weekdays" :key="wi">{{wd}}</th>
            </tr>
            <tr v-for="(week,wi) in prevWeeks" :key="wi">
              <td v-for="(day,di) in week" :key="di">
                <div :class="tdClass(day)" @click="setDate(day)" @mouseover="hover(day)">{{day==undefined?"":day.d}}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class='my-2'>
        <div class="text-center text-bold pa-2">{{months[next.m-1]}} {{next.y}}</div>
        <table>
          <tbody>
            <tr>
              <th v-for="(wd, wi) in weekdays" :key="wi">{{wd}}</th>
            </tr>
            <tr v-for="(week,wi) in nextWeeks" :key="wi">
              <td v-for="(day,di) in week" :key="di">
                <div :class="tdClass(day)" @click="setDate(day)" @mouseover="hover(day)">{{day==undefined?"":day.d}}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="arrow" @click="setNextMonth()">＞</div>
</div>
</template>

<script>
export default {
  props: {
    banned: {
      type: Array,
      default: ()=> []
    }, 
    lb: {
      type:Object,
      default: undefined
    },
    ub: {
      type:Object,
      default: undefined
    },
  },
  data(){
    return {
      next: {},
      prev: {},
      start: new Date(),
      end: new Date(),
      selecting: null,
      nextWeeks: [],
      prevWeeks: [],
      selected: [],
      months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      weekdays: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    }
  },
  methods:{
    setLastMonth(){
      this.next = this.prev
      this.nextWeeks = this.prevWeeks
      this.prev = this.getLastYearMonth(this.prev.y,this.prev.m)
      this.prevWeeks = this.getWeeks(this.prev.y,this.prev.m)
    },
    setNextMonth(){
      this.prev = this.next
      this.prevWeeks = this.nextWeeks
      this.next = this.getNextYearMonth(this.prev.y,this.prev.m)
      this.nextWeeks = this.getWeeks(this.next.y,this.next.m)
    },
    getNextYearMonth(year,month){
      let nextMonth = month+1>12?1:month+1,
          nextMonthYear = month+1>12?year+1:year
      return {y:nextMonthYear,m:nextMonth}
    },
    getLastYearMonth(year,month){
      let lastMonth = month-1<1?12:month-1,
          lastMonthYear = month-1<1?year-1:year
      return {y:lastMonthYear,m:lastMonth}
    },
    getWeeks(year,month){
      let daysInMonth = new Date(year,month,0).getDate(),
          weekday = new Date(year,month-1,1).getDay(),
          weeks = [],
          week = []
      for(let i=1;i<=daysInMonth;i++){
        week[weekday] = {y:year,m:month,d:i}
        weekday+=1
        if(weekday>6){
          weeks.push(week)
          week = []
          weekday = 0
        }
      }
      if(week.length){weeks.push(week)}
      return weeks
    },
    setDate(day){
      if(day!==undefined){
        let date = new Date(day.y,day.m-1,day.d)
        if((date>this.lb||this.lb==undefined)&&(date<this.ub||this.ub==undefined)){
          if(this.selecting){
            if(date<this.selecting){
              this.end = date<this.selecting?this.selecting:this.end
              this.start = date<this.selecting?date:this.selecting
            }else{
              this.end = date
            }
            let tmp = this.start.getTime()
            this.selected = []
            while(tmp<=this.end.getTime()){
              let tmpDate = new Date()
              tmpDate.setTime(tmp)
              this.selected.push(tmpDate.toLocaleDateString())
              tmp+=1000*60*60*24
            }
            this.selecting = null
          }else{
            this.start = date
            this.end = date
            this.selecting = date
          }
          this.$emit('input', {start:this.start,end:this.end,select:this.selected})
        }
      }
    },
    hover(day){
      if(day!==undefined){
        let date = new Date(day.y,day.m-1,day.d)
        if(this.selecting){
          if(date<this.selecting){
            this.end = date<this.selecting?this.selecting:this.end
            this.start = date<this.selecting?date:this.selecting
          }else{
            this.start = this.selecting
            this.end = date
          }
        }
      }
    },
    tdClass(day){
      if(day!==undefined){
        let date = new Date(day.y,day.m-1,day.d),
            str = date.toLocaleDateString()
        if(this.banned.includes(str)||date<this.lb||date>this.ub){return 'banned'}
        if(this.start<=date&&date<=this.end){
          if(this.start>=date&&date>=this.end
            ||(this.end<=date&&date.getDay()==0)
            ||(this.start>=date&&date.getDay()==6)
            ){return 'round active'}
          else if(this.start>=date||date.getDay()==0){return 'left-round active'}
          else if(this.end<=date||date.getDay()==6){return 'right-round active'}
          else{return 'active'}
        }else{
          return 'round-hover'
        }
      }
    },
  },
  mounted(){
    let d = new Date();
    this.prev = {y:d.getFullYear(),m:d.getMonth()+1}
    this.prevWeeks = this.getWeeks(this.prev.y,this.prev.m)
    this.next = this.getNextYearMonth(this.prev.y,this.prev.m)
    this.nextWeeks = this.getWeeks(this.next.y,this.next.m)
  }
}
</script>

<style scoped>
.date-range-picker{
  user-select: none;
  display: flex;
  color: #38470B;
  font-family: sans-serif;
}
.d-flex{
  display: flex;
}
.flex-wrap{
  flex-wrap: wrap;
}
.justify-content-center{
  justify-content: center;
}
.arrow{
  font-weight: 900;
  font-size: 32px;
  cursor: pointer;
  color: #38470B;
  margin-top: 10px;
}
.my-2{
  margin-left: 10px;
  margin-right: 10px;
}
.pa-2{
  padding: 10px;
}
.text-center{
  text-align: center;
}
.text-bold{
  font-weight: bold;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th{
  color: #949C7C;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
td{
  width: 40px;
  height: 40px;
  padding: 0;
  padding-top: 5px;
  text-align: center;
  line-height: 30px;
  color: #38470B;
}

.round-hover:hover {
  box-shadow: 0 0 0 1px #949C7C inset;
  cursor: pointer;
  border-radius: 15px;
}
.round{
  border-radius: 15px;
}
.left-round{
  border-radius: 15px 0 0 15px;
  background: #949C7C;
  color: #fff;
  position: relative;
  z-index:66;
}
.right-round{
  border-radius: 0 15px 15px 0;
}
.active{
  background: #949C7C;
  color: #fff;
}
.banned{
  text-decoration: line-through;
  color: #ccc;
}
</style>