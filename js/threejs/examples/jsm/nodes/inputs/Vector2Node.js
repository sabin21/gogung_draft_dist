import{Vector2}from"../../../../build/three.module.js";import{InputNode}from"../core/InputNode.js";import{NodeUtils}from"../core/NodeUtils.js";function Vector2Node(o,t){InputNode.call(this,"v2"),this.value=o instanceof Vector2?o:new Vector2(o,t)}Vector2Node.prototype=Object.create(InputNode.prototype),Vector2Node.prototype.constructor=Vector2Node,Vector2Node.prototype.nodeType="Vector2",NodeUtils.addShortcuts(Vector2Node.prototype,"value",["x","y"]),Vector2Node.prototype.generateReadonly=function(o,t,e,r){return o.format("vec2( "+this.x+", "+this.y+" )",r,t)},Vector2Node.prototype.copy=function(o){return InputNode.prototype.copy.call(this,o),this.value.copy(o),this},Vector2Node.prototype.toJSON=function(o){var t=this.getJSONNode(o);return t||((t=this.createJSONNode(o)).x=this.x,t.y=this.y,!0===this.readonly&&(t.readonly=!0)),t};export{Vector2Node};