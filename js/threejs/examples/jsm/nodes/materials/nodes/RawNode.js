import{Node}from"../../core/Node.js";function RawNode(e){Node.call(this,"v4"),this.value=e}RawNode.prototype=Object.create(Node.prototype),RawNode.prototype.constructor=RawNode,RawNode.prototype.nodeType="Raw",RawNode.prototype.generate=function(e){var o=this.value.analyzeAndFlow(e,this.type),t=o.code+"\n";return e.isShader("vertex")?t+="gl_Position = "+o.result+";":t+="gl_FragColor = "+o.result+";",t},RawNode.prototype.copy=function(e){return Node.prototype.copy.call(this,e),this.value=e.value,this},RawNode.prototype.toJSON=function(e){var o=this.getJSONNode(e);return o||((o=this.createJSONNode(e)).value=this.value.toJSON(e).uuid),o};export{RawNode};