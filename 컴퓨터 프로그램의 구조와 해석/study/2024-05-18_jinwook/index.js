const {
  pair,
  head,
  display_stream,
  stream_map_2,
  stream_ref,
  stream_map,
  stream_tail,
  is_null,
  memo,
  list,
} = require("../../lib/jinwook");

function add_streams(s1, s2) {
  return stream_map_2((x1, x2) => x1 + x2, s1, s2);
}

function mul_streams(s1, s2) {
  return stream_map_2((x1, x2) => x1 * x2, s1, s2);
}

const ones = pair(1, () => ones);

function scale_streams(s, n) {
  const scale_stream = pair(n, () => scale_stream);
  return mul_streams(s, scale_stream);
}

function mul_series(s1, s2) {
  return pair(head(s1) * head(s2), () =>
    add_streams(
      scale_streams(stream_tail(s2), head(s1)),
      mul_series(stream_tail(s1), s2)
    )
  );
}

function invert_unit_series(s) {
  return pair(1, () =>
    scale_streams(mul_series(stream_tail(s), invert_unit_series(s)), -1)
  );
}

function div_series(s1, s2) {
  if (head(s2) === 0) throw Error("denominator can not be zero");
  return pair(head(s1) / head(s2), () =>
    mul_series(stream_tail(s1), invert_unit_series(stream_tail(s2)))
  );
}

const tan_series = pair(0, () => div_series(sin_series, cos_series));

function stream_limit(s, tolerance) {
  const s1 = stream_tail(s);
  const h1 = pair(head(s1), () => h1);

  return pair(
    head(s),
    Math.abs(head(s) - head(s1)) < tolerance
      ? () => h1
      : () => stream_limit(s, tolerance)
  );
}

const two = pair(2, () => two);

const odds = pair(1, () => add_streams(odds, two));

function summands(n) {
  return pair(1 / n, () => stream_map((x) => -x, summands(n + 1)));
}

function partial_sums(s) {
  return pair(head(s), () =>
    stream_map((x) => x + head(s), partial_sums(stream_tail(s)))
  );
}

const square = (x) => x * x;

function euler_transform(s) {
  const s0 = stream_ref(s, 0);
  const s1 = stream_ref(s, 1);
  const s2 = stream_ref(s, 2);
  return pair(
    s2 - square(s2 - s1) / (s0 + -2 * s1 + s2),
    memo(() => euler_transform(stream_tail(s)))
  );
}

function make_tableau(transform, s) {
  return pair(s, () => make_tableau(transform, transform(s)));
}

function accelerated_sequence(transform, s) {
  return stream_map(head, make_tableau(transform, s));
}

const ln2_stream = partial_sums(summands(1));

const euler_ln2_stream = euler_transform(ln2_stream);

const accelerated_ln2_stream = accelerated_sequence(
  euler_transform,
  ln2_stream
);

function pairs(s1, s2) {
  return pair(
    stream_map((x) => list(head(s1), x), s2),
    () => pairs(stream_tail(s1), s2)
  );
}

const integers = pair(1, () => add_streams(integers, ones));
const first = stream_tail();

console.log(stream_ref(stream_tail(pairs(integers, integers), 0)));
