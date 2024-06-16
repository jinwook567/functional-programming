const {
  pair,
  head,
  tail,
  display_stream,
  interleave,
  stream_map_2,
  stream_ref,
  stream_map,
  stream_tail,
  is_null,
  memo,
  list,
  take,
  pairs,
  display,
  append,
  stream_filter,
} = require("../../lib/jinwook");

function add_streams(s1, s2) {
  return stream_map_2((x1, x2) => x1 + x2, s1, s2);
}

const ones = pair(1, () => ones);
const twos = pair(2, () => twos);
const integers = pair(1, () => add_streams(integers, ones));

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

const pyStream = stream_filter(
  (list) =>
    isPythagoreanTriple(head(list), head(tail(list)), head(tail(tail(list)))),
  triples(integers, integers, integers)
);

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

function weighted_pairs(s1, s2, weight) {
  return pair(list(head(s1), head(s2)), () =>
    merge_weighted(
      stream_map((x) => list(head(s1), x), stream_tail(s2)),
      weighted_pairs(stream_tail(s1), stream_tail(s2), weight),
      apply(weight)
    )
  );
}

function display_n(s, n) {
  return display(take(s, n));
}

// 70.a
// display_n(
//   weighted_pairs(integers, integers, (i, j) => i + j),
//   10
// );

// 70.b
// display_n(
//   weighted_pairs(
//     stream_filter((x) => x % 2 !== 0 && x % 3 !== 0 && x % 5 !== 0, integers),
//     stream_filter((x) => x % 2 !== 0 && x % 3 !== 0 && x % 5 !== 0, integers),
//     (i, j) => 2 * i + 3 * j + 5 * i * j
//   ),
//   20
// );

const ramanujan_weight = (i, j) => i ** 3 + j ** 3;

function make_ramanujans() {
  const ramanujans = stream_map(
    apply((i, j) => ({
      weight: ramanujan_weight(i, j),
      pair: pair(i, j),
    })),
    weighted_pairs(integers, integers, ramanujan_weight)
  );

  return stream_filter(
    apply((i, j) => i === j),
    merge(ramanujans, stream_tail(ramanujans), (i, j) => i + j)
  );
}

// const ramanujans = stream_map(
//   apply(ramanujan_weight),
//   weighted_pairs(integers, integers, ramanujan_weight)
// );

const ramanujans = stream_map(
  apply((i, j) => list(i, j, ramanujan_weight(i, j))),
  weighted_pairs(integers, integers, ramanujan_weight)
);

const ru = weighted_pairs(integers, integers, ramanujan_weight);

display_n(ramanujans, 70);

// display_n(ramanujans, 70);

// display_n(ramanujans, 70);
// display_n(stream_tail(ramanujans), 10);

// display_n(merge(ramanujans, stream_tail(ramanujans)), 70);

// display_n(make_ramanujans(), 1);

function merge(s1, s2) {
  return pair(list(head(s1), head(s2)), () =>
    merge(stream_tail(s1), stream_tail(s2))
  );
}
