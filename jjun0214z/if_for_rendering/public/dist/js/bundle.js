!function(t){function e(o){if(n[o])return n[o].exports;var s=n[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="C:\\Users\\min\\Documents\\GitHub\\vueDocument\\jjun0214z\\if_for_rendering\\public\\dist\\js",e(e.s=117)}({117:function(t,e,n){"use strict";Vue.component("study-category",{template:'\n\t\t<div>\n\t\t\t<select \n\t\t\tv-on:change = "onChange" \n\t\t\tv-model="selected"\n\t\t\t:style="selectStyle"\n\t\t\t>\n\t\t\t\t<option \n\t\t\t\tv-for="(category, index) in categorys" \n\t\t\t\t:value="category.value"\n\t\t\t\t>\n\t\t\t\t\t{{ category.value }}. {{ category.text }}\n\t\t\t\t</option>\n\t\t\t</select>\n\t\t</div>\n\t',data:function(){return{categorys:[{text:"조건부 렌더링",value:"study01"},{text:"리스트 렌더링",value:"study02"}],selected:"study01",selectStyle:{width:"300px",height:"30px",fontSize:"15px",display:"block",margin:"20px auto",padding:"0 5px"}}},methods:{onChange:function(){o.Selected=this.selected}}}),Vue.component("q-list",{template:'\n\t\t<div v-if="qaProcess">\n\t\t\t<p class="tit" :style="style.txt">{{ question[flag] }}</p>\n\t\t\t<label>답 : <input id="anstext" type="text" placeholder="답을 적어주세요." /></label>  \n\t\t\t<button @click="nextQa" type="button">다음문제</button>\n\t\t</div>\n\t\t<div v-else>\n\t\t\t<strong>테스트종료</strong>\n\t\t\t<p>정답 : {{ good }}</p>\n\t\t\t<p>오답 : {{ wrong }}</p>\n\t\t</div>\n\t',data:function(){return{qaProcess:!0,flag:0,good:0,wrong:0,question:["사용자 인터페이스를 만들기 위한 진보적인 프레임워크로 다른 단일형 프레임워크와 달리 점진적으로 채택할 수 있도록 설계한 이것은?","true, flase 상관없이 최초 엘리먼트를 렌더링 하는 디렉티브는?","v-if 와 v-for 중 우선순위가 높은 것은?"],answer:["Vue","v-show","v-for"],style:{txt:{marginBottom:"10px"}}}},methods:{nextQa:function(){document.getElementById("anstext").value==this.answer[this.flag]?this.good+=1:this.wrong+=1;this.flag<this.question.length-1?this.flag+=1:this.qaProcess=!1}}});var o=new Vue({el:"#app",data:{Selected:"study01",style:{tit:{marginBottom:"10px",display:"block"},layout:{width:"1200px",margin:"0 auto",padding:"20px",border:"1px solid #3e3e3e"}}}})}});