# 2.32

```js
function subsets(s) {
  if (is_null(s)) {
    return list(null);
  } else {
    const rest = subsets(tail(s));
    return append(
      rest,
      map((x) => pair(head(s), x), rest)
    );
  }
}

display(subsets(list(1, 2, 3)));
```

- 리스트의 첫 번쨰 요소를 제외하고 부분 집합을 구한다.
- 전체 부분 집합은 첫 번째 요소를 제외하고 얻은 부분 집합과, 첫 번째 요소를 포함한 부분 집합으로 이루어진다.
- 첫 번째 요소를 포함한 부분 집합은 제외하고 얻은 부분 집합에 첫 번째 요소를 삽입해주면 된다.

# 2.33

```js
function map(f, sequence) {
  return accumulate((x, y) => pair(f(x), y), null, sequence);
}

function append(seq1, seq2) {
  return accumulate(pair, seq2, seq1);
}

function length(sequence) {
  return accumulate((x, y) => x + 1, 0, sequence);
}
```

# 2.34

```js
function horner_eval(x, coefficient_sequence) {
  return accumulate(
    (this_coeff, higher_terms) => this_coeff + higher_terms * x,
    0,
    coefficient_sequence
  );
}
```

# 2.35

```js
function count_leaves(t) {
  return accumulate(
    (x, y) => x + y,
    0,
    map((item) => (is_pair(item) ? count_leaves(item) : 1), t)
  );
}
```

# 2.36

```js
function accumulate_n(op, init, seqs) {
  return is_null(head(seqs))
    ? null
    : pair(
        accumulate(op, init, map(head, seqs)),
        accumulate_n(op, init, map(tail, seqs))
      );
}
```

# 2.37

```js
function matrix_times_vector(m, v) {
  return map((x) => dot_product(x, v), m);
}

function transpost(mat) {
  return accumulate_n(pair, null, mat);
}

function matrix_times_matrix(n, m) {
  const cols = transpost(n);
  return map((v) => matrix_times_matrix(cols, v), m);
}
```

# 2.38

1. 1/3/2/1
2. 1/1/2/3
3. (((null, (1, null)), (2, null)), (3, null))
4. (1, ((2, ((3, (null, null)), null)), null))

- 결과가 같기 위해서는 교환 법칙이 성립해야한다.

# 2.39

```js
function reverse(sequence) {
  return fold_right((x, y) => append(y, list(x)), null, sequence);
}

function reverse(sequence) {
  return fold_left((x, y) => append(list(y), x), null, sequence);
}
```
