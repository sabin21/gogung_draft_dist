import{TempNode}from"../core/TempNode.js";function OperatorNode(t,e,o){TempNode.call(this),this.a=t,this.b=e,this.op=o}OperatorNode.ADD="+",OperatorNode.SUB="-",OperatorNode.MUL="*",OperatorNode.DIV="/",OperatorNode.prototype=Object.create(TempNode.prototype),OperatorNode.prototype.constructor=OperatorNode,OperatorNode.prototype.nodeType="Operator",OperatorNode.prototype.getType=function(t){var e=this.a.getType(t),o=this.b.getType(t);return t.isTypeMatrix(e)?"v4":t.getTypeLength(o)>t.getTypeLength(e)?o:e},OperatorNode.prototype.generate=function(t,e){var o=this.getType(t),r=this.a.build(t,o),p=this.b.build(t,o);return t.format("( "+r+" "+this.op+" "+p+" )",o,e)},OperatorNode.prototype.copy=function(t){return TempNode.prototype.copy.call(this,t),this.a=t.a,this.b=t.b,this.op=t.op,this},OperatorNode.prototype.toJSON=function(t){var e=this.getJSONNode(t);return e||((e=this.createJSONNode(t)).a=this.a.toJSON(t).uuid,e.b=this.b.toJSON(t).uuid,e.op=this.op),e};export{OperatorNode};