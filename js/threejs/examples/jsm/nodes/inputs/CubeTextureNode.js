import{InputNode}from"../core/InputNode.js";import{ReflectNode}from"../accessors/ReflectNode.js";import{ColorSpaceNode}from"../utils/ColorSpaceNode.js";import{ExpressionNode}from"../core/ExpressionNode.js";function CubeTextureNode(e,t,o){InputNode.call(this,"v4",{shared:!0}),this.value=e,this.uv=t||new ReflectNode,this.bias=o}CubeTextureNode.prototype=Object.create(InputNode.prototype),CubeTextureNode.prototype.constructor=CubeTextureNode,CubeTextureNode.prototype.nodeType="CubeTexture",CubeTextureNode.prototype.getTexture=function(e,t){return InputNode.prototype.generate.call(this,e,t,this.value.uuid,"tc")},CubeTextureNode.prototype.generate=function(e,t){if("samplerCube"===t)return this.getTexture(e,t);var o,r=this.getTexture(e,t),u=this.uv.build(e,"v3"),i=this.bias?this.bias.build(e,"f"):void 0;void 0===i&&e.context.bias&&(i=e.context.bias.setTexture(this).build(e,"f")),o=i?"texCubeBias( "+r+", "+u+", "+i+" )":"texCube( "+r+", "+u+" )";var s={include:e.isShader("vertex"),ignoreCache:!0},p=this.getType(e);return e.addContext(s),this.colorSpace=this.colorSpace||new ColorSpaceNode(new ExpressionNode("",p)),this.colorSpace.fromDecoding(e.getTextureEncodingFromMap(this.value)),this.colorSpace.input.parse(o),o=this.colorSpace.build(e,p),e.removeContext(),e.format(o,p,t)},CubeTextureNode.prototype.copy=function(e){return InputNode.prototype.copy.call(this,e),e.value&&(this.value=e.value),this.uv=e.uv,e.bias&&(this.bias=e.bias),this},CubeTextureNode.prototype.toJSON=function(e){var t=this.getJSONNode(e);return t||((t=this.createJSONNode(e)).value=this.value.uuid,t.uv=this.uv.toJSON(e).uuid,this.bias&&(t.bias=this.bias.toJSON(e).uuid)),t};export{CubeTextureNode};