# 이벤트 핸들링

## 이벤트 청취
`v-on` 디렉티브를 사용하여 DOM 이벤트를 듣고 트리거 될 때 Javascript를 실행 할 수 있다.
```html
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>위 버튼을 클릭한 횟수는 {{ counter }} 번 입니다.</p>
</div>

var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})
```
## 메소드 이벤트 핸들러
많은 이벤트 핸들러의 로직은 더 복합할 것이므로, Javascript를 `v-on` 속성 값으로 보관하는 것은 간단하지 않다.
이 때문에 `v-on`이 호출하고자 하는 메소드의 이름을 받는 이유이다.
```html
<div id="example-2">
  <!-- `greet`는 메소드 이름으로 아래에 정의되어 있습니다 -->
  <button v-on:click="greet">Greet</button>
</div>
var example2 = new Vue({
  el: '#example-2',
  data: {
    name: 'Vue.js'
  },
  // 메소드는 `methods` 객체 안에 정의합니다
  methods: {
    greet: function (event) {
      // 메소드 안에서 사용하는 `this` 는 Vue 인스턴스를 가리킵니다
      alert('Hello ' + this.name + '!')
      // `event` 는 네이티브 DOM 이벤트입니다
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
})
// 또한 JavaScript를 이용해서 메소드를 호출할 수 있습니다.
example2.greet() // -> 'Hello Vue.js!'
```

## 인라인 메소드 핸들러
메소드 이름을 직접 바인딩 하는 대신 인라인 JavaScript 구문에 메소드를 사용할 수도 있다.
인라인 명령문 핸들러에서 원본 DOM 이벤트에 엑세스 해야할 수도 있다.
특별한 `$event` 변수를 사용해 메소드에 전달할 수도 있다.
```html
<div id="example-3">
    <button v-on:click="say('h1')">Say hi</button>
    <button v-on:click="say('what')">Say what</button>
</div>

new Vue({
  el: '#example-3',
  methods: {
    say: function (message) {
      alert(message)
    }
  }
})
```
## 이벤트 수식어
Vue는 `v-on` 이벤트에 이벤트 수식어를 제공한다.
- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
```html
<!-- 클릭 이벤트 전파가 중단됩니다 -->
<a v-on:click.stop="doThis"></a>
<!-- 제출 이벤트가 페이지를 다시 로드 하지 않습니다 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 수식어는 체이닝 가능합니다 -->
<a v-on:click.stop.prevent="doThat"></a>
<!-- 단순히 수식어만 사용할 수 있습니다 -->
<form v-on:submit.prevent></form>
<!-- 이벤트 리스너를 추가할 때 캡처모드를 사용합니다 -->
<!-- 즉 내부 엘리먼트를 대상으로 한  이벤트가 해당 엘리먼트에서 처리되기 전에 처리됩니다. -->
<div v-on:click.capture="doThis">...</div>
<!-- event.target이 엘리먼트 자체인 경우에만 트리거를 처리합니다 -->
<!-- 자식 엘리먼트에서는 안됩니다 -->
<div v-on:click.self="doThat">...</div>
```
