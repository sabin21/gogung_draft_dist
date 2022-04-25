import{UniformsLib,UniformsUtils}from"../../../../../build/three.module.js";import{Node}from"../../core/Node.js";import{ColorNode}from"../../inputs/ColorNode.js";function SpriteNode(){Node.call(this),this.color=new ColorNode(15658734),this.spherical=!0}SpriteNode.prototype=Object.create(Node.prototype),SpriteNode.prototype.constructor=SpriteNode,SpriteNode.prototype.nodeType="Sprite",SpriteNode.prototype.build=function(e){if(e.define("SPRITE"),e.requires.lights=!1,e.requires.transparent=void 0!==this.alpha,e.isShader("vertex")){var o=this.position?this.position.analyzeAndFlow(e,"v3",{cache:"position"}):void 0;e.mergeUniform(UniformsUtils.merge([UniformsLib.fog])),e.addParsCode(["#include <fog_pars_vertex>","#include <logdepthbuf_pars_vertex>","#include <clipping_planes_pars_vertex>"].join("\n")),s=["#include <clipping_planes_fragment>","#include <begin_vertex>"],o&&s.push(o.code,o.result?"transformed = "+o.result+";":""),s.push("#include <project_vertex>","#include <fog_vertex>","mat4 modelViewMtx = modelViewMatrix;","mat4 modelMtx = modelMatrix;","modelMtx[3][0] = 0.0;","modelMtx[3][1] = 0.0;","modelMtx[3][2] = 0.0;"),this.spherical||s.push("modelMtx[1][1] = 1.0;"),s.push("modelViewMtx[0][0] = 1.0;","modelViewMtx[0][1] = 0.0;","modelViewMtx[0][2] = 0.0;"),this.spherical&&s.push("modelViewMtx[1][0] = 0.0;","modelViewMtx[1][1] = 1.0;","modelViewMtx[1][2] = 0.0;"),s.push("modelViewMtx[2][0] = 0.0;","modelViewMtx[2][1] = 0.0;","modelViewMtx[2][2] = 1.0;","gl_Position = projectionMatrix * modelViewMtx * modelMtx * vec4( transformed, 1.0 );","#include <logdepthbuf_vertex>","#include <clipping_planes_vertex>","#include <fog_vertex>")}else{e.addParsCode(["#include <fog_pars_fragment>","#include <logdepthbuf_pars_fragment>","#include <clipping_planes_pars_fragment>"].join("\n")),e.addCode(["#include <clipping_planes_fragment>","#include <logdepthbuf_fragment>"].join("\n")),this.mask&&this.mask.analyze(e),this.alpha&&this.alpha.analyze(e),this.color.analyze(e,{slot:"color"});var i=this.mask?this.mask.flow(e,"b"):void 0,t=this.alpha?this.alpha.flow(e,"f"):void 0,r=this.color.flow(e,"c",{slot:"color"}),s=[];i&&s.push(i.code,"if ( ! "+i.result+" ) discard;"),t?s.push(t.code,"#ifdef ALPHATEST","if ( "+t.result+" <= ALPHATEST ) discard;","#endif",r.code,"gl_FragColor = vec4( "+r.result+", "+t.result+" );"):s.push(r.code,"gl_FragColor = vec4( "+r.result+", 1.0 );"),s.push("#include <tonemapping_fragment>","#include <encodings_fragment>","#include <fog_fragment>")}return s.join("\n")},SpriteNode.prototype.copy=function(e){return Node.prototype.copy.call(this,e),e.position&&(this.position=e.position),this.color=e.color,void 0!==e.spherical&&(this.spherical=e.spherical),e.mask&&(this.mask=e.mask),e.alpha&&(this.alpha=e.alpha),this},SpriteNode.prototype.toJSON=function(e){var o=this.getJSONNode(e);return o||(o=this.createJSONNode(e),this.position&&(o.position=this.position.toJSON(e).uuid),o.color=this.color.toJSON(e).uuid,!1===this.spherical&&(o.spherical=!1),this.mask&&(o.mask=this.mask.toJSON(e).uuid),this.alpha&&(o.alpha=this.alpha.toJSON(e).uuid)),o};export{SpriteNode};