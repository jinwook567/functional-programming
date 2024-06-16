# 3.68

# 3.69

```js
function triples(s, t, u) {
  return pair(list(head(s), head(t), head(u)), () =>
    interleave(
      stream_map(
        (tu) => append(list(head(s)), tu),
        pairs(stream_tail(t), stream_tail(u))
      ),
      triples(stream_tail(s), stream_tail(t), stream_tail(u))
    )
  );
}

const isPythagoreanTriple = (a, b, c) => a * a + b * b === c * c;

const pythagoreanTripleStream = stream_filter(
  (list) =>
    isPythagoreanTriple(head(list), head(tail(list)), head(tail(tail(list)))),
  triples(integers, integers, integers)
);
```

# 3.70

```js
function merge_weighted(s1, s2, weight) {
  return is_null(s1)
    ? s2
    : is_null(s2)
    ? s1
    : weight(head(s1)) < weight(head(s2))
    ? pair(head(s1), () => merge_weighted(stream_tail(s1), s2, weight))
    : weight(head(s1)) > weight(head(s2))
    ? pair(head(s2), () => merge_weighted(s1, stream_tail(s2), weight))
    : pair(head(s1), () =>
        merge_weighted(stream_tail(s1), stream_tail(s2), weight)
      );
}

function vec(list) {
  return is_null(list) ? [] : [head(list), ...vec(tail(list))];
}

function apply(f) {
  return (args) => f(...vec(args));
}

function weighted_pairs(pairs1, pairs2, weight) {
  return merge_weighted(pairs1, pairs2, apply(weight));
}

function display_n(s, n) {
  return display(take(s, n));
}

const integer_pairs = pairs(integers, integers);
```

## a

```js
const answer = weighted_pairs(integer_pairs, integer_pairs, (i, j) => i + j);
```

## b

```js
const pred = (x) => x % 2 !== 0 && x % 3 !== 0 && x % 5 !== 0;
const pred_pair = (x, y) => pred(x) && pred(y);
const my_integers = stream_filter(apply(pred_pair), integer_pairs);

const answer = weighted_pairs(
  my_integers,
  my_integers,
  (i, j) => 2 * i + 3 * j + 5 * i * j
);
```

# 3.71
