import{AmbientLight,AnimationClip,Bone,BufferGeometry,ClampToEdgeWrapping,Color,DirectionalLight,DoubleSide,Euler,FileLoader,Float32BufferAttribute,Group,Line,LineBasicMaterial,LineSegments,Loader,LoaderUtils,Math as _Math,Matrix4,Mesh,MeshBasicMaterial,MeshLambertMaterial,MeshPhongMaterial,OrthographicCamera,PerspectiveCamera,PointLight,Quaternion,QuaternionKeyframeTrack,RepeatWrapping,Scene,Skeleton,SkinnedMesh,SpotLight,TextureLoader,Vector3,VectorKeyframeTrack}from"../../../build/three.module.js";import{TGALoader}from"../loaders/TGALoader.js";var ColladaLoader=function(e){Loader.call(this,e)};ColladaLoader.prototype=Object.assign(Object.create(Loader.prototype),{constructor:ColladaLoader,load:function(e,t,r,a){var n=this,i=""===n.path?LoaderUtils.extractUrlBase(e):n.path,o=new FileLoader(n.manager);o.setPath(n.path),o.load(e,(function(e){t(n.parse(e,i))}),r,a)},options:{set convertUpAxis(e){console.warn("THREE.ColladaLoader: options.convertUpAxis() has been removed. Up axis is converted automatically.")}},parse:function(e,t){function r(e,t){for(var r=[],a=e.childNodes,n=0,i=a.length;n<i;n++){var o=a[n];o.nodeName===t&&r.push(o)}return r}function a(e){if(0===e.length)return[];for(var t=e.trim().split(/\s+/),r=new Array(t.length),a=0,n=t.length;a<n;a++)r[a]=t[a];return r}function n(e){if(0===e.length)return[];for(var t=e.trim().split(/\s+/),r=new Array(t.length),a=0,n=t.length;a<n;a++)r[a]=parseFloat(t[a]);return r}function i(e){if(0===e.length)return[];for(var t=e.trim().split(/\s+/),r=new Array(t.length),a=0,n=t.length;a<n;a++)r[a]=parseInt(t[a]);return r}function o(e){return e.substring(1)}function s(e){return 0===Object.keys(e).length}function c(e){return void 0!==e&&!0===e.hasAttribute("meter")?parseFloat(e.getAttribute("meter")):1}function l(e){return void 0!==e?e.textContent:"Y_UP"}function d(e,t,a,n){var i=r(e,t)[0];if(void 0!==i)for(var o=r(i,a),s=0;s<o.length;s++)n(o[s])}function u(e,t){for(var r in e)e[r].build=t(e[r])}function f(e,t){return void 0!==e.build||(e.build=t(e)),e.build}function h(e){for(var t={inputs:{}},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];if(1===n.nodeType&&"input"===n.nodeName){var i=o(n.getAttribute("source")),s=n.getAttribute("semantic");t.inputs[s]=i}}return t}function m(e){var t={},r=e.getAttribute("target").split("/"),a=r.shift(),n=r.shift(),i=-1!==n.indexOf("("),s=-1!==n.indexOf(".");if(s)r=n.split("."),n=r.shift(),t.member=r.shift();else if(i){var c=n.split("(");n=c.shift();for(var l=0;l<c.length;l++)c[l]=parseInt(c[l].replace(/\)/,""));t.indices=c}return t.id=a,t.sid=n,t.arraySyntax=i,t.memberSyntax=s,t.sampler=o(e.getAttribute("source")),t}function p(e){var t=[],r=e.channels,a=e.samplers,n=e.sources;for(var i in r)if(r.hasOwnProperty(i)){var o=r[i],s=a[o.sampler],c=s.inputs.INPUT,l=s.inputs.OUTPUT;x(g(o,n[c],n[l]),t)}return t}function v(e){return f(Qe.animations[e],p)}function g(e,t,r){var a,n,i,o,s,c,l=Qe.nodes[e.id],d=Se(l.id),u=l.transforms[e.sid],f=l.matrix.clone().transpose(),h={};switch(u){case"matrix":for(i=0,o=t.array.length;i<o;i++)if(a=t.array[i],n=i*r.stride,void 0===h[a]&&(h[a]={}),!0===e.arraySyntax){var m=r.array[n],p=e.indices[0]+4*e.indices[1];h[a][p]=m}else for(s=0,c=r.stride;s<c;s++)h[a][s]=r.array[n+s];break;case"translate":case"rotate":case"scale":console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.',u)}var v=function(e,t){var r=[];for(var a in e)r.push({time:parseFloat(a),value:e[a]});r.sort((function(e,t){return e.time-t.time}));for(var n=0;n<16;n++)k(r,n,t.elements[n]);return r}(h,f);return{name:d.uuid,keyframes:v}}var b=new Vector3,y=new Vector3,N=new Quaternion;function x(e,t){for(var r=e.keyframes,a=e.name,n=[],i=[],o=[],s=[],c=0,l=r.length;c<l;c++){var d=r[c],u=d.time,f=d.value;we.fromArray(f).transpose(),we.decompose(b,N,y),n.push(u),i.push(b.x,b.y,b.z),o.push(N.x,N.y,N.z,N.w),s.push(y.x,y.y,y.z)}return i.length>0&&t.push(new VectorKeyframeTrack(a+".position",n,i)),o.length>0&&t.push(new QuaternionKeyframeTrack(a+".quaternion",n,o)),s.length>0&&t.push(new VectorKeyframeTrack(a+".scale",n,s)),t}function k(e,t,r){var a,n,i,o=!0;for(n=0,i=e.length;n<i;n++)void 0===(a=e[n]).value[t]?a.value[t]=null:o=!1;if(!0===o)for(n=0,i=e.length;n<i;n++)(a=e[n]).value[t]=r;else!function(e,t){for(var r,a,n=0,i=e.length;n<i;n++){var o=e[n];if(null===o.value[t]){if(r=A(e,n,t),a=w(e,n,t),null===r){o.value[t]=a.value[t];continue}if(null===a){o.value[t]=r.value[t];continue}T(o,r,a,t)}}}(e,t)}function A(e,t,r){for(;t>=0;){var a=e[t];if(null!==a.value[r])return a;t--}return null}function w(e,t,r){for(;t<e.length;){var a=e[t];if(null!==a.value[r])return a;t++}return null}function T(e,t,r,a){r.time-t.time!=0?e.value[a]=(e.time-t.time)*(r.value[a]-t.value[a])/(r.time-t.time)+t.value[a]:e.value[a]=t.value[a]}function C(e){for(var t=[],r=e.name,a=e.end-e.start||-1,n=e.animations,i=0,o=n.length;i<o;i++)for(var s=v(n[i]),c=0,l=s.length;c<l;c++)t.push(s[c]);return new AnimationClip(r,a,t)}function _(e){return f(Qe.clips[e],C)}function E(e){for(var t={sources:{}},r=0,a=e.childNodes.length;r<a;r++){var i=e.childNodes[r];if(1===i.nodeType)switch(i.nodeName){case"bind_shape_matrix":t.bindShapeMatrix=n(i.textContent);break;case"source":var o=i.getAttribute("id");t.sources[o]=ne(i);break;case"joints":t.joints=L(i);break;case"vertex_weights":t.vertexWeights=M(i)}}return t}function L(e){for(var t={inputs:{}},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];if(1===n.nodeType&&"input"===n.nodeName){var i=n.getAttribute("semantic"),s=o(n.getAttribute("source"));t.inputs[i]=s}}return t}function M(e){for(var t={inputs:{}},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];if(1===n.nodeType)switch(n.nodeName){case"input":var s=n.getAttribute("semantic"),c=o(n.getAttribute("source")),l=parseInt(n.getAttribute("offset"));t.inputs[s]={id:c,offset:l};break;case"vcount":t.vcount=i(n.textContent);break;case"v":t.v=i(n.textContent)}}return t}function R(e){var t={id:e.id},r=Qe.geometries[t.id];return void 0!==e.skin&&(t.skin=function(e){var t,r,a,n={joints:[],indices:{array:[],stride:4},weights:{array:[],stride:4}},i=e.sources,o=e.vertexWeights,s=o.vcount,c=o.v,l=o.inputs.JOINT.offset,d=o.inputs.WEIGHT.offset,u=e.sources[e.joints.inputs.JOINT],f=e.sources[e.joints.inputs.INV_BIND_MATRIX],h=i[o.inputs.WEIGHT.id].array,m=0;for(t=0,a=s.length;t<a;t++){var p=s[t],v=[];for(r=0;r<p;r++){var g=c[m+l],b=h[c[m+d]];v.push({index:g,weight:b}),m+=2}for(v.sort(k),r=0;r<4;r++){var y=v[r];void 0!==y?(n.indices.array.push(y.index),n.weights.array.push(y.weight)):(n.indices.array.push(0),n.weights.array.push(0))}}for(e.bindShapeMatrix?n.bindMatrix=(new Matrix4).fromArray(e.bindShapeMatrix).transpose():n.bindMatrix=(new Matrix4).identity(),t=0,a=u.array.length;t<a;t++){var N=u.array[t],x=(new Matrix4).fromArray(f.array,t*f.stride).transpose();n.joints.push({name:N,boneInverse:x})}return n;function k(e,t){return t.weight-e.weight}}(e.skin),r.sources.skinIndices=t.skin.indices,r.sources.skinWeights=t.skin.weights),t}function O(e){return void 0!==e.build?e.build:e.init_from}function j(e){var t=Qe.images[e];return void 0!==t?f(t,O):(console.warn("THREE.ColladaLoader: Couldn't find image with ID:",e),null)}function I(e){for(var t={surfaces:{},samplers:{}},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];if(1===n.nodeType)switch(n.nodeName){case"newparam":S(n,t);break;case"technique":t.technique=F(n);break;case"extra":t.extra=G(n)}}return t}function S(e,t){for(var r=e.getAttribute("sid"),a=0,n=e.childNodes.length;a<n;a++){var i=e.childNodes[a];if(1===i.nodeType)switch(i.nodeName){case"surface":t.surfaces[r]=q(i);break;case"sampler2D":t.samplers[r]=B(i)}}}function q(e){for(var t={},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];1===n.nodeType&&"init_from"===n.nodeName&&(t.init_from=n.textContent)}return t}function B(e){for(var t={},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];1===n.nodeType&&"source"===n.nodeName&&(t.source=n.textContent)}return t}function F(e){for(var t={},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];if(1===n.nodeType)switch(n.nodeName){case"constant":case"lambert":case"blinn":case"phong":t.type=n.nodeName,t.parameters=U(n)}}return t}function U(e){for(var t={},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];if(1===n.nodeType)switch(n.nodeName){case"emission":case"diffuse":case"specular":case"bump":case"ambient":case"shininess":case"transparency":t[n.nodeName]=V(n);break;case"transparent":t[n.nodeName]={opaque:n.getAttribute("opaque"),data:V(n)}}}return t}function V(e){for(var t={},r=0,a=e.childNodes.length;r<a;r++){var i=e.childNodes[r];if(1===i.nodeType)switch(i.nodeName){case"color":t[i.nodeName]=n(i.textContent);break;case"float":t[i.nodeName]=parseFloat(i.textContent);break;case"texture":t[i.nodeName]={id:i.getAttribute("texture"),extra:H(i)}}}return t}function H(e){for(var t={technique:{}},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];1===n.nodeType&&"extra"===n.nodeName&&P(n,t)}return t}function P(e,t){for(var r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];1===n.nodeType&&"technique"===n.nodeName&&D(n,t)}}function D(e,t){for(var r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];if(1===n.nodeType)switch(n.nodeName){case"repeatU":case"repeatV":case"offsetU":case"offsetV":t.technique[n.nodeName]=parseFloat(n.textContent);break;case"wrapU":case"wrapV":"TRUE"===n.textContent.toUpperCase()?t.technique[n.nodeName]=1:"FALSE"===n.textContent.toUpperCase()?t.technique[n.nodeName]=0:t.technique[n.nodeName]=parseInt(n.textContent)}}}function G(e){for(var t={},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];1===n.nodeType&&"technique"===n.nodeName&&(t.technique=W(n))}return t}function W(e){for(var t={},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];1===n.nodeType&&"double_sided"===n.nodeName&&(t[n.nodeName]=parseInt(n.textContent))}return t}function z(e){return e}function J(e){var t,r,a=(t=e.url,f(Qe.effects[t],z)),n=a.profile.technique,i=a.profile.extra;switch(n.type){case"phong":case"blinn":r=new MeshPhongMaterial;break;case"lambert":r=new MeshLambertMaterial;break;default:r=new MeshBasicMaterial}function o(e){var t=a.profile.samplers[e.id],r=null;if(void 0!==t?r=j(a.profile.surfaces[t.source].init_from):(console.warn("THREE.ColladaLoader: Undefined sampler. Access image directly (see #12530)."),r=j(e.id)),null!==r){var n=function(e){var t=e.slice(2+(e.lastIndexOf(".")-1>>>0));return"tga"===(t=t.toLowerCase())?Ge:ze}(r);if(void 0!==n){var i=n.load(r),o=e.extra;if(void 0!==o&&void 0!==o.technique&&!1===s(o.technique)){var c=o.technique;i.wrapS=c.wrapU?RepeatWrapping:ClampToEdgeWrapping,i.wrapT=c.wrapV?RepeatWrapping:ClampToEdgeWrapping,i.offset.set(c.offsetU||0,c.offsetV||0),i.repeat.set(c.repeatU||1,c.repeatV||1)}else i.wrapS=RepeatWrapping,i.wrapT=RepeatWrapping;return i}return console.warn("THREE.ColladaLoader: Loader for texture %s not found.",r),null}return console.warn("THREE.ColladaLoader: Couldn't create texture with ID:",e.id),null}r.name=e.name||"";var c=n.parameters;for(var l in c){var d=c[l];switch(l){case"diffuse":d.color&&r.color.fromArray(d.color),d.texture&&(r.map=o(d.texture));break;case"specular":d.color&&r.specular&&r.specular.fromArray(d.color),d.texture&&(r.specularMap=o(d.texture));break;case"bump":d.texture&&(r.normalMap=o(d.texture));break;case"ambient":d.texture&&(r.lightMap=o(d.texture));break;case"shininess":d.float&&r.shininess&&(r.shininess=d.float);break;case"emission":d.color&&r.emissive&&r.emissive.fromArray(d.color),d.texture&&(r.emissiveMap=o(d.texture))}}var u=c.transparent,h=c.transparency;if(void 0===h&&u&&(h={float:1}),void 0===u&&h&&(u={opaque:"A_ONE",data:{color:[1,1,1,1]}}),u&&h)if(u.data.texture)r.transparent=!0;else{var m=u.data.color;switch(u.opaque){case"A_ONE":r.opacity=m[3]*h.float;break;case"RGB_ZERO":r.opacity=1-m[0]*h.float;break;case"A_ZERO":r.opacity=1-m[3]*h.float;break;case"RGB_ONE":r.opacity=m[0]*h.float;break;default:console.warn('THREE.ColladaLoader: Invalid opaque type "%s" of transparent tag.',u.opaque)}r.opacity<1&&(r.transparent=!0)}return void 0!==i&&void 0!==i.technique&&1===i.technique.double_sided&&(r.side=DoubleSide),r}function X(e){return f(Qe.materials[e],J)}function K(e){for(var t=0;t<e.childNodes.length;t++){var r=e.childNodes[t];if("technique_common"===r.nodeName)return Q(r)}return{}}function Q(e){for(var t={},r=0;r<e.childNodes.length;r++){var a=e.childNodes[r];switch(a.nodeName){case"perspective":case"orthographic":t.technique=a.nodeName,t.parameters=Z(a)}}return t}function Z(e){for(var t={},r=0;r<e.childNodes.length;r++){var a=e.childNodes[r];switch(a.nodeName){case"xfov":case"yfov":case"xmag":case"ymag":case"znear":case"zfar":case"aspect_ratio":t[a.nodeName]=parseFloat(a.textContent)}}return t}function Y(e){var t;switch(e.optics.technique){case"perspective":t=new PerspectiveCamera(e.optics.parameters.yfov,e.optics.parameters.aspect_ratio,e.optics.parameters.znear,e.optics.parameters.zfar);break;case"orthographic":var r=e.optics.parameters.ymag,a=e.optics.parameters.xmag,n=e.optics.parameters.aspect_ratio;a=void 0===a?r*n:a,r=void 0===r?a/n:r,t=new OrthographicCamera(-(a*=.5),a,r*=.5,-r,e.optics.parameters.znear,e.optics.parameters.zfar);break;default:t=new PerspectiveCamera}return t.name=e.name||"",t}function $(e){var t=Qe.cameras[e];return void 0!==t?f(t,Y):(console.warn("THREE.ColladaLoader: Couldn't find camera with ID:",e),null)}function ee(e){for(var t={},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];if(1===n.nodeType)switch(n.nodeName){case"directional":case"point":case"spot":case"ambient":t.technique=n.nodeName,t.parameters=te(n)}}return t}function te(e){for(var t={},r=0,a=e.childNodes.length;r<a;r++){var i=e.childNodes[r];if(1===i.nodeType)switch(i.nodeName){case"color":var o=n(i.textContent);t.color=(new Color).fromArray(o);break;case"falloff_angle":t.falloffAngle=parseFloat(i.textContent);break;case"quadratic_attenuation":var s=parseFloat(i.textContent);t.distance=s?Math.sqrt(1/s):0}}return t}function re(e){var t;switch(e.technique){case"directional":t=new DirectionalLight;break;case"point":t=new PointLight;break;case"spot":t=new SpotLight;break;case"ambient":t=new AmbientLight}return e.parameters.color&&t.color.copy(e.parameters.color),e.parameters.distance&&(t.distance=e.parameters.distance),t}function ae(e){var t=Qe.lights[e];return void 0!==t?f(t,re):(console.warn("THREE.ColladaLoader: Couldn't find light with ID:",e),null)}function ne(e){for(var t={array:[],stride:3},i=0;i<e.childNodes.length;i++){var o=e.childNodes[i];if(1===o.nodeType)switch(o.nodeName){case"float_array":t.array=n(o.textContent);break;case"Name_array":t.array=a(o.textContent);break;case"technique_common":var s=r(o,"accessor")[0];void 0!==s&&(t.stride=parseInt(s.getAttribute("stride")))}}return t}function ie(e){for(var t={},r=0;r<e.childNodes.length;r++){var a=e.childNodes[r];1===a.nodeType&&(t[a.getAttribute("semantic")]=o(a.getAttribute("source")))}return t}function oe(e){for(var t={type:e.nodeName,material:e.getAttribute("material"),count:parseInt(e.getAttribute("count")),inputs:{},stride:0,hasUV:!1},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];if(1===n.nodeType)switch(n.nodeName){case"input":var s=o(n.getAttribute("source")),c=n.getAttribute("semantic"),l=parseInt(n.getAttribute("offset")),d=parseInt(n.getAttribute("set")),u=d>0?c+d:c;t.inputs[u]={id:s,offset:l},t.stride=Math.max(t.stride,l+1),"TEXCOORD"===c&&(t.hasUV=!0);break;case"vcount":t.vcount=i(n.textContent);break;case"p":t.p=i(n.textContent)}}return t}function se(e){for(var t=0,r=0,a=e.length;r<a;r++)!0===e[r].hasUV&&t++;t>0&&t<e.length&&(e.uvsNeedsFix=!0)}function ce(e){var t={},r=e.sources,a=e.vertices,n=e.primitives;if(0===n.length)return{};var i=function(e){for(var t={},r=0;r<e.length;r++){var a=e[r];void 0===t[a.type]&&(t[a.type]=[]),t[a.type].push(a)}return t}(n);for(var o in i){var s=i[o];se(s),t[o]=le(s,r,a)}return t}function le(e,t,r){for(var a={},n={array:[],stride:0},i={array:[],stride:0},o={array:[],stride:0},s={array:[],stride:0},c={array:[],stride:0},l=[],d=[],u=new BufferGeometry,f=[],h=0,m=0;m<e.length;m++){var p=e[m],v=p.inputs,g=0;switch(p.type){case"lines":case"linestrips":g=2*p.count;break;case"triangles":g=3*p.count;break;case"polylist":for(var b=0;b<p.count;b++){var y=p.vcount[b];switch(y){case 3:g+=3;break;case 4:g+=6;break;default:g+=3*(y-2)}}break;default:console.warn("THREE.ColladaLoader: Unknow primitive type:",p.type)}for(var N in u.addGroup(h,g,m),h+=g,p.material&&f.push(p.material),v){var x=v[N];switch(N){case"VERTEX":for(var k in r){var A=r[k];switch(k){case"POSITION":var w=n.array.length;if(de(p,t[A],x.offset,n.array),n.stride=t[A].stride,t.skinWeights&&t.skinIndices&&(de(p,t.skinIndices,x.offset,l),de(p,t.skinWeights,x.offset,d)),!1===p.hasUV&&!0===e.uvsNeedsFix){g=(n.array.length-w)/n.stride;for(var T=0;T<g;T++)o.array.push(0,0)}break;case"NORMAL":de(p,t[A],x.offset,i.array),i.stride=t[A].stride;break;case"COLOR":de(p,t[A],x.offset,c.array),c.stride=t[A].stride;break;case"TEXCOORD":de(p,t[A],x.offset,o.array),o.stride=t[A].stride;break;case"TEXCOORD1":de(p,t[A],x.offset,s.array),o.stride=t[A].stride;break;default:console.warn('THREE.ColladaLoader: Semantic "%s" not handled in geometry build process.',k)}}break;case"NORMAL":de(p,t[x.id],x.offset,i.array),i.stride=t[x.id].stride;break;case"COLOR":de(p,t[x.id],x.offset,c.array),c.stride=t[x.id].stride;break;case"TEXCOORD":de(p,t[x.id],x.offset,o.array),o.stride=t[x.id].stride;break;case"TEXCOORD1":de(p,t[x.id],x.offset,s.array),s.stride=t[x.id].stride}}}return n.array.length>0&&u.addAttribute("position",new Float32BufferAttribute(n.array,n.stride)),i.array.length>0&&u.addAttribute("normal",new Float32BufferAttribute(i.array,i.stride)),c.array.length>0&&u.addAttribute("color",new Float32BufferAttribute(c.array,c.stride)),o.array.length>0&&u.addAttribute("uv",new Float32BufferAttribute(o.array,o.stride)),s.array.length>0&&u.addAttribute("uv2",new Float32BufferAttribute(s.array,s.stride)),l.length>0&&u.addAttribute("skinIndex",new Float32BufferAttribute(l,4)),d.length>0&&u.addAttribute("skinWeight",new Float32BufferAttribute(d,4)),a.data=u,a.type=e[0].type,a.materialKeys=f,a}function de(e,t,r,a){var n=e.p,i=e.stride,o=e.vcount;function s(e){for(var t=n[e+r]*l,i=t+l;t<i;t++)a.push(c[t])}var c=t.array,l=t.stride;if(void 0!==e.vcount)for(var d=0,u=0,f=o.length;u<f;u++){var h=o[u];if(4===h){var m=d+1*i,p=d+2*i,v=d+3*i;s(d+0*i),s(m),s(v),s(m),s(p),s(v)}else if(3===h)m=d+1*i,p=d+2*i,s(d+0*i),s(m),s(p);else if(h>4)for(var g=1,b=h-2;g<=b;g++)m=d+i*g,p=d+i*(g+1),s(d+0*i),s(m),s(p);d+=i*h}else for(u=0,f=n.length;u<f;u+=i)s(u)}function ue(e){return f(Qe.geometries[e],ce)}function fe(e){return void 0!==e.build?e.build:e}function he(e,t){for(var r=0;r<e.childNodes.length;r++){var a=e.childNodes[r];if(1===a.nodeType)switch(a.nodeName){case"joint":t.joints[a.getAttribute("sid")]=me(a);break;case"link":t.links.push(ve(a))}}}function me(e){for(var t,r=0;r<e.childNodes.length;r++){var a=e.childNodes[r];if(1===a.nodeType)switch(a.nodeName){case"prismatic":case"revolute":t=pe(a)}}return t}function pe(e,t){t={sid:e.getAttribute("sid"),name:e.getAttribute("name")||"",axis:new Vector3,limits:{min:0,max:0},type:e.nodeName,static:!1,zeroPosition:0,middlePosition:0};for(var r=0;r<e.childNodes.length;r++){var a=e.childNodes[r];if(1===a.nodeType)switch(a.nodeName){case"axis":var i=n(a.textContent);t.axis.fromArray(i);break;case"limits":var o=a.getElementsByTagName("max")[0],s=a.getElementsByTagName("min")[0];t.limits.max=parseFloat(o.textContent),t.limits.min=parseFloat(s.textContent)}}return t.limits.min>=t.limits.max&&(t.static=!0),t.middlePosition=(t.limits.min+t.limits.max)/2,t}function ve(e){for(var t={sid:e.getAttribute("sid"),name:e.getAttribute("name")||"",attachments:[],transforms:[]},r=0;r<e.childNodes.length;r++){var a=e.childNodes[r];if(1===a.nodeType)switch(a.nodeName){case"attachment_full":t.attachments.push(ge(a));break;case"matrix":case"translate":case"rotate":t.transforms.push(be(a))}}return t}function ge(e){for(var t={joint:e.getAttribute("joint").split("/").pop(),transforms:[],links:[]},r=0;r<e.childNodes.length;r++){var a=e.childNodes[r];if(1===a.nodeType)switch(a.nodeName){case"link":t.links.push(ve(a));break;case"matrix":case"translate":case"rotate":t.transforms.push(be(a))}}return t}function be(e){var t={type:e.nodeName},r=n(e.textContent);switch(t.type){case"matrix":t.obj=new Matrix4,t.obj.fromArray(r).transpose();break;case"translate":t.obj=new Vector3,t.obj.fromArray(r);break;case"rotate":t.obj=new Vector3,t.obj.fromArray(r),t.angle=_Math.degToRad(r[3])}return t}function ye(e,t){for(var r=0;r<e.childNodes.length;r++){var a=e.childNodes[r];1===a.nodeType&&"technique_common"===a.nodeName&&Ne(a,t)}}function Ne(e,t){for(var r=0;r<e.childNodes.length;r++){var a=e.childNodes[r];if(1===a.nodeType)switch(a.nodeName){case"inertia":t.inertia=n(a.textContent);break;case"mass":t.mass=n(a.textContent)[0]}}}function xe(e){for(var t={target:e.getAttribute("target").split("/").pop()},r=0;r<e.childNodes.length;r++){var a=e.childNodes[r];if(1===a.nodeType&&"axis"===a.nodeName){var n=a.getElementsByTagName("param")[0];t.axis=n.textContent;var i=t.axis.split("inst_").pop().split("axis")[0];t.jointIndex=i.substr(0,i.length-1)}}return t}function ke(e){return void 0!==e.build?e.build:e}function Ae(e){for(var t=[],r=Ue.querySelector('[id="'+e.id+'"]'),a=0;a<r.childNodes.length;a++){var i=r.childNodes[a];if(1===i.nodeType)switch(i.nodeName){case"matrix":var o=n(i.textContent),s=(new Matrix4).fromArray(o).transpose();t.push({sid:i.getAttribute("sid"),type:i.nodeName,obj:s});break;case"translate":case"scale":o=n(i.textContent);var c=(new Vector3).fromArray(o);t.push({sid:i.getAttribute("sid"),type:i.nodeName,obj:c});break;case"rotate":o=n(i.textContent),c=(new Vector3).fromArray(o);var l=_Math.degToRad(o[3]);t.push({sid:i.getAttribute("sid"),type:i.nodeName,obj:c,angle:l})}}return t}var we=new Matrix4,Te=new Vector3;function Ce(e){for(var t={name:e.getAttribute("name")||"",type:e.getAttribute("type"),id:e.getAttribute("id"),sid:e.getAttribute("sid"),matrix:new Matrix4,nodes:[],instanceCameras:[],instanceControllers:[],instanceLights:[],instanceGeometries:[],instanceNodes:[],transforms:{}},r=0;r<e.childNodes.length;r++){var a=e.childNodes[r];if(1===a.nodeType)switch(a.nodeName){case"node":t.nodes.push(a.getAttribute("id")),Ce(a);break;case"instance_camera":t.instanceCameras.push(o(a.getAttribute("url")));break;case"instance_controller":t.instanceControllers.push(_e(a));break;case"instance_light":t.instanceLights.push(o(a.getAttribute("url")));break;case"instance_geometry":t.instanceGeometries.push(_e(a));break;case"instance_node":t.instanceNodes.push(o(a.getAttribute("url")));break;case"matrix":var i=n(a.textContent);t.matrix.multiply(we.fromArray(i).transpose()),t.transforms[a.getAttribute("sid")]=a.nodeName;break;case"translate":i=n(a.textContent),Te.fromArray(i),t.matrix.multiply(we.makeTranslation(Te.x,Te.y,Te.z)),t.transforms[a.getAttribute("sid")]=a.nodeName;break;case"rotate":i=n(a.textContent);var s=_Math.degToRad(i[3]);t.matrix.multiply(we.makeRotationAxis(Te.fromArray(i),s)),t.transforms[a.getAttribute("sid")]=a.nodeName;break;case"scale":i=n(a.textContent),t.matrix.scale(Te.fromArray(i)),t.transforms[a.getAttribute("sid")]=a.nodeName;break;case"extra":break;default:console.log(a)}}return Ie(t.id)?console.warn("THREE.ColladaLoader: There is already a node with ID %s. Exclude current node from further processing.",t.id):Qe.nodes[t.id]=t,t}function _e(e){for(var t={id:o(e.getAttribute("url")),materials:{},skeletons:[]},r=0;r<e.childNodes.length;r++){var a=e.childNodes[r];switch(a.nodeName){case"bind_material":for(var n=a.getElementsByTagName("instance_material"),i=0;i<n.length;i++){var s=n[i],c=s.getAttribute("symbol"),l=s.getAttribute("target");t.materials[c]=o(l)}break;case"skeleton":t.skeletons.push(o(a.textContent))}}return t}function Ee(e,t){var r,a,n,i=[],o=[];for(r=0;r<e.length;r++){var s=e[r];if(Ie(s))Le(Se(s),t,i);else if(n=s,void 0!==Qe.visualScenes[n])for(var c=Qe.visualScenes[s].children,l=0;l<c.length;l++){var d=c[l];"JOINT"===d.type&&Le(Se(d.id),t,i)}else console.error("THREE.ColladaLoader: Unable to find root bone of skeleton with ID:",s)}for(r=0;r<t.length;r++)for(l=0;l<i.length;l++)if((a=i[l]).bone.name===t[r].name){o[r]=a,a.processed=!0;break}for(r=0;r<i.length;r++)!1===(a=i[r]).processed&&(o.push(a),a.processed=!0);var u=[],f=[];for(r=0;r<o.length;r++)a=o[r],u.push(a.bone),f.push(a.boneInverse);return new Skeleton(u,f)}function Le(e,t,r){e.traverse((function(e){if(!0===e.isBone){for(var a,n=0;n<t.length;n++){var i=t[n];if(i.name===e.name){a=i.boneInverse;break}}void 0===a&&(a=new Matrix4),r.push({bone:e,boneInverse:a,processed:!1})}}))}function Me(e){for(var t,r=[],a=e.matrix,n=e.nodes,i=e.type,o=e.instanceCameras,s=e.instanceControllers,c=e.instanceLights,l=e.instanceGeometries,d=e.instanceNodes,u=0,h=n.length;u<h;u++)r.push(Se(n[u]));for(u=0,h=o.length;u<h;u++){var m=$(o[u]);null!==m&&r.push(m.clone())}for(u=0,h=s.length;u<h;u++)for(var p=s[u],v=(t=p.id,f(Qe.controllers[t],R)),g=je(ue(v.id),p.materials),b=Ee(p.skeletons,v.skin.joints),y=0,N=g.length;y<N;y++){var x;(x=g[y]).isSkinnedMesh&&(x.bind(b,v.skin.bindMatrix),x.normalizeSkinWeights()),r.push(x)}for(u=0,h=c.length;u<h;u++){var k=ae(c[u]);null!==k&&r.push(k.clone())}for(u=0,h=l.length;u<h;u++)for(y=0,N=(g=je(ue((p=l[u]).id),p.materials)).length;y<N;y++)r.push(g[y]);for(u=0,h=d.length;u<h;u++)r.push(Se(d[u]).clone());if(0===n.length&&1===r.length)x=r[0];else for(x="JOINT"===i?new Bone:new Group,u=0;u<r.length;u++)x.add(r[u]);return""===x.name&&(x.name="JOINT"===i?e.sid:e.name),x.matrix.copy(a),x.matrix.decompose(x.position,x.quaternion,x.scale),x}var Re=new MeshBasicMaterial({color:16711935});function Oe(e,t){for(var r=[],a=0,n=e.length;a<n;a++){var i=t[e[a]];void 0===i?(console.warn("THREE.ColladaLoader: Material with key %s not found. Apply fallback material.",e[a]),r.push(Re)):r.push(X(i))}return r}function je(e,t){var r=[];for(var a in e){var n=e[a],i=Oe(n.materialKeys,t);0===i.length&&("lines"===a||"linestrips"===a?i.push(new LineBasicMaterial):i.push(new MeshPhongMaterial));var o=void 0!==n.data.attributes.skinIndex;if(o)for(var s=0,c=i.length;s<c;s++)i[s].skinning=!0;var l,d=1===i.length?i[0]:i;switch(a){case"lines":l=new LineSegments(n.data,d);break;case"linestrips":l=new Line(n.data,d);break;case"triangles":case"polylist":l=o?new SkinnedMesh(n.data,d):new Mesh(n.data,d)}r.push(l)}return r}function Ie(e){return void 0!==Qe.nodes[e]}function Se(e){return f(Qe.nodes[e],Me)}function qe(e){var t=new Group;t.name=e.name;for(var r=e.children,a=0;a<r.length;a++){var n=r[a];t.add(Se(n.id))}return t}function Be(e){return f(Qe.visualScenes[e],qe)}if(0===e.length)return{scene:new Scene};var Fe=(new DOMParser).parseFromString(e,"application/xml"),Ue=r(Fe,"COLLADA")[0],Ve=Fe.getElementsByTagName("parsererror")[0];if(void 0!==Ve){var He,Pe=r(Ve,"div")[0];return He=Pe?Pe.textContent:function(e){for(var t="",r=[e];r.length;){var a=r.shift();a.nodeType===Node.TEXT_NODE?t+=a.textContent:(t+="\n",r.push.apply(r,a.childNodes))}return t.trim()}(Ve),console.error("THREE.ColladaLoader: Failed to parse collada file.\n",He),null}var De=Ue.getAttribute("version");console.log("THREE.ColladaLoader: File version",De);var Ge,We=function(e){return{unit:c(r(e,"unit")[0]),upAxis:l(r(e,"up_axis")[0])}}(r(Ue,"asset")[0]),ze=new TextureLoader(this.manager);ze.setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin),TGALoader&&(Ge=new TGALoader(this.manager)).setPath(this.resourcePath||t);var Je=[],Xe={},Ke=0,Qe={animations:{},clips:{},controllers:{},images:{},effects:{},materials:{},cameras:{},lights:{},geometries:{},nodes:{},visualScenes:{},kinematicsModels:{},physicsModels:{},kinematicsScenes:{}};d(Ue,"library_animations","animation",(function(e){for(var t={sources:{},samplers:{},channels:{}},r=0,a=e.childNodes.length;r<a;r++){var n,i=e.childNodes[r];if(1===i.nodeType)switch(i.nodeName){case"source":n=i.getAttribute("id"),t.sources[n]=ne(i);break;case"sampler":n=i.getAttribute("id"),t.samplers[n]=h(i);break;case"channel":n=i.getAttribute("target"),t.channels[n]=m(i);break;default:console.log(i)}}Qe.animations[e.getAttribute("id")]=t})),d(Ue,"library_animation_clips","animation_clip",(function(e){for(var t={name:e.getAttribute("id")||"default",start:parseFloat(e.getAttribute("start")||0),end:parseFloat(e.getAttribute("end")||0),animations:[]},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];1===n.nodeType&&"instance_animation"===n.nodeName&&t.animations.push(o(n.getAttribute("url")))}Qe.clips[e.getAttribute("id")]=t})),d(Ue,"library_controllers","controller",(function(e){for(var t={},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];if(1===n.nodeType)switch(n.nodeName){case"skin":t.id=o(n.getAttribute("source")),t.skin=E(n);break;case"morph":t.id=o(n.getAttribute("source")),console.warn("THREE.ColladaLoader: Morph target animation not supported yet.")}}Qe.controllers[e.getAttribute("id")]=t})),d(Ue,"library_images","image",(function(e){var t={init_from:r(e,"init_from")[0].textContent};Qe.images[e.getAttribute("id")]=t})),d(Ue,"library_effects","effect",(function(e){for(var t={},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];1===n.nodeType&&"profile_COMMON"===n.nodeName&&(t.profile=I(n))}Qe.effects[e.getAttribute("id")]=t})),d(Ue,"library_materials","material",(function(e){for(var t={name:e.getAttribute("name")},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];1===n.nodeType&&"instance_effect"===n.nodeName&&(t.url=o(n.getAttribute("url")))}Qe.materials[e.getAttribute("id")]=t})),d(Ue,"library_cameras","camera",(function(e){for(var t={name:e.getAttribute("name")},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];1===n.nodeType&&"optics"===n.nodeName&&(t.optics=K(n))}Qe.cameras[e.getAttribute("id")]=t})),d(Ue,"library_lights","light",(function(e){for(var t={},r=0,a=e.childNodes.length;r<a;r++){var n=e.childNodes[r];1===n.nodeType&&"technique_common"===n.nodeName&&(t=ee(n))}Qe.lights[e.getAttribute("id")]=t})),d(Ue,"library_geometries","geometry",(function(e){var t={name:e.getAttribute("name"),sources:{},vertices:{},primitives:[]},a=r(e,"mesh")[0];if(void 0!==a){for(var n=0;n<a.childNodes.length;n++){var i=a.childNodes[n];if(1===i.nodeType){var o=i.getAttribute("id");switch(i.nodeName){case"source":t.sources[o]=ne(i);break;case"vertices":t.vertices=ie(i);break;case"polygons":console.warn("THREE.ColladaLoader: Unsupported primitive type: ",i.nodeName);break;case"lines":case"linestrips":case"polylist":case"triangles":t.primitives.push(oe(i));break;default:console.log(i)}}}Qe.geometries[e.getAttribute("id")]=t}})),d(Ue,"library_nodes","node",Ce),d(Ue,"library_visual_scenes","visual_scene",(function(e){var t={name:e.getAttribute("name"),children:[]};!function(e){for(var t=e.getElementsByTagName("node"),r=0;r<t.length;r++){var a=t[r];!1===a.hasAttribute("id")&&a.setAttribute("id","three_default_"+Ke++)}}(e);for(var a=r(e,"node"),n=0;n<a.length;n++)t.children.push(Ce(a[n]));Qe.visualScenes[e.getAttribute("id")]=t})),d(Ue,"library_kinematics_models","kinematics_model",(function(e){for(var t={name:e.getAttribute("name")||"",joints:{},links:[]},r=0;r<e.childNodes.length;r++){var a=e.childNodes[r];1===a.nodeType&&"technique_common"===a.nodeName&&he(a,t)}Qe.kinematicsModels[e.getAttribute("id")]=t})),d(Ue,"library_physics_models","physics_model",(function(e){for(var t={name:e.getAttribute("name")||"",rigidBodies:{}},r=0;r<e.childNodes.length;r++){var a=e.childNodes[r];1===a.nodeType&&"rigid_body"===a.nodeName&&(t.rigidBodies[a.getAttribute("name")]={},ye(a,t.rigidBodies[a.getAttribute("name")]))}Qe.physicsModels[e.getAttribute("id")]=t})),d(Ue,"scene","instance_kinematics_scene",(function(e){for(var t={bindJointAxis:[]},r=0;r<e.childNodes.length;r++){var a=e.childNodes[r];1===a.nodeType&&"bind_joint_axis"===a.nodeName&&t.bindJointAxis.push(xe(a))}Qe.kinematicsScenes[o(e.getAttribute("url"))]=t})),u(Qe.animations,p),u(Qe.clips,C),u(Qe.controllers,R),u(Qe.images,O),u(Qe.effects,z),u(Qe.materials,J),u(Qe.cameras,Y),u(Qe.lights,re),u(Qe.geometries,ce),u(Qe.visualScenes,qe),function(){var e=Qe.clips;if(!0===s(e)){if(!1===s(Qe.animations)){var t=[];for(var r in Qe.animations)for(var a=v(r),n=0,i=a.length;n<i;n++)t.push(a[n]);Je.push(new AnimationClip("default",-1,t))}}else for(var r in e)Je.push(_(r))}(),function(){var e=Object.keys(Qe.kinematicsModels)[0],t=Object.keys(Qe.kinematicsScenes)[0],r=Object.keys(Qe.visualScenes)[0];if(void 0!==e&&void 0!==t){for(var a,n=(a=e,f(Qe.kinematicsModels[a],fe)),i=function(e){return f(Qe.kinematicsScenes[e],ke)}(t),o=Be(r),s=i.bindJointAxis,c={},l=0,d=s.length;l<d;l++){var u=s[l],h=Ue.querySelector('[sid="'+u.target+'"]');if(h){var m=h.parentElement;v(u.jointIndex,m)}}var p=new Matrix4;Xe={joints:n&&n.joints,getJointValue:function(e){var t=c[e];if(t)return t.position;console.warn("THREE.ColladaLoader: Joint "+e+" doesn't exist.")},setJointValue:function(e,t){var r=c[e];if(r){var a=r.joint;if(t>a.limits.max||t<a.limits.min)console.warn("THREE.ColladaLoader: Joint "+e+" value "+t+" outside of limits (min: "+a.limits.min+", max: "+a.limits.max+").");else if(a.static)console.warn("THREE.ColladaLoader: Joint "+e+" is static.");else{var n=r.object,i=a.axis,o=r.transforms;we.identity();for(var s=0;s<o.length;s++){var l=o[s];if(l.sid&&-1!==l.sid.indexOf(e))switch(a.type){case"revolute":we.multiply(p.makeRotationAxis(i,_Math.degToRad(t)));break;case"prismatic":we.multiply(p.makeTranslation(i.x*t,i.y*t,i.z*t));break;default:console.warn("THREE.ColladaLoader: Unknown joint type: "+a.type)}else switch(l.type){case"matrix":we.multiply(l.obj);break;case"translate":we.multiply(p.makeTranslation(l.obj.x,l.obj.y,l.obj.z));break;case"scale":we.scale(l.obj);break;case"rotate":we.multiply(p.makeRotationAxis(l.obj,l.angle))}}n.matrix.copy(we),n.matrix.decompose(n.position,n.quaternion,n.scale),c[e].position=t}}else console.log("THREE.ColladaLoader: "+e+" does not exist.")}}}function v(e,t){var r=t.getAttribute("name"),a=n.joints[e];o.traverse((function(n){n.name===r&&(c[e]={object:n,transforms:Ae(t),joint:a,position:a.zeroPosition})}))}}();var Ze=function(e){return Be(o(r(e,"instance_visual_scene")[0].getAttribute("url")))}(r(Ue,"scene")[0]);return"Z_UP"===We.upAxis&&Ze.quaternion.setFromEuler(new Euler(-Math.PI/2,0,0)),Ze.scale.multiplyScalar(We.unit),{animations:Je,kinematics:Xe,library:Qe,scene:Ze}}});export{ColladaLoader};