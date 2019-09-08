<template>
<div>
    <freecell ref="freecell"/>
    <tetris/>
    <navbar/>
</div>
</template>

<script>
import tetris from '~/components/tetris.vue'
import freecell from '~/components/freecell.vue'
import navbar from '~/components/navbar.vue'
export default {
    components: {tetris,freecell,navbar},
    mounted(){
        this.$refs.freecell.initPosition()
    }
}
</script>

<style>
*{
    font-family: 微軟正黑體;
}
body{
    background: #222;
}
</style>