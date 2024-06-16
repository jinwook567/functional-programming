# 3.24

```js
function make_table(same_key) {
  const local_table = list("*table*");

  function assoc(key, records) {
    return is_null(records)
      ? undefined
      : same_key(key, head(head(records)))
      ? head(records)
      : assoc(key, tail(records));
  }

  function lookup(key_1, key_2) {
    const subtable = assoc(key_1, tail(local_table));
    if (is_undefined(subtable)) {
      return undefined;
    } else {
      const record = assoc(key_2, tail(subtable));
      return is_undefined(record) ? undefined : tail(record);
    }
  }

  function insert(key_1, key_2, value) {
    const subtable = assoc(key_1, tail(local_table));
    if (is_undefined(subtable)) {
      set_tail(
        local_table,
        pair(list(key_1, pair(key_2, value)), tail(local_table))
      );
    } else {
      const record = assoc(key_2, tail(subtable));
      if (is_undefined(record)) {
        set_tail(subtable, pair(pair(key_2, value), tail(subtable)));
      } else {
        set_tail(record, value);
      }
    }
  }

  function dispatch(m) {
    return m === "lookup"
      ? lookup
      : m === "insert"
      ? insert
      : error(m, "unknown operation");
  }

  return dispatch;
}
```

# 3.25

```js
function make_table(same_key) {
  const local_table = list("*table*");

  function assoc(key, records) {
    return is_null(records)
      ? undefined
      : same_key(key, head(head(records)))
      ? head(records)
      : assoc(key, tail(records));
  }

  function lookup(keys) {
    function iter(keys, records) {
      if (is_null(keys)) return records;

      const key = head(keys);
      const record = assoc(key, records);
      return is_undefined(record) ? undefined : iter(tail(keys), record);
    }

    const record = iter(keys, tail(local_table));
    return is_undefined(record) ? undefined : tail(record);
  }

  function insert(keys, value) {
    function iter(keys, records) {
      const key = head(keys);
      const record = assoc(key, records);

      if (is_null(tail(keys))) {
        is_undefined(record)
          ? set_tail(records, pair(key, value))
          : set_tail(record, value);
        return;
      }

      if (is_undefined(record)) {
        set_tail(records, pair(key, iter(tail(keys), list())));
      } else {
        iter(tail(keys), subtable);
      }
    }

    return iter(keys, tail(local_table));
  }

  function dispatch(m) {
    return m === "lookup"
      ? lookup
      : m === "insert"
      ? insert
      : error(m, "unknown operation");
  }

  return dispatch;
}
```

# 3.26

- make_table 함수에, 두 인자의 상하 관계를 파악할 수 있는 compare 함수를 넣어준다.
- 테이블 내 자료 구조의 형태를 이진 트리 구조로 변경한다.
- assoc 함수는 compare 함수를 사용하여 이진 탐색을 수행한다.
- insert 함수는 compare 함수를 사용하여 이진 트리 구조를 유지하면서 새로운 데이터를 추가한다.

# 3.27

- 정비례하는 이유는 하나의 n에 대한 피보나치 수에 대하여 한번의 연산밖에 수행하지 않기 때문이다.
- memoize(fib)로 정의하게 된다면, 기존과 다르게 동작하게 된다.
  - memoize 함수가 실행되면, 해당 함수의 지역 환경 내에서 table이 만들어진다.
  - 그리고 함수가 실행될 때마다 독립적인 지역 환경이 생기므로, 다른 함수의 지역 환경에 메모이제이션된 값을 사용할 수 없다.

# 3.28

```js
function or_gate(o1, o2, output) {
  function or_action_function() {
    const new_value = logical_or(get_signal(o1), get_signal(o2));
    after_delay(or_gate_delay, () => set_signal(output, new_value));
  }

  add_action(o1, or_action_function);
  add_action(o2, or_action_function);
  return "ok";
}
```

# 3.29

```js
function or_gate(o1, o2, output) {
  const wire_1 = make_wire();
  const wire_2 = make_wire();
  const wire_3 = make_wire();

  inverter(o1, wire_1);
  inverter(o2, wire_2);
  and_gate(wire_1, wire_2, wire_3);
  inverter(wire_3, output);

  return "ok";
}
```

- 지연 시간은 3 inverter_delay, 1and_gate_delay의 합이다.

# 3.30

# 3.31

- 이벤트 전파를 강제하기 위해서.
- 함수를 실행하지 않는다면, 이벤트 전파가 발생하지 않는다.
- 함수를 실행하지 않는 방식으로 변경한다면, 이벤트 전파의 발생 시점이 정확히 일치하지 않을 것이다. 그렇다면 그 사이에 전선의 값을 다른 값으로 업데이트 한다거나 이러면 오류가 생길 수 있다..

# 3.32
