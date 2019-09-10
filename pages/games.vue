<template>
<div class="dark">
    <div class="flex-column">
      <h1>Freecell 新接龍</h1>
      <p>改編window xp上的經典遊戲，添加了自動搜索的功能，點擊AUTO可讓遊戲變成放置手遊</p>
    </div>
    <freecell/>
    <div class="flex-column">
      <h1>Agar.io 細胞吞噬</h1>
      <p>改編馬特烏斯·瓦拉達里斯的網頁大型多人動作遊戲，這次換玩家跟電腦敵對，並且挑戰在90秒內得到的最高分數</p>
    </div>
    <agario/>
    <div class="flex-column">
      <h1>Greenband 綠燈帶計算器</h1>
      <p>挑戰在有限的綠燈時間下，讓最多比例的車輛能夠連續通過連鎖路口</p>
    </div>
    <greenband/>
    <tetris class="mt-50">
        <div class="flex-column">
            <h1>Tetris 俄羅斯方塊</h1>
            <p>即便Tetris Battle已成為時代的眼淚，但COMBO技巧不會隨之而滅</p>
        </div>
    </tetris>
    <navbar/>
</div>
</template>

<script>
import agario from '~/components/agario.vue'
import tetris from '~/components/tetris.vue'
import freecell from '~/components/freecell.vue'
import greenband from '~/components/greenband.vue'
import navbar from '~/components/navbar.vue'
export default {
    components: {agario,tetris,freecell,greenband,navbar},
    head(){
        return {
            title: 'chuboy',
            meta: [
                {hid:'description', name:'description', content:'My awesome portfolios'}
            ]
        }
    },
}
</script>

<style scoped>
h1{
    padding: 20px;
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