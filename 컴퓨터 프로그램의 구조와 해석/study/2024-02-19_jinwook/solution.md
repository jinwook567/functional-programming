# 2.87

```js
function is_termlist_equal_to_zero(term_list) {
  return (
    is_empty_termlist(term_list) ||
    (is_equal_to_zero(coeff(first_term(term_list))) &&
      is_termlist_equal_to_zero(rest_terms(term_list)))
  );
}
```

# 2.88

```js
function negate_term(term) {
  return make_term(order(term), -coeff(term));
}

function sub_poly(p1, p2) {
  return add_poly(p1, map(negate_term, p2));
}
```

# 2.89

- 희소 다항식 형태로 데이터 형식을 맞추는 방법이 가장 좋아보인다.
- 그렇다면 term을 넣고 빼는 함수만 수정해주면 된다.
- 하나의 term이 조밀 다항식 형태로 표현된다.
- term_list는 조밀 다항식을 여러개 들고 있을 뿐이다.

```js
function adjoin_term(term, term_list) {
  return pair(term, term_list);
}

function first_term(term_list) {
  return make_term(length(term_list) - 1, head(term_list));
}

function adjoin_term(coeff, order, term_list) {
  return order > length(term_list) - 1
    ? adjoin_term(coeff, order - 1, pair(0, term_list))
    : null;
}
```

# 2.90

- term_list에 타입을 주어야한다.
- adjoin_term과 first_term은 테이블에 등록된 함수를 호출한다.
- first_term은 2.89에서와 같이 term의 형태를 두 항 목록 표현에 대해서 일치시킨다.

# 2.91

```js
function div_terms(L1, L2) {
  if (is_empty_termlist(L1)) {
    return list(the_empty_termlist, the_empty_termlist);
  } else {
    const t1 = first_term(L1);
    const t2 = first_term(L2);
    if (order(t2) > order(t1)) {
      return list(the_empty_termlist, L1);
    } else {
      const new_c = div(coeff(t1), coeff(t2));
      const new_o = order(t1) - order(t2);
      const new_term = make_term(new_o, new_c);

      const rest_of_result = div_terms(
        sub_terms(mul_terms(list(new_term), t2), t1),
        L2
      );
      return list(new_term, rest_of_result);
    }
  }
}
```

# 2.92

- 변수들을 알파벳으로 제한한다.
- 알파벳 순서로, 순서를 매긴다.
- 위계 구조가 성립되었다.
- 각 변수들이 일치하는 상황을 가정하고 함수를 작성한다.

# 2.93

```js

```

# 2.94

```js

```

# 3.1

```js
function make_accumulator(balance) {
  return (number) => {
    balance = balance + number;
    return balance;
  };
}
```

# 3.2

```js
function make_monitored(f) {
  let count = 0;

  return (arg) => {
    if (arg === "how many calls") {
      count += 1;
      return count;
    } else if (arg === "reset count") {
      count = 0;
      return count;
    } else {
      return f(arg);
    }
  };
}
```

# 3.3

```js
function make_account(balance, password) {
  function validate_password(p) {
    return p === password;
  }

  function withdraw(amount, p) {
    if (balance >= amount) {
      balance = balance - amount;
      return balance;
    } else {
      return "Insufficient funds";
    }
  }

  function deposit(amount, p) {
    balance = balance + amount;
    return balance;
  }

  function dispatch(pw, m) {
    return !validate_passowrd(pw)
      ? () => "incorrect password"
      : m === "withdraw"
      ? withdraw
      : m === "deposit"
      ? deposit
      : error(m, "unkown request");
  }

  return dispatch;
}
```

# 3.4

```js
function make_account(balance, password) {
  let incorrect_trial = 0;

  function validate_password(p) {
    return p === password;
  }

  function have_to_call_cops() {
    return incorrect_trial >= 8;
  }

  function call_the_cops() {
    return "cops are coming";
  }

  function incorrect_password(pw) {
    incorrect_trial += 1;
    if (have_to_call_cops()) {
      call_the_cops();
    } else {
      return "incorrect_password";
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
    return !validate_password(pw)
      ? incorrect_password
      : m === "withdraw"
      ? withdraw
      : m === "deposit"
      ? deposit
      : error(m, "unkown request");
  }

  return dispatch;
}
```

# 3.5

```js
function rectangle_area(x1, x2, y1, y2) {
  return (x2 - x1) * (y2 - y1);
}

function estimate_integral(p, x1, x2, y1, y2, trials) {
  const guess = monte_carlo(
    trials,
    p(random_in_range(x1, x2), random_in_range(y1, y2))
  );

  return guess * rectangle_area(x1, x2, y1, y2);
}
```

# 3.6

```js
function make_rand() {
  let x = random_init;

  function reset(new_x) {
    x = new_x;
    return x;
  }

  function generate() {
    x = random_update(x);
    return x;
  }

  function dispatch(m) {
    return m === "reset"
      ? reset
      : m === "generate"
      ? generate
      : error(m, "invalid message");
  }

  return dispatch;
}
```
