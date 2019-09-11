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
                text: "A RWD hotel booking webpage (made with Penny's design pattern) that is featured with hademade date-range-picker and rendered by RESTful API.",
                img: booking,
                href: 'https://billju.github.io/booking.github.io/',
              },
              {
                title:'MV Box', bg:'#607d8b',
                text:"A playlist oriented video player that is specified for desktop user, linked with Youtube API, deployed on Firebase and ranks popularity of videos. Also, users can estabalish their own playlists.", 
                img: musicplayer,
                href: 'https://musicplayer-666.web.app/',
              },
              {
                title:'Chatroom', bg:'#9e9e9e', 
                text:"A fullstack chat app (made with JessHsu's design pattern) that used Socket.io and deployed on virtual machine. Users can send massage and image in realtime.",
                img: chatroom,
                href: 'http://139.162.23.48:3000/',
              },
              {
                title:'RaspberryPi', bg:'#4caf50', 
                text:"A Codepen piece for animate.ss challenge. Also a challenge of flat design.",
                img: raspberrypi,
                href: 'https://codepen.io/HandsomeChuBoy/full/MmEoQj',
              },
              {
                title:'Pomodoro', bg:'#e91e63', 
                text:"A RWD pomodoro app that makes users' work most efficient. Try to take a break every 25-minutes-long intensive work.",
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