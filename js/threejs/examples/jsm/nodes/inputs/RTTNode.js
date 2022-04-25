import{Mesh,OrthographicCamera,PlaneBufferGeometry,Scene,WebGLRenderTarget}from"../../../../build/three.module.js";import{NodeBuilder}from"../core/NodeBuilder.js";import{NodeMaterial}from"../materials/NodeMaterial.js";import{TextureNode}from"./TextureNode.js";function RTTNode(e,r,t,a){a=a||{},this.input=t,this.clear=void 0===a.clear||a.clear,this.renderTarget=new WebGLRenderTarget(e,r,a),this.material=new NodeMaterial,this.camera=new OrthographicCamera(-1,1,1,-1,0,1),this.scene=new Scene,this.quad=new Mesh(new PlaneBufferGeometry(2,2),this.material),this.quad.frustumCulled=!1,this.scene.add(this.quad),this.render=!0,TextureNode.call(this,this.renderTarget.texture)}RTTNode.prototype=Object.create(TextureNode.prototype),RTTNode.prototype.constructor=RTTNode,RTTNode.prototype.nodeType="RTT",RTTNode.prototype.build=function(e,r,t){var a=new NodeBuilder;return a.nodes=e.nodes,a.updaters=e.updaters,this.material.fragment.value=this.input,this.material.build({builder:a}),TextureNode.prototype.build.call(this,e,r,t)},RTTNode.prototype.updateFramesaveTo=function(e){if(this.saveTo.render=!1,this.saveTo!==this.saveToCurrent){this.saveToMaterial&&this.saveToMaterial.dispose();var r=new NodeMaterial;r.fragment.value=this,r.build();var t=new Scene,a=new Mesh(new PlaneBufferGeometry(2,2),r);a.frustumCulled=!1,t.add(a),this.saveToScene=t,this.saveToMaterial=r}this.saveToCurrent=this.saveTo,e.renderer.setRenderTarget(this.saveTo.renderTarget),this.saveTo.clear&&e.renderer.clear(),e.renderer.render(this.saveToScene,this.camera)},RTTNode.prototype.updateFrame=function(e){e.renderer?(this.saveTo&&!1===this.saveTo.render&&this.updateFramesaveTo(e),this.render&&(this.material.uniforms.renderTexture&&(this.material.uniforms.renderTexture.value=e.renderTexture),e.renderer.setRenderTarget(this.renderTarget),this.clear&&e.renderer.clear(),e.renderer.render(this.scene,this.camera)),this.saveTo&&!0===this.saveTo.render&&this.updateFramesaveTo(e)):console.warn("RTTNode need a renderer in NodeFrame")},RTTNode.prototype.copy=function(e){return TextureNode.prototype.copy.call(this,e),this.saveTo=e.saveTo,this},RTTNode.prototype.toJSON=function(e){var r=this.getJSONNode(e);return r||(r=TextureNode.prototype.toJSON.call(this,e),this.saveTo&&(r.saveTo=this.saveTo.toJSON(e).uuid)),r};export{RTTNode};