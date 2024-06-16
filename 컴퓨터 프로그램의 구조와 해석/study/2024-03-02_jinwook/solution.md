# 3.7

```js
function make_account(balance, password) {
  let incorrect_trial = 0;
  let passwords = [password];

  function add_password(p) {
    passwords = [...passwords, p];
    return passwords;
  }

  function validate_password(p) {
    return passwords.some((password) => password === p);
  }

  function have_to_call_cops() {
    return incorrect_trial >= 8;
  }

  function call_the_cops() {
    return "cops are coming";
  }

  function incorrect_password() {
    incorrect_trial += 1;
    if (have_to_call_cops()) {
      call_the_cops();
    } else {
      return "incorrect password";
    }
  }

  function withdraw(amount) {
    if (balance >= amount) {
      balance = balance - amount;
      return balance;
    } else {
      return "Insufficient funds";
    }
  }

  function deposit(amount) {
    balance = balance + amount;
    return balance;
  }

  function dispatch(pw, m) {
    return m === "validate_password"
      ? () => validate_password(pw)
      : !validate_password(pw)
      ? incorrect_password
      : m === "withdraw"
      ? withdraw
      : m === "deposit"
      ? deposit
      : m === "add_password"
      ? add_password
      : error(m, "unkown request");
  }

  return dispatch;
}

function make_joint(account, password, new_password) {
  if (!account(password, "validate_password")()) return "invalid password";
  account(password, "add_password")(new_password);

  function dispatch(pw, m) {
    return account(pw, m);
  }

  return dispatch;
}
```

# 3.8

```js
function make_f() {}

const f = make_f();
```

# 3.9

- 그림은 따로 첨부하지 않는다.

# 3.10

- 그림은 따로 첨부하지 않는다.

# 3.11

- 그림은 따로 첨부하지 않는다.

# 3.12

- 첫 번째 `tail(x)`는 ["b", null]
- `tail(x)`는 `["b", ["c", ["d", null]]]`이다.

# 3.13

- 무한히 last_pair가 호출된다.

# 3.14

- mystery는 순서를 역순으로 변경시키는 함수이다.
- v는 꼬리를 가르키고, w는 head를 가르킨다.

# 3.15

- 그림은 따로 첨부하지 않는다.

# 3.16

# 3.17

```js
function count_pairs(x) {
  const counted_pairs = list();

  function count(x) {
    if (some(counted_pairs, (pair) => pair === x)) return 0;
    append_mutator(counted_pairs, x);

    return !is_pair(x) ? 0 : count(head(x)) + count(tail(x)) + 1;
  }

  return count(x);
}
```

# 3.18

```js
function cycle(x) {}
```
