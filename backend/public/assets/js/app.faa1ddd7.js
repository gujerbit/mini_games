(function(e){function t(t){for(var r,a,u=t[0],l=t[1],i=t[2],f=0,b=[];f<u.length;f++)a=u[f],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&b.push(o[a][0]),o[a]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);s&&s(t);while(b.length)b.shift()();return c.push.apply(c,i||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,u=1;u<n.length;u++){var l=n[u];0!==o[l]&&(r=!1)}r&&(c.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={app:0},c=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var i=0;i<u.length;i++)t(u[i]);var s=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"0ac9":function(e,t,n){"use strict";n("2602")},2602:function(e,t,n){},"7c32":function(e,t,n){"use strict";n("c302")},"8a71":function(e,t,n){},"9a2b":function(e,t,n){"use strict";n("ea1d")},c302:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);var r=n("7a23");function o(e,t){const n=Object(r["z"])("router-view");return Object(r["r"])(),Object(r["d"])(n)}var c=n("6b0d"),a=n.n(c);const u={},l=a()(u,[["render",o]]);var i=l,s=n("6605");const f={class:"w-full"},b=Object(r["g"])(" SUDOKU ");function d(e,t,n,o,c,a){const u=Object(r["z"])("router-link");return Object(r["r"])(),Object(r["e"])("div",f,[Object(r["h"])(u,{to:"/sudoku"},{default:Object(r["E"])(()=>[b]),_:1})])}var j=Object(r["i"])({name:"Main"});const O=a()(j,[["render",d]]);var p=O;const h={class:"w-full flex flex-col items-center"},v={id:"sudoku-container",class:"w-150 h-150 mx-auto mt-2 border-2 border-black rounded grid grid-cols-9 justify-items-center items-center"},w={class:"text-xl"},m={class:"text-xl"},y=Object(r["g"])("Start");function g(e,t,n,o,c,a){const u=Object(r["z"])("custom-button");return Object(r["r"])(),Object(r["e"])("div",h,[Object(r["f"])("div",v,[e.createGameFinish?(Object(r["r"])(!0),Object(r["e"])(r["a"],{key:0},Object(r["x"])(e.sudokuList,(e,t)=>(Object(r["r"])(),Object(r["e"])(r["a"],{key:t+"sudoku"},[(Object(r["r"])(!0),Object(r["e"])(r["a"],null,Object(r["x"])(e,(e,t)=>(Object(r["r"])(),Object(r["e"])("div",{key:t,class:"w-15 h-15 border border-black rounded flex justify-center items-center"},[Object(r["f"])("p",w,Object(r["B"])(e||""),1)]))),128))],64))),128)):(Object(r["r"])(!0),Object(r["e"])(r["a"],{key:1},Object(r["x"])(e.tempSudokuList,(e,t)=>(Object(r["r"])(),Object(r["e"])(r["a"],{key:t+"temp"},[(Object(r["r"])(!0),Object(r["e"])(r["a"],null,Object(r["x"])(e,(e,t)=>(Object(r["r"])(),Object(r["e"])("div",{key:t,class:"w-15 h-15 border border-black rounded flex justify-center items-center"},[Object(r["f"])("p",m,Object(r["B"])(e||""),1)]))),128))],64))),128))]),Object(r["h"])(u,{onClick:e.createBoard,class:"w-20 h-10 mt-2 bg-yellow-300",disabled:!1},{default:Object(r["E"])(()=>[y]),_:1},8,["onClick"])])}var k=Object(r["i"])({setup(){const e=Object(r["w"])(new Array),t=Object(r["w"])(new Array),n=Object(r["w"])(!1);function o(){for(let t=0;t<9;t++){e.value[t]=new Array;for(let n=0;n<9;n++)e.value[t][n]=Math.floor(9*Math.random())+1}c(),a()}async function c(){const e=()=>new Promise(e=>{setTimeout(()=>{for(let e=0;e<9;e++){t.value[e]=new Array;for(let n=0;n<9;n++)t.value[e][n]=Math.floor(9*Math.random())+1}e()},100)});while(!n.value)await e()}async function a(){let e=!1,t=1;const n=()=>new Promise(n=>{setTimeout(()=>{t%5===0&&d(),u()&&i()&&f()?e=!0:t++,n()},1)});while(!e)await n();j()}function u(){let t=!0;for(let n=0;n<9;n++)9!==[...new Set(e.value[n])].length&&(t=!1,l(n));return t}function l(t){while(9!==[...new Set(e.value[t])].length)for(let n=0;n<8;n++)for(let r=n+1;r<9;r++)e.value[t][n]===e.value[t][r]&&(e.value[t][r]=Math.floor(9*Math.random())+1)}function i(){let t=!0;for(let n=0;n<9;n++){const r=new Array;for(let t=0;t<9;t++)r.push(e.value[t][n]);9!==[...new Set(r)].length&&(t=!1,s(r,n))}return t}function s(t,n){while(9!==[...new Set(t)].length)for(let r=0;r<8;r++)for(let o=r+1;o<9;o++)e.value[r][n]===e.value[o][n]&&(e.value[o][n]=Math.floor(9*Math.random())+1,t.splice(o,1,e.value[o][n]))}function f(){let t=!0,n=0,r=0;for(let o=0;o<9;o++){const o=new Array;for(let t=3*n;t<3*n+3;t++)for(let n=3*r;n<3*r+3;n++)o.push(e.value[t][n]);9!==[...new Set(o)].length&&(t=!1,b(o,n,r)),(n+1)%3===0?(n=0,r++):n++}return t}function b(t,n,r){while(9!==[...new Set(t)].length)for(let o=0;o<8;o++)for(let c=o+1;c<9;c++)if(t[o]===t[c]){const o=Math.floor(9*Math.random())+1;e.value[Math.floor(c/3)+3*n][c%3+3*r]=o,t.splice(c,1,o)}}function d(){for(let t=0;t<9;t++)if(9!==[...new Set(e.value[t])].length){let n=new Array;while(9!==n.length)n.push(Math.floor(9*Math.random())+1),n=[...new Set(n)];e.value[t]=n}}function j(){let t=0,r=0;for(let n=0;n<9;n++){for(let n=0;n<3;n++){const o=Math.floor(9*Math.random());e.value[Math.floor(o/3)+3*t][o%3+3*r]?e.value[Math.floor(o/3)+3*t][o%3+3*r]=0:n--}(t+1)%3===0?(t=0,r++):t++}n.value=!0}return{sudokuList:e,tempSudokuList:t,createGameFinish:n,createBoard:o}}});n("7c32");const M=a()(k,[["render",g],["__scopeId","data-v-2e3fa37c"]]);var x=M;const S=[{path:"/",name:"Main",component:p},{path:"/sudoku",name:"Sudoku",component:x}],_=Object(s["a"])({history:Object(s["b"])("/"),routes:S});var P=_,A=n("5502"),B=Object(A["a"])({state:{},mutations:{},actions:{},modules:{}});n("8a71");function C(e,t,n,o,c,a){return Object(r["r"])(),Object(r["e"])("div",null,"input")}var I=Object(r["i"])({name:"CustomInput"});n("0ac9");const L=a()(I,[["render",C],["__scopeId","data-v-3eda21bc"]]);var T=L;function z(e,t,n,o,c,a){return Object(r["r"])(),Object(r["e"])("button",{class:Object(r["n"])([e.disabled?"cursor-default opacity-25 pointer-events-none":"hover:opacity-75","border rounded duration-200"])},[Object(r["y"])(e.$slots,"default",{},void 0,!0)],2)}var E=Object(r["i"])({name:"CustomButton",props:{disabled:{type:Boolean,default:!1}}});n("9a2b");const F=a()(E,[["render",z],["__scopeId","data-v-e15bc4d2"]]);var G=F;const J=Object(r["c"])(i),U=[T,G];U.forEach(e=>{J.component(e.name,e)}),J.use(B).use(P).mount("#app")},ea1d:function(e,t,n){}});
//# sourceMappingURL=app.faa1ddd7.js.map