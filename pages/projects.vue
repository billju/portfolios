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
            pages: [
              {
                title:'House Hotel', bg:'#8bc34a', 
                text: "House Hotel is a booking webpage made with Penny's design pattern that can response according to backend API. It was also built with handmake date-range-picker.",
                img: booking,
                href: 'https://billju.github.io/booking.github.io/',
              },
              {
                title:'MV Box', bg:'#607d8b',
                text:"MV Box is a playlist oriented video player which lets users to estabalish their own playlists. This website was deployed on Firebase and has functionality of ranking the popularity of videos.", 
                img: musicplayer,
                href: 'https://musicplayer-666.web.app/',
              },
              {
                title:'Chatroom', bg:'#9e9e9e', 
                text:"Chatroom is a fullstack chat app made with JessHsu's design pattern which is powered bt Socket.io. This app was deployed on virtual machine and allows users to send massage and upload image in real time.",
                img: chatroom,
                href: 'http://139.162.23.48:3000/',
              },
              {
                title:'RaspberryPi', bg:'#4caf50', 
                text:"A Codepen piece of animate.ss challenge that follows prevailing flat design.",
                img: raspberrypi,
                href: 'https://codepen.io/HandsomeChuBoy/full/MmEoQj',
              },
              {
                title:'Pomodoro', bg:'#e91e63', 
                text:"Pomodoro is an web app whick makes users' work most efficient by taking a break after every 25-minutes-long intensive work.",
                img: pomodoro,
                href: 'https://codepen.io/HandsomeChuBoy/full/agMBRX',
              },
            ],
        }
    },
    methods: {
        hideAddressBar(){
            setTimeout(()=>{ window.scrollTo(0, 1);}, 0);
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