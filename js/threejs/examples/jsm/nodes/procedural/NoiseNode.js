import{TempNode}from"../core/TempNode.js";import{FunctionNode}from"../core/FunctionNode.js";import{UVNode}from"../accessors/UVNode.js";function NoiseNode(o){TempNode.call(this,"f"),this.uv=o||new UVNode}NoiseNode.prototype=Object.create(TempNode.prototype),NoiseNode.prototype.constructor=NoiseNode,NoiseNode.prototype.nodeType="Noise",NoiseNode.Nodes={snoise:new FunctionNode(["float snoise(vec2 co) {","\treturn fract( sin( dot( co.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );","}"].join("\n"))},NoiseNode.prototype.generate=function(o,e){var t=o.include(NoiseNode.Nodes.snoise);return o.format(t+"( "+this.uv.build(o,"v2")+" )",this.getType(o),e)},NoiseNode.prototype.copy=function(o){return TempNode.prototype.copy.call(this,o),this.uv=o.uv,this},NoiseNode.prototype.toJSON=function(o){var e=this.getJSONNode(o);return e||((e=this.createJSONNode(o)).uv=this.uv.toJSON(o).uuid),e};export{NoiseNode};