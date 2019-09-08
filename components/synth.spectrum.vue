<template>
<canvas ref="spectrum" id="spectrum"></canvas>
</template>

<script>
export default {
    name: 'spectrun',
    props: ['audioContext','input'],
    data(){
        return{
            analyser:{}, bufferLength:256, dataArray:[], canvasCtx: {}, animationFrame:0, 
        }
    },
    methods: {
        drawBar(){
            this.animationFrame = requestAnimationFrame(this.drawBar)
            this.analyser.getByteFrequencyData(this.dataArray)
            this.canvasCtx.fillStyle = 'black'
            this.canvasCtx.fillRect(0,0,this.$refs.spectrum.width,this.$refs.spectrum.height)
            
            var barWidth = this.$refs.spectrum.width/this.bufferLength*2.5
            this.dataArray.reduce((x,cur,i)=>{
                this.canvasCtx.fillStyle = `rgb(${cur/2+50},200,200)`
                this.canvasCtx.fillRect(x,this.$refs.spectrum.height-cur/2,barWidth,cur/2)
                return x+barWidth+1
            },0)
        }
    },
    mounted(){
        this.canvasCtx = this.$refs.spectrum.getContext('2d')
        this.analyser = this.audioContext.createAnalyser()
        this.analyser.ffftSize = 256
        this.bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(this.bufferLength)
        this.input.connect(this.analyser)
        this.drawBar()
    },
    beforeDestroy(){
        cancelAnimationFrame(this.animationFrame)
    }
}
</script>

<style>

</style>