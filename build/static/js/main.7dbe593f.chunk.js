(window.webpackJsonpcaro=window.webpackJsonpcaro||[]).push([[0],{11:function(e,t,r){},19:function(e,t,r){e.exports=r(29)},29:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),i=r(10),c=r.n(i),o=r(7),u=r(2),s=r(18),l=[{squares:Array(20).fill(null).map((function(){return Array(20).fill(null)})),location:"",isWin:null,id:0}],p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CLICK_SQUARE_HIS":return Object(s.a)(e.slice(0,t.stepNumber+1).concat(t.item));case"RESET_HIS":return l;default:return e}},f=r(17);function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(r,!0).forEach((function(t){Object(f.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m={stepNumber:0,idX:-1,idY:-1,isNext:!0,isReverse:!1},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REVERSE":return v({},e,{isReverse:!e.isReverse});case"JUMP_TO":return v({},e,{stepNumber:t.move,isNext:t.move%2===0});case"RESET_IS_STATE":return m;case"CLICK_SQUARE_STATE":return v({},e,{isNext:!e.isNext,stepNumber:e.stepNumber+1,idX:t.X,idY:t.Y});default:return e}},y=Object(u.b)({history:p,status:d}),E=Object(u.d)(y,Object(u.c)(window.devToolsExtension?window.devToolsExtension():function(e){return e})),h=r(4),O=r(5),j=r(8),k=r(6),w=r(9),N=(r(11),5);var S={calculateWinner:function(e,t,r){if(-1===t&&-1===r)return null;for(var n,a=t,i=t,c=r,o=r,u=1;a>0&&5!==u;)a-=1,u+=1;for(u=1;c>0&&5!==u;)c-=1,u+=1;for(u=1;i<19&&5!==u;)i+=1,u+=1;for(u=1;o<19&&5!==u;)o+=1,u+=1;for(var s=a;s<=i;s+=1)for(var l=c;l<=o;l+=1)if(e[s][l]){n=!0,l-1>=0&&l+N<20&&e[s][l-1]&&e[s][l+5]&&e[s][l]!==e[s][l-1]&&e[s][l]!==e[s][l+5]&&(n=!1);for(var p=0;p<N-1&&n;p+=1)if(l+p===19||e[s][l+p]!==e[s][l+p+1]){n=!1;break}if(n)return{val:e[s][l],x:l,y:s,direction:"Ngang"};n=!0,s-1>=0&&s+N<20&&e[s-1][l]&&e[s+5][l]&&e[s][l]!==e[s-1][l]&&e[s][l]!==e[s+5][l]&&(n=!1);for(var f=0;f<N-1&&n;f+=1)if(s+f===19||e[s+f][l]!==e[s+f+1][l]){n=!1;break}if(n)return{val:e[s][l],x:l,y:s,direction:"Doc"};n=!0,l-1>=0&&l+N<20&&s-1>=0&&s+N<20&&e[s-1][l-1]&&e[s+5][l+5]&&e[s][l]!==e[s-1][l-1]&&e[s][l]!==e[s+5][l+5]&&(n=!1);for(var b=0;b<N-1&&n;b+=1)if(s+b===19||l+b===19||e[s+b][l+b]!==e[s+b+1][l+b+1]){n=!1;break}if(n)return{val:e[s][l],x:l,y:s,direction:"CheoPhai"};n=!0,s-1>=0&&s+N<20&&l-N>=0&&e[s-1][l+1]&&e[s+5][l-5]&&e[s][l]!==e[s-1][l+1]&&e[s][l]!==e[s+5][l-5]&&(n=!1);for(var v=0;v<N-1&&n;v+=1)if(s+v===19||l-v===0||e[s+v][l-v]!==e[s+v+1][l-v-1]){n=!1;break}if(n)return{val:e[s][l],x:l,y:s,direction:"CheoTrai"}}return null},reverse:function(){return{type:"REVERSE"}},jumpTo:function(e){return{type:"JUMP_TO",move:e}},resetState:function(){return{type:"RESET_IS_STATE"}},clickIsState:function(e,t){return{type:"CLICK_SQUARE_STATE",X:e,Y:t}},clickHis:function(e,t){return{type:"CLICK_SQUARE_HIS",stepNumber:e,item:t}},resetHis:function(){return{type:"RESET_HIS"}}},C=function(e){var t=e;return a.a.createElement("div",null,t.win?a.a.createElement("button",{type:"button",className:"square square-highlight",onClick:t.onClick},t.value):a.a.createElement("button",{type:"button",className:"square",onClick:t.onClick},t.value))},T=function(e){function t(){var e,r;Object(h.a)(this,t);for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return(r=Object(j.a)(this,(e=Object(k.a)(t)).call.apply(e,[this].concat(a)))).handleClick=function(e,t){var n=r.props,a=n.history,i=n.status,c=a.slice(0,i.stepNumber+1),o=c[c.length-1],u=o.squares.slice();if(o.squares.map((function(e,t){return u[t]=o.squares[t].slice(),!0})),!o.isWin&&!u[e][t]){u[e][t]=i.isNext?"X":"O";var s=!1;S.calculateWinner(u,e,t)&&(s=!0);var l={squares:u,location:"".concat(e,",").concat(t),isWin:s,id:i.stepNumber+1},p=i.stepNumber,f=r.props.dispatch;f(S.clickHis(p,l)),f(S.clickIsState(e,t))}},r}return Object(w.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){var e=this,t=this.props,r=t.row.map((function(r,n){var i="s".concat(n),c=!1,o=t.winner,u=t.rowIdx;return o&&("Ngang"===o.direction&&n>=o.x&&n<=o.x+5-1&&u===o.y&&(c=!0),"Doc"===o.direction&&u>=o.y&&u<=o.y+5-1&&n===o.x&&(c=!0),"CheoPhai"===o.direction&&n>=o.x&&n<=o.x+5-1&&n-o.x===u-o.y&&(c=!0),"CheoTrai"===o.direction&&n<=o.x&&n>=o.x-5+1&&o.x-n===u-o.y&&(c=!0)),a.a.createElement(C,{win:c,value:r,onClick:function(){return e.handleClick(t.rowIdx,n)},key:i})}));return a.a.createElement("div",{className:"board-row"},r)}}]),t}(a.a.PureComponent),R=Object(o.b)((function(e){return{history:e.history,status:e.status}}))(T),x=function(e){function t(){return Object(h.a)(this,t),Object(j.a)(this,Object(k.a)(t).apply(this,arguments))}return Object(w.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){var e=this.props,t=e.squares.map((function(t,r){var n="r".concat(r);return a.a.createElement(R,{winner:e.winner,rowIdx:r,row:t,onClick:e.onClick,key:n})}));return a.a.createElement("div",null,a.a.createElement("div",null,t))}}]),t}(a.a.PureComponent),g=function(e){function t(){var e,r;Object(h.a)(this,t);for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return(r=Object(j.a)(this,(e=Object(k.a)(t)).call.apply(e,[this].concat(a)))).handleReverse=function(){(0,r.props.dispatch)({type:"REVERSE"})},r.jumpTo=function(e){(0,r.props.dispatch)({type:"JUMP_TO",move:e})},r.handleReset=function(){var e=r.props.dispatch;e({type:"RESET_HIS"}),e({type:"RESET_IS_STATE"})},r}return Object(w.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){var e,t=this,r=this.props,n=r.history,i=r.status,c=n[i.stepNumber].squares,o=S.calculateWinner(c,i.idX,i.idY);e=o?"Winner is: ".concat(o.val):400===i.stepNumber?"No one win":"Next player is: ".concat(i.isNext?"X":"O");var u=n.map((function(e){var r=e.id;if(0!==r){var n="Move ".concat(r,": (").concat(e.location,")");return i.stepNumber===r?a.a.createElement("li",{key:r},a.a.createElement("button",{type:"button",onClick:function(){return t.jumpTo(r)}},a.a.createElement("b",null,n))):a.a.createElement("li",{key:r},a.a.createElement("button",{type:"button",onClick:function(){return t.jumpTo(r)}},n))}return null})),s=i.isReverse?"\u2193":"\u2191";return a.a.createElement("div",{className:"game"},a.a.createElement("div",{className:"game-board"},a.a.createElement(x,{winner:o,squares:c,onClick:function(e,r){return t.handleClick(e,r)}})),a.a.createElement("div",{className:"game-info"},a.a.createElement("div",null,a.a.createElement("b",null,"INFORMATION")),a.a.createElement("p",null,e),a.a.createElement("button",{type:"button",className:"btn",onClick:function(){return t.handleReverse()}},"Sort ",s),a.a.createElement("ul",null,i.isReverse?u.reverse():u),a.a.createElement("button",{type:"button",className:"btn",onClick:function(){return t.handleReset()}},"Reset")))}}]),t}(a.a.Component),I=Object(o.b)((function(e){return{history:e.history,status:e.status}}))(g);c.a.render(a.a.createElement(o.a,{store:E},a.a.createElement(I,null)),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.7dbe593f.chunk.js.map