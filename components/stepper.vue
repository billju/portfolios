<template>
<div class="stepper-group" :style="{background:background}">
    <div v-for="(step,si) in steps" :key="step" class="d-flex">
        <div v-if="si>0" class="hyphen" :class="bindClass(index>=si)"></div>
        <div class="stepper" :class="bindClass(index>=si)">
          <div class="stepper-round" :class="bindClass(index>=si)">STEP {{si+1}}.</div>
          <div class="text-bold">{{step}}</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'stepper',
    props: {steps:Array,index:Number,background:String},
    methods: {
        bindClass(bool){
            return bool?'active':''
        }
    }
}
</script>

<style scoped>
.d-flex{
  display: flex;
}
.stepper-group {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
}

.stepper {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  transition: 0.5s;
}

.stepper.active {
  color: #333;
}

.stepper-round {
  padding-left: 10px;
  padding-right: 10px;
  height: 30px;
  margin: 10px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.8);
  color: #333;
  box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
}

.stepper-round.active {
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.3);
  color: #fff;
}

.hyphen {
  width: 30px;
  height: 8px;
  margin-top: 22px;
  background: #fff;
  transition: 0.5s;
}

.hyphen.active {
  background: #333;
}
</style>