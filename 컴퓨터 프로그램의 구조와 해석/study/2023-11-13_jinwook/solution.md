# 1.32

## a

```js
function accumulate(combiner, null_value, term, a, next, b) {
  return a > b
    ? null_value
    : accumulate(
        combiner,
        combiner(null_value, term(a)),
        term,
        next(a),
        next,
        b
      );
}
```

```js
function sum(term, a, next, b) {
  return accumulate((acc, cur) => acc + term(cur), 0, term, a, next, b);
}
```

```js
function product(term, a, next, b) {
  return accmulate((a, b) => a * b, 1, term, a, next, b);
}
```

## b

```js
function accumulate(combiner, null_value, term, a, next, b) {
  function iter(acc, cur) {
    return cur > b ? acc : iter(combiner(acc, term(cur)), next(cur));
  }
  return iter(null_value, a);
}
```

# 1.33

```js
function filtered_accumulate(
  combiner,
  null_value,
  term,
  a,
  next,
  b,
  predicate
) {
  return a > b
    ? null_value
    : accumulate(
        combiner,
        predicate(term(a)) ? combiner(null_value, term(a)) : null_value,
        term,
        next(a),
        next,
        b
      );
}

function isPrime(n) {
  for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function add(a, b) {
  return a + b;
}

function identity(a) {
  return a;
}

function inc(a) {
  return a + 1;
}

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function sumPrime(start, end) {
  return accmulate(add, 0, identity, start, inc, end, isPrime);
}

function disjoint_list(n) {
  return accmulate(add, 0, identity, 1, inc, n - 1, (a) => gcd(a, n) === 1);
}
```

# 1.34

f(f)를 평가하면, f(2)가 호출되고, 2라는 숫자가 이게 g가 된다. 2는 함수가 아닌 숫자이기 때문에 오류가 난다.

# 1.35

- 증명 고수 수종님의 도움이 필요합니다.

```js
const tolerance = 0.00001;
function abs(a) {
  return Math.abs(a);
}

function fixed_point(f, first_guess) {
  function close_enougth(x, y) {
    return abs(x - y) < tolerance;
  }
  function try_with(guess) {
    const next = f(guess);
    return close_enougth(guess, next) ? next : try_with(next);
  }
  return try_with(first_guess);
}

console.log(fixed_point((x) => 1 + 1 / x, 1));
```

# 1.36

```js
const tolerance = 0.00001;
function abs(a) {
  return Math.abs(a);
}

let cnt = 0;
function display(a) {
  console.log(a);
  cnt++;
  console.log(cnt);
}

function average(a, b) {
  return (a + b) / 2;
}

function log(a) {
  return Math.log(a);
}

function fixed_point(f, first_guess) {
  function close_enougth(x, y) {
    return abs(x - y) < tolerance;
  }
  function try_with(guess) {
    display(guess);
    const next = f(guess);
    return close_enougth(guess, next) ? next : try_with(next);
  }
  return try_with(first_guess);
}

console.log(fixed_point((x) => average(x, log(1000) / log(x)), 10));
```

- 고정점은 4.555536206185039이다.
- 10을 초기값으로 설정했을 때, 평균 감쇠를 적용한 경우는 10번, 평균 감쇠를 적용하지 않았을 때는 33번의 단계를 거친다.

# 1.37

```js
const tolerance = 0.00001;
function abs(a) {
  return Math.abs(a);
}

function close_enougth(x, y) {
  return abs(x - y) < tolerance;
}

function fixed_point(f, first_guess) {
  function try_with(guess) {
    const next = f(guess);
    return close_enougth(guess, next) ? next : try_with(next);
  }
  return try_with(first_guess);
}

const golden_ratio = fixed_point((x) => 1 + 1 / x, 1);

function cont_frac(n, d, k) {
  function fraction(i) {
    if (i === k) return n(i) / d(i);
    return n(i) / (d(i) + fraction(i + 1));
  }

  return fraction(1);
}

function guess(n) {
  const point =
    1 /
    cont_frac(
      () => 1,
      () => 1,
      n
    );
  return close_enougth(point, golden_ratio) ? n : guess(n + 1);
}

function cont_frac_iter(n, d, k) {
  function iter(i, result) {
    if (i === k) return result;
    return iter(i + 1, n(i) / (d(i) + result));
  }

  return iter(1, n(1) / d(1));
}

console.log(guess(1));
```

guess 함수를 호출한 결과 13번 수행해야한다.

# 1.38

```js
function quotient(n, k) {
  return Math.floor(n / k);
}

function d(i) {
  return i % 3 === 2 ? (quotient(i, 3) + 1) * 2 : 1;
}

console.log(cont_frac(() => 1, d, 100) + 2);
```

d 함수를 작성하였다.

# 1.39

```js
function cont_frac(n, d, operator, k) {
  function try_with(times) {
    if (times === k) return n(k) / d(k);
    return n(times) / operator(d(times), try_with(times + 1));
  }

  return try_with(1);
}

function tan_cf(x, k) {
  return cont_frac(
    (times) => (times === 1 ? x : x * x),
    (times) => times * 2 - 1,
    (x, y) => x - y,
    k
  );
}
```

cont_frac 함수에 operator라는 함수를 받도록하여 조금 더 유연한 연산을 가능하도록 하였다.

# 1.40

```js
function cubic(a, b, c) {
  return (x) => x * x * x + a * x * x + b * x + c;
}
```

# 1.41

```js
function double(f) {
  return (x) => f(f(x));
}

console.log(double(double(double))((x) => x + 1)(5));
```

# 1.42

```js
function compose(f, g) {
  return (x) => f(g(x));
}

console.log(
  compose(
    (x) => x * x,
    (x) => x + 1
  )(6)
);
```

# 1.43

```js
function repeated(f, n) {
  return n === 1 ? f : compose(f, repeated(f, n - 1));
}

console.log(repeated((x) => x * x, 2)(5));
```

# 1.44

```js
function smooth(f, dx) {
  return (x) => (f(x - dx) + f(x) + f(x + dx)) / 3;
}

function smooth_n(f, dx, n) {
  return repeated(smooth(f, dx), n);
}
```

# 1.45

```js
function average_n(f, n) {
  return repeated(average_damp(f), n);
}

function calculate(x, n, k) {
  return fixed_point(
    average_n((y) => x / y ** (n - 1), k),
    10
  );
}
```

# 1.46

```js
function iterative_improve(predicate, improve) {
  return (x) =>
    predicate(x) ? x : iterative_improve(predicate, improve)(improve(x));
}
```
