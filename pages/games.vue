<template>
<div class="bg-dark">
    <freecell ref="freecell"/>
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
    mounted(){
        this.$refs.freecell.initPosition()
    }
}
</script>

<style scoped>
.bg-dark{
    padding-top: 50px;
    background: #222;
}
</style>