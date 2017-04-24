'use strict'

// 카테고리 분류
Vue.component('study-category', {
	template: `
		<div>
			<select 
			v-on:change = "onChange" 
			v-model="selected"
			:style="selectStyle"
			>
				<option 
				v-for="(category, index) in categorys" 
				:value="category.value"
				>
					{{ category.value }}. {{ category.text }}
				</option>
			</select>
		</div>
	`,
	data () {
		return {
			categorys: [
				{ text:'조건부 렌더링', value: 'study01' },
				{ text:'리스트 렌더링', value: 'study02'}
			],
			selected: 'study01',
			selectStyle: {
				width: '300px',
				height: '30px',
				fontSize: '15px',
				display: 'block',
				margin: '20px auto',
				padding: '0 5px'
			}
		}
	},
	methods: {
		onChange () {
			vm.Selected = this.selected;
		}
	}
	
});

// 조건부 렌더링 예제
Vue.component('q-list', {
	// input에 key값이 있다면 렌더링 마다 입력한 내용 초기화 하지만 렌더링 되지 않는경우 입력된 내용 초기화 모색 ( 전환 될때마다 임의로 초기화 안됨 )
	template: `
		<div v-if="qaProcess">
			<p class="tit" :style="style.txt">{{ question[flag] }}</p>
			<label>답 : <input id="anstext" type="text" placeholder="답을 적어주세요." /></label>  
			<button @click="nextQa" type="button">다음문제</button>
		</div>
		<div v-else>
			<strong>테스트종료</strong>
			<p>정답 : {{ good }}</p>
			<p>오답 : {{ wrong }}</p>
		</div>
	`,
	data () {
		return {
			qaProcess: true,
			flag: 0,
			good: 0,
			wrong: 0,
			question: [
				'사용자 인터페이스를 만들기 위한 진보적인 프레임워크로 다른 단일형 프레임워크와 달리 점진적으로 채택할 수 있도록 설계한 이것은?',
				'true, flase 상관없이 최초 엘리먼트를 렌더링 하는 디렉티브는?',
				'v-if 와 v-for 중 우선순위가 높은 것은?',
			],
			answer:[
				'Vue',
				'v-show',
				'v-for'
			],
			
			style: {
				txt: {
					marginBottom: '10px'
				}
			}
		}
	},

	methods: {
		nextQa () {
			let chk = document.getElementById('anstext').value == this.answer[this.flag] ? this.good += 1 : this.wrong += 1;
			if ( this.flag < this.question.length - 1 ){
				chk;
				this.flag += 1;
			}else{
				chk;
				this.qaProcess = false;
			}
		}
	}
});

var vm = new Vue({
	el: '#app',
	data: {
		Selected: 'study01',
		style: {
			tit: {
				marginBottom: '10px',
				display: 'block'
			},
			layout: {
				width: '1200px',
				margin: '0 auto',
				padding: '20px',
				border: '1px solid #3e3e3e'
			}
		}
	}
});