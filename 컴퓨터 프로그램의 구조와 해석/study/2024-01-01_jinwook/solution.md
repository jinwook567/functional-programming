# 2.53

- `["a", "b", "c", null]`
- `[["george", null], null]`
- `["x2", null]`
- null
- `["red", "shoes", "blue", "socks"]`

# 2.54

```js
function equal(a, b) {
  return is_pair(a) && is_pair(b)
    ? head(a) === head(b) && equal(tail(a), tail(b))
    : a === b;
}
```

# 2.55

- true와 false가 나올 수 있다.
- 큰 따옴표가 되거나, 빈 문자열이 될 수 있다. 만일 둘다 큰 따옴표 혹은 빈 문자열이라면, ture 아니라면 false이다.
