import{FunctionNode}from"./FunctionNode.js";function ExpressionNode(o,e,t,n,p){FunctionNode.call(this,o,p,n,t,e)}ExpressionNode.prototype=Object.create(FunctionNode.prototype),ExpressionNode.prototype.constructor=ExpressionNode,ExpressionNode.prototype.nodeType="Expression";export{ExpressionNode};