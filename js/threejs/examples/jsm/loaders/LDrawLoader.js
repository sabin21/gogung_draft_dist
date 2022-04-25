import{BufferAttribute,BufferGeometry,Color,FileLoader,Float32BufferAttribute,Group,LineBasicMaterial,LineSegments,Loader,Matrix4,Mesh,MeshPhongMaterial,MeshStandardMaterial,ShaderMaterial,Vector3}from"../../../build/three.module.js";var LDrawLoader=function(){var e=new Vector3,t=new Vector3;function r(e){return/primitive/i.test(e)||"Subpart"===e}function a(e,t){this.line=e,this.lineLength=e.length,this.currentCharIndex=0,this.currentChar=" ",this.lineNumber=t}function n(e,t){return e.colourCode===t.colourCode?0:e.colourCode<t.colourCode?-1:1}function i(e,t,r){e.sort(n);for(var a=[],i=[],o=[],s=new BufferGeometry,l=null,c=0,u=0,d=0,p=e.length;d<p;d++){var h=e[d],g=h.v0,m=h.v1;if(a.push(g.x,g.y,g.z,m.x,m.y,m.z),3===t){a.push(h.v2.x,h.v2.y,h.v2.z);var f=h.n0||h.faceNormal,v=h.n1||h.faceNormal,b=h.n2||h.faceNormal;i.push(f.x,f.y,f.z),i.push(v.x,v.y,v.z),i.push(b.x,b.y,b.z)}l!==h.material?(null!==l&&s.addGroup(c,u,o.length-1),o.push(h.material),l=h.material,c=d*t,u=t):u+=t}u>0&&s.addGroup(c,1/0,o.length-1),s.addAttribute("position",new Float32BufferAttribute(a,3)),3===t&&s.addAttribute("normal",new Float32BufferAttribute(i,3));var L=null;if(2===t?L=new LineSegments(s,o):3===t&&(L=new Mesh(s,o)),r){L.isConditionalLine=!0;for(var S=new Float32Array(3*e.length*2),C=new Float32Array(3*e.length*2),_=new Float32Array(3*e.length*2),E=0,T=e.length;E<T;E++){var I=e[E],M=I.c0,N=I.c1,x=(g=I.v0,m=I.v1,3*E*2);S[x+0]=M.x,S[x+1]=M.y,S[x+2]=M.z,S[x+3]=M.x,S[x+4]=M.y,S[x+5]=M.z,C[x+0]=N.x,C[x+1]=N.y,C[x+2]=N.z,C[x+3]=N.x,C[x+4]=N.y,C[x+5]=N.z,_[x+0]=m.x-g.x,_[x+1]=m.y-g.y,_[x+2]=m.z-g.z,_[x+3]=m.x-g.x,_[x+4]=m.y-g.y,_[x+5]=m.z-g.z}s.addAttribute("control0",new BufferAttribute(S,3,!1)),s.addAttribute("control1",new BufferAttribute(C,3,!1)),s.addAttribute("direction",new BufferAttribute(_,3,!1))}return L}function o(e){Loader.call(this,e),this.parseScopesStack=null,this.materials=[],this.subobjectCache={},this.fileMap=null,this.setMaterials([this.parseColourMetaDirective(new a("Main_Colour CODE 16 VALUE #FF8080 EDGE #333333")),this.parseColourMetaDirective(new a("Edge_Colour CODE 24 VALUE #A0A0A0 EDGE #333333"))]),this.separateObjects=!1,this.smoothNormals=!0}return a.prototype={constructor:a,seekNonSpace:function(){for(;this.currentCharIndex<this.lineLength;){if(this.currentChar=this.line.charAt(this.currentCharIndex)," "!==this.currentChar&&"\t"!==this.currentChar)return;this.currentCharIndex++}},getToken:function(){for(var e=this.currentCharIndex++;this.currentCharIndex<this.lineLength&&(this.currentChar=this.line.charAt(this.currentCharIndex)," "!==this.currentChar&&"\t"!==this.currentChar);)this.currentCharIndex++;var t=this.currentCharIndex;return this.seekNonSpace(),this.line.substring(e,t)},getRemainingString:function(){return this.line.substring(this.currentCharIndex,this.lineLength)},isAtTheEnd:function(){return this.currentCharIndex>=this.lineLength},setToEnd:function(){this.currentCharIndex=this.lineLength},getLineNumberString:function(){return this.lineNumber>=0?" at line "+this.lineNumber:""}},o.FINISH_TYPE_DEFAULT=0,o.FINISH_TYPE_CHROME=1,o.FINISH_TYPE_PEARLESCENT=2,o.FINISH_TYPE_RUBBER=3,o.FINISH_TYPE_MATTE_METALLIC=4,o.FINISH_TYPE_METAL=5,o.FILE_LOCATION_AS_IS=0,o.FILE_LOCATION_TRY_PARTS=1,o.FILE_LOCATION_TRY_P=2,o.FILE_LOCATION_TRY_MODELS=3,o.FILE_LOCATION_TRY_RELATIVE=4,o.FILE_LOCATION_TRY_ABSOLUTE=5,o.FILE_LOCATION_NOT_FOUND=6,o.prototype=Object.assign(Object.create(Loader.prototype),{constructor:o,load:function(e,t,r,a){this.fileMap||(this.fileMap={});var n=this,i=new FileLoader(this.manager);i.setPath(this.path),i.load(e,(function(r){n.processObject(r,t,null,e)}),r,a)},parse:function(e,t,r){this.processObject(e,r,null,t)},setMaterials:function(e){return this.parseScopesStack=[],this.newParseScopeLevel(e),this.getCurrentParseScope().isFromParse=!1,this.materials=e,this},setFileMap:function(e){return this.fileMap=e,this},newParseScopeLevel:function(e){var t={};if(e)for(var r=0,a=e.length;r<a;r++){var n=e[r];t[n.userData.code]=n}var i=this.getCurrentParseScope(),o={lib:t,url:null,subobjects:null,numSubobjects:0,subobjectIndex:0,inverted:!1,category:null,keywords:null,currentFileName:null,mainColourCode:i?i.mainColourCode:"16",mainEdgeColourCode:i?i.mainEdgeColourCode:"24",currentMatrix:new Matrix4,matrix:new Matrix4,isFromParse:!0,triangles:null,lineSegments:null,conditionalSegments:null,startingConstructionStep:!1};return this.parseScopesStack.push(o),o},removeScopeLevel:function(){return this.parseScopesStack.pop(),this},addMaterial:function(e){var t=this.getCurrentParseScope().lib;return t[e.userData.code]||this.materials.push(e),t[e.userData.code]=e,this},getMaterial:function(e){if(e.startsWith("0x2")){var t=e.substring(3);return this.parseColourMetaDirective(new a("Direct_Color_"+t+" CODE -1 VALUE #"+t+" EDGE #"+t))}for(var r=this.parseScopesStack.length-1;r>=0;r--){var n=this.parseScopesStack[r].lib[e];if(n)return n}return null},getParentParseScope:function(){return this.parseScopesStack.length>1?this.parseScopesStack[this.parseScopesStack.length-2]:null},getCurrentParseScope:function(){return this.parseScopesStack.length>0?this.parseScopesStack[this.parseScopesStack.length-1]:null},parseColourMetaDirective:function(e){var t=null,r=16711935,n=16711935,i=1,s=!1,l=0,c=o.FINISH_TYPE_DEFAULT,u=!0,d=null,p=e.getToken();if(!p)throw'LDrawLoader: Material name was expected after "!COLOUR tag'+e.getLineNumberString()+".";for(var h=null;h=e.getToken();)switch(h.toUpperCase()){case"CODE":t=e.getToken();break;case"VALUE":if((r=e.getToken()).startsWith("0x"))r="#"+r.substring(2);else if(!r.startsWith("#"))throw"LDrawLoader: Invalid colour while parsing material"+e.getLineNumberString()+".";break;case"EDGE":if((n=e.getToken()).startsWith("0x"))n="#"+n.substring(2);else if(!n.startsWith("#")){if(!(d=this.getMaterial(n)))throw"LDrawLoader: Invalid edge colour while parsing material"+e.getLineNumberString()+".";d=d.userData.edgeMaterial}break;case"ALPHA":if(i=parseInt(e.getToken()),isNaN(i))throw"LDrawLoader: Invalid alpha value in material definition"+e.getLineNumberString()+".";(i=Math.max(0,Math.min(1,i/255)))<1&&(s=!0);break;case"LUMINANCE":if(l=parseInt(e.getToken()),isNaN(l))throw"LDrawLoader: Invalid luminance value in material definition"+a.getLineNumberString()+".";l=Math.max(0,Math.min(1,l/255));break;case"CHROME":c=o.FINISH_TYPE_CHROME;break;case"PEARLESCENT":c=o.FINISH_TYPE_PEARLESCENT;break;case"RUBBER":c=o.FINISH_TYPE_RUBBER;break;case"MATTE_METALLIC":c=o.FINISH_TYPE_MATTE_METALLIC;break;case"METAL":c=o.FINISH_TYPE_METAL;break;case"MATERIAL":e.setToEnd();break;default:throw'LDrawLoader: Unknown token "'+h+'" while parsing material'+e.getLineNumberString()+"."}var g=null;switch(c){case o.FINISH_TYPE_DEFAULT:g=new MeshStandardMaterial({color:r,roughness:.3,envMapIntensity:.3,metalness:0});break;case o.FINISH_TYPE_PEARLESCENT:var m=new Color(r),f=m.getHSL({h:0,s:0,l:0});f.h=(f.h+.5)%1,f.l=Math.min(1,f.l+.7*(1-f.l)),m.setHSL(f.h,f.s,f.l),g=new MeshPhongMaterial({color:r,specular:m,shininess:10,reflectivity:.3});break;case o.FINISH_TYPE_CHROME:g=new MeshStandardMaterial({color:r,roughness:0,metalness:1});break;case o.FINISH_TYPE_RUBBER:g=new MeshStandardMaterial({color:r,roughness:.9,metalness:0}),u=!1;break;case o.FINISH_TYPE_MATTE_METALLIC:g=new MeshStandardMaterial({color:r,roughness:.8,metalness:.4});break;case o.FINISH_TYPE_METAL:g=new MeshStandardMaterial({color:r,roughness:.2,metalness:.85})}return g.transparent=s,g.premultipliedAlpha=!0,g.opacity=i,g.depthWrite=!s,g.polygonOffset=!0,g.polygonOffsetFactor=1,g.userData.canHaveEnvMap=u,0!==l&&g.emissive.set(g.color).multiplyScalar(l),d||((d=new LineBasicMaterial({color:n,transparent:s,opacity:i,depthWrite:!s})).userData.code=t,d.name=p+" - Edge",d.userData.canHaveEnvMap=!1,d.userData.conditionalEdgeMaterial=new ShaderMaterial({vertexShader:"\n\tattribute vec3 control0;\n\tattribute vec3 control1;\n\tattribute vec3 direction;\n\tvarying float discardFlag;\n\n\t#include <common>\n\t#include <color_pars_vertex>\n\t#include <fog_pars_vertex>\n\t#include <logdepthbuf_pars_vertex>\n\t#include <clipping_planes_pars_vertex>\n\tvoid main() {\n\t\t#include <color_vertex>\n\n\t\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\t\tgl_Position = projectionMatrix * mvPosition;\n\n\t\t// Transform the line segment ends and control points into camera clip space\n\t\tvec4 c0 = projectionMatrix * modelViewMatrix * vec4( control0, 1.0 );\n\t\tvec4 c1 = projectionMatrix * modelViewMatrix * vec4( control1, 1.0 );\n\t\tvec4 p0 = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\tvec4 p1 = projectionMatrix * modelViewMatrix * vec4( position + direction, 1.0 );\n\n\t\tc0.xy /= c0.w;\n\t\tc1.xy /= c1.w;\n\t\tp0.xy /= p0.w;\n\t\tp1.xy /= p1.w;\n\n\t\t// Get the direction of the segment and an orthogonal vector\n\t\tvec2 dir = p1.xy - p0.xy;\n\t\tvec2 norm = vec2( -dir.y, dir.x );\n\n\t\t// Get control point directions from the line\n\t\tvec2 c0dir = c0.xy - p1.xy;\n\t\tvec2 c1dir = c1.xy - p1.xy;\n\n\t\t// If the vectors to the controls points are pointed in different directions away\n\t\t// from the line segment then the line should not be drawn.\n\t\tfloat d0 = dot( normalize( norm ), normalize( c0dir ) );\n\t\tfloat d1 = dot( normalize( norm ), normalize( c1dir ) );\n\t\tdiscardFlag = float( sign( d0 ) != sign( d1 ) );\n\n\t\t#include <logdepthbuf_vertex>\n\t\t#include <clipping_planes_vertex>\n\t\t#include <fog_vertex>\n\t}\n\t",fragmentShader:"\n\tuniform vec3 diffuse;\n\tuniform float opacity;\n\tvarying float discardFlag;\n\n\t#include <common>\n\t#include <color_pars_fragment>\n\t#include <fog_pars_fragment>\n\t#include <logdepthbuf_pars_fragment>\n\t#include <clipping_planes_pars_fragment>\n\tvoid main() {\n\n\t\tif ( discardFlag > 0.5 ) discard;\n\n\t\t#include <clipping_planes_fragment>\n\t\tvec3 outgoingLight = vec3( 0.0 );\n\t\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t\t#include <logdepthbuf_fragment>\n\t\t#include <color_fragment>\n\t\toutgoingLight = diffuseColor.rgb; // simple shader\n\t\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t\t#include <premultiplied_alpha_fragment>\n\t\t#include <tonemapping_fragment>\n\t\t#include <encodings_fragment>\n\t\t#include <fog_fragment>\n\t}\n\t",uniforms:{diffuse:{value:new Color(n)},opacity:{value:i}},transparent:s,depthWrite:!s}),d.userData.conditionalEdgeMaterial.userData.canHaveEnvMap=!1),g.userData.code=t,g.name=p,g.userData.edgeMaterial=d,g},objectParse:function(n){var i,s,l,c=this.getParentParseScope(),u=c.mainColourCode,d=c.mainEdgeColourCode,p=this.getCurrentParseScope(),h=[],g=null,m=null;-1!==n.indexOf("\r\n")&&(n=n.replace(/\r\n/g,"\n"));var f=n.split("\n"),v=f.length,b=0,L=!1,S=null,C=null,_=!1,E=!0,T=!1,I=!0,M="",N=!1,x=this;function w(e,t){var r=e.getToken();t||"16"!==r||(r=u),t&&"24"===r&&(r=d);var a=x.getMaterial(r);if(!a)throw'LDrawLoader: Unknown colour code "'+r+'" is used'+e.getLineNumberString()+" but it was not defined previously.";return a}function F(e){var t=new Vector3(parseFloat(e.getToken()),parseFloat(e.getToken()),parseFloat(e.getToken()));return x.separateObjects||t.applyMatrix4(p.currentMatrix),t}for(b=0;b<v;b++){var k=f[b];if(0!==k.length)if(L)k.startsWith("0 FILE ")?(this.subobjectCache[S.toLowerCase()]=C,S=k.substring(7),C=""):C+=k+"\n";else{var O=new a(k,b+1);if(O.seekNonSpace(),!O.isAtTheEnd()){var A=O.getToken();switch(A){case"0":var y=O.getToken();if(y)switch(y){case"!LDRAW_ORG":M=O.getToken(),L||(p.triangles=[],p.lineSegments=[],p.conditionalSegments=[],p.type=M,(!c.isFromParse||x.separateObjects&&!r(M))&&(p.groupObject=new Group,p.groupObject.userData.startingConstructionStep=p.startingConstructionStep),(X=p.matrix).determinant()<0&&(x.separateObjects&&r(M)||!x.separateObjects)&&(p.inverted=!p.inverted),i=p.triangles,s=p.lineSegments,l=p.conditionalSegments);break;case"!COLOUR":(j=this.parseColourMetaDirective(O))?this.addMaterial(j):console.warn("LDrawLoader: Error parsing material"+O.getLineNumberString());break;case"!CATEGORY":g=O.getToken();break;case"!KEYWORDS":var D=O.getRemainingString().split(",");D.length>0&&(m||(m=[]),D.forEach((function(e){m.push(e.trim())})));break;case"FILE":b>0&&(L=!0,S=O.getRemainingString(),C="",_=!1,E=!0);break;case"BFC":for(;!O.isAtTheEnd();){var P=O.getToken();switch(P){case"CERTIFY":case"NOCERTIFY":_="CERTIFY"===P,E=!0;break;case"CW":case"CCW":E="CCW"===P;break;case"INVERTNEXT":T=!0;break;case"CLIP":case"NOCLIP":I="CLIP"===P;break;default:console.warn('THREE.LDrawLoader: BFC directive "'+P+'" is unknown.')}}break;case"STEP":N=!0}break;case"1":var j=w(O),R=parseFloat(O.getToken()),Y=parseFloat(O.getToken()),H=parseFloat(O.getToken()),V=parseFloat(O.getToken()),U=parseFloat(O.getToken()),z=parseFloat(O.getToken()),B=parseFloat(O.getToken()),$=parseFloat(O.getToken()),W=parseFloat(O.getToken()),G=parseFloat(O.getToken()),q=parseFloat(O.getToken()),K=parseFloat(O.getToken()),X=(new Matrix4).set(V,U,z,R,B,$,W,Y,G,q,K,H,0,0,0,1),J=O.getRemainingString().trim().replace(/\\/g,"/");x.fileMap[J]?J=x.fileMap[J]:J.startsWith("s/")?J="parts/"+J:J.startsWith("48/")&&(J="p/"+J),h.push({material:j,matrix:X,fileName:J,originalFileName:J,locationState:o.FILE_LOCATION_AS_IS,url:null,triedLowerCase:!1,inverted:T!==p.inverted,startingConstructionStep:N}),T=!1;break;case"2":var Q={material:(j=w(O,!0)).userData.edgeMaterial,colourCode:j.userData.code,v0:F(O),v1:F(O)};s.push(Q);break;case"5":Q={material:(j=w(O,!0)).userData.edgeMaterial.userData.conditionalEdgeMaterial,colourCode:j.userData.code,v0:F(O),v1:F(O),c0:F(O),c1:F(O)},l.push(Q);break;case"3":j=w(O);var Z=!_||!I;!0==(E!==p.inverted)?(ee=F(O),te=F(O),re=F(O)):(re=F(O),te=F(O),ee=F(O)),e.subVectors(te,ee),t.subVectors(re,te),ne=(new Vector3).crossVectors(e,t).normalize(),i.push({material:j,colourCode:j.userData.code,v0:ee,v1:te,v2:re,faceNormal:ne,n0:null,n1:null,n2:null}),!0===Z&&i.push({material:j,colourCode:j.userData.code,v0:ee,v1:re,v2:te,faceNormal:ne,n0:null,n1:null,n2:null});break;case"4":var ee,te,re,ae,ne;j=w(O),Z=!_||!I,!0==(E!==p.inverted)?(ee=F(O),te=F(O),re=F(O),ae=F(O)):(ae=F(O),re=F(O),te=F(O),ee=F(O)),e.subVectors(te,ee),t.subVectors(re,te),ne=(new Vector3).crossVectors(e,t).normalize(),i.push({material:j,colourCode:j.userData.code,v0:ee,v1:te,v2:re,faceNormal:ne,n0:null,n1:null,n2:null}),i.push({material:j,colourCode:j.userData.code,v0:ee,v1:re,v2:ae,faceNormal:ne,n0:null,n1:null,n2:null}),!0===Z&&(i.push({material:j,colourCode:j.userData.code,v0:ee,v1:re,v2:te,faceNormal:ne,n0:null,n1:null,n2:null}),i.push({material:j,colourCode:j.userData.code,v0:ee,v1:ae,v2:re,faceNormal:ne,n0:null,n1:null,n2:null}));break;default:throw'LDrawLoader: Unknown line type "'+A+'"'+O.getLineNumberString()+"."}}}}L&&(this.subobjectCache[S.toLowerCase()]=C),p.category=g,p.keywords=m,p.subobjects=h,p.numSubobjects=h.length,p.subobjectIndex=0},computeConstructionSteps:function(e){var t=0;e.traverse((e=>{e.isGroup&&(e.userData.startingConstructionStep&&t++,e.userData.constructionStep=t)})),e.userData.numConstructionSteps=t+1},processObject:function(a,n,s,l){var c=this,u=c.newParseScopeLevel();u.url=l;var d=c.getParentParseScope();s&&(u.currentMatrix.multiplyMatrices(d.currentMatrix,s.matrix),u.matrix.copy(s.matrix),u.inverted=s.inverted,u.startingConstructionStep=s.startingConstructionStep);var p=d.currentFileName;null!==p&&(p=d.currentFileName.toLowerCase()),void 0===c.subobjectCache[p]&&(c.subobjectCache[p]=a),c.objectParse(a);var h=0;function g(){if(++h===u.subobjects.length+1)!function(){c.smoothNormals&&"Part"===u.type&&function(e,t){function r(e){return`${~~(100*e.x)},${~~(100*e.y)},${~~(100*e.z)}`}function a(e,t){return`${r(e)}_${r(t)}`}for(var n=new Set,i={},o={},s=[],l=0,c=t.length;l<c;l++){var u=t[l],d=u.v0,p=u.v1;n.add(a(d,p)),n.add(a(p,d))}for(l=0,c=e.length;l<c;l++)for(var h=e[l],g=0,m=3;g<m;g++){var f=(g+1)%3,v=a(d=h[`v${C=g}`],p=h[`v${f}`]);n.has(v)||(i[v]=h,o[v]=h)}for(;;){var b=Object.keys(i);if(0===b.length)break;l=0;for(var L=[o[b[0]]];l<L.length;){h=L[l],l++;var S=h.faceNormal;for(null===h.n0&&(h.n0=S.clone(),s.push(h.n0)),null===h.n1&&(h.n1=S.clone(),s.push(h.n1)),null===h.n2&&(h.n2=S.clone(),s.push(h.n2)),g=0,m=3;g<m;g++){var C;f=(g+1)%3,delete i[v=a(d=h[`v${C=g}`],p=h[`v${f}`])];var _=a(p,d),E=o[_];if(E){if(Math.abs(E.faceNormal.dot(h.faceNormal))<.25)continue;_ in i&&(L.push(E),delete i[_]);for(var T=0;T<3;T++){var I=T,M=(T+1)%3;if(a(E[`v${I}`],E[`v${M}`])===_){if(null===E[`n${I}`]){var N=h[`n${f}`];E[`n${I}`]=N,N.add(E.faceNormal)}null===E[`n${M}`]&&(N=h[`n${C}`],E[`n${M}`]=N,N.add(E.faceNormal));break}}}}}}for(l=0,c=s.length;l<c;l++)s[l].normalize()}(u.triangles,u.lineSegments);var a=!d.isFromParse;if(c.separateObjects&&!r(u.type)||a){const e=u.groupObject;u.triangles.length>0&&e.add(i(u.triangles,3)),u.lineSegments.length>0&&e.add(i(u.lineSegments,2)),u.conditionalSegments.length>0&&e.add(i(u.conditionalSegments,2,!0)),d.groupObject&&(e.name=u.fileName,e.userData.category=u.category,e.userData.keywords=u.keywords,u.matrix.decompose(e.position,e.quaternion,e.scale),d.groupObject.add(e))}else{for(var o=c.separateObjects,s=d.lineSegments,l=d.conditionalSegments,p=d.triangles,h=u.lineSegments,g=u.conditionalSegments,m=u.triangles,f=0,v=h.length;f<v;f++){var b=h[f];o&&(b.v0.applyMatrix4(u.matrix),b.v1.applyMatrix4(u.matrix)),s.push(b)}for(f=0,v=g.length;f<v;f++){var L=g[f];o&&(L.v0.applyMatrix4(u.matrix),L.v1.applyMatrix4(u.matrix),L.c0.applyMatrix4(u.matrix),L.c1.applyMatrix4(u.matrix)),l.push(L)}for(f=0,v=m.length;f<v;f++){var S=m[f];o&&(S.v0=S.v0.clone().applyMatrix4(u.matrix),S.v1=S.v1.clone().applyMatrix4(u.matrix),S.v2=S.v2.clone().applyMatrix4(u.matrix),e.subVectors(S.v1,S.v0),t.subVectors(S.v2,S.v1),S.faceNormal.crossVectors(e,t).normalize()),p.push(S)}}c.removeScopeLevel(),d.isFromParse||c.computeConstructionSteps(u.groupObject),n&&n(u.groupObject)}();else{var a=u.subobjects[u.subobjectIndex];Promise.resolve().then((function(){m(a)})),u.subobjectIndex++}}function m(e){u.mainColourCode=e.material.userData.code,u.mainEdgeColourCode=e.material.userData.edgeMaterial.userData.code,u.currentFileName=e.originalFileName;var t=c.subobjectCache[e.originalFileName.toLowerCase()];if(t)c.processObject(t,(function(t){f(t,e),g()}),e,l);else{var r=e.fileName,a=o.FILE_LOCATION_NOT_FOUND;switch(e.locationState){case o.FILE_LOCATION_AS_IS:a=e.locationState+1;break;case o.FILE_LOCATION_TRY_PARTS:r="parts/"+r,a=e.locationState+1;break;case o.FILE_LOCATION_TRY_P:r="p/"+r,a=e.locationState+1;break;case o.FILE_LOCATION_TRY_MODELS:r="models/"+r,a=e.locationState+1;break;case o.FILE_LOCATION_TRY_RELATIVE:r=l.substring(0,l.lastIndexOf("/")+1)+r,a=e.locationState+1;break;case o.FILE_LOCATION_TRY_ABSOLUTE:e.triedLowerCase?a=o.FILE_LOCATION_NOT_FOUND:(e.fileName=e.fileName.toLowerCase(),r=e.fileName,e.triedLowerCase=!0,a=o.FILE_LOCATION_AS_IS);break;case o.FILE_LOCATION_NOT_FOUND:return void console.warn('LDrawLoader: Subobject "'+e.originalFileName+'" could not be found.')}e.locationState=a,e.url=r;var n=new FileLoader(c.manager);n.setPath(c.path),n.load(r,(function(t){c.processObject(t,(function(t){f(t,e),g()}),e,l)}),void 0,(function(t){!function(e,t){m(t)}(0,e)}),e)}}function f(e,t){null!==e?c.fileMap[t.originalFileName]=t.url:m(t)}g()}}),o}();export{LDrawLoader};