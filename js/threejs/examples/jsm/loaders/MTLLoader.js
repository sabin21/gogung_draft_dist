import{Color,DefaultLoadingManager,FileLoader,FrontSide,Loader,LoaderUtils,MeshPhongMaterial,RepeatWrapping,TextureLoader,Vector2}from"../../../build/three.module.js";var MTLLoader=function(a){Loader.call(this,a)};MTLLoader.prototype=Object.assign(Object.create(Loader.prototype),{constructor:MTLLoader,load:function(a,r,e,t){var s=this,i=""===this.path?LoaderUtils.extractUrlBase(a):this.path,o=new FileLoader(this.manager);o.setPath(this.path),o.load(a,(function(a){r(s.parse(a,i))}),e,t)},setMaterialOptions:function(a){return this.materialOptions=a,this},parse:function(a,r){for(var e=a.split("\n"),t={},s=/\s+/,i={},o=0;o<e.length;o++){var n=e[o];if(0!==(n=n.trim()).length&&"#"!==n.charAt(0)){var p=n.indexOf(" "),l=p>=0?n.substring(0,p):n;l=l.toLowerCase();var h=p>=0?n.substring(p+1):"";if(h=h.trim(),"newmtl"===l)t={name:h},i[h]=t;else if("ka"===l||"kd"===l||"ks"===l||"ke"===l){var c=h.split(s,3);t[l]=[parseFloat(c[0]),parseFloat(c[1]),parseFloat(c[2])]}else t[l]=h}}var m=new MTLLoader.MaterialCreator(this.resourcePath||r,this.materialOptions);return m.setCrossOrigin(this.crossOrigin),m.setManager(this.manager),m.setMaterials(i),m}}),MTLLoader.MaterialCreator=function(a,r){this.baseUrl=a||"",this.options=r,this.materialsInfo={},this.materials={},this.materialsArray=[],this.nameLookup={},this.side=this.options&&this.options.side?this.options.side:FrontSide,this.wrap=this.options&&this.options.wrap?this.options.wrap:RepeatWrapping},MTLLoader.MaterialCreator.prototype={constructor:MTLLoader.MaterialCreator,crossOrigin:"anonymous",setCrossOrigin:function(a){return this.crossOrigin=a,this},setManager:function(a){this.manager=a},setMaterials:function(a){this.materialsInfo=this.convert(a),this.materials={},this.materialsArray=[],this.nameLookup={}},convert:function(a){if(!this.options)return a;var r={};for(var e in a){var t=a[e],s={};for(var i in r[e]=s,t){var o=!0,n=t[i],p=i.toLowerCase();switch(p){case"kd":case"ka":case"ks":this.options&&this.options.normalizeRGB&&(n=[n[0]/255,n[1]/255,n[2]/255]),this.options&&this.options.ignoreZeroRGBs&&0===n[0]&&0===n[1]&&0===n[2]&&(o=!1)}o&&(s[p]=n)}}return r},preload:function(){for(var a in this.materialsInfo)this.create(a)},getIndex:function(a){return this.nameLookup[a]},getAsArray:function(){var a=0;for(var r in this.materialsInfo)this.materialsArray[a]=this.create(r),this.nameLookup[r]=a,a++;return this.materialsArray},create:function(a){return void 0===this.materials[a]&&this.createMaterial_(a),this.materials[a]},createMaterial_:function(a){var r=this,e=this.materialsInfo[a],t={name:a,side:this.side};function s(a,e){if(!t[a]){var s,i,o=r.getTextureParams(e,t),n=r.loadTexture((s=r.baseUrl,"string"!=typeof(i=o.url)||""===i?"":/^https?:\/\//i.test(i)?i:s+i));n.repeat.copy(o.scale),n.offset.copy(o.offset),n.wrapS=r.wrap,n.wrapT=r.wrap,t[a]=n}}for(var i in e){var o,n=e[i];if(""!==n)switch(i.toLowerCase()){case"kd":t.color=(new Color).fromArray(n);break;case"ks":t.specular=(new Color).fromArray(n);break;case"ke":t.emissive=(new Color).fromArray(n);break;case"map_kd":s("map",n);break;case"map_ks":s("specularMap",n);break;case"map_ke":s("emissiveMap",n);break;case"norm":s("normalMap",n);break;case"map_bump":case"bump":s("bumpMap",n);break;case"map_d":s("alphaMap",n),t.transparent=!0;break;case"ns":t.shininess=parseFloat(n);break;case"d":(o=parseFloat(n))<1&&(t.opacity=o,t.transparent=!0);break;case"tr":o=parseFloat(n),this.options&&this.options.invertTrProperty&&(o=1-o),o>0&&(t.opacity=1-o,t.transparent=!0)}}return this.materials[a]=new MeshPhongMaterial(t),this.materials[a]},getTextureParams:function(a,r){var e,t={scale:new Vector2(1,1),offset:new Vector2(0,0)},s=a.split(/\s+/);return(e=s.indexOf("-bm"))>=0&&(r.bumpScale=parseFloat(s[e+1]),s.splice(e,2)),(e=s.indexOf("-s"))>=0&&(t.scale.set(parseFloat(s[e+1]),parseFloat(s[e+2])),s.splice(e,4)),(e=s.indexOf("-o"))>=0&&(t.offset.set(parseFloat(s[e+1]),parseFloat(s[e+2])),s.splice(e,4)),t.url=s.join(" ").trim(),t},loadTexture:function(a,r,e,t,s){var i,o=void 0!==this.manager?this.manager:DefaultLoadingManager,n=o.getHandler(a);return null===n&&(n=new TextureLoader(o)),n.setCrossOrigin&&n.setCrossOrigin(this.crossOrigin),i=n.load(a,e,t,s),void 0!==r&&(i.mapping=r),i}};export{MTLLoader};