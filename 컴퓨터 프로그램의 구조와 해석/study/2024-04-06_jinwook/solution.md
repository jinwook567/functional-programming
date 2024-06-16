# 3.32

- 예정표는 정해진 시간에 실행할 함수를 등록한다. 따라서 함수의 실행 순서는 예정 시간 기준으로 순차적이여야한다.
- 함수를 실행시키기 이전 상태가, 이후 상태에 영향을 미치기 때문이다.
- 만약 순서대로 호출하지 않을 때, 예정 시간이 더 늦은 시간 조작이 예정 시간이 더 이른 시간 조작보다 먼저 호출될 경우 예정표는 결함이 생긴다.
- 구체적인 예시로 살펴본다.
  - and gate는 1,1일 때 작동한다.
  - 현재 상태는 0,1 이고 바뀔 상태는 1,0 이다.
  - 바뀔 상태의 순서는 2개가 존재한다. 첫 번째 와이어의 상태를 먼저 변경할 것인지, 두 번째 와이어의 상태를 먼저 변경할 것인지
  - 만일 첫 번째 와이어의 값을 먼저 변경한다면 and gate를 통과한다.
  - 하지만 두 번째 와이어의 값을 먼저 변경한다면 0,0 1,0이 되어 and gate를 통과하지 못하게 된다.

# 3.33

```js
function averager(a, b, c) {
  const sum = make_connector();
  const divide = make_connector();

  constant(0.5, divide);
  adder(a, b, sum);
  return multiplier(sum, divide, c);
}
```

# 3.34

- multiplier 로직은 a1,a2,b 이 중 2개가 있다면 연산을 진행한다.
- 하지만 a1,a2가 동일하다면 하나의 커넥터의 값을 없애면 둘 다 값이 없어지게 된다.
- 즉 multiplier가 의도한대로 작동하지 않는다.
- 새로운 커넥터를 만들어서 삽입해주어야 한다.

# 3.35

```js
function squarer(a, b) {
  function process_new_value() {
    if (has_value(b)) {
      if (get_value(b) < 0) {
        error(get_value(b), "square less than 0 -- squarer");
      } else {
        set_value(a, sqrt(get_value(b)), me);
      }
    } else {
      if (has_value(a)) {
        set_value(b, get_value(a) * get_value(a), me);
      }
    }
  }

  // process_forget_value, me는 multiplier 함수와 차이가 없다.
  connect(a, me);
  connect(b, me);
  return me;
}
```

# 3.36

# 3.37

```js
function cminus(a, b) {
  const c = make_connector();
  adder(c, b, a);
  return c;
}

function cmul(a, b) {
  const c = make_connector();
  multiplier(a, b, c);
  return c;
}

function cdiv(a, b) {
  const c = make_connector();
  multiplier(c, b, a);
  return c;
}

function cv(a) {
  const b = make_connector();
  constant(b, a);
  return b;
}
```
