# 3.53

- 1,2,4,8,16,32...
- 자신의 이전항을 2번 더해라와 같은 의미이다.

# 3.54

```js
const ones = pair(1, () => ones);
const integers = pair(1, () => add_streams(integers, ones));
const factorials = pair(1, () => mul_streams(factorials, integers));
```

# 3.55

```js
function partial_sums(s) {
  return pair(head(s), () =>
    stream_map((x) => x + head(s), partial_sums(stream_tail(s)))
  );
}
```

# 3.56

```js
const s = pair(1, () =>
  merge(scale_stream(s, 2), merge(scale_stream(s, 3), scale_stream(s, 5)))
);
```

# 3.57

- f(n) = f(n-1) + f(n-2)
- 2^n 회 덧셈을 수행한다.
- optimized를 사용하면 n회 덧셈을 수행한다.

# 3.58

- 소수자리 스트림이다..

# 3.59

## a

```js
function div_streams(s1, s2) {
  return stream_map_2((x1, x2) => x1 / x2, s1, s2);
}

function integrate_series(s) {
  return mul_streams(s, div_streams(ones, integers));
}
```

## b

- 사인의 적분은 코사인, 코사인의 적분은 다시 사인이라는 점을 이용한다.

```js
const cos_series = pair(1, () =>
  integrate_series(
    pair(0, () => stream_map((x) => -x, integrate_series(cos_series)))
  )
);

const sin_series = pair(0, () =>
  integrate_series(
    pair(1, () => integrate_series(stream_map((x) => -x, sin_series)))
  )
);
```

# 3.60

```js
function mul_series(s1, s2) {
  return pair(head(s1) * head(s2), () =>
    add_streams(
      scale_streams(stream_tail(s2), head(s1)),
      mul_series(stream_tail(s1), s2)
    )
  );
}
```
