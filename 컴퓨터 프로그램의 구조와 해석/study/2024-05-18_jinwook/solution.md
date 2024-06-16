# 3.61

```js
function invert_unit_series(s) {
  return pair(1, () =>
    scale_streams(mul_series(stream_tail(s), invert_unit_series(s)), -1)
  );
}
```

# 3.62

```js
function div_series(s1, s2) {
  if (head(s2) === 0) throw Error("denominator can not be zero");
  return pair(head(s1) / head(s2), () =>
    mul_series(stream_tail(s1), invert_unit_series(stream_tail(s2)))
  );
}

const tan_series = pair(0, () => div_series(sin_series, cos_series));
```

# 3.63

- 루이스의 함수는 재귀적으로 정의되어 있기 때문에, 재귀 함수가 실행될 때 또다른 실행 환경이 생성된다. 새로운 memo 함수가 생성되며 계산의 중복이 일어난다.
- 알리사의 경우 memo 함수가 제대로 작동한다. 메모화를 제거할 경우 재귀 함수와 대비하여 기존 실행 환경을 그대로 사용하기에 실행 환경 구성을 위한 오버헤드가 줄어든다.

# 3.64

```js
function stream_limit(s, tolerance) {
  const s1 = stream_tail(s);
  const h1 = pair(head(s1), () => h1);

  return pair(
    head(s),
    Math.abs(head(s) - head(s1)) < tolerance
      ? () => h1
      : () => stream_limit(s, tolerance)
  );
}
```

# 3.65

```js
const ln2_stream = partial_sums(summands(1));

const euler_ln2_stream = euler_transform(ln2_stream);

const accelerated_ln2_stream = accelerated_sequence(
  euler_transform,
  ln2_stream
);
```

# 3.66

- f(x,y) = `y*x - (x*(x-1)/2)`
  ​

# 3.67
