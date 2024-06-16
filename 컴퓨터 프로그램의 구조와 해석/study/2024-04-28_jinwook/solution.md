# 3.46

-

# 3.47

## a

```js
function se
```

# 3.48

- 자원을 선점하는 순서를 강제할 수 있기 때문이다.
- 순서가 강제된다면, 동일한 요청으로 간주될 수 있기 때문이다.

```js
function serialized_exchange(account1, account2) {
  const serializer1 = account1("serializer");
  const serializer2 = account2("serializer");

  if (account1("id") > account2("id")) {
    // 기존 동작과 동일
  } else {
    // 순서 변경
  }
}
```

# 3.49

- 순서를 강제할 수 없을 때 문제가 발생한다.
- A,B,C 3개의 스레드가 있다. 그리고 각 스레드에 접근했을 때 접근 가능한 나머지 2개의 스레드를 알 수 있다고 가정한다.
- 실행 1: A -> B -> C
- 실행 2: C -> A -> B
- 실행 1의 경우 C에 대한 자원을 점유하기 위해서 대기하고, 실행 2의 경우 A에 대한 자원을 점유하기 위해서 대기하여 교착 상태가 발생하게 된다.

# 3.50

```js
function stream_map_2(f, s1, s2) {
  return is_null(s1)
    ? null
    : pair(f(head(s1), head(s2)), () =>
        stream_map_2(f, stream_tail(s1), stream_tail(s2))
      );
}
```

```js
function stream_map_2_optimized(f, s1, s2) {
  return is_null(s1)
    ? null
    : pair(
        f(head(s1), head(s2)),
        memo(() => stream_map_2(f, stream_tail(s1), stream_tail(s2)))
      );
}
```

# 3.51

- 0,1,2,3,4,
- 0,1,2,3,4,5,6

- 0,1,2,3,4
- 5,6 (0,1,2,3,4,5)는 함수 실행이 되지 않고, 캐싱된 값만 반환한다.

# 3.52

- stream_ref(y,7)을 실행하기 전까지는 sum은 0이다.
- 총 8개의 y를 구해야함.
- 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91, 105, 120, 136, 153
- 1,3,15,21,45,91,105,153 sum은 153이다.
- sum은 153인 상태에서 20번 또 더하고.. 거기서 5로 나뉘는거 찾는다.
- memo를 적용한다면 해석기의 출력이 달라진다. memo는 함수는 함수의 적용 유무만 판단하고, 적용했다면 평가된 값을 저장하고 반환한다.
- 그 저장된 값이 어떠한 배정에 의존되더라도 저장된 값을 반환하기에 출력의 결과가 달라진다.
