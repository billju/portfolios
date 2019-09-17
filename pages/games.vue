<template>
<div class="dark">
    <div class="flex-column">
      <h1 v-if="$store.state.language=='zh'">新接龍</h1>
      <h1 v-if="$store.state.language=='en'">Freecell</h1>
      <p v-if="$store.state.language=='zh'">改編Window XP上的經典遊戲，新增了自動搜索的功能，按下AUTO鍵來試試看吧</p>
      <p v-if="$store.state.language=='en'">Revised from the classic game on Windows XP and added automatic searching function. Let's click "AUTO" button to give it a try.</p>
    </div>
    <freecell/>
    <div class="flex-column">
      <h1 v-if="$store.state.language=='zh'">細胞吞噬</h1>
      <h1 v-if="$store.state.language=='en'">Agar.io</h1>
      <p v-if="$store.state.language=='zh'">改編多人線上動作遊戲，這次玩家要挑戰在對手為電腦下，於90秒內得到最高分</p>
      <p v-if="$store.state.language=='en'">Revised from the massively multiplayer online action game created by Matheus Valadares. At this time, player would fight with AI to get best score in 90 seconds.</p>
    </div>
    <agario/>
    <div class="flex-column">
      <h1 v-if="$store.state.language=='zh'">綠燈帶最佳化</h1>
      <h1 v-if="$store.state.language=='en'">Greenband</h1>
      <p v-if="$store.state.language=='zh'">控制交通參數來優化綠燈帶，也就是能讓幹道上最多的車輛通過，試著在有限的資源下最大化效益</p>
      <p v-if="$store.state.language=='en'">Optimize the intersection "green band" in order to make the most proportion of vehicles able to pass the traffic artery continuously.</p>
    </div>
    <greenband/>
    <div class="flex-column mt-50">
      <h1 v-if="$store.state.language=='zh'">俄羅斯方塊</h1>
      <h1 v-if="$store.state.language=='en'">Tetris</h1>
      <p v-if="$store.state.language=='zh'">保留了Battle的Combo功能，高手們可繼續大展身手</p>
      <p v-if="$store.state.language=='en'">Tetris Battle's combo feature is still alive!</p>
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