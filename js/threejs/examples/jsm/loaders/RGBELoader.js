import{DataTextureLoader,FloatType,HalfFloatType,LinearEncoding,LinearFilter,NearestFilter,RGBEEncoding,RGBEFormat,RGBFormat,UnsignedByteType}from"../../../build/three.module.js";var RGBELoader=function(e){DataTextureLoader.call(this,e),this.type=UnsignedByteType};RGBELoader.prototype=Object.assign(Object.create(DataTextureLoader.prototype),{constructor:RGBELoader,parse:function(e){var r=function(e,r){switch(e){case 1:console.error("RGBELoader Read Error: "+(r||""));break;case 2:console.error("RGBELoader Write Error: "+(r||""));break;case 3:console.error("RGBELoader Bad File Format: "+(r||""));break;default:console.error("RGBELoader: Error: "+(r||""))}return-1},t=function(e,r,t){r=r||1024;for(var a=e.pos,n=-1,i=0,o="",s=String.fromCharCode.apply(null,new Uint16Array(e.subarray(a,a+128)));0>(n=s.indexOf("\n"))&&i<r&&a<e.byteLength;)o+=s,i+=s.length,a+=128,s+=String.fromCharCode.apply(null,new Uint16Array(e.subarray(a,a+128)));return-1<n&&(!1!==t&&(e.pos+=i+n+1),o+s.slice(0,n))},a=function(){var e=new Float32Array(1),r=new Int32Array(e.buffer);function t(t){e[0]=t;var a=r[0],n=a>>16&32768,i=a>>12&2047,o=a>>23&255;return o<103?n:o>142?(n|=31744,n|=(255==o?0:1)&&8388607&a):o<113?n|=((i|=2048)>>114-o)+(i>>113-o&1):(n|=o-112<<10|i>>1,n+=1&i)}return function(e,r,a,n){var i=e[r+3],o=Math.pow(2,i-128)/255;a[n+0]=t(e[r+0]*o),a[n+1]=t(e[r+1]*o),a[n+2]=t(e[r+2]*o)}}(),n=new Uint8Array(e);n.pos=0;var i,o,s,l,d,p,c=function(e){var a,n,i=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,o=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,s=/^\s*FORMAT=(\S+)\s*$/,l=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,d={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};if(e.pos>=e.byteLength||!(a=t(e)))return r(1,"no header found");if(!(n=a.match(/^#\?(\S+)$/)))return r(3,"bad initial token");for(d.valid|=1,d.programtype=n[1],d.string+=a+"\n";!1!==(a=t(e));)if(d.string+=a+"\n","#"!==a.charAt(0)){if((n=a.match(i))&&(d.gamma=parseFloat(n[1],10)),(n=a.match(o))&&(d.exposure=parseFloat(n[1],10)),(n=a.match(s))&&(d.valid|=2,d.format=n[1]),(n=a.match(l))&&(d.valid|=4,d.height=parseInt(n[1],10),d.width=parseInt(n[2],10)),2&d.valid&&4&d.valid)break}else d.comments+=a+"\n";return 2&d.valid?4&d.valid?d:r(3,"missing image size specifier"):r(3,"missing format specifier")}(n);if(-1!==c){var f=c.width,u=c.height,y=function(e,t,a){var n,i,o,s,l,d,p,c,f,u,y,g,h,m=t,F=a;if(m<8||m>32767||2!==e[0]||2!==e[1]||128&e[2])return new Uint8Array(e);if(m!==(e[2]<<8|e[3]))return r(3,"wrong scanline width");if(!(n=new Uint8Array(4*t*a))||!n.length)return r(4,"unable to allocate buffer space");for(i=0,o=0,c=4*m,h=new Uint8Array(4),d=new Uint8Array(c);F>0&&o<e.byteLength;){if(o+4>e.byteLength)return r(1);if(h[0]=e[o++],h[1]=e[o++],h[2]=e[o++],h[3]=e[o++],2!=h[0]||2!=h[1]||(h[2]<<8|h[3])!=m)return r(3,"bad rgbe scanline format");for(p=0;p<c&&o<e.byteLength;){if((g=(s=e[o++])>128)&&(s-=128),0===s||p+s>c)return r(3,"bad scanline data");if(g)for(l=e[o++],f=0;f<s;f++)d[p++]=l;else d.set(e.subarray(o,o+s),p),p+=s,o+=s}for(u=m,f=0;f<u;f++)y=0,n[i]=d[f+y],y+=m,n[i+1]=d[f+y],y+=m,n[i+2]=d[f+y],y+=m,n[i+3]=d[f+y],i+=4;F--}return n}(n.subarray(n.pos),f,u);if(-1!==y){switch(this.type){case UnsignedByteType:var g=y,h=RGBEFormat,m=UnsignedByteType;break;case FloatType:for(var F=y.length/4*3,b=new Float32Array(F),E=0;E<F;E++)s=b,l=3*E,void 0,void 0,d=(i=y)[3+(o=4*E)],p=Math.pow(2,d-128)/255,s[l+0]=i[o+0]*p,s[l+1]=i[o+1]*p,s[l+2]=i[o+2]*p;g=b,h=RGBFormat,m=FloatType;break;case HalfFloatType:F=y.length/4*3;var v=new Uint16Array(F);for(E=0;E<F;E++)a(y,4*E,v,3*E);g=v,h=RGBFormat,m=HalfFloatType;break;default:console.error("THREE.RGBELoader: unsupported type: ",this.type)}return{width:f,height:u,data:g,header:c.string,gamma:c.gamma,exposure:c.exposure,format:h,type:m}}}return null},setDataType:function(e){return this.type=e,this},load:function(e,r,t,a){return DataTextureLoader.prototype.load.call(this,e,(function(e,t){switch(e.type){case UnsignedByteType:e.encoding=RGBEEncoding,e.minFilter=NearestFilter,e.magFilter=NearestFilter,e.generateMipmaps=!1,e.flipY=!0;break;case FloatType:case HalfFloatType:e.encoding=LinearEncoding,e.minFilter=LinearFilter,e.magFilter=LinearFilter,e.generateMipmaps=!1,e.flipY=!0}r&&r(e,t)}),t,a)}});export{RGBELoader};