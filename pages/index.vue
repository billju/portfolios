<template>
<div class="bg-dark">
    <div class="flex-column">
      <h1>HackMD筆記</h1>
    </div>
    <div class="flex-around-container">
      <a class="card" v-for="note in notes" :key="note.href" :href="note.href" target="_blank">
        <h2>{{note.title}}</h2>
        <h4>{{note.content}}</h4>
        <div>
          <div class="chip" v-for="tag in note.tags" :key="tag">{{tag}}</div>
        </div>
      </a>
    </div>
    <div class="flex-column">
      <h1>Github專案</h1>
    </div>
    <div class="flex-around-container">
      <a class="card" v-for="git in githubs" :key="git.href" :href="git.href" target="_blank">
        <h2>{{git.title}}</h2>
        <h4>{{git.content}}</h4>
        <div>
          <div class="chip" v-for="tag in git.tags" :key="tag">{{tag}}</div>
        </div>
      </a>
    </div>
    <div class="flex-column">
      <h1>FIND ME</h1>
      <div class="flex-center">
        <a v-for="icon in icons" :key="icon.href" class="icon" :href="icon.href" target="_blank">
          <img :src="icon.src" alt="">
        </a>
      </div>
    </div>
    <!-- <div class="flex-column">
      <h1>Let's ride a bike</h1>
      <div ref="map" id="map"></div>
    </div> -->
    <navbar/>
</div>
</template>

<script>
// import {EzMap,TileLayer} from '~/plugins/ezmap.js'
import navbar from '~/components/navbar.vue'
import codepen from '~/static/codepen.png'
import facebook from '~/static/facebook.png'
import gmail from '~/static/gmail.png'
import github from '~/static/github.png'
import ogImage from '~/static/og-image.jpg'

export default {
  components: {
     navbar
  },
  head(){
    return {
      title: 'chuboy',
      meta: [
        {hid:'og-image', property:'og-image', content: ogImage},
        {hid:'description', name:'description', content:"contact with chuboy: billju666@gmail.com"}
      ]
    }
  },
  data(){
    return{
      icons: [
        {href:'https://codepen.io/HandsomeChuBoy',src:codepen},
        {href:'https://www.facebook.com/baibai.zhu1',src:facebook},
        {href:'mailto:billju666@gmail.com',src:gmail},
        {href:'https://github.com/billju',src:github},
      ],
      notes: [
        {
          href:'https://hackmd.io/2aiF1bNaQrOHnYpln9SxaQ',
          title: '爬蟲筆記',
          content: '每當我們瀏覽網頁、查詢資料時，需要不斷更改請求內容、還得細細挑選從中擷取出關鍵內容...',
          tags: ['python','bs4','selenium'],
        },
        {
          href:'https://hackmd.io/fxoAisnGRCKJLA8msKrTVA',
          title: 'Flask筆記',
          content: 'flask是個微框架(microframework)，相較於django把所有MTV(model、template、view)架構都打包好了，僅提供最基礎的功能...',
          tags: ['python','backend','flask'],
        },
        {
          href:'https://hackmd.io/bN8NsOKBSF2hpE7Y9monXg',
          title: 'Sklearn筆記',
          content: '地表最強機器學習套件...',
          tags: ['machine learning','beginner'],
        },
        {
          href:'https://hackmd.io/DaH8WZpgRR6A6UO_qIKPYw',
          title: '資料科學筆記',
          content: '各種資料科學常見的工具與技術...',
          tags: ['data science'],
        },
        {
          href:'https://hackmd.io/iMCJoAowS0Sbrd9YZQzMTg',
          title: 'Firebase筆記',
          content: '後端即為服務(Backend as a Service)提高開發APP的體驗...',
          tags: ['es6','BaaS'],
        },
        {
          href:'https://hackmd.io/zxw_moTURfG6890L3sDZIw',
          title: '手刻一個GIS',
          content: '地圖元件與實作...',
          tags: ['es6','GIS','handmade'],
        },
      ],
      githubs: [
        {
          href:'https://github.com/billju/ninja-hattori',
          title: 'LineBot-回報彙整機器人',
          content: 'line開放開發者使用messaging api的服務，可以新增機器人的頻道...',
          tags: ['line API','node','mongodb'],
        },
        {
          href:'https://github.com/billju/json-studio',
          title: 'React json2table',
          content: 'A react project that converts json to table...',
          tags: ['react','jsx','component'],
        },
        {
          href:'https://github.com/billju/lazyplotly',
          title: 'Lazyplotly',
          content: 'A wrapper of interactive visualization package plotly...',
          tags: ['pip','visualization','easy'],
        },
        {
          href:'https://github.com/billju/Android-source-code-demo',
          title: 'Android 範例',
          content: 'APP開發範例...',
          tags: ['java','mobile app'],
        },
        {
          href:'https://github.com/billju/gurobi-packing',
          title: 'GUROBI最佳化',
          content: '探討三維空間使用最佳化...',
          tags: ['c++','linear programming'],
        },
        {
          href:'https://github.com/billju/chatroom',
          title: 'Socket.io 聊天軟體',
          content: '阿貓阿狗逗陣開槓',
          tags: ['socket.io','express','sqlite'],
        },
      ]
    }
  },
  mounted(){
    // let map = new EzMap(this.$refs.map,{})
    // map.addLayer(new TileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP/default/EPSG:3857/EPSG:3857:{z}/{y}/{x}',{maxZoom:15}))
  }
}
</script>

<style>
*{
  font-family: 微軟正黑體;
}
body{
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
.bg-dark{
  padding-top: 50px;
  background: #222;
  min-height: 100vh;
  color: #fff;
}
#map{
  width: 80%;
  height: 80vh;
}
h1{
  padding: 20px;
}
h4{
  margin: 10px;
}
a{
  color: #000;
  text-decoration: none;
}
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  padding: 20px;
}
.flex-column{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.flex-around-container{
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
a.icon{
  background: #fff;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
}
a.card{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  width: 30%;
  margin-top: 10px;
  margin-bottom: 10px;
}
.chip{
  display: inline-block;
  text-align: center;
  padding: 0 10px;
  margin: 5px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  box-shadow: 0 1px 3px 0 #aaa;
}
@media screen and (max-width:760px) {
  a.card{
    width: 40%;
  }
}
@media screen and (max-width:600px) {
  a.card{
    width: 90%;
  }
}
</style>
