# 2.2

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

function make_point(x, y) {
  return pair(x, y);
}

function x_point(point) {
  return head(point);
}

function y_point(point) {
  return tail(point);
}

function make_segment(start_segement, end_segement) {
  return pair(start_segement, end_segement);
}

function start_segement(segement) {
  return head(segement);
}

function end_segement(segement) {
  return tail(segement);
}

function midpoint_segement(segement) {
  const s = start_segement(segement);
  const e = end_segement(segement);

  return make_point(
    (x_point(s) + x_point(e)) / 2,
    (y_point(s) + y_point(s)) / 2
  );
}

function display(a) {
  console.log(a);
}

function print_point(p) {
  return display(`( ${x_point(p)} , ${y_point(p)} )`);
}
```

# 2.3

```js
function rectangle(origin, angle, width, height) {
  return pair(pair(origin, angle), pair(width, height));
}

function width(rec) {
  return head(tail(rec));
}

function height(rec) {
  return tail(tail(rec));
}

function origin(rec) {
  return head(head(rec));
}

function angle(rec) {
  return tail(head(rec));
}

function round(rec) {
  return width(rec) * 2 + height(rec) * 2;
}

function area(rec) {
  return width(rec) * height(rec);
}
```

# 2.4

```js
function pair(x, y) {
  return (m) => m(x, y);
}

function head(z) {
  return z((p, q) => p);
}

function tail(z) {
  return z((p, q) => q);
}
```

# 2.5

```js
function pair(a, b) {
  return 2 ** a * 3 ** b;
}

function divide_cnt(n, a) {
  return n % a !== 0 ? 0 : 1 + divide_cnt(n / a, a);
}

function head(p) {
  return divide_cnt(p, 2);
}

function tail(p) {
  return divide_cnt(p, 3);
}
```

# 2.6

# 2.7

```js
function make_interval(x, y) {
  return pair(x, y);
}

function upper_bound(interval) {
  return head(interval);
}

function lower_bound(interval) {
  return tail(interval);
}
```

# 2.8

```js
function abs(a) {
  return Math.abs(a);
}

function sub_interval(x, y) {
  return make_interval(
    abs(lower_bound(x) - upper_bound(y)),
    abs(upper_bound(x) - lower_bound(y))
  );
}
```
