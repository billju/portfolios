<template>
  
</template>

<script>
export default {
    name: 'envelope',
    props: {},
    methods: {
        createGainNode(now){
            let k = this.knobs
            let gainNode = this.ctx.createGain()
            let gain = gainNode.gain
            gain.linearRampToValueAtTime(0, now)
            gain.linearRampToValueAtTime(1-k.aq.val, now+k.a.val*0.5)
            gain.linearRampToValueAtTime(1, now+k.a.val)
            gain.linearRampToValueAtTime(k.d.val+(1-k.d.val)*k.dq.val, now+k.a.val+k.s.val*0.5)
            gain.linearRampToValueAtTime(k.d.val, now+k.a.val+k.s.val)
            return gainNode
        }
    },
    computed:{
        path(){
            let k = this.knobs
            let [a,aq,d,dq,s,r,rq] = [k.a.val*200,k.aq.val,k.d.val*100,k.dq.val,k.s.val*200,k.r.val*30,k.rq.val]
            return `M0 0 
                    Q${a*aq} ${100-100*aq}, ${a} 100 
                    Q${a+s*dq} ${d+(100-d)*dq}, ${a+s} ${d} 
                    Q${a+s+r*rq} ${d*rq}, ${a+s+r} ${0}`
        },
    }
}
</script>

<style>

</style>