# 1.1

- 10
- 12
- 8
- 3
- -4
- undefined
- undefined
- 19
- false
- 4
- 25
- 1/2
- -4

# 1.2

(5 + 4 + (2 - (3 - (6 + 4 / 5)))) / (3 _ (6 - 2) _ (2 - 7));

# 1.3

```js
function sol(a, b, c) {
  if (a < b) {
    [a, b] = [b, a];
  }

  if (b < c) {
    [b, c] = [c, b];
  }

  return a * a + b * b;
}
```

# 1.4

함수의 적용 요소를 평가하고, 인수들에 적용한다. b가 0보다 크거나 같다면 귀결 표현식 평가해서 조건부 표현식 전체의 값으로 반환해준다. 이것은 plus라는 함수이다. plus라는 함수의 매개변수는 인자로 치환되고, 인자가 평가된다. plus 함수도 동일한 방식으로 평가된다.

만일 b가 0보다 작다면 대안 표현식으로 평가해서 조건부 표현식 전체의 값으로 반환해준다. 이것은 minus라는 함수이다. 이후 과정은 plus 함수와 동일하다.

# 1.5

인수 우선 평가라면

- test 함수의 p()인자를 먼저 평가할 것이고, 무한 루프에 빠지게 된다.

정상 순서 평가라면

- 인자 p()는 이후에 필요한 시점에 평가된다.
- x가 0 이므로, 귀결 표현식이 평가되고 함수가 마무리된다. 즉 p() 매개변수는 평가되지 않는다.

# 1.6

- js는 인수 평가의 방식을 사용하기에 무한 루프에 빠진다. sqrt_iter 부분이 계속 반복된다.

# 1.7

## Q. 아주 작은 제곱 수의 제곱근을 구할 때 효과적이지 않은 이유

- is_good_enough 함수의 문제점은 어떠한 고정값을 기반으로 판단한다는 것이다.
- 즉 큰 값일 때는 너무 엄격한 기준을 들이미는 것이고, 작은 값일 때는 너무 널널한 기준을 들이민다.
- x가 아주 작은 수라고 가정해보자.
  - is_good_enough는 guess를 제곱한 것에서 x를 뺀다. 그리고 그 값을 비교한다.
  - x는 아주 작아서, guess 제곱의 영향을 미치지 못한다고 생각해보자.
  - 그렇게 문제를 단순화하여 생각해보면, guess 제곱이 0.001 보다 작아지게 되는 순간 is_good_enough는 술어가 만족한다고 평가한다.
  - `sqrt(0.0000000000000000000000001);`
    `sqrt(0.000000000000000000009);`  
    sqrt 함수에 다음과 같은 인자로 넣고 평가하였을 때, 0.03125라는 동일한 값을 반환한다.
  - 1부터 시작하여 재귀를 호출할 때, 0.03125가 0.001을 넘지않는 최대의 제곱수이기 때문이다.

## Q. 아주 큰 제곱 수의 제곱근을 구할 때 효과적이지 않은 이유

- 기본적인 골자는 위와 같다. 술어의 기준이 올바르지 못하다.
- 999999999999999999999 와 같이 매우 큰 숫자를 넣게 되면 maximum call stack 에러가 발생하게 된다.
- 재귀 함수를 반복하게 되면 어떠한 근사치에 수렴할 것이다. 그리고 어떠한 근사치에 수렴한 수를 x와 뺄 경우 숫자가 너무 크기 때문에, 0.001이라는 정확한 수치를 계산해내지 못한다. 따라서 수렴한 수를 계속 비교하다가 콜스택 에러가 나버리는 것이다.

## Q. 또 다른 전략

```js
function is_good_enough(guess, x) {
  const a = Math.abs(sqaure(guess) - x);
  return a < guess * 0.00001;
}
```

- 간단하게 소수점 숫자를 늘리면서 테스트를 진행했을 때, 0.00001의 경우 콜스택 에러가 발생하지 않았다.
- 그리고 꽤나 정확한 평가 결과를 보여주었다.

# 1.8

아래는 내가 작성한 전체 함수이다. 세제곱근 함수의 경우 sqrt2이다.

```js
// 뉴턴 방법은 이진 탐색 방식과 유사하다.
function average(a, b) {
  return (a + b) / 2;
}

function improve(guess, x) {
  return average(guess, x / guess);
}

function improve2(guess, x) {
  return (x / guess ** 2 + 2 * guess) / 3;
}

function sqaure(x) {
  return x * x;
}

function triple(x) {
  return x * x * x;
}

function is_good_enough(guess, x) {
  const a = Math.abs(sqaure(guess) - x);
  return a < guess * 0.1;
}

function is_good_enough2(guess, x) {
  const a = Math.abs(triple(guess) - x);
  return a < guess * 0.00001;
}

function sqrt_iter(guess, x) {
  return is_good_enough(guess, x) ? guess : sqrt_iter(improve(guess, x), x);
}

function sqrt_iter2(guess, x) {
  return is_good_enough2(guess, x) ? guess : sqrt_iter2(improve2(guess, x), x);
}

function sqrt(x) {
  return sqrt_iter(1, x);
}

function sqrt2(x) {
  return sqrt_iter2(1, x);
}
```

- sqrt2를 구현할 때 유의할 점은, 기존에 작성해놓은 함수를 많이 활용하지 못한다. is_good_enough, improve, sqrt_iter2를 재정의 하였다. 고차 함수를 이용한다면 함수의 재활용성을 더 높일 수 있지 않을까 생각해본다.
