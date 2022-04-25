import{ExpressionNode}from"../core/ExpressionNode.js";import{Matrix3Node}from"../inputs/Matrix3Node.js";import{UVNode}from"../accessors/UVNode.js";function UVTransformNode(o,r){ExpressionNode.call(this,"( uvTransform * vec3( uvNode, 1 ) ).xy","vec2"),this.uv=o||new UVNode,this.position=r||new Matrix3Node}UVTransformNode.prototype=Object.create(ExpressionNode.prototype),UVTransformNode.prototype.constructor=UVTransformNode,UVTransformNode.prototype.nodeType="UVTransform",UVTransformNode.prototype.generate=function(o,r){return this.keywords.uvNode=this.uv,this.keywords.uvTransform=this.position,ExpressionNode.prototype.generate.call(this,o,r)},UVTransformNode.prototype.setUvTransform=function(o,r,t,e,s,i,n){i=void 0!==i?i:.5,n=void 0!==n?n:.5,this.position.value.setUvTransform(o,r,t,e,s,i,n)},UVTransformNode.prototype.copy=function(o){return ExpressionNode.prototype.copy.call(this,o),this.uv=o.uv,this.position=o.position,this},UVTransformNode.prototype.toJSON=function(o){var r=this.getJSONNode(o);return r||((r=this.createJSONNode(o)).uv=this.uv.toJSON(o).uuid,r.position=this.position.toJSON(o).uuid),r};export{UVTransformNode};