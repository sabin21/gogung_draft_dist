import{LineBasicMaterial,MaterialLoader,MeshStandardMaterial,PointsMaterial,VertexColors}from"../../../../../build/three.module.js";const MaterialHandler=function(){this.logging={enabled:!1,debug:!1},this.callbacks={onLoadMaterials:null},this.materials={}};MaterialHandler.prototype={constructor:MaterialHandler,setLogging:function(a,e){this.logging.enabled=!0===a,this.logging.debug=!0===e},_setCallbacks:function(a){null!=a&&a instanceof Function&&(this.callbacks.onLoadMaterials=a)},createDefaultMaterials:function(a){let e=new MeshStandardMaterial({color:14479871});e.name="defaultMaterial";let t=new MeshStandardMaterial({color:14479871});t.name="defaultVertexColorMaterial",t.vertexColors=VertexColors;let l=new LineBasicMaterial;l.name="defaultLineMaterial";let i=new PointsMaterial({size:.1});i.name="defaultPointMaterial";let n={};n[e.name]=e,n[t.name]=t,n[l.name]=l,n[i.name]=i,this.addMaterials(n,a)},addPayloadMaterials:function(a){let e,t,l=a.materials.materialCloneInstructions,i={};if(null!=l){let a=l.materialNameOrg;a=null!=a?a:"";let n=this.materials[a];n?(e=n.clone(),t=l.materialName,e.name=t,Object.assign(e,l.materialProperties),this.materials[t]=e,i[t]=e):this.logging.enabled&&console.info('Requested material "'+a+'" is not available!')}let n=a.materials.serializedMaterials;if(null!=n&&Object.keys(n).length>0){let a,l=new MaterialLoader;for(t in n)a=n[t],null!=a&&(e=l.parse(a),this.logging.enabled&&console.info('De-serialized material with name "'+t+'" will be added.'),this.materials[t]=e,i[t]=e)}return n=a.materials.runtimeMaterials,i=this.addMaterials(n,!0,i),i},addMaterials:function(a,e,t){if(null==t&&(t={}),null!=a&&Object.keys(a).length>0){let l,i,n;for(let r in a)l=a[r],n=!0===e,n||(i=this.materials[r],n=null==i),n&&(this.materials[r]=l,t[r]=l),this.logging.enabled&&this.logging.debug&&console.info('Material with name "'+r+'" was added.')}return this.callbacks.onLoadMaterials&&this.callbacks.onLoadMaterials(t),t},getMaterials:function(){return this.materials},getMaterial:function(a){return this.materials[a]},getMaterialsJSON:function(){let a,e={};for(let t in this.materials)a=this.materials[t],e[t]=a.toJSON();return e},clearMaterials:function(){this.materials={}}};export{MaterialHandler};