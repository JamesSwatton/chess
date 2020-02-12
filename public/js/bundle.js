!function(e){var t={};function o(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(s,r,function(t){return e[t]}.bind(null,r));return s},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=1)}([function(e,t){e.exports=function(e,t,o,s){return{player:e,colour:t,type:o,currentPos:s,possibleMoves:[]}}},function(e,t,o){const s=o(2),r=o(4);o(0);document.addEventListener("DOMContentLoaded",()=>{let e;s.setupBoard(),r.renderCheckedBoard(),r.renderPieces(s.pieces),document.getElementById("piece-container").addEventListener("click",t=>{const o=t.target.id.split("-").map(e=>+e),n=o[0],c=o[1],i=s.pieces[n][c];"blank"!==i.type&&2!==i.player?(e=i,s.calcMoves(e,2),r.renderPath(e)):(e&&function(e,t){let o=!1;return t.possibleMoves.forEach(t=>{t[0]===e[0]&&t[1]===e[1]&&(o=!0)}),o}(o,e)&&(s.movePiece(e,o),s.clearAllPossibleMoves(),r.renderPath(e),r.renderPieces(s.pieces)),e="")})})},function(e,t,o){const s=o(3),r=o(0),n={pieces:[],boardTemplate:["rkbKqbkr","pppppppp","00000000","00000000","00000000","00000000","pppppppp","rkbqKbkr"],setupBoard(){for(let e=0;e<8;e++){this.pieces[e]=[];for(let t=0;t<8;t++)if("0"===this.boardTemplate[e][t]){const t={type:"blank"};this.pieces[e].push(t)}else{let o,s;const n=this.boardTemplate[e][t];0===e||1===e?(o="black",s=2):(o="white",s=1);const c=r(s,o,n,[e,t]);this.pieces[e].push(c)}}},setupTestBoard(e){for(let t=0;t<8;t++){this.pieces[t]=[];for(let o=0;o<8;o++)if("0"===e[t][o]){const e={type:"blank"};this.pieces[t].push(e)}else{let s,n;const c=e[t][o];0===t||1===t?(s="black",n=2):(s="white",n=1);const i=r(n,s,c,[t,o]);this.pieces[t].push(i)}}},isPawnStart:e=>6===e.currentPos[0]||1===e.currentPos[0],getMoves(e){return"p"===e.type?this.isPawnStart(e)?s[e.type][e.colour].moves:[s[e.type][e.colour].moves[0].slice(0,1)]:s[e.type]},isInsideBoard:e=>(console.log("is inside board: ",e),e.every(e=>e>=0&&e<=7)),isEmptyGridPos(e){const t=e[0],o=e[1];return"blank"===this.pieces[t][o].type},isCapturePiece(e,t){const o=e[0],s=e[1];return this.pieces[o][s].player===t},calcMoves(e,t){e.possibleMoves=[];const o=this.getMoves(e);console.log("paths",o);let s=[];o.forEach(o=>{console.log("path",o);let r=!1;o.forEach(o=>{if(console.log("move",o),!r){const n=[];for(let t=0;t<2;t++)n.push(e.currentPos[t]-o[t]);this.isInsideBoard(n)?this.isEmptyGridPos(n)?s.push(n):this.isCapturePiece(n,t)?(s.push(n),r=!0):r=!0:r=!0}console.log(r)})}),console.log("possible moves",s),e.possibleMoves=s},movePiece(e,t){console.log(e),console.log(t);const o=t[0],s=t[1],r=e.currentPos;e.currentPos=[o,s],this.pieces[o][s]=e,this.pieces[r[0]][r[1]]={type:"blank"}},clearAllPossibleMoves(){for(let e=0;e<8;e++)for(let t=0;t<8;t++)this.pieces[e][t].possibleMoves=[]}};e.exports=n},function(e,t){e.exports={p:{white:{moves:[[[1,0],[2,0]]],captureMoves:[[[1,1],[1,-1]]]},black:{moves:[[[-1,0],[-2,0]]],captureMoves:[[[-1,-1],[-1,1]]]}},b:[[[-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7]],[[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]],[[-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7]],[[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7]]],k:[[[-2,-1]],[[-2,1]],[[2,-1]],[[2,1]],[[-1,-2]],[[-1,2]],[[1,-2]],[[1,2]]],r:[[[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]],[[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]],[[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]],[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]]],q:[[[-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7]],[[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]],[[-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7]],[[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7]],[[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]],[[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]],[[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]],[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]]],K:[[[-1,0]],[[1,0]],[[0,-1]],[[0,1]],[[-1,-1]],[[-1,1]],[[1,-1]],[[1,1]]]}},function(e,t){const o={boardTemplate:["01010101","10101010","01010101","10101010","01010101","10101010","01010101","10101010"],pieceSymbols:{white:{p:"&#9817",k:"&#9816",b:"&#9815",r:"&#9814",q:"&#9813",K:"&#9812"},black:{p:"&#9823",k:"&#9822",b:"&#9821",r:"&#9820",q:"&#9819",K:"&#9818"}},renderCheckedBoard(){const e=document.getElementById("board-container");console.log(e);for(let t=0;t<8;t++)for(let o=0;o<8;o++)if("0"===this.boardTemplate[t][o]){const t=document.createElement("div");t.className="grid-square",t.style.backgroundColor="#f0d9b5",e.appendChild(t)}else{const t=document.createElement("div");t.className="grid-square",t.style.backgroundColor="#B58863",e.appendChild(t)}},renderPieces(e){const t=document.getElementById("piece-container");t.innerHTML="";for(let o=0;o<8;o++)for(let s=0;s<8;s++){let r=e[o][s];const n=document.createElement("div");n.id=`${o}-${s}`,"blank"===r.type?n.className=`${r.type} grid-square`:(n.className=`piece ${r.type} ${r.colour}`,n.innerHTML=this.pieceSymbols[r.colour][r.type]),t.appendChild(n)}},renderPath(e){const t=document.getElementById("path-container");t.innerHTML="",console.log(t);const o=e.possibleMoves,s=e.currentPos;for(let e=0;e<8;e++)for(let n=0;n<8;n++){let c=document.createElement("div");r([e,n],o)?c.classList.add("circle"):r([e,n],[s])&&c.classList.add("highlighted"),t.appendChild(c)}function r(e,t){let o=!1;return t.forEach(t=>{t[0]===e[0]&&t[1]===e[1]&&(o=!0)}),o}}};e.exports=o}]);