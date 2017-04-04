# 계산된 속성과 감시자 (Computed Properties and Watchers)

## 계산된 속성 (Computed Properties)
템플릿 내에서 사용하는 표현식은 매우 편리하지만 단순한 연산에만 사용해야 한다.
복잡한 로직의 경우 반드시 <strong>계산된 속성</strong>을 사용해야 한다.
```html
<div id="example">
    <p>원본 메시지: "{{ message }}"</p>
    <p>뒤집히도록 계산된 메시지: "{{ reversedMessage }}"</p>
</div>

var vm = new Vue({
    el: '#example',
    data: {
        message: '안녕하세요'
        },
        computed: {
        // 계산된 getter
        reversedMessage: function () {
            // `this` 는 vm 인스턴스를 가리킵니다.
            return this.message.split('').reverse().join('')
        }
    }
})
```

## 감시자
대부분의 경우 계산된 속성이 더 적합하지만 사용자 정의 감시자가 필요한 경우가 있다.
그래서 Vue는 watch 옵션을 통해 데이터 변경에 반응하는 보다 일반적인 방법을 제공한다.
이는 데이터 변경에 대한 응답으로 비동기식 또는 시간이 많이 소요되는 조작을 수행하려는 경우에 가장 유요하다.
