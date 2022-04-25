import{Matrix4,Object3D}from"../../../build/three.module.js";var ViveController=function(t){Object3D.call(this);var e,r=this,i=[0,0],o=!1,s=!1,n=!1,a=!1;this.matrixAutoUpdate=!1,this.standingMatrix=new Matrix4,this.getGamepad=function(){return e},this.getButtonState=function(t){return"thumbpad"===t?o:"trigger"===t?s:"grips"===t?n:"menu"===t?a:void 0},this.update=function(){if(e=function(t){for(var e=navigator.getGamepads&&navigator.getGamepads(),r=0,i=0;r<e.length;r++){var o=e[r];if(o&&("OpenVR Gamepad"===o.id||o.id.startsWith("Oculus Touch")||o.id.startsWith("Spatial Controller"))){if(i===t)return o;i++}}}(t),void 0!==e&&void 0!==e.pose){if(null===e.pose)return;var p=e.pose;null!==p.position&&r.position.fromArray(p.position),null!==p.orientation&&r.quaternion.fromArray(p.orientation),r.matrix.compose(r.position,r.quaternion,r.scale),r.matrix.premultiply(r.standingMatrix),r.matrixWorldNeedsUpdate=!0,r.visible=!0,i[0]===e.axes[0]&&i[1]===e.axes[1]||(i[0]=e.axes[0],i[1]=e.axes[1],r.dispatchEvent({type:"axischanged",axes:i})),o!==e.buttons[0].pressed&&(o=e.buttons[0].pressed,r.dispatchEvent({type:o?"thumbpaddown":"thumbpadup",axes:i})),s!==e.buttons[1].pressed&&(s=e.buttons[1].pressed,r.dispatchEvent({type:s?"triggerdown":"triggerup"})),n!==e.buttons[2].pressed&&(n=e.buttons[2].pressed,r.dispatchEvent({type:n?"gripsdown":"gripsup"})),a!==e.buttons[3].pressed&&(a=e.buttons[3].pressed,r.dispatchEvent({type:a?"menudown":"menuup"}))}else r.visible=!1}};ViveController.prototype=Object.create(Object3D.prototype),ViveController.prototype.constructor=ViveController;export{ViveController};