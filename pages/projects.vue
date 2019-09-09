<template>
<div>
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
export default {
    components: {carousel,navbar},
    data(){
        return {
            pages: [
              {
                title:'Booking', bg:'#8bc34a', 
                text:'RWD旅館訂房網頁\n採用Penny的設計稿\n使用手刻的日期選擇器\n隨伺服器回應渲染頁面',
                img: booking,
                href: 'https://billju.github.io/booking.github.io/',
              },
              {
                title:'MV Box', bg:'#607d8b',
                text:'以音樂清單為導向的播放器\n串接YoutubeAPI\n部屬在firebase上\n功能具統計熱門排行\n使用者可建立客製化清單', 
                img: musicplayer,
                href: 'https://musicplayer-666.web.app/',
              },
              {
                title:'Chatroom', bg:'#9e9e9e', 
                text:'Socket.io全端作品\n採用JessHsu的設計稿\n部屬在虛擬機上\n即時聊天與上傳圖片',
                img: chatroom,
                href: 'http://139.162.23.48:3000/',
              },
              {
                title:'RaspberryPi', bg:'#4caf50', 
                text:'Codepen小品\nanimate.ss動畫挑戰\nRaspberryPi是好物', 
                img: raspberrypi,
                href: 'https://codepen.io/HandsomeChuBoy/full/MmEoQj',
              },
              {
                title:'Pomodoro', bg:'#e91e63', 
                text:'Codepen小品\nRWD番茄鐘\n行程排定應用程式\n每25分鐘休息5分鐘\n全神貫注完成工作',
                img: pomodoro,
                href: 'https://codepen.io/HandsomeChuBoy/full/agMBRX',
              },
            ],
        }
    }
}
</script>

<style>
*{
  font-family: 微軟正黑體;
}
</style>