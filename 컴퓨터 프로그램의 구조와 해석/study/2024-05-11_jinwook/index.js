const {
  pair,
  head,
  display_stream,
  stream_map_2,
  stream_ref,
  stream_map,
  stream_tail,
  is_null,
} = require("../../lib/jinwook");

function add_streams(s1, s2) {
  return stream_map_2((x1, x2) => x1 + x2, s1, s2);
}

const ones = pair(1, () => ones);

function mul_streams(s1, s2) {
  return stream_map_2((x1, x2) => x1 * x2, s1, s2);
}

const integers = pair(1, () => add_streams(integers, ones));

const factorials = pair(1, () =>
  mul_streams(factorials, stream_tail(integers))
);

function partial_sums(s) {
  return pair(head(s), () =>
    stream_map((x) => x + head(s), partial_sums(stream_tail(s)))
  );
}

function expand(num, den, radix) {
  return pair(Math.floor((num * radix) / den), () =>
    expand((num * radix) % den, den, radix)
  );
}

function div_streams(s1, s2) {
  return stream_map_2((x1, x2) => x1 / x2, s1, s2);
}

function integrate_series(s) {
  return mul_streams(s, div_streams(ones, integers));
}

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

const sin_series = pair(0, () =>
  integrate_series(
    pair(1, () => integrate_series(stream_map((x) => -x, sin_series)))
  )
);

const cos_series = pair(1, () =>
  integrate_series(
    pair(0, () => stream_map((x) => -x, integrate_series(cos_series)))
  )
);
