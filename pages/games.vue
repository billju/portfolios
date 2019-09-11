<template>
<div class="dark">
    <div class="flex-column">
      <h1>Freecell</h1>
      <p>Revised from classic game on Windows XP and added automatic searching function. Let's click "AUTO" button to give it a try.</p>
    </div>
    <freecell/>
    <div class="flex-column">
      <h1>Agar.io</h1>
      <p>Revised from massively multiplayer online action game created by Matheus Valadares. At this time, player would fight with AI and challenge to get best score in 90 seconds.</p>
    </div>
    <agario/>
    <div class="flex-column">
      <h1>Greenband</h1>
      <p>Optimize intersection "green band" in order to make the most proportion of vehicles to pass the traffic artery continuously.</p>
    </div>
    <greenband/>
    <div class="flex-column mt-50">
        <h1>Tetris</h1>
        <p>Tetris Battle's combo feature is still alive!</p>
    </div>
    <tetris/>
    <navbar/>
</div>
</template>

<script>
import agario from '~/components/agario.vue'
import tetris from '~/components/tetris.vue'
import freecell from '~/components/freecell.vue'
import greenband from '~/components/greenband.vue'
import navbar from '~/components/navbar.vue'
import ogImage from '~/static/og-image.jpg'
export default {
    components: {agario,tetris,freecell,greenband,navbar},
    head(){
        return {
            title: 'chuboy',
            meta: [
                {hid:'og-image', property:'og-image', content: ogImage},
                {hid:'description', name:'description', content:"Chuboy's classic games reproductiin. Includes Freecell, Agar.io and Tetris."}
            ]
        }
    },
}
</script>

<style scoped>
h1{
    padding: 20px;
}
p{
    padding: 0 20px;
}
.dark{
    padding-top: 50px;
    background: #222;
    overflow-x: hidden;
    color: #fff;
}
.flex-column{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mt-50{
    margin-top: 50px;
}
</style>