# 2.56

```js
function is_exp(s) {
  return head(s) === "**";
}

function base(s) {
  return head(tail(s));
}

function exponent(s) {
  return tail(tail(s));
}

function make_exp(base, exponent) {
  return base === 1 ? 1 : exponent === 0 ? 1 : list("**", base, exponent);
}

function deriv(exp, variable) {
  return is_number(exp)
    ? 0
    : is_variable(exp)
    ? is_same_variable(exp, variable)
      ? 1
      : 0
    : is_sum(exp)
    ? make_sum(deriv(addend(exp), variable), deriv(augend(exp), variable))
    : is_product(exp)
    ? make_sum(
        make_product(multiplier(exp), deriv(multiplicand(exp), variable)),
        make_product(deriv(multiplier(exp), variable), multiplicand(exp))
      )
    : is_exp(exp)
    ? make_exp(
        make_product(
          make_product(exponent(exp), make_exp(base(exp), exponent(exp) - 1)),
          deriv(base(exp), variable)
        )
      )
    : error(exp, "unknown expression type -- deriv");
}
```

# 2.57

```js
function augend(exp) {
  return accumulate(make_sum, 0, tail(tail(exp)));
}

function multiplicand(exp) {
  return accumulate(make_product, 1, tail(tail(exp)));
}
```

# 2.58

## a

```js
function addend(exp) {
  return head(exp);
}

function augend(exp) {
  return head(tail(tail(exp)));
}

function is_sum(exp) {
  return is_pair(exp) && head(tail(exp)) === "+";
}

function is_product(exp) {
  return is_pair(exp) && head(tail(exp)) === "*";
}

function multiplier(exp) {
  return head(exp);
}

function multiplicand(exp) {
  return head(tail(tail(exp)));
}

function make_sum(a, b) {
  return list(a, "+", b);
}

function make_product(a, b) {
  return list(a, "*", b);
}
```

## b

```js
function is_sum(exp) {
  return is_pair(exp) && head(exp) === "+" ? true : is_sum(tail(exp));
}

function before(op, s) {
  return head(s) === op ? null : pair(head(s), before(op, tail(s)));
}

function after(op, s) {
  return head(s) === op ? tail(s) : after(op, tail(s));
}

function addend(exp) {
  return before("+", exp);
}

function augend(exp) {
  return after("+", exp);
}
```

- 위 문제에서는 합과 곱만 다룬다.
- 합과 곱만 존재하기에, 합의 우선 순위는 가장 낮다.
- 합의 더해지는 수는 + 연산자 기준 좌측에 위치한 식들의 평가 결과와 같다. 합 기준 더할 수는 + 연산자 기준 우측으로 위치한 식들의 평가 결과와 같다.
- 따라서 `before, after` 함수를 정의하여 문제를 해결하였다.
- 곱의 경우, 합을 전부 제거하고 나면 좌측, 우측밖에 남지 않는다. 따라서 곱의 경우 생성자, 접근자가 변하지 않아도 좋다.

# 2.59

```js
function union_set(set1, set2) {
  return is_null(set1)
    ? set2
    : is_element_of_set(head(set1), set2)
    ? union_set(tail(set1), set2)
    : pair(head(set1), union_set(tail(set1), set2));
}

function adjoin_set(x, set) {
  return is_element_of_set(x, set) ? set : pair(x, set);
}

function union_set(set1, set2) {
  return is_null(set1)
    ? set2
    : adjoin_set(head(set1), union_set(tail(set1), set2));
}
```

- adjoin_set를 활용하면, union_set를 더 간결하게 만들 수 있다.
- 한쪽 방향으로 강제하면, 복잡도를 줄일 수 있다.

# 2.60

```js
function adjoin_set(x, set) {
  return pair(x, set);
}
```

- adjoin_set 이외의 구현은 동일하다.
- 집합에 대한 추가는 중복을 허용하지 않는 집합보다 중복을 허용하는 집합이 빠르다.
- 집합에 특정 요소가 존재하는지 평가하는 효율은 중복을 허용하지 않는 것이 더 좋다.
  - 기존 집합 요소는 중복이 없기 때문에 순회해야할 요소가 중복이 있는 것 대비 적다.
  - 교집합도 특정 요소가 존재하는지 평가해야하기 때문에 동일한 원리가 적용된다.
- 생성 시점에 축약할 것인가?, 선택 시점에 축약할 것인가? 에 대한 대한 질문을 다시한번 주는 문제로 보인다.
- 만일 어떠한 분야에서 집합을 생성하는데, 중복이 발생할 확률이 매우 적다면 선택 시점에 축약하는 방식이 더 좋아보인다.

# 2.61

```js
function adjoin_set(x, set) {
  return is_null(set)
    ? list(x)
    : x === head(set)
    ? set
    : x < head(set)
    ? pair(x, set)
    : pair(head(set), adjoin_set(x, tail(set)));
}
```

# 2.62

```js
function union_set(set1, set2) {
  return is_null(set1)
    ? set2
    : is_null(set2)
    ? set1
    : head(set1) === head(set2)
    ? pair(head(set1), union_set(tail(set1), tail(set2)))
    : head(set1) < head(set2)
    ? pair(head(set1), union_set(tail(set1), set2))
    : pair(head(set2), union_set(set1, tail(set2)));
}
```

# 2.63

## a

- 같은 결과를 산출한다.
- 트리 내에서 가장 작은 수부터 순차적으로 나열한다.

## b

- 트리를 두 함수 모두 1번만 순회한다.
- 공간 복잡도에서 tree_to_list_1이 더 크다. 모르겠다..

# 2.64
