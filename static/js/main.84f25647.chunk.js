(this.webpackJsonpmastermind=this.webpackJsonpmastermind||[]).push([[0],{10:function(t,e,a){"use strict";a.r(e);var s=a(2),n=a(3),r=a(8),i=a(7),o=a(0),c=a.n(o),l=a(4),m=a.n(l),u=a(5),h=a.n(u),d=a(6);a(17);function b(t){var e=t.value,a=t.row,s=t.activeRow===a?" active":"",n=t.resultsPerRow;return c.a.createElement("tr",{className:"board-row board-row-".concat(a).concat(s)},c.a.createElement("td",{className:"square mm-icon mm-icon--".concat(e[a][0])}),c.a.createElement("td",{className:"square mm-icon mm-icon--".concat(e[a][1])}),c.a.createElement("td",{className:"square mm-icon mm-icon--".concat(e[a][2])}),c.a.createElement("td",{className:"square mm-icon mm-icon--".concat(e[a][3])}),c.a.createElement("td",{className:"square mm-dots"},c.a.createElement("span",{className:"mm-dot mm-dot--black"},".".repeat(n[a][0])),c.a.createElement("span",{className:"mm-dot mm-dot--red"},".".repeat(n[a][1]))))}function S(t){return c.a.createElement("td",null,c.a.createElement("button",{disabled:"You WON! \ud83c\udf89\ud83c\udf89\ud83c\udf89"===t.status||'Press "Start" to begin'===t.status,className:"mm-icon mm-icon--".concat(t.value),onClick:function(){return t.onClick()}}))}function f(t){return'Press "Start" to begin'===t.status?c.a.createElement("button",{onClick:t.onStartClick},"Start Game"):c.a.createElement("div",null,c.a.createElement("button",{disabled:!t.confirmRequired,onClick:t.confirmClick},"Confirm"),c.a.createElement("button",{disabled:t.clearDisabled,onClick:t.clear},"Clear"),c.a.createElement("button",{onClick:t.restart},"Restart"))}var v=function(t){Object(r.a)(a,t);var e=Object(i.a)(a);function a(t){var n;return Object(s.a)(this,a),(n=e.call(this,t)).state={currentCombination:[],bingo:[],allCombinations:{0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[]},resultsPerRow:{0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[]},counter:0,activeRow:!1,confirmRequired:!1,clearDisabled:!1,status:'Press "Start" to begin'},n}return Object(n.a)(a,[{key:"renderSymbol",value:function(t){var e=this;return c.a.createElement(S,{value:t,onClick:function(){return e.handleSymbolClick(t)},status:this.state.status})}},{key:"renderRow",value:function(t){return c.a.createElement(b,{value:this.state.allCombinations,row:t,activeRow:this.state.activeRow,resultsPerRow:this.state.resultsPerRow})}},{key:"onStartClick",value:function(){this.setState({status:"Choose your combination"}),this.setState({activeRow:0}),this.setState({clearDisabled:!1});for(var t=[],e=0;e<4;e++)t.push(Math.floor(4*Math.random()));this.setState({bingo:t}),console.log("bingo: ".concat(t))}},{key:"confirmClick",value:function(){this.setState({confirmRequired:!1});for(var t,e=this.state.allCombinations[this.state.counter],a=this.state.bingo.slice(),s=e.slice(),n=0,r=0,i=h()(this.state.resultsPerRow),o=0;o<4;o++)e[o]===a[o]&&n++,s.includes(a[o])&&(t=s.indexOf(a[o]))>-1&&(s.splice(t,1),r++);if(i[this.state.counter]=[r,n],this.setState({resultsPerRow:i}),4===n)this.setState({status:"You WON! \ud83c\udf89\ud83c\udf89\ud83c\udf89"}),this.setState({clearDisabled:!0}),Object(d.a)({particleCount:200,spread:120,origin:{y:.6}});else{this.setState({status:"Choose your combination"});var c=this.state.counter;this.setState({currentCombination:[]}),this.setState({counter:c+1}),this.setState({activeRow:c+1})}7===this.state.counter&&(this.setState({status:"You LOST!  \ud83e\udd37\ud83c\udffb\u200d\u2642\ufe0f \ud83e\udd37\ud83c\udffb\u200d\u2642\ufe0f \ud83e\udd37\ud83c\udffb\u200d\u2642\ufe0f"}),this.setState({clearDisabled:!0}))}},{key:"restart",value:function(){this.setState({currentCombination:[]}),this.setState({allCombinations:{0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[]}}),this.setState({resultsPerRow:{0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[]}}),this.setState({counter:0}),this.setState({activeRow:!1}),this.setState({confirmRequired:!1}),this.setState({bingo:[]}),this.setState({status:'Press "Start" to begin'})}},{key:"clear",value:function(){this.setState({currentCombination:[]});var t=this.state.allCombinations,e=this.state.resultsPerRow;t[this.state.counter]=[],e[this.state.counter]=[],this.setState({allCombinations:t}),this.setState({resultsPerRow:e});var a=this.state.counter;this.setState({counter:a}),this.setState({activeRow:a}),this.setState({confirmRequired:!1}),this.setState({status:"Choose your combination"})}},{key:"handleSymbolClick",value:function(t){if(!0!==this.state.confirmRequired){var e=this.state.currentCombination,a=this.state.allCombinations,s=this.state.counter;e.push(t),e.length<4?(this.setState({currentCombination:e}),a[s]=e,this.setState({allCombinations:a})):(this.setState({confirmRequired:!0}),this.setState({status:"Confirm"}))}}},{key:"render",value:function(){var t=this;return c.a.createElement("div",null,c.a.createElement("div",{className:"mm-status"},this.state.status),c.a.createElement("div",{className:"mm-commands"},c.a.createElement(f,{status:this.state.status,confirmRequired:this.state.confirmRequired,clearDisabled:this.state.clearDisabled,onStartClick:function(){return t.onStartClick()},confirmClick:function(){return t.confirmClick()},restart:function(){return t.restart()},clear:function(){return t.clear()}})),c.a.createElement("table",{className:"mm-selection",cellSpacing:"0"},c.a.createElement("tbody",null,c.a.createElement("tr",null,this.renderSymbol(0),this.renderSymbol(1),this.renderSymbol(2),this.renderSymbol(3)))),c.a.createElement("table",{className:"board-content"},c.a.createElement("tbody",null,this.renderRow(0),this.renderRow(1),this.renderRow(2),this.renderRow(3),this.renderRow(4),this.renderRow(5),this.renderRow(6),this.renderRow(7))))}}]),a}(c.a.Component);function E(){return c.a.createElement("div",{className:"mm-game"},c.a.createElement("div",{className:"mm-game__logo"},c.a.createElement("img",{alt:"",src:"mastermind.png"})),c.a.createElement("div",{className:"mm-game__board"},c.a.createElement(v,null)),c.a.createElement("div",{className:"mm-game__info"},"Mastermind is a code-breaking game, invented in 1970 by Mordecai Meirowitz, Romanian-born Israeli postmaster and telecommunications expert.",c.a.createElement("img",{alt:"",src:"Mordecai-Meirowitz.jpg"}),c.a.createElement("br",null),c.a.createElement("hr",null),"This is a ReactJS app. Feel free to send any suggestions on Github.",c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("a",{href:"https://github.com/tahireu/mastermind"},"https://github.com/tahireu/mastermind")))}m.a.render(c.a.createElement(E,null),document.getElementById("root"))},17:function(t,e,a){},9:function(t,e,a){t.exports=a(10)}},[[9,1,2]]]);
//# sourceMappingURL=main.84f25647.chunk.js.map