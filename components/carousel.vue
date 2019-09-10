<template>
<div class="carousel" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
  <div class="psf-background">
    <transition :name="slideUp?'slide-up':'slide-down'">
      <div class="psa-background" :key="pageIndex" :style="bgStyle(pages[pageIndex].bg)"></div>
    </transition>
  </div>
  <div class="psf-center">
    <transition-group name="slide-left">
      <img class="img" :src="pages[pageIndex].img" :key="pageIndex" @click="gotoPage(pages[pageIndex].href)"/>
      <div class="jumbo-text" :key="pages[pageIndex].title" style="animation-delay: -0.5s;">{{pages[pageIndex].title}}</div>
      <div class="p-text" :key="pages[pageIndex].text" style="animation-delay: -0.3s;">{{pages[pageIndex].text}}</div>
    </transition-group>
  </div><img v-for="(page,pi) in pages" :key="pi" :src="page.img" style="display:none;"/>
  <div class="pagination"><i class="material-icons arrow-horizon" @click="switchOffset(-1)">arrow_back</i><i class="material-icons arrow-vertical" @click="switchOffset(-1)">arrow_upward</i>
    <div class="page-dot" v-for="(page,idx) in pages" :key="idx" :class="pageIndex==idx?'page-dot-active':''" @click="switchOffset(idx-pageIndex)">
      <div class="page-index" v-if="idx===pageIndex">{{('0'+(idx+1)).substr(-2)}}</div>
    </div><i class="material-icons arrow-horizon" @click="switchOffset(1)">arrow_forward</i><i class="material-icons arrow-vertical" @click="switchOffset(1)">arrow_downward</i>
  </div>
</div>
</template>

<script>
export default {
    name: 'carousel',
    props: {pages:Array},
    data(){
        return{
            pageIndex: 1, 
            startX: 0,
            offsetX: 0,
            timeout: null,
            scrollable: true,
            slideUp: true,
        }
    },
    methods: {
        handleTouchStart(e){
            this.startX = e.targetTouches[0].pageX;
        },
        handleTouchMove(e){
            this.offsetX = e.targetTouches[0].pageX - this.startX;
        },
        handleTouchEnd(){
            var threshold = 100;
            var pi = this.pageIndex;
            if(this.scrollable){
                if(this.offsetX>threshold){
                    this.switchOffset(-1)
                    this.setTimeout()
                } 
                else if(this.offsetX<-threshold){
                    this.switchOffset(1)
                    this.setTimeout()
                }
            }
            this.offsetX = 0;
        },
        setTimeout(){
            this.scrollable = false
            window.clearTimeout(this.timeout)
            this.timeout = window.setTimeout(()=>{this.scrollable=true},1500)
        },
        bgStyle(bg){
            return {
                background: bg,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }
        },
        switchOffset(offset){
            let idx = this.pageIndex+offset
            this.pageIndex = idx>0?idx<this.pages.length-1?idx:this.pages.length-1:0
            this.slideUp = offset>0
        },
        handleWheel(e){
            this.slideUp = e.deltaY>0
            if(this.scrollable){
              this.switchOffset(e.deltaY>0?1:-1)
              this.setTimeout()
            }
        },
        gotoPage(href){
            let a = document.createElement('a')
            a.href = href
            a.target = "_blank"
            document.body.appendChild(a)
            a.click()
        }
    },
    mounted(){
        this.wheelEvent = window.addEventListener('wheel',this.handleWheel)
        this.pageIndex = 0
    },
    beforeDestroy(){
        window.removeEventListener('wheel',this.handleWheel)
    }
}
</script>

<style scoped>
.carousel{
  position: relative;
  overflow: hidden;
  height: 100vh;
  background: #192635;
}
.psf-background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.psa-background {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.psf-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wh100p {
  width: 100%;
  height: 100%;
}

.d-flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}

.psf-center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80%;
  transform: translate(-50%, -50%);
}

.jumbo-text {
  position: absolute;
  top: 35%;
  left: 50%;
  font-size: 54px;
  font-weight: bold;
  color: #fff;
  background: rgba(0, 0, 0, 0.3);
  padding: 0 20px;
}

.p-text {
  position: absolute;
  top: 50%;
  left: 65%;
  font-size: 1.8em;
  color: #fff;
  white-space: pre-wrap;
}

.img {
  position: absolute;
  object-fit: cover;
  top: 10%;
  left: 0;
  width: 60%;
  height: 80%;
  box-shadow: 15px 15px 15px 0 rgba(0, 0, 0, 0.3);
}

.pagination {
  position: absolute;
  width: 20px;
  top: 50%;
  right: 20px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

i.material-icons {
  color: #fff;
  cursor: pointer;
  user-select: none;
}

.page-dot {
  width: 12px;
  height: 12px;
  margin: 10px;
  background: #fff;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
}

.page-dot-active {
  background: transparent;
  width: 20px;
}

.page-index {
  font-weight: bold;
  color: white;
  line-height: 12px;
}

.arrow-horizon {
  display: none;
}

@media screen and (max-width: 760px) {
  .psf-center {
    width: 100%;
    height: 90%;
  }

  .img {
    width: 100%;
  }

  .jumbo-text {
    left: auto;
    right: 0;
  }

  .p-text {
    background: rgba(0, 0, 0, 0.8);
    left: 0;
    font-size: 1.5em;
    max-width: 100%;
    padding: 10px 20px;
  }

  .pagination {
    top: auto;
    bottom: 10px;
    left: 50%;
    width: 100%;
    flex-direction: row;
  }

  .arrow-vertical {
    display: none;
  }

  .arrow-horizon {
    display: block;
  }
}
.slide-up-enter-active {
  animation: slide-up 1s ease-out;
}

.slide-up-leave-active {
  position: absolute;
  animation: slide-down 1s ease-in reverse;
}

.slide-down-enter-active {
  animation: slide-down 1s ease-out;
}

.slide-down-leave-active {
  position: absolute;
  animation: slide-up 1s ease-in reverse;
}

@keyframes slide-up {
  0% {
    transform: translateY(100%) rotateZ(30deg);
  }
}
@keyframes slide-down {
  0% {
    transform: translateY(-100%) rotateZ(-30deg);
  }
}
.slide-left-enter-active {
  animation: slide-left 2s;
}

.slide-left-leave-active {
  position: absolute;
  animation: slide-right 1s reverse;
}

@keyframes slide-left {
  0%, 50% {
    transform: translateX(100px);
    opacity: 0;
  }
}
@keyframes slide-right {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
}
</style>