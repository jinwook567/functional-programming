# 1.20

정상 순서 평가를 흉내내기 위해서 인수에 함수를 전달하여 평가를 지연시켰다.

```js
let times = 0;
function gcd(a, b) {
  if (b() === 0) return a();
  return gcd(b, () => {
    times++;
    return a() % b();
  });
}

gcd(
  () => 206,
  () => 40
);

console.log(times);
```

총 18번의 remainer 연산이 일어난다.
인수 평가의 경우 책과 동일하게 4번이 일어나게된다.

# 1.21

```js
function smallest_divisor(n) {
  return find_divisor(n, 2);
}

function find_divisor(n, test_divisor) {
  if (square(test_divisor) > n) return n;

  return divides(test_divisor, n)
    ? test_divisor
    : find_divisor(n, test_divisor + 1);
}

function divides(a, b) {
  return b % a === 0;
}

function square(n) {
  return Math.sqrt(n);
}

const a = smallest_divisor(199);
const b = smallest_divisor(1999);
const c = smallest_divisor(19999);
console.log(a, b, c);
```

199, 1999, 7이다.

# 1.22

call stack error

```js
function display(n) {
  console.log("**n**");
}

function timed_prime_test(n) {
  display(n);
}

function start_prime_test(n, start_time) {}

function search_for_primes(start, end) {
  function iter(n, prime_list) {
    if (n === end) return prime_list;
    if (is_prime(n)) prime_list.push(n);
    return iter(n + 2, prime_list);
  }
  return iter(start % 2 === 0 ? start + 1 : start, []);
}

function is_prime(n) {
  return smallest_divisor(n) === n;
}

function smallest_divisor(n) {
  return find_divisor(n, 2);
}

function find_divisor(n, test_divisor) {
  if (square(test_divisor) > n) return n;

  return divides(test_divisor, n)
    ? test_divisor
    : find_divisor(n, test_divisor + 1);
}

function divides(a, b) {
  return b % a === 0;
}

function square(n) {
  return Math.sqrt(n);
}
```

```js
for (let i = 1000; i < 1000000000000000; i *= 10) {
  search_for_prime(i, i * 10, 3);
}

function search_for_prime(begin, end, limit) {
  const ret = [];

  while (begin <= end) {
    if (ret.length === limit) break;
    if (!divides(2, begin) && timed_prime_test(begin)) {
      ret.push(begin);
    }
    begin++;
  }
  return ret;
}

function timed_prime_test(n) {
  return start_prime_test(n, get_time());
}

function start_prime_test(n, start_time) {
  return is_prime(n) ? (report_prime(start_time, get_time()), true) : false;
}

function display(n) {
  console.log(n);
}

function report_prime(start_time, end_time) {
  display("***");
  const elapsed_time = end_time - start_time;
  display({ start_time, end_time, elapsed_time });
}

function get_time() {
  return new Date().getTime();
}

function smallest_divisor(n) {
  return find_divisor_loop(n);
  // return find_divisor(n, 2);
}

function find_divisor(n, test_divisor) {
  if (square(test_divisor) > n) return n;

  return divides(test_divisor, n)
    ? test_divisor
    : find_divisor(n, next(test_divisor));
}

function find_divisor_loop(n) {
  for (let i = 2; i <= square(n); i++) {
    if (divides(i, n)) return i;
  }
  return n;
}
```

재귀를 활용하니 콜스택 에러가 떠서, 반복문을 활용했다.
수가 작으면 너무 빨리 끝나버리고, 수가 커질수록 루트 10의 배수에 수렴하게 된다.

# 1.23

```js
function find_divisor_loop(n) {
  for (let i = 2; i <= square(n); i = next(i)) {
    if (divides(i, n)) return i;
  }
  return n;
}

function next(n) {
  return n === 2 ? 3 : n + 2;
}
```

```js
***
{
  start_time: 1686555088518,
  end_time: 1686555088558,
  elapsed_time: 40,
  n: 100000000000097
}

***
{
  start_time: 1686555236200,
  end_time: 1686555236267,
  elapsed_time: 67,
  n: 100000000000097
}
```

위의 결과와 유사하게 수가 커질수록, 절반에 수렴하게 된다.
정확히 절반이 아닌 이유는, next 함수를 호출하고, 조건문 연산을 하는데 시간이 들어서 아닐까.

# 1.24

- 페르마 판정법의 증가 차수가 왜 O(logN)인지?
- K번 판단한다면, O(K) 아닌가

# 1.25

작은 수에 대해서 결과는 동일하겠지만, 큰 수의 경우 숫자가 너무 커져서 계산이 안될수도 있다.
기존 expmod는 모듈러 연산을 한 결과를 반환하기에, 숫자가 너무 커지는 것을 방지할 수 있다.

# 1.26

트리 재귀에 따르면, 재귀 함수내에서 본인을 호출한 횟수가 a라고 하면 O(a^n)으로 지수적으로 증가한다.
페르마의 정리가 O(logN)이므로, 로그와 지수가 상쇄되어 O(n) 시간 복잡도를 가지게 된다.

# 1.27

각주에 나온 수들은 소수가 아님에도 불구하고, 내가 만든 함수는 true를 반환한다. (소수라고 판별한다.)

# 1.28

```js
function fast_is_prime(n, times) {
  if (times === 0) return true;

  if (fermat_test(n)) return fast_is_prime(n, times - 1);
  return false;
}

function expmod(base, exp, m) {
  if (exp === 0) return 1;

  if (is_even(exp)) return squareWithCheck(expmod(base, exp / 2, m)) % m;
  return (base * expmod(base, exp - 1, m)) % m;
}

function square(n) {
  return n * n;
}

function is_even(n) {
  return n % 2 === 0;
}

function squareWithCheck(a, n) {
  if (a !== 1 && a !== n - 1 && (a * a) % n === 1) return 0;
  return a * a;
}

function fermat_test(n) {
  function try_it(a) {
    return expmod(a, n - 1, n) === 1;
  }

  return try_it(1 + Math.floor(Math.random() * (n - 1)));
}

function randomInt(from, to) {
  return from + Math.floor(Math.random() * (to - from));
}

function divides(a, b) {
  return b % a === 0;
}
```

- 문제에서 하란대로, squareWithCheck를 작성하긴 했는데, 이게 왜 작동하는지는 몰랐다. 궁금해서 찾아봤다.
- a^2 % n = 1 이라고 가정했을 때, (a는 n보다 작은 양의 정수, n은 소수)
- a^2 = Kn + 1
- a^2 - 1 = Kn
- (a+1)(a-1) = Kn
- n은 a보다 무조건 크므로, n은 a+1임. -> a = n-1
- 즉 정리하자면 n이 소수일 경우, a^2 을 n으로 나눈 나머지가 1이라면 a는 무조건 n-1 이여야 한다. (당연히 1도 된다.)
- 따라서 만일 a가 1 또는 n-1이 아님에도 불구하고, n으로 나눴을 때 나머지가 1이라면 소수가 아닌 것이다.

# 1.30

```js
function sum(term, a, next, b) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), term(a) + result);
  }
  return iter(a, 0);
}
```

# 1.31

```js
function product(term, a, next, b) {
  return a > b ? 1 : term(a) * product(term, next(a), next, b);
}

function identity(k) {
  return k;
}

function inc(k) {
  return k + 1;
}

function factorial(n) {
  return product(identity, 1, inc, n);
}

function approximate(count) {
  function term(n) {
    return ((n - 1) * (n + 1)) / (n * n);
  }

  function next(n) {
    return n + 2;
  }

  return product(term, 3, next, count * 3) * 4;
}

console.log(approximate(100));
```

한 100번 돌리니까 3.14 나온다.
