import{FileLoader,Group,Loader,LoadingManager}from"../../../build/three.module.js";import{ColladaLoader}from"../loaders/ColladaLoader.js";var KMZLoader=function(e){Loader.call(this,e)};KMZLoader.prototype=Object.assign(Object.create(Loader.prototype),{constructor:KMZLoader,load:function(e,r,a,o){var t=this,n=new FileLoader(t.manager);n.setPath(t.path),n.setResponseType("arraybuffer"),n.load(e,(function(e){r(t.parse(e))}),a,o)},parse:function(e){var r=new LoadingManager;r.setURLModifier((function(e){var r=function(e){for(var r in a.files)if(r.substr(-e.length)===e)return a.files[r]}(e);if(r){console.log("Loading",e);var o=new Blob([r.asArrayBuffer()],{type:"application/octet-stream"});return URL.createObjectURL(o)}return e}));var a=new JSZip(e);if(a.files["doc.kml"]){var o=(new DOMParser).parseFromString(a.files["doc.kml"].asText(),"application/xml").querySelector("Placemark Model Link href");if(o)return new ColladaLoader(r).parse(a.files[o.textContent].asText())}else for(var t in console.warn("KMZLoader: Missing doc.kml file."),a.files)if("dae"===t.split(".").pop().toLowerCase())return new ColladaLoader(r).parse(a.files[t].asText());return console.error("KMZLoader: Couldn't find .dae file."),{scene:new Group}}});export{KMZLoader};