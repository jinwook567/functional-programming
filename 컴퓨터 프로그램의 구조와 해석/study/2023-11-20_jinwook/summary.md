# 위계적 데이터와 닫힘 성질

- 데이터 객체들을 조합하는 연산이 있을 때, 만일 그 연산으로 조합한 결과들을 또 다시 그 연산으로 조합할 수 있다면, 그 연산을 가리켜 닫힘 성질을 충족한다고 말한다.
  - JS에서 배열, 객체 모두 해당된다.
- 닫힘 성질을 통해 위계적 자료 구조를 생성할 수 있다.
  - 위계적 구조란 그것을 구성하는 부품들 자체가 또 다른 부품들로 구성되며, 그 부품 역시 또 다른 부품들로 구성되는 식으로 이어지는 구조
- 함수를 다룰 때 이 닫힘 성질이 작용했다. 함수가 위계적 구조를 통해서 구성되었기 때문이다. (하나의 함수가 다른 함수들로 구성되었고, 본인도 다른 함수의 부품으로써 활용됨)

# 순차열

- 여러 데이터 객체가 특정 순서로 나열된 구조
- 책에서는 pair를 이용하여 순차열을 표현한다. 순차열의 가장 마지막에 있는 tail의 tail이 null이라면 해당 순차열은 종료된다.
- 중첩된 pair 적용으로 만든 쌍 객체들의 순차열을 목록(list)이라고 부른다.

# 목록 연산

## n번째 목록의 요소에 접근하는 함수

```js
function list_ref(items, n) {
  return n === 0 ? head(items) : list_ref(tail(items), n - 1);
}
```

## list의 길이를 반환하는 함수

```js
function length(items) {
  return is_null(items) ? 0 : 1 + length(tail(items));
}
```

## 2개의 list를 연결하는 함수

```js
function append(list1, list2) {
  return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}
```

- 기저 케이스는 list1이 없을 때면 list2를 반환한다.
- list1의 head를 뽑고, list1의 tail과 list2를 붙인 pair를 만든다.

# 목록 매핑

- 목록에 대한 유용한 연산 중 하나는, 목록의 각 요소에 어떠한 변환을 적용한 결과들로 새로운 목록을 만드는 것이다.
- map이라는 함수를 정의함으로써 우리는 목록을 더 높은 수준의 추상으로 다룰 수 있다.
  - 목록을 순회하는 부분을 숨길 수 있다.
  - 목록을 변환하는 함수의 구현과, 목록의 요소들을 추출하고 조합하는 세부적인 방법 사이에 추상화 장벽을 세운다.

```js
function map(f, items) {
  return is_null(items) ? null : pair(f(head(items)), map(f, tail(items)));
}
```
