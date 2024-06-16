# 2.40

```js
function is_prime(n) {
  function iter(k) {
    if (k * k > n) return true;
    if (n % k === 0) return false;
    return iter(k + 1);
  }

  return iter(2);
}

function is_prime_sum(pair) {
  return is_prime(head(pair) + head(tail(pair)));
}

function make_pair_sum(pair) {
  return list(head(pair), head(tail(pair)), head(pair) + head(tail(pair)));
}

function unique_pairs(i, j) {
  return filter(
    (pair) => head(pair) !== head(tail(pair)),
    flatmap(
      (j_num) => map((i_num) => list(i_num, j_num), enumerate_interval(1, i)),
      enumerate_interval(1, j)
    )
  );
}

function prime_sum_pairs(n) {
  return map(make_pair_sum, filter(is_prime_sum, unique_pairs(n, n)));
}
```

# 2.41

```js
function unique_triple_pairs(n) {
  return flatmap(
    (unique_pair) =>
      map(
        (k) => pair(k, unique_pair),
        enumerate_interval(1, head(tail(unique_pair)) - 1)
      ),
    unique_pairs(n)
  );
}

function sol(n) {
  return filter(
    (list) => accumulate((x, y) => x + y, 0, list) === n,
    unique_triple_pairs(n)
  );
}
```

# 2.42

```js
function adjoin_position(row, column, list) {
  return pair(pair(row, column), list);
}

function row(pos) {
  return head(pos);
}

function column(pos) {
  return tail(pos);
}

function is_safe(k, positions) {
  const pos_to_judge = head(positions);
  return every(
    (pos) =>
      row(pos) !== row(pos_to_judge) &&
      row(pos) - column(pos) !== row(pos_to_judge) - column(pos_to_judge) &&
      row(pos) + column(pos) !== row(pos_to_judge) + column(pos_to_judge),
    tail(positions)
  );
}

function queens(board_size) {
  function queens_col(k) {
    return k === 0
      ? list(null)
      : filter(
          (positions) => is_safe(k, positions),
          flatmap(
            (rest_of_queens) =>
              map(
                (new_row) => adjoin_position(new_row, k, rest_of_queens),
                enumerate_interval(1, board_size)
              ),
            queens_col(k - 1)
          )
        );
  }

  return queens_col(board_size);
}

display(queens(5));
```

- queens 함수를 일반적 형태로 만들기 위해 n\*n에서 n개의 퀸을 놓는 문제로 정의한다.
- queens_col은 열 k까지 알맞게 퀸을 놓은 포지션들을 반환한다.
- queens 함수는 queens_col 함수에 본인의 열의 개수를 넣어준 것과 동일하다.
- queens_col은 재귀로 풀어낼 수 있다.
  - 기저 케이스: 만일 열이 0이라면, 빈 리스트를 반환한다.
  - 정의: queens_col(k-1)이 반환한 값에 해당 열에 row에 퀸을 하나씩 배치하고, 올바른 위치에 놓아진 퀸만 추출한다.
- is_safe
  - 퀸은 대각선, 직선으로 움직일 수 있다.
  - 우리는 왼쪽에서부터 차례대로 퀸을 놓으면서 가기 때문에 상,하,우 방향의 직선 및 대각선을 신경쓸 필요가 없다.
  - 만일 동일한 좌상측 대각선에 위치해있다면, row에서 column을 뺀 값이 같다.
  - 만일 동일한 좌측 직선에 위치해있다면, row가 같다.
  - 만일 동일한 좌하측 대각선에 위치해있다면, row와 column을 더한 값이 같다.
  - every 함수를 활용하여 위치한 퀸들이 위 조건을 성립하는지 확인한다.

# 2.43

- queens_col은 enumerate_interval 대비 재귀를 호출하는 고연산 작업이다. 따라서 직관적으로 보았을 때 루이스의 프로그램이 오래걸린다는 사실을 알 수 있다.
- 기존 시간이 T라고 하였을 때, 루이스의 프로그램은 (n-1)!T이다.
  - n이 5라면, T가 4번 호출된다. n이 4라면, T가 3번 호출된다. 이 과정이 n이 0일 때까지 반복한다면, `4*3*2*1`번 호출된다.
  - 즉 (n-1)!번 T가 호출된다.

# 2.44

```js
function up_split(painter, n) {
  if (n === 0) {
    return painter;
  } else {
    const smaller = up_split(painter, n);
    return below(painter, beside(smaller, smaller));
  }
}
```

# 2.45

```js
function split(o1, o2) {
  return (painter, n) => {
    if (n === 0) {
      return painter;
    } else {
      const smaller = split(o1, o2)(painter, n - 1);
      return o1(painter, o2(smaller, smaller));
    }
  };
}
```
