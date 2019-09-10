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
                title:'Booking', bg:'#8bc34a', 
                text: "Hotel booking webpage with RWD\nUsed Penny's design pattern\nHademade date-range-picker included\nRender webpage by RESTful API",
                img: booking,
                href: 'https://billju.github.io/booking.github.io/',
              },
              {
                title:'MV Box', bg:'#607d8b',
                text:"Playlist oriented player\nSpecified for desktop user\nLinked with Youtube API\nDeployed on Firebase\nWould rank popularity of video\nUsers can estabalish their own playlists", 
                img: musicplayer,
                href: 'https://musicplayer-666.web.app/',
              },
              {
                title:'Chatroom', bg:'#9e9e9e', 
                text:"Fullstack Socket.io portfolio\nUsed JessHsu's design pattern\nDeployed on virtual machine\nSend massage and image in realtime",
                img: chatroom,
                href: 'http://139.162.23.48:3000/',
              },
              {
                title:'RaspberryPi', bg:'#4caf50', 
                text:"Codepen piece\nanimate.ss challenge\nRaspberry Pi is a masterpiece",
                img: raspberrypi,
                href: 'https://codepen.io/HandsomeChuBoy/full/MmEoQj',
              },
              {
                title:'Pomodoro', bg:'#e91e63', 
                text:"Codepen piece\nPomodoro app with RWD\nUsed for individaul schedule\nTake a break every 25 minutes\nMade work most efficient",
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