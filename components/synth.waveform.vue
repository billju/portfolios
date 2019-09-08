<template>
<canvas ref="waveform"></canvas>
</template>

<script>
export default {
    props: ['audioContext','input'],
    data(){
        return{
            analyser:{}, bufferLength:2048, dataArray:[], canvasCtx: {}, animationFrame:0, 
        }
    },
    methods: {
        drawLine(){
            this.animationFrame = requestAnimationFrame(this.drawLine)
            this.analyser.getByteTimeDomainData(this.dataArray)
            this.canvasCtx.fillStyle = '#000'
            this.canvasCtx.fillRect(0,0,this.$refs.waveform.width,this.$refs.waveform.height)
            this.canvasCtx.lineWidth = 2
            this.canvasCtx.strokeStyle = '#16FFBD'
            this.canvasCtx.beginPath()
            var sliceWidth = this.$refs.waveform.width/this.bufferLength*1.0
            this.dataArray.reduce((x,cur,i)=>{
                let y = cur / 128.0 * this.$refs.waveform.height/2
                if(i==0){this.canvasCtx.moveTo(x,y)}
                else{this.canvasCtx.lineTo(x,y)}
                return x+sliceWidth
            },0)
            this.canvasCtx.lineTo(this.$refs.waveform.width,this.$refs.waveform.height/2)
            this.canvasCtx.stroke()
            this.canvasCtx.closePath()
        }
    },
    mounted(){
        this.canvasCtx = this.$refs.waveform.getContext('2d')
        this.analyser = this.audioContext.createAnalyser()
        this.analyser.ffftSize = 2048
        this.bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(this.bufferLength)
        this.input.connect(this.analyser)
        this.drawLine()
    },
    beforeDestroy(){
        cancelAnimationFrame(this.animationFrame)
    }
}
</script>

<style>

</style>