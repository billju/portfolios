<template>
<div class="container" @mousemove="handleEventMove" @mouseup="handleEventEnd" @mouseleave="handleEventLeave" @touchmove="handleEventMove" @touchend="handleEventEnd" @touchcancel="handleEventLeave">
  <div class="btn-group">
    <div class="btn" @click="toggleRewind()">{{rewind?'STOP':'REWIND'}}</div>
    <div class="btn" @click="undo()">UNDO</div>
    <div class="btn" @click="newGame()">NEW</div>
    <div class="btn" @click="rule=!rule">RULE</div>
    <div class="btn" @click="showHint()">HINT</div>
    <div class="btn" @click="toggleAuto()">{{auto?'STOP':'AUTO'}}</div>
    <div class="btn">Time{{formatTime}}</div>
    <div class="btn">Move{{history.length}}</div>
  </div>
  <div class="flex-around">
    <div class="slot slot-left" v-for="(val,name) in left" :key="name" :ref="name"></div>
    <div class="slot slot-right" v-for="(val,name) in right" :key="name" :ref="name"></div>
  </div>
  <div class="flex-around">
    <div class="slot slot-below" v-for="(val,name) in below" :key="name" :ref="name"></div>
    <div class="card" v-for="(card,name) in cards" :key="name" :ref="name" :style="{transition: transition}" :class="suitColor(card.suit)" @dblclick="autoFillAny(name)" @mousedown="handleEventStart($event,name)" @touchstart="handleEventStart($event,name)"> 
      <div class="card-lt">{{card.txt}}</div>
      <div class="card-rt">{{card.suit}}</div>
      <div class="card-lb">{{card.suit}}</div>
      <div class="card-rb">{{card.txt}}</div>
      <div class="card-center">{{card.suit}}</div>
    </div>
  </div>
  <transition name="swipe-up">
    <div class="flag text-center" v-if="win" @click="win=false">
      <h1>Congratulations!!!</h1>
    </div>
  </transition>
  <transition name="swipe-up">
    <div class="flag text-center" v-if="lose" @click="lose=false">
      <h1>太大意惹...</h1>
    </div>
  </transition>
  <transition name="swipe-up">
    <div class="flag" v-if="rule" @click="rule=false">
      <h1>新接龍遊戲說明</h1>
      <ol>
        <li>左上角是暫存欄位，只能放一張牌</li>
        <li>右上角是本位欄框，同花色依序疊上去</li>
        <li>下方是牌庫，放牌時必須按不同顏色與順序</li>
        <li>下方牌庫如果連號且顏色不同時，可一次移動一疊牌</li>
        <li>連點撲克牌兩下自動移位</li>
        <li>可以狂點NEW刷首抽</li>
        <li>按AUTO自動遊玩，但一直AUTO是很危險的</li>
      </ol>
    </div>
  </transition>
</div>
</template>

<script>
//自幹洗牌演算法
Array.prototype.shuffle = function(){
  var pivot = this.length
  while(pivot--){
    var ri = Math.floor(Math.random()*pivot)
    var temp = this[ri];this[ri]=this[pivot];this[pivot]=temp
  }
  return this
}
export default {
    name:'freecell',
    data(){
      return{
        //定義反光提示的顏色
        infoColor: '#fff',
        //牌組為52個標準的，洗牌的來源
        cardSet:['A','2','3','4','5','6','7','8','9','10','J','Q','K']
        .flatMap(x=>['♠','♥','♣','♦'].map(y=>x+y)),
        //再創一個物件形式的牌組(雙層物件)
        //英文小教室---suit花色: spades黑桃, hearts紅桃, clubs梅花, diamonds方塊
        cards: ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
        .flatMap(x=>['♠','♥','♣','♦'].map(y=>x+y))
        .reduce((acc,cur,i)=>{
            acc[cur]={suit:cur[cur.length-1],txt:cur.substr(0,cur.length-1),num:Math.floor(i/4)};
            return acc},{}), 
        //下方牌組(三層物件)
        below: {b0:{},b1:{},b2:{},b3:{},b4:{},b5:{},b6:{},b7:{}},
        //左方暫存(三層物件)
        left: {l0:{},l1:{},l2:{},l3:{}},
        //右方本位(三層物件)
        right: {r0:{},r1:{},r2:{},r3:{}},
        //紀錄欄位的位置(雙層物件)
        slots: {l0:{},l1:{},l2:{},l3:{},r0:{},r1:{},r2:{},r3:{},b0:{},b1:{},b2:{},b3:{},b4:{},b5:{},b6:{},b7:{}},
        //滑鼠事件(錨點、連號卡牌、滑鼠與卡牌左上角的位移、卡牌初始狀態)
        md: {ref:false,multi:[],left:0,top:0,initLeft:0,initTop:0,zIndex:87,x:0,y:0},
        //動畫間接時間(移動時為0)
        transition: '0.5s',
        //紀錄所有動作事件
        history: [],
        //提示陣列與隨機提示
        hints: [], hint: null,
        //UI狀態
        rule:false, auto: false, rewind:false, win: false, lose: false, 
        //時間設定狀態
        interval: null, timeout: null, timer: null, seconds: 0,
      }
  },
  methods:{
    //洗牌
    shuffleCard(){
      //組成8個二維陣列，存放不同牌
      let cardArr = [7,6,7,6,7,6,7,6].shuffle().reduce((acc,cur)=>({
        cum: acc.cum+cur,
        arr: [...acc.arr,acc.res.slice(acc.cum,acc.cum+cur)],
        res: acc.res
      }),{cum:0,arr:[],res:this.cardSet.slice().shuffle()}).arr
      //轉成雙層物件，方便索引
      cardArr.map((slot,i)=>{
        let slotRef = 'b'+i
        slot.map(cardRef=>{
          this.cards[cardRef].slot = slotRef; 
          this.below[slotRef][cardRef] = this.cards[cardRef]
        })
      })
    },
    //初始化欄位位置與紀錄
    initPosition(){
      for(let slots of [this.left,this.right,this.below]){ //來自各邊的插槽
        Object.keys(slots).map(slotRef=>{
          let top = this.$refs[slotRef][0].offsetTop
          let left = this.$refs[slotRef][0].offsetLeft
          Object.keys(slots[slotRef]).map((cardRef,ci)=>{
              ci = slotRef[0]=='b'?ci:0
              this.$refs[cardRef][0].style.left = left+'px'
              this.$refs[cardRef][0].style.top = top+ci*30+'px'
              this.$refs[cardRef][0].style.zIndex = 87+ci
          })
        })
      }
      Object.keys(this.slots).map(key=>{ //紀錄位置，作為判定點
        let rect = this.$refs[key][0].getBoundingClientRect()
        this.slots[key] = {l:rect.x,t:rect.y}
      })
    },
    //花色轉顏色
    suitColor(suit){
      return (suit=='♠'||suit=='♣')?'black':'red'
    },
    //確認左方差槽是否被占用
    checkLeft(slotRef){
      return Object.keys(this.left[slotRef]).length==0
    },
    //確認右方差槽是否可以疊上去(同花色且大一號或是第一張牌)
    checkRight(slotRef){
      let cardRef = Object.keys(this.right[slotRef])
      var sameSuit=false, moreNum=false, firstCard=false
      if(cardRef.length>0){ //疊超過一張牌時
        cardRef = cardRef[cardRef.length-1]
        sameSuit = this.cards[this.md.ref].suit == this.cards[cardRef].suit
        moreNum = this.cards[this.md.ref].num - this.cards[cardRef].num == 1
        firstCard = false
      }else{
        firstCard = this.cards[this.md.ref].num==0
      }
      return (sameSuit&&moreNum)||firstCard
    },
    //確認右方差槽是否可以疊上去(不同顏色且小一號)
    checkBelow(slotRef){
      let cardRef = Object.keys(this.below[slotRef])
      var diffColor=true, lessNum=true
      if(cardRef.length>0){
        cardRef = cardRef[cardRef.length-1]
        diffColor = this.suitColor(this.cards[this.md.ref].suit)!=this.suitColor(this.cards[cardRef].suit)
        lessNum = this.cards[cardRef].num - this.cards[this.md.ref].num == 1
      }
      return diffColor&&lessNum
    },
    //移動卡牌(string, object)
    moveTo(slotRef, slot){
      let card = this.cards[this.md.ref]
      let div = this.$refs[this.md.ref][0]
      let target = this.$refs[slotRef][0]
      //this.initPosition()簡化版
      let top = this.$refs[slotRef][0].offsetTop
      let left = this.$refs[slotRef][0].offsetLeft
      let ci = slotRef[0]=='b'?Object.keys(slot[slotRef]).length:0
      div.style.left = left+'px'  
      div.style.top = top+ci*30+'px'
      div.style.zIndex = 87+ci
      //添加紀錄
      this.addHistory()
      //因為狀態是複製過去的，要把原本的刪掉
      this.deleteInitCard(card)
      card.slot = slotRef
      slot[slotRef][this.md.ref] = card
      //檢查是否還可以繼續玩
      this.checkMoreMove()
    },
    addHistory(){
      //一次移動了幾張牌，如果滑鼠事件multi是空陣列則代表只移動了一張
      let count = this.md.multi.length?this.md.multi.length:1 
      this.history.push({ref:this.md.ref,from:this.cards[this.md.ref].slot,count:count})  
    },
    deleteInitCard(card){
      if(card.slot[0]=='b'){delete this.below[card.slot][this.md.ref]}
      else if(card.slot[0]=='l'){delete this.left[card.slot][this.md.ref]}
      else if(card.slot[0]=='r'){delete this.right[card.slot][this.md.ref]}
    },
    //拉著卡牌不做事要把它歸位
    moveToInit(){
      let div = this.$refs[this.md.ref][0]
      div.style.left = this.md.initLeft+'px'
      div.style.top = this.md.initTop+'px'
      div.style.zIndex = this.md.zIndex
    },
    undo(){
      let len = this.history.length
      if(this.auto){clearInterval(this.interval);this.auto=false}
      if(len>0){
        let ultimateIdx = -1*this.history[len-1].count
        for(let history of this.history.slice(ultimateIdx)){
          this.md.ref = history.ref
          let slotRef = history.from
          this.history.pop() //複製完值便可刪除
          if(slotRef[0]=='l'){this.moveTo(slotRef, this.left)}
          else if(slotRef[0]=='r'){this.moveTo(slotRef, this.right)}
          else if(slotRef[0]=='b'){this.moveTo(slotRef, this.below)}
          this.history.pop() //移動完會再給一個紀錄，要再刪除一次
        }
        this.md.ref = false
      }else{
        this.rewind = false
        clearInterval(this.interval)
      }
    },
    newGame(){
      for(let key in this.below){this.below[key] = {}}
      for(let key in this.right){this.right[key] = {}}
      for(let key in this.left){this.left[key] = {}}
      this.history = []
      this.shuffleCard()
      this.removeHighlight()
      this.initPosition()
      this.autoFillRight()
      this.checkMoreMove()
      clearInterval(this.timer)
      this.seconds = 0
      this.win = false; this.lose = false;
      this.timer = setInterval(()=>{this.seconds+=1},1000)
    },
    //移動卡牌，要判別是不是一次移動多張
    handleEventMove(e){
      if(this.md.ref){
        e.preventDefault()
        this.md.x = e.clientX==undefined?e.targetTouches[0].pageX:e.clientX
        this.md.y = e.clientY==undefined?e.targetTouches[0].pageY:e.clientY
        if(this.md.multi.length>0){
          this.md.multi.map((ref,i)=>{
            let div = this.$refs[ref][0]
            div.style.left = this.md.x-this.md.left+'px'
            div.style.top = this.md.y-this.md.top+30*i+'px'
            div.style.zIndex = 666+i
          })
        }else{
          let div = this.$refs[this.md.ref][0]
          div.style.left = this.md.x-this.md.left+'px'
          div.style.top = this.md.y-this.md.top+'px'
          div.style.zIndex = 666
        }
      }
    },
    handleEventEnd(){
      if(this.md.ref){
        // 搜尋滑鼠放開的位置所對應到的插槽，利用兩面逼近法
        // 排列必定是左上到右下，所以先比對篩選左上角的位置再取最後一個即可
        
        var keys = Object.keys(this.slots).filter(k=>this.slots[k].l<this.md.x&&this.slots[k].t<this.md.y)
        // 但超過左邊的界線則是例外
        var slotRef = keys.length>0?keys[keys.length-1]:'init'
        switch(slotRef[0]){
          case 'l':
            if(this.checkLeft(slotRef)&&this.md.multi.length==0){this.moveTo(slotRef, this.left)}
            else{this.initPosition()}
            break;
          case 'r':
            if(this.checkRight(slotRef)){this.moveTo(slotRef, this.right)}
            else{this.moveToInit()}
            break;
          case 'b':
            if(this.md.multi.length>0){
              if(this.checkBelow(slotRef)){
                this.md.multi.map(ref=>{
                  this.md.ref = ref
                  this.moveTo(slotRef, this.below)
                })
              }else{this.initPosition()} 
            }else{
              if(this.checkBelow(slotRef)){this.moveTo(slotRef, this.below)}
              else{this.moveToInit()}
            }
            break;
          default:
            this.moveToInit(); break;
        }
      }
      this.md.ref = false
      this.md.multi = []
      this.transition = '0.5s'
    },
    handleEventStart(e,cardRef){
      if(this.history.length==0){
          this.initPosition()
      }
      // 關閉其他UI狀態
      clearInterval(this.interval);this.auto=false
      this.removeHighlight()
      // 判別該牌可不可以被選擇
      let slotRef = this.cards[cardRef].slot
      let canSelect = true
      if(slotRef[0]=='b'){ //下方可一次選取多張牌
        let keys = Object.keys(this.below[slotRef])
        if(cardRef!=keys[keys.length-1]){ //如果不是最底下的牌
          let idx = keys.indexOf(cardRef)
          for(let i=idx+1;i<keys.length;i++){ //判斷是否連號且不同顏色
            let diffColor = this.suitColor(this.cards[keys[i-1]].suit) != this.suitColor(this.cards[keys[i]].suit)
            let lessNum = this.cards[keys[i-1]].num - this.cards[keys[i]].num == 1
            if(!(diffColor&&lessNum)){
              canSelect = false
              break;
            }
          }
          if(canSelect){this.md.multi = keys.slice(idx)} //多張牌組陣列
        }
      }
      if(canSelect){
        this.md.x = e.clientX==undefined?e.targetTouches[0].pageX:e.clientX
        this.md.y = e.clientY==undefined?e.targetTouches[0].pageY:e.clientY
        this.transition = '0s'
        this.md.ref = cardRef
        this.md.initLeft = this.$refs[cardRef][0].offsetLeft
        this.md.initTop = this.$refs[cardRef][0].offsetTop
        this.md.zIndex = this.$refs[cardRef][0].style.zIndex
        this.md.left = this.md.x-this.md.initLeft
        this.md.top = this.md.y-this.md.initTop
      }
    },
    // 滑鼠移開螢幕
    handleEventLeave(){
      if(this.md.ref){
        this.moveToInit()
        this.md.ref = false
      }
    },
    // 取得最上層的卡牌(object)
    getSlotCards(slot){ 
      return Object.values(slot).flatMap(slotObj=>Object.keys(slotObj).slice(-1))
    },
    // 取得最上層的連號卡牌
    getConcatCards(){
      return Object.keys(this.below).flatMap(slotRef=>{
        let keys = Object.keys(this.below[slotRef])
        for(let i=keys.length-2;i>=0;i--){ //從倒數第二個到第一個
          let diffColor = this.suitColor(this.cards[keys[i]].suit) != this.suitColor(this.cards[keys[i+1]].suit)
          let moreNum = this.cards[keys[i]].num - this.cards[keys[i+1]].num == 1
          if(!(diffColor&&moreNum)){ //由下往上數
            if(i==keys.length-2){ //得到最頂層，代表根本沒連號
              return []
            }else{
              return [{cardRef:keys[i+1],top:keys[keys.length-1],multiRef:keys.slice(i+1)}]
            }
          }
        }
        //比較到最底下則代表整條都是連號的，而欄位是空的或是只有一個時不會進入for
        return keys.length>1?[{cardRef:keys[0],top:keys[keys.length-1],multiRef:keys,full:true}]:[] 
      })
    },
    // 遞迴不斷自動塞入右方
    autoFillRight(){ 
      let cards = this.getSlotCards(this.below).concat(this.getSlotCards(this.left))
      for(let cardRef of cards){
        this.md.ref = cardRef
        for(let slotRef in this.right){
          if(this.checkRight(slotRef)){
            this.moveTo(slotRef, this.right)
            this.md.ref = false
            return setTimeout(this.autoFillRight,100)
          }
        }
      }
      this.md.ref = false
    },
    // 有優先順序的自動塞入
    autoFillAny(cardRef){
      let slotRef = this.cards[cardRef].slot
      let canSelect = true
      // 如果選到的是下方卡牌，則必須為最上方者
      if(slotRef[0]=='b'){
        let keys = Object.keys(this.below[slotRef])
        canSelect = cardRef==keys[keys.length-1]
      }
      if(canSelect){ 
        this.md.ref = cardRef
        for(let slotRef in this.right){
          if(this.checkRight(slotRef)){
            this.moveTo(slotRef, this.right)
            this.md.ref = false
            return this.autoFillRight()
          }
        }
        for(let slotRef in this.below){
          if(this.checkBelow(slotRef)){
            this.moveTo(slotRef, this.below)
            this.md.ref = false
            return this.autoFillRight()
          }
        }
        for(let slotRef in this.left){
          if(this.checkLeft(slotRef)){
            this.moveTo(slotRef, this.left)
            this.md.ref = false
            return this.autoFillRight()
          }
        }
      }
      this.md.ref = false
    },
    // 檢查是否可以繼續移動
    checkMoreMove(){
      this.hints = []
      let leftCards = this.getSlotCards(this.left)
      let belowCards = this.getSlotCards(this.below)
      let concatCards = this.getConcatCards()
      let notConcatBelowCards = belowCards.filter(x=>!concatCards.map(y=>y.top).includes(x))
      // 優先移到右上角
      for(let cardRef of leftCards.concat(belowCards)){ 
        this.md.ref = cardRef
        for(let slotRef in this.right){
          if(this.checkRight(slotRef)){
            this.hints.push({card:cardRef,slot:slotRef,target:slotRef})
          }
        }
      }
      // 其次為連號
      if(this.hints.length==0){
        for(let multiCard of concatCards){ 
          this.md.ref = multiCard.cardRef
          for(let slotRef in this.below){
            if(this.checkBelow(slotRef)){ 
              let keys = Object.keys(this.below[slotRef])
              let target = keys.length>0?keys[keys.length-1]:slotRef
              if((!multiCard.full)||keys.length>0){
                //整排連號移動到空欄位沒有意義
                this.hints.push({card:multiCard.cardRef,slot:slotRef,target:target,multi:multiCard.multiRef})  
              }
            }
          }
        }
      }
      // 其次為下方
      if(this.hints.length==0){
        for(let cardRef of leftCards.concat(notConcatBelowCards)){ 
          this.md.ref = cardRef
          for(let slotRef in this.below){  //移動下方欄位
            if(this.checkBelow(slotRef)){ //這個比較特殊，要發光在下面
              let keys = Object.keys(this.below[slotRef])
              let target = keys.length>0?keys[keys.length-1]:slotRef
              this.hints.push({card:cardRef,slot:slotRef,target:target})
            }
          }
        }
      }
      // 下下策---移到空白處
      if(this.hints.length==0){
        for(let cardRef of notConcatBelowCards){
          this.md.ref = cardRef
          for(let slotRef in this.left){
            if(this.checkLeft(slotRef)){
                this.hints.push({card:cardRef,slot:slotRef,target:slotRef})
            }
          }
        }
      }
      this.md.ref = false
      // 都不符合則代表...
      if(this.hints.length==0){ 
        clearInterval(this.interval);this.auto=false
        // 右方全滿==52張牌
        if(Object.values(this.right).flatMap(x=>Object.keys(x)).length==52){
          this.win = true //alert('尼淫惹');
        }else{ // 或是無牌可動
          this.lose = true //alert('尼已經屎惹');
        }
      }
    },
    showHint(){
      this.removeHighlight()
      if(this.hints.length>0){
        this.hint = this.hints[Math.floor(Math.random()*this.hints.length)]
        this.$refs[this.hint.card][0].style.boxShadow = '0 0 5px 5px '+this.infoColor
        this.$refs[this.hint.target][0].style.boxShadow = '0 0 5px 5px '+this.infoColor
      }else{
        this.hint = null  
      }
    },
    removeHighlight(){
      if(this.hint){
        this.$refs[this.hint.card][0].style.boxShadow = ''
        this.$refs[this.hint.target][0].style.boxShadow = ''
        this.hint = null 
      }
    },
    // 自動移動提示選項
    autoplay(){
      this.showHint()
      if(this.hint){
        if(this.hint.multi){
          this.hint.multi.map(ref=>{
            this.md.ref = ref
            this.md.multi = this.hint.multi
            this.moveTo(this.hint.slot, this.below)
          })
        }else{
          this.md.ref = this.hint.card
          if(this.hint.slot[0]=='b'){this.moveTo(this.hint.slot,this.below)}
          else if(this.hint.slot[0]=='l'){this.moveTo(this.hint.slot,this.left)}
          else if(this.hint.slot[0]=='r'){this.moveTo(this.hint.slot,this.right)}
        }
        this.md.ref = false
        this.md.multi = []
      }
    },
    toggleAuto(){
      this.auto = !this.auto
      clearInterval(this.interval)
      if(this.auto){
        this.interval = setInterval(this.autoplay,500)
        this.autoplay()
      }
    },
    toggleRewind(){
      this.rewind = !this.rewind
      this.undo()
      if(this.rewind){
        this.transition = '0.2s'
        this.interval = setInterval(this.undo,100)
      }else{
        this.transition = '0.5s'
        clearInterval(this.interval)
      }
    },
  },
  computed:{
    formatTime(){
      let mm = ('0'+Math.floor(this.seconds/60)).substr(-2)
      let ss = ('0'+Math.floor(this.seconds%60)).substr(-2)
      return mm+':'+ss
    }
  },
  mounted(){
      this.newGame()
      window.addEventListener('resize',this.initPosition)
  },
  beforeDestroy(){
      window.removeEventListener('resize',this.initPosition)
  }
}
</script>

<style scoped>
.container{
    width: fit-content;
    margin: 0 auto;
    padding: 0;
    user-select: none;
    position: relative;
    min-height: 600px;
}
.flex-around {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.card {
  width: 100px;
  height: 160px;
  font-size: 1.5em;
  box-shadow: 0 0 0 1px #aaa inset;
  border-radius: 10px;
  color: #fff;
  position: absolute;
}

.red {
  background: linear-gradient(135deg, #e91e63, #f8bbd0);
}

.black {
  background: linear-gradient(135deg, #3f51b5, #c5cae9);
}

.card-lt {
  position: absolute;
  top: 8px;
  left: 8px;
}

.card-rt {
  position: absolute;
  top: 8px;
  right: 8px;
}

.card-lb {
  position: absolute;
  left: 8px;
  bottom: 8px;
  transform: rotate(180deg);
}

.card-rb {
  position: absolute;
  right: 8px;
  bottom: 8px;
  transform: rotate(180deg);
}

.card-center {
  position: absolute;
  left: 50%;
  top: 50%;
  color: rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  font-size: 2.4em;
}

.slot {
  display: inline-block;
  width: 100px;
  height: 160px;
  box-shadow: 0 0 0 3px #333 inset;
  border-radius: 10px;
  margin: 5px;
}

.slot-right {
  box-shadow: 0 0 0 3px #666 inset;
}

.btn-group {
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  font-size: 1em;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}
.btn:active {
  box-shadow: 0 0 5px 5px #666;
}

.flag {
  position: absolute;
  max-width: 500px;
  min-width: 260px;
  top: 50%;
  left: 50%;
  padding: 20px;
  color: #fff;
  border-radius: 10px;
  background: #222;
  z-index: 999;
  box-shadow: 0 0 15px 5px #666;
  transform: translate(-50%, -50%) scale(1);
  cursor: pointer;
}

.text-center {
  text-align: center;
}

@media only screen and (max-width: 992px) {
  .slot, .card {
    width: 40px;
    height: 64px;
  }
  .slot{
    margin: 5px 0;
  }

  .card {
    font-size: 0.8em;
  }

  .card-center {
    display: none;
  }
}
.swipe-up-enter-active {
  animation: swipe-up 0.5s;
}

.swipe-up-leave-active {
  animation: swipe-up 0.5s reverse;
}

@keyframes swipe-up {
  0% {
    top: 100%;
    opacity: 0;
  }
}

</style>