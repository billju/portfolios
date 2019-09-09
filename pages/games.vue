<template>
<div class="bg-dark">
    <freecell/>
    <agario/>
    <greenband/>
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
export default {
    components: {agario,tetris,freecell,greenband,navbar},
}
</script>

<style scoped>
.bg-dark{
    padding-top: 50px;
    background: #222;
    overflow-x: hidden;
}
</style>