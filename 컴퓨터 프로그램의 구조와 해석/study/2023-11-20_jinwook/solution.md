# 2.17

```js
function pair(a, b) {
  return [a, b];
}

function head(pair) {
  return pair[0];
}

function tail(pair) {
  return pair[1];
}

function list(...args) {
  return args.length === 0 ? null : pair(args[0], list(...args.slice(1)));
}

function last_pair(l) {
  return tail(l) === null ? list(head(l)) : last_pair(tail(l));
}
```

# 2.18

```js
function reverse(l) {
  return is_null(l) ? l : append(reverse(tail(l)), list(head(l)));
}
```

# 2.19

```js
function no_more(l) {
  return is_null(l);
}

function except_first_denomination(l) {
  return tail(l);
}

function first_denomination(l) {
  return head(l);
}

function cc(amount, coin_values) {
  return amount === 0
    ? 1
    : amount < 0 || no_more(coin_values)
    ? 0
    : cc(amount, except_first_denomination(coin_values)) +
      cc(amount - first_denomination(coin_values), coin_values);
}

const us_coins = list(1, 5, 10, 25, 50);
console.log(cc(100, us_coins));
```

- 목록의 요소의 순서가 달라져도 cc가 산출하는 답은 동일하다.
- 순서가 변경되어도 결국에 cc 함수가 호출될 떄 삽입되는 인수는 동일하다.

# 2.20

```js
function plus_curried(x) {
  return (y) => x + y;
}

function brooks(curried_f, l) {
  return is_null(l) ? curried_f : brooks(curried_f(head(l)), tail(l));
}

function brooks_curried(l) {
  const f = head(l);
  const next_list = tail(l);

  return is_null(next_list)
    ? f
    : brooks_curried(append(list(f(head(next_list))), tail(next_list)));
}

console.log(brooks_curried(list(brooks_curried, list(plus_curried, 3, 4))));
console.log(
  brooks_curried(
    list(brooks_curried, list(brooks_curried, list(plus_curried, 3, 4)))
  )
);
```

- 위 2개의 함수 표현식을 평가한 결과는 둘다 7이 나온다.

# 2.21

```js
function square_list(items) {
  return is_null(items)
    ? null
    : pair(square(head(items)), square_list(tail(items)));
}

function square_list(items) {
  return map(square, items);
}
```

# 2.22

```js
function square_list(items) {
  function iter(things, answer) {
    return is_null(things)
      ? answer
      : iter(tail(things), pair(square(head(things)), answer));
  }

  return iter(items, null);
}
```

- head를 꺼내서 함수를 적용해서 pair를 적용한다.
- 그리고 tail을 다음 iter의 인자로 넘긴다.
- 그 다음 tail의 head를 꺼내서 pair에 적용한다.
- 이렇게 되면 이전에 적용된 인자에 다시 pair를 적용하는 것이기에 순서가 역순이 된다.

```js
function square_list(items) {
  function iter(things, answer) {
    return is_null(things)
      ? answer
      : iter(tail(things), pair(answer, square(head(things))));
  }

  return iter(items, null);
}
```

- answer는 pair가 누적된 것이다.
- 위 책에서 순차열을 표현할 때와 반대로 된다.
- 위의 list를 순회하기 위해서는 tail이 아닌 head를 반복해서 사용하는 형태가 되어야한다.

# 2.23

```js
function for_each(f, items) {
  return is_null(items) ? true : (f(head(items)), for_each(f, tail(items)));
}

for_each((x) => console.log(x), list(1, 2, 3, 4));
```
