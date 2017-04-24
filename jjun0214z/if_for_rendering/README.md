# Vue (조건부 렌더링, 리스트 렌더링)

## 조건부 렌더링

### 조건 관련 vue.js 디렉티브

- v-if
- v-else
- v-else-if
- v-show

### v-if, v-else, v-else-if

v-if 의 예제(simple)

```
//html
<div id="app">
	<div v-if="true"> true,false로 show/hide 제어 </div>
</div>
```

v-else 의 예제(simple)

```
//html
<div id="app">
	<div v-if="false"> true 일때 show </div>
	<div v-else> false 일때 show </div>
</div>
```

v-else-if 의 에제(simple) **vue.js 2.1.0 버전 부터 지원**

```
//html
<div id="app">
	<div v-if="false">hide</div>
	<div v-else-if="false">hide</div>
	<div v-else-if="false">hide</div>
	<div v-else>show</div>
</div>
```

### template 의 활용

v-if 디렉티브는 하나의 엘리먼트에만 적용 되기때문데 여러개의 엘리먼트를 적용시키기 위해서는 wrapper 역할의 &lt;template&gt; 이 필요하다

```
<div id="app">
	<template v-if="false">
		<h1>타이틀</h1>
		<p><template>의 활용 예제</p>
		<p>11111</p>
	</template>
	<template v-else-if="false">
		<h1>타이틀</h1>
		<p><template>의 활용 예제</p>
		<p>22222</p>
	</template>
	<template v-else>
		<h1>타이틀</h1>
		<p><template>의 활용 예제</p>
		<p>33333</p>
	</template>
</<div>
```

### v-if 와 v-show 의 차이

v-if 는 조건이 true가 되기전까지 랜더링을 하지 않습니다. 

false일 경우 이벤트 리스너와 컴포넌트가 토글하는 동안 제거가 됩니다. 한마디로 완전한 조건부 렌더링 입니다.

그와 반대로 v-show는 true, false 관계없이 엘리먼트가 항상 렌더링이 됩니다.

이 차이는 **v-if 는 토글될때마다 랜더링이 되기 때문에** 토글이 자주 이루어진다면 

**true, false 상관없이 최초 엘리먼트를 렌더링하는 v-show** 가 유리하며

런타임 시 조건이 바뀌지 않으며 v-if가 유리합니다 상황에 따라 적절하게 사용

## 리스트 렌더링

### v-for

v-for 예제(simple)

```
//html
<div id="app">
	<ul>
    	<li v-for="todo in(of) todos"> {{ todo.text }} </li>
    </ul>
</div>

//js
let vm = new Vue({
	el: '#app',
	data: {
		todos: [
			{ text: 1 },
			{ text: 2 },
			{ text: 3 }
		]
	}
});

for in 대신 for of 를 써도 됩니다.

자바스크립트에서 for in는 객체의 열거 가능한 모든 속성을 반복하고,

for of는 Symbol.iterator 속성이 있는 모든 요소를 반복하지만

vue.js 에서는 of, in 는 동일한 기능을 합니다.
```

### v-for의 템플릿 문법

v-if 와 마찬가지로 v-for 에서도 **template** 을 사용 블럭을 지정하여 랜더링 할수 있습니다.

```
//html
<div id="app">
	<ul>
		<template v-for="item in items">
			<li>{{ item.msg }}</li>
			<li>{{ item.msg }}</li>
			<li>{{ item.msg }}</li>
			<li>{{ item.msg }}</li>
		</template>	
	</ul>
</div>

//js
var vm = new Vue({
	el: '#app',
	data: {
		items: [
			{msg : 'aa'},
			{msg : 'bb'},
			{msg : 'cc'}
		]
	}

});
```

### v-for의 배열과 객체

v-for 디렉티브는 배열 기반으로 리스를 렌더링 합니다. 물론 객체도 속성의 요소도 렌더링 합니다.

배열과 객체의 차이점은 인자의 전달에서의 차이가 있고, 배열은 속성을 반환하지 못하며 또 객체에서는 for of 도 사용 가능합니다.

```
// 배열의 v-for	

<div id="app">
	<ul>
		<li v-for="(item, index) in(of) items"> // (두번째 인자에서 현재 항목의 index값을 전달합니다.)
			{{ item.msg }}, {{ index }}
		</li>
	</ul>
</div>

var vm = new Vue({
	el: '#app',
	data: {
		items: [
			{ msg : 'aa' },
			{ msg : 'bb' },
			{ msg : 'cc' }
		]
	}
});

// 객체의 v-for

<div id="app">
	<ul>
		<li v-for="(item, key, index) in(of) items"> // 두번째 인자에서는 객체의 속성값, 3번째 인자에서는 index 값을 반환 합니다.
			{{ item }}, {{ key }}, {{ index }}
		</li>
	</ul>
</div>

var vm = new Vue({
	el: '#app',
	data: {
		items: {
			aa: '11',
			bb: '22',
			cc: '33'
		}
	}
});

```

### v-for 의 범위

`v-for` 는 임의에 정수를 사용 할수 있습니다. 또한 연산, 삼항식까지도 표현 가능합니다.

```
<div v-for="n in 10">{{ n }}</div>

<div v-for="n in ( 10 - 5 ) * 2 ">{{ n }}</div>

<div v-for="n in true ? 10 : 5 ">{{ n }}</div>
```

### component 와 v-for 의 조합

컴퍼넌트와 데이터의 범위가 분리가 되어 있기 때문에 컴퍼넌트에 데이터를 전달 하기 위해서는

props를 이용하여 전달 해야 합니다.

`*props`

**모든 컴퍼넌트 인스턴스는 격리 된 범위에 있기때문에 하위 컴포넌트의 템플릿에 상위데이터를 직접 참조 할수가 없습니다.**

**그렇기때문에 하위 컴포넌트는 props의 옵션을 사용하여 데이터를 전달합니다**

```
//html
<my-component 
	v-for="item in items"
	v-bind:msg="item.aa"
>
</my-component>

//js
Vue.component('my-component', {
	template: '<div>{{ msg }}</div>',
	props: ['msg']
});


var vm = new Vue({
	el: '#app',
	data: {
		items: [
			{ aa: '11' },
			{ aa: '22' },
			{ aa: '33' }
		]
	}
});
```

### v-for 와 v-if의 우선순위

같은 노드에 v-for, v-if 같이 존재할때 v-for는 v-if 보다 우선순위를 가지기 때문에 루프를 반복마다 조건이 성립됩니다.

이는 반복문을 쓸대 일부 항목만 렌더링 하는 경우에 유리합니다.


```
//html
<div id="app">
	<div v-for="item in items" v-if="item == 'bb'">{{ item }}</div>	
</div>

//js
var vm = new Vue({
	el: '#app',
	data: {
		items: [
			'aa',
			'bb',
			'bb',
			'bb',
			'bb',
			'cc'
		]
	}
});
```

### 필터링 / 정렬 된 결과 표시하기



```
// computed
<div v-for="item in evenNumbers" >{{ item }}</div>	

// mathods
<div v-for="item in even(items)" >{{ item }}</div>


var vm = new Vue({
	el: '#app',
	data: {
		items: [ '1', '2', '3', '4', '5', '6' ]
	},
	computed: {
		evenNumbers: function(){
			return this.items.filter(function (num) {
				return num % 2 === 0
			})
		}	
	},
	
	methods: {
		even: function(items){
			return items.filter(function (num) {
				return num % 2 === 0
			})
		}
	}
});
```