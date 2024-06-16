# 1.9

- 첫 번째는 재귀적이다.

  - 전개와 축약이 일어난다.
  - `plus(dec(a),b)` 과정이 a가 0이 될 떄 까지 전개된다. 이 때 inc에 대한 평가는 지연되있는 상태이다.
  - plus(0,b)가 되어 b를 반환하면 지연되었던 inc에 대한 평가를 수행한다. (축약)

- 두 번째는 반복적이다.
  - 전개나 축약이 일어나지 않는다.
  - 나중에 수행할 연산을 기억하지 않는다.
  - plus(4,5)를 평가하면, 이 함수는 plus(3,6)을 반환한다. 이 과정을 plus(0,9)가 될 때까지 수행한다.
  - a,b를 안다면 언제라도 과정을 재개할 수 있다.

# 1.10

- f(n): 2\*n
- g(n): 2^n
- h(n): 2^(2^n)

- A(1, 10)

  - A(0, A(1, 9))
  - A(0, A(0, A(1, 8)))
  - A(0, A(0, A(0, A(1, 7))))
  - 위의 과정이 9번 전개된다. y가 1이 될 때까지.
  - 마지막으로 y가 1로 평가된 함수는 2를 반환한다. 2^9
  - 그리고 x가 0으로 호출되는 함수는 2\*y를 반환하기에, 2^10이다.

# 1.11

```js
function f(n) {
  return n < 3 ? n : f(n - 1) + 2 * f(n - 2) + 3 * f(n - 3);
}

function f_2(n) {
  function iter(b1, b2, b3, count) {
    const c = b1 + 2 * b2 + 3 * b3;
    return count === n ? c : iter(c, b1, b2, count + 1);
  }

  return n < 3 ? n : iter(2, 1, 0, 3);
}
```

# 1.12

```js
function pascal(y, x) {
  if (y === 0) return 1;
  if (x === y || x === 0) return 1;
  return pascal(y - 1, x) + pascal(y - 1, x - 1);
}
```

# 1.13

도와줘요 수종님

# 1.14

# 1.15

```js
let cnt = 0;

function cube(x) {
  return x * x * x;
}

function p(x) {
  cnt++;
  return 3 * x - 4 * cube(x);
}

function abs(x) {
  return Math.abs(x);
}

function sine(angle) {
  return !(abs(angle) > 0.1) ? angle : p(sine(angle / 3));
}

sine(12.15);
console.log(cnt);
```

5번 적용되며, angle의 3이 나눠지므로, 밑이 3인 로그의 시간 복잡도를 가진다.
트리가 아닌 선형 재귀적 과정으로 공간 복잡도는 시간 복잡도와 동일하다.

# 1.16

```js
function expt(b, n) {
  function iter(a, b, n) {
    return n === 0 ? a : iter(a * b, b, n - 1);
  }

  return iter(1, b, n);
}

function isEven(n) {
  return n % 2 === 0;
}

function fast_expt(b, n) {
  function iter(a, b, n) {
    return n === 0
      ? a
      : isEven(n)
      ? iter(a, b * b, n / 2)
      : iter(a * b, b, n - 1);
  }
  return iter(1, b, n);
}
```

# 1.17

```js
function fast_times(a, b) {
  return b === 0
    ? 0
    : isEven(b)
    ? fast_times(double(a), halve(b))
    : a + fast_times(a, b - 1);
}
```

# 1.18

```js
function multiply(a, b) {
  function iter(a, b, r) {
    return b === 0
      ? r
      : isEven(b)
      ? iter(double(a), halve(b), r)
      : iter(a, b - 1, r + a);
  }

  return iter(a, b, 0);
}
```

# 1.19

p` = p^2 + q^2
q` = q^2 + 2pq

<??> 자리에 위 공식을 삽입해주면 된다.

T를 2번 적용한 모형에서 T를 1번 적용한 모형으로 치환하면 알 수 있다.
