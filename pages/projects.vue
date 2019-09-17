<template>
<div ref="fullscreen">
    <carousel :pages="pages"/>
    <navbar/>
</div>
</template>

<script>
import musicplayer from '~/static/musicplayer.jpg'
import pomodoro from '~/static/pomodoro.jpg'
import booking from '~/static/booking.jpg'
import raspberrypi from '~/static/raspberrypi.jpg'
import chatroom from '~/static/chatroom.jpg'

import carousel from '~/components/carousel.vue'
import navbar from '~/components/navbar.vue'
import ogImage from '~/static/og-image.jpg'
export default {
    components: {carousel,navbar},
    head(){
        return {
            title: 'chuboy',
            meta: [
                {hid:'og-image', property:'og-image', content: ogImage},
                {hid:'description', name:'description', content:"Chuboy's frontend projects. Includes hotel booking, MV player, live chat app, css animation and pomodoro."}
            ]
        }
    },
    data(){
        return {
            source: [
              {
                title: {en:'House Hotel', zh:'好室旅店'},
                text: {
                  zh: '精美的飯店預約網站(採用Penny的設計稿)，響應式設計、自製日期範圍挑選器以符合整體風格、藉由後端API動態呈現房間價目資訊',
                  en: "House Hotel is a booking webpage made with Penny's design pattern that can response according to backend API. It was also built with handmake date-range-picker.",
                },
                img: booking, href: 'https://billju.github.io/booking.github.io/', bg:'#8bc34a',
              },
              {
                title: {en:'MV Box', zh:'MV Box'},
                text: {
                  zh: "專為電腦使用者設計「以清單為導向」的播放器，部屬在Firebase且擁有熱門排行統計的功能，使用者可以建立與分享自己的音樂清單",
                  en: "MV Box is a playlist oriented video player which lets users to estabalish their own playlists. This website was deployed on Firebase and has functionality of ranking the popularity of videos.",
                },
                img: musicplayer, href: 'https://musicplayer-666.web.app/', bg:'#607d8b',
              },
              {
                title: {en:'Chatroom', zh:'阿貓阿狗聊天室'},
                text: {
                  zh: '部屬在虛擬機的全端網頁作品(採用JessHsu的設計稿)，透過Web Socket，使用者可以即時地傳輸訊息與圖片',
                  en: "Chatroom is a fullstack chat app made with JessHsu's design pattern which is powered bt Socket.io. This app was deployed on virtual machine and allows users to send massage and upload image in real time.",
                },
                img: chatroom, href: 'http://139.162.23.48:3000/', bg:'#9e9e9e', 
              },
              {
                title: {en:'Raspberry Pi', zh:'樹梅派'},
                text: {
                  zh: 'Codepen小品、扁平化設計的動畫練習挑戰，盡量以簡單的圖形去描述複雜物品的特徵卻又不失完整性',
                  en: "A Codepen piece of animate.ss challenge that follows prevailing flat design.",
                },
                img: raspberrypi, href: 'https://codepen.io/HandsomeChuBoy/full/MmEoQj', bg:'#4caf50', 
              },
              {
                title: {en:'Pomodoro', zh:'番茄鐘'},
                text: {
                  zh: 'Codepen小品，可新增任務與計時，讓使用者透過每25分鐘全神貫注地工作與休息的循環，達到最好的效率',
                  en: "Pomodoro is an web app whick makes users' work most efficient by taking a break after every 25-minutes-long intensive work.",
                },
                img: pomodoro, href: 'https://codepen.io/HandsomeChuBoy/full/agMBRX', bg:'#e91e63', 
              },
            ],
        }
    },
    methods: {
        hideAddressBar(){
            setTimeout(()=>{ window.scrollTo(0, 1);}, 0);
        }
    },
    computed: {
        pages(){
            let lang = this.$store.state.language,
                pages = this.source.map(x=>({...x}))
            pages.map(page=>{page.title = page.title[lang]})
            pages.map(page=>{page.text = page.text[lang]})
            return pages
        }
    },
    mounted(){
        window.addEventListener("load",this.hideAddressBar);
    },
    beforeDestroy(){
        window.removeEventListener("load",this.hideAddressBar);
    }
}
</script>

<style>
*{
  font-family: 微軟正黑體;
}
</style>