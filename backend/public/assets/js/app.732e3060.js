(function(e){function t(t){for(var c,n,r=t[0],u=t[1],s=t[2],b=0,f=[];b<r.length;b++)n=r[b],Object.prototype.hasOwnProperty.call(a,n)&&a[n]&&f.push(a[n][0]),a[n]=0;for(c in u)Object.prototype.hasOwnProperty.call(u,c)&&(e[c]=u[c]);i&&i(t);while(f.length)f.shift()();return o.push.apply(o,s||[]),l()}function l(){for(var e,t=0;t<o.length;t++){for(var l=o[t],c=!0,r=1;r<l.length;r++){var u=l[r];0!==a[u]&&(c=!1)}c&&(o.splice(t--,1),e=n(n.s=l[0]))}return e}var c={},a={app:0},o=[];function n(t){if(c[t])return c[t].exports;var l=c[t]={i:t,l:!1,exports:{}};return e[t].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=c,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(l,c,function(t){return e[t]}.bind(null,c));return l},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],u=r.push.bind(r);r.push=t,r=r.slice();for(var s=0;s<r.length;s++)t(r[s]);var i=u;o.push([0,"chunk-vendors"]),l()})({0:function(e,t,l){e.exports=l("cd49")},"18f7":function(e,t,l){"use strict";l("c626")},1971:function(e,t,l){},"19cc":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGVSURBVEiJtdbPStVBFAfwz9UkbBEkVkZEDyC18RESV0EgJj2BXAzuxmUvELho50O0UaKFIYote4H04sL+QSFRC/tn5bXFzA+GH3Ovo3kPHH5n5nzP+c45M8z8oIF5bOMQR/+phzFXM+b28AySdtMmtPtIsNWIJQ3oj3QakalEfuKj0NcxDJeyHFfmM9zBUBIzhEk8L4jv6tjHdMEC7+PbSQl+x1XDlR7Jr8bvFP6chOBxDLwWxy/QwpOoLayhg5GIXSwl+IVLMWisR+mVVtgRHNT9ueO5ia/Rnu3RnkoqzBe8rDtzBO3EvltAkGK2Swh+JHangCDFfC8huJ7YGwUE64l9Iweob9r7hHgYyxlMpU9xPmIH8SGDyQZOYwJLMfA2VhP/CsZrC53tkis7+UY4dgvCVdHCp8T/qpZ8FO9yuc7leoabwj1zTzjbt3Ah8V9M7MsRm+1/twoqfYsZYU92k/ktoXUPhD071WWX6p5wHKtxB59LYvv+4Axgp0/JoT2Iv8quhNPII8IT2BQ27qx+W15jDo1/UGkeEp45T20AAAAASUVORK5CYII="},"2d40":function(e,t,l){"use strict";l("e2d7")},6032:function(e,t,l){"use strict";l("651e")},"651e":function(e,t,l){},"8a71":function(e,t,l){},9083:function(e,t,l){},9810:function(e,t,l){},a06f:function(e,t,l){"use strict";l("9810")},b1d3:function(e,t,l){"use strict";l("1971")},c626:function(e,t,l){},c756:function(e,t,l){"use strict";l("9083")},cd49:function(e,t,l){"use strict";l.r(t);var c=l("7a23");const a={id:"container"};function o(e,t){const l=Object(c["A"])("router-view");return Object(c["s"])(),Object(c["e"])("div",a,[Object(c["h"])(l)])}var n=l("6b0d"),r=l.n(n);const u={},s=r()(u,[["render",o]]);var i=s,b=l("6605");const f={class:"w-full flex flex-col relative"},d=Object(c["g"])(" SUDOKU "),v=Object(c["g"])(" MINESWEEPER ");function j(e,t,l,a,o,n){const r=Object(c["A"])("router-link");return Object(c["s"])(),Object(c["e"])("div",f,[Object(c["h"])(r,{to:"/sudoku"},{default:Object(c["F"])(()=>[d]),_:1}),Object(c["h"])(r,{to:"/minesweeper"},{default:Object(c["F"])(()=>[v]),_:1})])}var O=Object(c["i"])({name:"Main"});const p=r()(O,[["render",j]]);var h=p;const m=e=>(Object(c["v"])("data-v-a90c4ece"),e=e(),Object(c["t"])(),e),w={class:"w-full pb-10 flex justify-center"},y={class:"w-40 mt-2 flex flex-col items-end"},x=Object(c["g"])("EASY"),g=Object(c["g"])("NORMAL"),A=Object(c["g"])("HARD"),k={style:{"z-index":"-1"},class:"grid grid-cols-3 absolute"},C=["onClick"],M={class:"w-full h-full flex justify-between absolute text-xs text-gray-800"},S={class:"ml-1 flex flex-col justify-center"},I={key:0},E={class:"mr-1 flex flex-col justify-center"},P={key:0},_={class:"text-xl"},F={class:"w-40 mt-2 flex flex-col"},R={class:"w-34 h-10 flex justify-center items-center border-2 border-black rounded"},V={class:"text-xl"},B={class:"w-34 h-10 my-2 flex items-center border-2 border-black rounded whitespace-nowrap text-sm overflow-hidden"},U=m(()=>Object(c["f"])("p",{class:"mx-1"},"CHANGE: ",-1)),L={class:"w-34 h-10 flex items-center border-2 border-black rounded whitespace-nowrap text-sm overflow-hidden"},T=m(()=>Object(c["f"])("p",{class:"mx-1"},"INCORRECT: ",-1)),z={class:"w-34 h-58 my-2 flex flex-col border-2 border-black rounded whitespace-nowrap overflow-hidden"},G=m(()=>Object(c["f"])("p",{class:"p-1 text-xl text-center"},"MEMO",-1)),H={class:"p-1 flex justify-between"},D=Object(c["g"])("ADD"),N={key:0,class:"p-1 w-full flex flex-col"},Y=Object(c["g"])("X"),J={class:"w-full h-full flex flex-col justify-center items-center"},Q={class:"mt-24 text-3xl"},K=Object(c["g"])("OK");function X(e,t,l,a,o,n){const r=Object(c["A"])("custom-button"),u=Object(c["A"])("custom-input"),s=Object(c["A"])("custom-popup"),i=Object(c["A"])("custom-footer");return Object(c["s"])(),Object(c["e"])("div",w,[Object(c["f"])("div",y,[Object(c["h"])(r,{onClick:t[0]||(t[0]=t=>e.difficulty=1),class:Object(c["n"])([[1===e.difficulty?"":"opacity-30",e.createGameFinish?"":"pointer-events-none"],"w-34 h-8 bg-green-400"])},{default:Object(c["F"])(()=>[x]),_:1},8,["class"]),Object(c["h"])(r,{onClick:t[1]||(t[1]=t=>e.difficulty=2),class:Object(c["n"])([[2===e.difficulty?"":"opacity-30",e.createGameFinish?"":"pointer-events-none"],"w-34 h-8 bg-blue-400 my-2"])},{default:Object(c["F"])(()=>[g]),_:1},8,["class"]),Object(c["h"])(r,{onClick:t[2]||(t[2]=t=>e.difficulty=3),class:Object(c["n"])([[3===e.difficulty?"":"opacity-30",e.createGameFinish?"":"pointer-events-none"],"w-34 h-8 bg-red-400"])},{default:Object(c["F"])(()=>[A]),_:1},8,["class"]),Object(c["h"])(r,{onClick:e.createBoard,class:"w-34 h-8 my-2 bg-yellow-400",disabled:!e.createGameFinish},{default:Object(c["F"])(()=>[Object(c["g"])(Object(c["C"])(e.currentStatus),1)]),_:1},8,["onClick","disabled"])]),Object(c["f"])("div",{id:"sudoku-container",class:Object(c["n"])([e.isGameClear?"pointer-events-none":"","w-150 h-150 mx-4 mt-2 border-2 border-black rounded grid grid-cols-9 justify-items-center items-center relative"])},[Object(c["f"])("div",k,[(Object(c["s"])(),Object(c["e"])(c["a"],null,Object(c["y"])(9,(e,t)=>Object(c["f"])("div",{key:t,class:Object(c["n"])([e%2===0?"bg-gray-300":"bg-white","w-49.5 h-49.5 rounded"])},null,2)),64))]),e.createGameFinish?(Object(c["s"])(!0),Object(c["e"])(c["a"],{key:0},Object(c["y"])(e.sudokuList,(t,l)=>(Object(c["s"])(),Object(c["e"])(c["a"],{key:l+"sudoku"},[(Object(c["s"])(!0),Object(c["e"])(c["a"],null,Object(c["y"])(t,(t,a)=>(Object(c["s"])(),Object(c["e"])("div",{onClick:t=>e.onClickCell(a+9*l),key:a,class:Object(c["n"])([[t.fixed?"text-yellow-300 pointer-events-none":"cursor-pointer",t.select?"bg-yellow-300":""],"w-15 h-15 border border-black rounded flex justify-center items-center bg-white relative"])},[Object(c["f"])("div",M,[Object(c["f"])("div",S,[(Object(c["s"])(!0),Object(c["e"])(c["a"],null,Object(c["y"])(e.memoList[a+9*l],(e,t)=>(Object(c["s"])(),Object(c["e"])(c["a"],{key:t},[t<3?(Object(c["s"])(),Object(c["e"])("p",I,Object(c["C"])(e),1)):Object(c["d"])("",!0)],64))),128))]),Object(c["f"])("div",E,[(Object(c["s"])(!0),Object(c["e"])(c["a"],null,Object(c["y"])(e.memoList[a+9*l],(e,t)=>(Object(c["s"])(),Object(c["e"])(c["a"],{key:t},[t>=3?(Object(c["s"])(),Object(c["e"])("p",P,Object(c["C"])(e),1)):Object(c["d"])("",!0)],64))),128))])]),Object(c["f"])("p",{class:Object(c["n"])([t.duplicateColumn||t.duplicateRow||t.duplicateRegion?"text-red-400":"","text-xl"])},Object(c["C"])(t.value?t.value:""),3)],10,C))),128))],64))),128)):(Object(c["s"])(!0),Object(c["e"])(c["a"],{key:1},Object(c["y"])(e.tempSudokuList,(e,t)=>(Object(c["s"])(),Object(c["e"])(c["a"],{key:t+"temp"},[(Object(c["s"])(!0),Object(c["e"])(c["a"],null,Object(c["y"])(e,(e,t)=>(Object(c["s"])(),Object(c["e"])("div",{key:t,class:"w-15 h-15 border border-black rounded flex justify-center items-center bg-white"},[Object(c["f"])("p",_,Object(c["C"])(e||""),1)]))),128))],64))),128))],2),Object(c["f"])("div",F,[Object(c["f"])("div",R,[Object(c["f"])("p",V,Object(c["C"])(e.computedPlayTime.hours)+":"+Object(c["C"])(e.computedPlayTime.minutes)+":"+Object(c["C"])(e.computedPlayTime.seconds),1)]),Object(c["f"])("div",B,[U,Object(c["f"])("p",null,Object(c["C"])(e.changeCell),1)]),Object(c["f"])("div",L,[T,Object(c["f"])("p",null,Object(c["C"])(e.incorrectCell),1)]),Object(c["f"])("div",z,[G,Object(c["f"])("div",H,[Object(c["h"])(u,{onFocus:t[3]||(t[3]=t=>e.focusingInput=!0),onBlur:t[4]||(t[4]=t=>e.focusingInput=!1),modelValue:e.memoValue,"onUpdate:modelValue":t[5]||(t[5]=t=>e.memoValue=t),class:"w-14 h-8"},null,8,["modelValue"]),Object(c["h"])(r,{onClick:e.addMemo,class:"w-14 h-8 bg-yellow-300 text-sm",disabled:-1===e.currentCellIndex},{default:Object(c["F"])(()=>[D]),_:1},8,["onClick","disabled"])]),-1!==e.currentCellIndex&&e.memoList[e.currentCellIndex]?(Object(c["s"])(),Object(c["e"])("div",N,[(Object(c["s"])(!0),Object(c["e"])(c["a"],null,Object(c["y"])(e.memoList[e.currentCellIndex],(t,l)=>(Object(c["s"])(),Object(c["e"])("div",{key:l,class:"w-full flex justify-between"},[Object(c["f"])("p",null,Object(c["C"])(t),1),Object(c["h"])(r,{onClick:t=>e.removeMemo(l),class:"w-5 h-5 border-black text-xs"},{default:Object(c["F"])(()=>[Y]),_:2},1032,["onClick"])]))),128))])):Object(c["d"])("",!0)])]),Object(c["h"])(s,{ref:"resultPopup",width:100,height:100},{default:Object(c["F"])(()=>[Object(c["f"])("div",J,[Object(c["f"])("p",Q,"SCORE: "+Object(c["C"])(e.gameScore),1),Object(c["h"])(r,{onClick:e.resultPopup.closePopup,class:"w-20 h-8 mt-40 bg-yellow-300"},{default:Object(c["F"])(()=>[K]),_:1},8,["onClick"])])]),_:1},512),Object(c["h"])(i,{version:"1.1",lastUpdate:"2022-08-26"},null,8,["version"])])}var W=Object(c["i"])({setup(){const e=Object(c["x"])(new Array),t=Object(c["x"])(new Array),l=Object(c["x"])(!0),a=Object(c["x"])(-1),o=Object(c["x"])("Start"),n=Object(c["x"])(!0),r=Object(c["x"])(1),u=Object(c["x"])(0),s=Object(c["x"])(0),i=Object(c["x"])(0),b=Object(c["x"])({hours:Object(c["b"])(()=>{const e=Math.floor(u.value/3600);return e>9?e:"0"+e}),minutes:Object(c["b"])(()=>{const e=Math.floor(u.value/60%60);return e>9?e:"0"+e}),seconds:Object(c["b"])(()=>{const e=u.value%60;return e>9?e:"0"+e})}),f=Object(c["x"])(null),d=Object(c["x"])(0),v=Object(c["x"])(new Array),j=Object(c["x"])(),O=Object(c["x"])(!1);Object(c["E"])(j,async()=>{await Object(c["m"])(),j.value=j.value.substring(j.value.length-1),0==j.value&&(j.value="")});let p=0;function h(){l.value=!1,a.value=-1,o.value="Creating...",n.value=!1,u.value=0,s.value=0,i.value=0,v.value=new Array,clearInterval(p);for(let t=0;t<9;t++){e.value[t]=new Array;for(let l=0;l<9;l++)e.value[t][l]=Math.floor(9*Math.random())+1}m(),w()}async function m(){const e=()=>new Promise(e=>{setTimeout(()=>{for(let e=0;e<9;e++){t.value[e]=new Array;for(let l=0;l<9;l++)t.value[e][l]=Math.floor(9*Math.random())+1}e()},100)});while(!l.value)await e()}async function w(){let t=!1,l=1;const c=()=>new Promise(c=>{setTimeout(()=>{if(l%3===0&&S(),l%5e3===0)for(let t=0;t<9;t++){e.value[t]=new Array;for(let l=0;l<9;l++)e.value[t][l]=Math.floor(9*Math.random())+1}const a=y(),o=g(),n=k();a&&o&&n?t=!0:(!a&&x(),!o&&A(),!n&&C(),l++),c()},1)});while(!t)await c();I()}function y(){let t=!0;for(let l=0;l<9;l++)9!==[...new Set(e.value[l].map(e=>e.value?+e.value:e))].length&&(t=!1);return t}function x(){for(let t=0;t<9;t++)while(9!==[...new Set(e.value[t])].length)for(let l=0;l<8;l++)for(let c=l+1;c<9;c++)e.value[t][l]===e.value[t][c]&&(e.value[t][c]=Math.floor(9*Math.random())+1)}function g(){let t=!0;for(let l=0;l<9;l++){const c=new Array;for(let t=0;t<9;t++)c.push(e.value[t][l]);9!==[...new Set(c.map(e=>e.value?+e.value:e))].length&&(t=!1)}return t}function A(){for(let t=0;t<9;t++){const l=new Array;for(let c=0;c<9;c++)l.push(e.value[c][t]);while(9!==[...new Set(l)].length)for(let c=0;c<8;c++)for(let a=c+1;a<9;a++)e.value[c][t]===e.value[a][t]&&(e.value[a][t]=Math.floor(9*Math.random())+1,l.splice(a,1,e.value[a][t]))}}function k(){let t=!0,l=0,c=0;for(let a=0;a<9;a++){const a=new Array;for(let t=3*l;t<3*l+3;t++)for(let l=3*c;l<3*c+3;l++)a.push(e.value[t][l]);9!==[...new Set(a.map(e=>e.value?+e.value:e))].length&&(t=!1),(l+1)%3===0?(l=0,c++):l++}return t}function C(){let t=0,l=0;for(let c=0;c<9;c++){const c=new Array;for(let a=3*t;a<3*t+3;a++)for(let t=3*l;t<3*l+3;t++)c.push(e.value[a][t]);while(9!==[...new Set(c)].length)for(let a=0;a<8;a++)for(let o=a+1;o<9;o++)if(c[a]===c[o]){const a=Math.floor(9*Math.random())+1;e.value[Math.floor(o/3)+3*t][o%3+3*l]=a,c.splice(o,1,a)}(t+1)%3===0?(t=0,l++):t++}}function M(t){const l=e.value[Math.floor(t/9)],c=new Array,a=new Array;let o=!1;for(let n=0;n<9;n++)c.push(e.value[n][Math.floor(t%9)]);for(let n=3*Math.floor(Math.floor(t/9)/3);n<3*Math.floor(Math.floor(t/9)/3)+3;n++)for(let l=3*Math.floor(t%9/3);l<3*Math.floor(t%9/3)+3;l++)a.push(e.value[n][l]);for(let e=1;e<=9;e++){let t=0,n=0,r=0;l.forEach(l=>{e==l.value&&t++}),c.forEach(t=>{e==t.value&&n++}),a.forEach(t=>{e==t.value&&r++}),t>1?(l.forEach(t=>{e==t.value&&(t.duplicateColumn=!0)}),o=!0):l.forEach(t=>{e==t.value&&(t.duplicateColumn=!1)}),n>1?(c.forEach(t=>{e==t.value&&(t.duplicateRow=!0)}),o=!0):c.forEach(t=>{e==t.value&&(t.duplicateRow=!1)}),r>1?(a.forEach(t=>{e==t.value&&(t.duplicateRegion=!0)}),o=!0):a.forEach(t=>{e==t.value&&(t.duplicateRegion=!1)})}return o}function S(){for(let t=0;t<9;t++)if(9!==[...new Set(e.value[t])].length){let l=new Array;while(9!==l.length)l.push(Math.floor(9*Math.random())+1),l=[...new Set(l)];e.value[t]=l}}function I(){let t=0,c=0;for(let l=0;l<9;l++){for(let l=0;l<3+r.value;l++){const a=Math.floor(9*Math.random());e.value[Math.floor(a/3)+3*t][a%3+3*c]?e.value[Math.floor(a/3)+3*t][a%3+3*c]=0:l--}(t+1)%3===0?(t=0,c++):t++}for(let l=0;l<9;l++)for(let t=0;t<9;t++)e.value[l][t]={value:e.value[l][t],fixed:!!e.value[l][t],select:!1,duplicateColumn:!1,duplicateRow:!1,duplicateRegion:!1};l.value=!0,o.value="Restart",p=setInterval(()=>{u.value++},1e3)}function E(t){-1!==a.value&&(e.value[Math.floor(a.value/9)][a.value%9].select=!1),t!==a.value?(e.value[Math.floor(t/9)][t%9].select=!0,a.value=t):a.value=-1}function P(t){O.value||(-1!==a.value&&/^[1-9]+$/.test(t.key)?setTimeout(()=>{e.value[Math.floor(a.value/9)][a.value%9].value=t.key,s.value++,M(a.value)&&i.value++;let l=!1;for(let t=0;t<9;t++)e.value[t].forEach(e=>{0==e.value&&(l=!0)});l||_()},100):-1!==a.value&&"Backspace"===t.key&&(e.value[Math.floor(a.value/9)][a.value%9].value=0,M(a.value)&&i.value++))}function _(){y()&&g()&&k()&&(n.value=!0,a.value=-1,clearInterval(p),Object(f.value).openPopup(),F())}async function F(){let e=1e4;e-=u.value,e-=10*s.value,e-=100*i.value,e+=500*r.value;const t=()=>new Promise(e=>{setTimeout(()=>{d.value+=Math.floor(10*Math.random())+1,e()},1)});while(d.value<e)await t();d.value<e&&(d.value=e)}function R(){v.value[a.value]||(v.value[a.value]=new Array),v.value[a.value].length<6&&(v.value[a.value].push(j.value),j.value="")}function V(e){v.value[a.value].splice(e,1)}return window.addEventListener("keydown",P),{sudokuList:e,tempSudokuList:t,createGameFinish:l,currentStatus:o,isGameClear:n,difficulty:r,playTime:u,changeCell:s,incorrectCell:i,computedPlayTime:b,resultPopup:f,gameScore:d,memoList:v,memoValue:j,currentCellIndex:a,focusingInput:O,createBoard:h,onClickCell:E,onKeydownCell:P,addMemo:R,removeMemo:V}}});l("c756");const Z=r()(W,[["render",X],["__scopeId","data-v-a90c4ece"]]);var q=Z;const $=e=>(Object(c["v"])("data-v-46c9a172"),e=e(),Object(c["t"])(),e),ee={class:"w-full mt-2 pb-10 flex justify-center"},te=$(()=>Object(c["f"])("div",null,null,-1)),le=$(()=>Object(c["f"])("div",{class:"w-150 h-150 mx-4 border-2 border-black"},null,-1)),ce=$(()=>Object(c["f"])("div",null,null,-1));function ae(e,t,l,a,o,n){const r=Object(c["A"])("custom-footer");return Object(c["s"])(),Object(c["e"])("div",ee,[te,le,ce,Object(c["h"])(r,{version:"1.0",lastUpdate:"2022-08-29"},null,8,["version"])])}var oe=Object(c["i"])({name:"Minesweeper"});l("a06f");const ne=r()(oe,[["render",ae],["__scopeId","data-v-46c9a172"]]);var re=ne;const ue=[{path:"/",name:"Main",component:h},{path:"/sudoku",name:"Sudoku",component:q},{path:"/minesweeper",name:"Minesweeper",component:re}],se=Object(b["a"])({history:Object(b["b"])("/"),routes:ue});var ie=se,be=l("5502"),fe=Object(be["a"])({state:{},mutations:{},actions:{},modules:{}});l("8a71");const de=["value"];function ve(e,t,l,a,o,n){return Object(c["s"])(),Object(c["e"])("input",{ref:"input",onInput:t[0]||(t[0]=t=>e.$emit("update:modelValue",t.target.value)),value:e.modelValue,class:"p-1 border border-black rounded text-center",type:"number"},null,40,de)}var je=Object(c["i"])({name:"CustomInput",props:{modelValue:{type:[String,Number]}}});l("b1d3");const Oe=r()(je,[["render",ve],["__scopeId","data-v-c79489c4"]]);var pe=Oe;function he(e,t,l,a,o,n){return Object(c["s"])(),Object(c["e"])("button",{class:Object(c["n"])([e.disabled?"cursor-default opacity-25 pointer-events-none":"hover:opacity-75","border rounded duration-200"])},[Object(c["z"])(e.$slots,"default",{},void 0,!0)],2)}var me=Object(c["i"])({name:"CustomButton",props:{disabled:{type:Boolean,default:!1}}});l("2d40");const we=r()(me,[["render",he],["__scopeId","data-v-718e4ce7"]]);var ye=we;const xe={key:0,style:{width:"100vw",height:"100vh"},class:"fixed"};function ge(e,t,l,a,o,n){return e.isShow?(Object(c["s"])(),Object(c["e"])("div",xe,[Object(c["f"])("div",{onClick:t[0]||(t[0]=(...t)=>e.closePopup&&e.closePopup(...t)),class:"w-full h-full bg-black opacity-30 absolute"}),Object(c["f"])("div",{style:Object(c["o"])([[{width:4*e.width+"px"},{height:4*e.height+"px"}],{transform:"translate(-50%, -50%)"}]),class:"border rounded bg-white absolute top-1/2 left-1/2"},[Object(c["z"])(e.$slots,"default",{},void 0,!0)],4)])):Object(c["d"])("",!0)}var Ae=Object(c["i"])({name:"CustomPopup",props:{width:{type:Number,defulat:500},height:{type:Number,default:500}},setup(){const e=Object(c["x"])(!1);function t(){e.value=!0}function l(){e.value=!1}return{isShow:e,openPopup:t,closePopup:l}}});l("6032");const ke=r()(Ae,[["render",ge],["__scopeId","data-v-7f3a4440"]]);var Ce=ke,Me=l("19cc"),Se=l.n(Me);const Ie=e=>(Object(c["v"])("data-v-f707c668"),e=e(),Object(c["t"])(),e),Ee={class:"w-full h-8 flex justify-center items-center fixed bottom-0 border-t border-black bg-white"},Pe=Ie(()=>Object(c["f"])("p",{class:"mr-2"},"© jylee. All rights reserved.",-1)),_e={class:"mr-2"},Fe={class:"mr-2"},Re=Ie(()=>Object(c["f"])("a",{href:"https://github.com/gujerbit/mini_games",target:"_blank"},[Object(c["f"])("img",{src:Se.a,alt:""})],-1));function Ve(e,t,l,a,o,n){return Object(c["s"])(),Object(c["e"])("footer",Ee,[Pe,Object(c["f"])("p",_e,"Current Version: "+Object(c["C"])(e.version),1),Object(c["f"])("p",Fe,"Last Update: "+Object(c["C"])(e.lastUpdate),1),Re])}var Be=Object(c["i"])({name:"CustomFooter",props:{version:{type:String},lastUpdate:{type:String}}});l("18f7");const Ue=r()(Be,[["render",Ve],["__scopeId","data-v-f707c668"]]);var Le=Ue;const Te=Object(c["c"])(i),ze=[pe,ye,Ce,Le];ze.forEach(e=>{Te.component(e.name,e)}),Te.use(fe).use(ie).mount("#app")},e2d7:function(e,t,l){}});
//# sourceMappingURL=app.732e3060.js.map