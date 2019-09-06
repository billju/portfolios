<template>
<div class="json-beautifier" v-html="beautifiedJsonHtml"></div>
</template>

<script>
// from hassan's stackoverflow
export default {
    props: {data},
    computed: {
        beautifiedJsonHtml(){
            let json = JSON.stringify(this.rows,null,2)
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match=>{
                var cls = 'number'
                if (/^"/.test(match)) {
                  cls = /:$/.test(match)?'key':'string'
                } else if (/true|false/.test(match)) {
                  cls = 'boolean'
                } else if (/null/.test(match)) {
                  cls = 'null'
                }
                return '<span class="' + cls + '">' + match + '</span>'
            });
        }
    }
}
</script>

<style>
.json-beautifier {
  white-space: pre;
  font-family: monospace;
  font-size: 12px;
  overflow-y: scroll;
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: 0;
  background: #222;
  color: #fff;
}

.string {
  color: orange;
}

.number {
  color: lightgreen;
}

.boolean {
  color: blue;
}

.null {
  color: deeppink;
}

.key {
  color: lightblue;
}

.close {
  position: absolute;
  right: 0px;
  top: 0;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
  background: #333;
}
</style>