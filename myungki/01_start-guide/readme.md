# 1 시작하기

## 1.1 Vue.js가 무엇인가요?

> 1. 다른 라이브러리와의 통합이 용이
> 2. 정교한 SPA(Single Page Application) 개발 가능
> 3. 점진적인 채택이 가능(뭔말인지 아직은 모르겠음?)

## 1.2 다른 Framework와의 비교

### 1.2.1 React

#### 공통점
- 가상DOM을 사용 (JSX)
- 반응(이벤트, 화면상의 변화)에 민감하고 조합이 가능한 Component를 제공
- 라우팅, 데이터 관리, 불변성 관리 등은 Core에 존재하지 않고 다른 라이브러리를 통해 적용
- 단방향 데이터 흐름(데이터가 어디서 오는지에 대한 추적이 용이)

#### 차이점
- Vue.js 에서는 `template` 문법을 제공.

```html
<template>
  <div class="list-container">
    <ul v-if="items.length">
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
    <p v-else>No items found.</p>
  </div>
</template>
```
Pug(Jade)같은 pre-compiler를 사용 할 수도 있지만 JSX와 같이 쓰는 것이 비효율 적일 수 있다. 왜냐하면 compile 과정이 복잡해질수 있고 연동되는 것이 아닌 순차적인 compile이 이루어져야 제대로된 결과물이 나오기 때문에 의존성이 높아 협업시에는 가급적 사용하지 않는것을 권한다. 단독 작업일 경우 다양하게 해본다는 의미에서 사용하는 것은 큰 무리는 없다.

- component 단위로 scope를 한정 지을 수 있는 css module 시스템을 적용하고 있다.
```html
<style scoped>
  @media (min-width: 250px) {
    .list-container:hover {
      background: orange;
    }
  }
</style>
```
`scoped` 옵션을 통해서 각 component에 부여된 uniq 속성에 기반한 셀렉터를 추가 함으로서 component별로 css를 관리 할 수 있다. 유니크한 속성선택자가 부여되기 때문에 component단위에서는 셀렉터가 겹쳐 레이아웃이 무너지는 상황은 전혀 없다.

- Native Rendering  
React는 React Native를 통해 Android, iOS로 작성이 가능한데 반해 Vue.js는 Native를 지원하는 것이 따로 없다. Alibaba에서 개발중인 weex라는 것이 있지만 아직은 개발단계에 있고 React Native 만큼의 강력한 테스를 거치지는 않았다. 즉, 아직은 대중적인 사용성은 부족하다는 이야기.

#### 1.2.2 Angular v1
##### 공통점
- `v-if`, `ng-if` 처럼 Template을 작성할 때의 문법이 거의 똑같다. **영감** 을 받았다 라고 설명하고 있는데 이는 사실 **배꼈다** 라는 말로 이해해도 무방하다.

##### 차이점
- directive가 있지만 Angular에서 사용하는 directive와는 그 의미가 조금 다르다. 예상한 바(아직 학습하지 않았으므로)로는 캡슐화 또는 wrapper의 의미가 강하고 그안에 포함되는 Component에 기능부여 같은 것은 Component로 따로 작성하여 directive에 반영 하는 방식을 취해야 하는것 같다. (이부분은 따로 추가 작성)


## 1.3 시작하기
> [vue-cli](https://github.com/vuejs/vue-cli) 사용

# 2 Vue 인스턴스

## 2.1 생성자
```js
// Vue 인스턴스 생성
const vm = new Vue({
  // 옵션
});

// Vue 옵션 확장
const MyComponent = vm.extend({
    // 추가 또는 변경될 옵션
});
```

## 2.2 속성과 메소드
```js
var data = { a: 1 }

var vm = new Vue({
  el: '#example',
  data: data
});

vm.$data === data // -> true
vm.$el === document.getElementById('example') // -> true

// $watch 는 인스턴스 메소드 입니다.
vm.$watch('a', function (newVal, oldVal) {
  // `vm.a`가 변경되면 호출 됩니다.
})
```

## 2.3 라이프사이클 다이어그램
Vue.js가 작동되는 방식을 다이어그램으로 설명
![Vue.js 다이어그램](https://kr.vuejs.org/images/lifecycle.png)


## 2.4 템플릿 문법

### 2.4.1 보간법

#### 2.4.1.2 문자열
```html
<div>{{ string }}</div>
```
`v-once`를 통해 한번만 렌더 시킬 수 있는데 단일 data가 들어가는 경우 사용해도 좋으나 복합적인 데이터가 들어가는 경우 다른 바인딩도 한번만 실행 된다는 점을 주의 해야 한다.(테스트 필요)

#### 2.4.1.3 `v-html="rawHtml"`를 사용하여 Mustache 안에서 html을 사용 할 수 있다.

html의 속성으로 Mustache를 사용할 수는 없다.
```html
// 이문법은 허용되지 않는다.
<span v-bind:id="{{idView ? 'myid' : 'youid'}}"></span>
```
> 웹사이트에서 임의의 HTML을 동적으로 렌더링하려면 XSS 취약점으로 쉽게 이어질 수 있으므로 매우 위험할 가능성이 있습니다. 신뢰할 수 있는 콘텐츠에서는 HTML 보간만 사용하고 사용자가 제공한 콘텐츠에서는 절대 사용하면 안됩니다.

#### 2.4.1.4 js 문법 사용하기
```html
<!-- 아래는 구문입니다, 표현식이 아닙니다. -->
{{ var a = 1 }}
<!-- 조건문은 작동하지 않습니다. 삼항 연산자를 사용해야 합니다. -->
{{ if (ok) { return message } }}
```
> 템플릿 표현식은 샌드박스 처리되며 `Math`와 `Date` 같은 전역으로 사용 가능한 것에만 접근할 수 있습니다. 템플릿 표현식에서 사용자 정의 전역에 액세스 하지 마십시오.

### 2.4.2 디렉티브
> directive는 `v-`접두사가 있는 속성이다.

#### 2.4.2.1 전달인자
일부 디렉티브는 콜론으로 표시되는 **전달인자** 를 사용할 수 있습니다. 예를 들어, `v-bind` 디렉티브는 반응적으로 HTML 속성을 갱신하는데 사용됩니다.
```html
// 여기서 url은 vm.data.url을 의미합니다.
<a v-bind:href="url"></a>
```

`v-on` 디렉티브는 이벤트에 이벤트에 따라 노드를 변경합니다.
```html
// onclick 속성으로 추가 됩니다.
// click하면 속성값의 이름으로 된 함수를 실행 시킵니다.
<a v-on:click="doSomething">
```

#### 2.4.2.2 [수식어](https://kr.vuejs.org/v2/guide/events.html#이벤트-수식어)
수식어는 점으로 표시되는 특수 접미사로, 디렉티브를 특별한 방법으로 바인딩 해야 함을 나타냅니다. 예를 들어, .prevent 수식어는 트리거된 이벤트에서 event.preventDefault()를 호출하도록 v-on을 디렉티브에 알려줍니다.
```html
// 기본 submit 전송을 막고 vm.onSubmit()을 실행 합니다.
<form v-on:submit.prevent="onSubmit"></form>
```
