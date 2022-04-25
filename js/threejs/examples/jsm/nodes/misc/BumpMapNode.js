import{TempNode}from"../core/TempNode.js";import{FloatNode}from"../inputs/FloatNode.js";import{FunctionNode}from"../core/FunctionNode.js";import{NormalNode}from"../accessors/NormalNode.js";import{PositionNode}from"../accessors/PositionNode.js";function BumpMapNode(e,o){TempNode.call(this,"v3"),this.value=e,this.scale=o||new FloatNode(1),this.toNormalMap=!1}BumpMapNode.Nodes=function(){var e=new FunctionNode(["vec2 dHdxy_fwd( sampler2D bumpMap, vec2 vUv, float bumpScale ) {","\tvec2 dSTdx = dFdx( vUv );","\tvec2 dSTdy = dFdy( vUv );","\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;","\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;","\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;","\treturn vec2( dBx, dBy );","}"].join("\n"),null,{derivatives:!0});return{dHdxy_fwd:e,perturbNormalArb:new FunctionNode(["vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {","\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );","\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );","\tvec3 vN = surf_norm;","\tvec3 R1 = cross( vSigmaY, vN );","\tvec3 R2 = cross( vN, vSigmaX );","\tfloat fDet = dot( vSigmaX, R1 );","\tfDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );","\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );","\treturn normalize( abs( fDet ) * surf_norm - vGrad );","}"].join("\n"),[e],{derivatives:!0}),bumpToNormal:new FunctionNode(["vec3 bumpToNormal( sampler2D bumpMap, vec2 uv, float scale ) {","\tvec2 dSTdx = dFdx( uv );","\tvec2 dSTdy = dFdy( uv );","\tfloat Hll = texture2D( bumpMap, uv ).x;","\tfloat dBx = texture2D( bumpMap, uv + dSTdx ).x - Hll;","\tfloat dBy = texture2D( bumpMap, uv + dSTdy ).x - Hll;","\treturn vec3( .5 - ( dBx * scale ), .5 - ( dBy * scale ), 1.0 );","}"].join("\n"),null,{derivatives:!0})}}(),BumpMapNode.prototype=Object.create(TempNode.prototype),BumpMapNode.prototype.constructor=BumpMapNode,BumpMapNode.prototype.nodeType="BumpMap",BumpMapNode.prototype.generate=function(e,o){if(e.isShader("fragment")){if(this.toNormalMap){var t=e.include(BumpMapNode.Nodes.bumpToNormal);return e.format(t+"( "+this.value.build(e,"sampler2D")+", "+this.value.uv.build(e,"v2")+", "+this.scale.build(e,"f")+" )",this.getType(e),o)}var d=e.include(BumpMapNode.Nodes.dHdxy_fwd),r=e.include(BumpMapNode.Nodes.perturbNormalArb);this.normal=this.normal||new NormalNode,this.position=this.position||new PositionNode(PositionNode.VIEW);var a=d+"( "+this.value.build(e,"sampler2D")+", "+this.value.uv.build(e,"v2")+", "+this.scale.build(e,"f")+" )";return e.format(r+"( -"+this.position.build(e,"v3")+", "+this.normal.build(e,"v3")+", "+a+" )",this.getType(e),o)}return console.warn("THREE.BumpMapNode is not compatible with "+e.shader+" shader."),e.format("vec3( 0.0 )",this.getType(e),o)},BumpMapNode.prototype.copy=function(e){return TempNode.prototype.copy.call(this,e),this.value=e.value,this.scale=e.scale,this},BumpMapNode.prototype.toJSON=function(e){var o=this.getJSONNode(e);return o||((o=this.createJSONNode(e)).value=this.value.toJSON(e).uuid,o.scale=this.scale.toJSON(e).uuid),o};export{BumpMapNode};