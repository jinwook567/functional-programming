# 3.21

- 현재 queue는 첫 번째 요소의 포인터와, 마지막 요소의 포인터를 pair로 가지고 있는 자료구조이다.
- 자바스크립트 해석기는 위 자료구조를 출력했을 뿐이다.
- 만일 queue 내부에 존재하는 모든 요소를 출력하고 싶다면 첫 번째 포인터부터 마지막 포인터까지 순회하는 과정이 필요하다.
- 아래는 그 함수이다.

```js
function items(queue) {
  return is_empty_queue(queue)
    ? null
    : pair(
        front_queue(queue),
        items(pair(tail(front_ptr(queue)), rear_ptr(queue)))
      );
}

function print_queue(queue) {
  print(items(queue));
}
```

# 3.22

```js
function make_queue() {
  let front_ptr = null;
  let rear_ptr = null;

  function is_empty() {
    return is_null(front_ptr);
  }

  function queue() {
    return pair(front_ptr, rear_ptr);
  }

  function insert_queue(item) {
    const new_pair = pair(item, null);
    if (is_empty()) {
      front_ptr = new_pair;
      rear_ptr = new_pair;
    } else {
      rear_ptr = set_tail(rear_ptr, new_pair);
    }
    return queue();
  }

  function delete_queue() {
    if (is_empty()) {
      error("empty queue");
    } else {
      front_ptr = tail(front_ptr);
    }
    return queue();
  }

  function front_queue() {
    return head(front_ptr);
  }

  function dispatch(m) {
    return m === "insert"
      ? insert_queue
      : m === "delete"
      ? delete_queue
      : m === "is_empty"
      ? is_empty
      : front_queue;
  }

  return dispatch;
}
```

# 3.23

- 양뱡향 연결리스트를 사용하면 된다.
