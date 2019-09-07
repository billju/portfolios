<template>
  <div class="datepicker">
    <div class="overflow-hidden py-2 bg-primary text-light">
      <transition name="slide-up">
        <div class="text-center w-100p" :key="showDate">{{showDate}}</div>
      </transition>
    </div>
    <div class="d-flex flex-wrap w-100p overflow-y-scroll" v-if="!year">
      <div class="w-33p text-center py-2" v-for="y in years" :key="y" @click="year=y;month=null">{{y}}</div>
    </div>
    <div class="d-flex flex-wrap w-100p" v-else-if="!month">
      <div class="w-33p text-center py-2" v-for="(m,mi) in months" :key="mi" @click="month=mi+1;setCalendar(year,month)">{{m}}</div>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-1 mx-1" v-else>
      <div class="btn" @click="setCalendar(last.y,last.m);swipe_left=false">＜</div>
      <div class="date-btn" @click="year=null">
        <transition :name="swipe_left?'swipe-left':'swipe-right'">
          <div class="btn" :key="month">{{months[month-1]}} {{year}}</div>
        </transition>
      </div>
      <div class="btn text-right" @click="setCalendar(next.y,next.m);swipe_left=true;">＞</div>
    </div>
    <table v-if="year&&month">
        <tbody>
          <tr>
            <th class="text-center pa-1" v-for="(wd, wi) in weekdays" :key="wi">{{wd}}</th>
          </tr>
        </tbody>
    </table>
    <hr class="ma-1"/>
    <transition :name="swipe_left?'swipe-left':'swipe-right'">
      <table v-if="year&&month" :key="month">
        <tbody>
          <tr v-for="(week,wi) in weeks" :key="wi">
            <td class="text-center pa-1" v-for="(day,di) in week" :key="di" :class="tdClass(day)" @click="setDate(day,di)">{{day.d}}</td>
          </tr>
        </tbody>
      </table>
    </transition>
    <hr class="ma-1"/>
  </div>
</template>

<script>
export default {
   name: 'datepicker',
    data(){
        return {
            year: 2019, month: 7,
            date: {y:2019,m:7,d:1,weekday:1},
            next: {y:2019,m:6}, last:{y:2019,m:4},
            weeks: [[{y:2019,m:4,d:28},{y:2019,m:4,d:29}]],
            years: [2018,2019],
            months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            weekdays: ['日','一','二','三','四','五','六'],
            swipe_left: false,
        }
    },
    methods:{
        setCalendar(year,month){
            var weeks = []
            this.year = year; this.month = month;
            var daysInMonth = new Date(this.year,this.month,0).getDate()
            var firstWeekDayInMonth = new Date(this.year,this.month-1,1).getDay();
            var lastWeekDayInMonth = new Date(this.year,this.month-1,daysInMonth).getDay();
            //先算上個月的
            var lastMonth = this.month-1<1?12:this.month-1
            var lastMonthYear = this.month-1<1?this.year-1:this.year
            if(firstWeekDayInMonth>0){//星期一到六
                var daysInLastMonth = new Date(lastMonthYear,lastMonth,0).getDate();
                for(var i=0;i<firstWeekDayInMonth;i++){
                    weeks.unshift({y:lastMonthYear,m:lastMonth,d:daysInLastMonth-i})
                }
            }
            //這個月的
            for(var i=0;i<daysInMonth;i++){
                weeks.push({y:this.year,m:this.month,d:i+1})
            }
            //下個月的
            var nextMonth = this.month+1>12?1:this.month+1
            var nextMonthYear = this.month+1>12?this.year+1:this.year
            for(var i=0;i<6-lastWeekDayInMonth;i++){
                weeks.push({y:nextMonthYear,m:nextMonth,d:i+1})
            }
            //把資訊載入按鈕
            this.last = {y:lastMonthYear,m:lastMonth}
            this.next = {y:nextMonthYear,m:nextMonth}
            //暴力塞入
            this.weeks = [0, 1, 2, 3, 4, 5, 6].map(x=>weeks.slice(x*7,x*7+7))
        },
        setDate(day,di){
            this.weekday = di;
            this.date = {y:day.y,m:day.m,d:day.d,weekday:di}
            this.$emit('input', this.showDate)
        },
        tdClass(day){
            if(day.y==this.date.y&&day.m==this.date.m&&day.d==this.date.d){return 'active'}
            else{return this.month==day.m?'':'text-muted'}
        },
    },
    computed:{
        showDate(){
            return this.date.y+'年'+this.date.m+'月'+this.date.d+'日 星期'+this.weekdays[this.date.weekday]
        }
    },
    mounted(){
        var d = new Date();
        this.year = d.getFullYear();
        this.years = Array.from(Array(150).keys(),i=>this.year-100+i)
        this.month = d.getMonth()+1;
        this.setCalendar(this.year,this.month)
    }
}

</script>

<style scoped>
.datepicker {
  width: 250px;
  border-radius: 5px;
  user-select: none;
  overflow: hidden;
  position: relative;
  background: #fff;
  font-family: 微軟正黑體;
}

.datepicker > table {
  width: 100%;
}

.datepicker td:hover {
  background: #00bcd4;
  color: #fff;
  cursor: pointer;
}
.active{
  background: #00bcd4;
  color: #fff;
}

.overflow-hidden{
  overflow: hidden;
}
.bg-primary{
  background: #00bcd4;
}
.text-light{
  color: #fff;
}
.text-center{
  text-align: center;
}
.text-right{
  text-align: right;
}
.text-muted{
  color: #aaa;
}
.py-2{
  padding-top: 5px;
  padding-bottom: 5px;
}
.d-flex{
  display: flex;
}
.flex-wrap{
  flex-wrap: wrap;
}
.justify-content-between{
  justify-content: space-between;
}
.align-items-center{
  align-items: center;
}
.w-100p{
  width: 100%;
}
.w-33p{
  width: 33.33%;
  cursor: pointer;
}
.w-33p:hover{
  background: #00bcd4;
  color: #fff;
}
.overflow-y-scroll{
  overflow-y: scroll;
  max-height: 300px;
}
.btn{
  cursor: pointer;
  font-weight: bold;
}
.date-btn{
  color: #00bcd4;
  border: 1px solid #00bcd4;
  border-radius: 5px;
  padding: 5px 10px;
  text-align: center;
  cursor: pointer;
}

.slide-up-enter-active {
  animation: slide-in 0.5s ease-out;
}

.slide-up-leave-active {
  position: absolute;
  animation: slide-out 0.5s ease-in reverse;
}

@keyframes slide-in {
  0% {
    transform: translateY(100%) rotateX(60deg);
    opacity: 0.5;
  }
}
@keyframes slide-out {
  0% {
    transform: translateY(-100%) rotateX(60deg);
    opacity: 0.5;
  }
}
.swipe-left-enter-active {
  animation: swipe-left 0.3s ease-out;
}

.swipe-left-leave-active {
  position: absolute;
  animation: swipe-right 0.3s ease-in reverse;
}

.swipe-right-enter-active {
  animation: swipe-right 0.3s ease-out;
}

.swipe-right-leave-active {
  position: absolute;
  animation: swipe-left 0.3s ease-in reverse;
}

@keyframes swipe-left {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
}
@keyframes swipe-right {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
}
</style>