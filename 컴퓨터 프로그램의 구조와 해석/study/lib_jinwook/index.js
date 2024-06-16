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

function is_null(list) {
  return list === null;
}

function append(list1, list2) {
  return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}

function map(f, items) {
  return is_null(items)
    ? null
    : append(list(f(head(items))), map(f, tail(items)));
}

function is_pair(tree) {
  return (
    !is_null(tree) &&
    typeof tree === "object" &&
    tree[0] !== undefined &&
    tree[1] !== undefined
  );
}

function reverse(items) {
  return is_null(items)
    ? null
    : append(reverse(tail(items)), list(head(items)));
}

function deep_reverse(items) {
  return is_null(items)
    ? null
    : !is_pair(items)
    ? items
    : append(deep_reverse(tail(items)), pair(deep_reverse(head(items)), null));
}

function display(tree) {
  function stringify(tree) {
    return is_null(tree)
      ? "null"
      : is_pair(tree)
      ? `(${stringify(head(tree))}, ${stringify(tail(tree))})`
      : `${tree}`;
  }
  console.log(stringify(tree));
}

function tree_map(f, items) {
  return is_null(items)
    ? null
    : !is_pair(items)
    ? f(items)
    : pair(tree_map(f, head(items)), tree_map(f, tail(items)));
}

function filter(predicate, sequence) {
  return is_null(sequence)
    ? null
    : predicate(head(sequence))
    ? pair(head(sequence), filter(predicate, tail(sequence)))
    : filter(predicate, tail(sequence));
}

function accumulate(op, initial, sequence) {
  return is_null(sequence)
    ? initial
    : op(head(sequence), accumulate(op, initial, tail(sequence)));
}

function enumerate_interval(low, high) {
  return low > high ? null : pair(low, enumerate_interval(low + 1, high));
}

function enumerate_tree(tree) {
  return is_null(tree)
    ? null
    : !is_pair(tree)
    ? list(tree)
    : append(enumerate_tree(head(tree)), enumerate_tree(tail(tree)));
}

function every(predicate, items) {
  return is_null(items)
    ? true
    : predicate(head(items))
    ? every(predicate, tail(items))
    : false;
}

function flatmap(f, items) {
  return accumulate(append, null, map(f, items));
}

function length(items) {
  return accumulate((sum) => sum + 1, 0, items);
}

function make_table() {
  let table = list();

  function set_table(new_table) {
    table = new_table;
  }

  function equal(a, b) {
    return is_pair(a) && is_pair(b)
      ? equal(head(a), head(b)) && equal(tail(a), tail(b))
      : a === b;
  }

  function match(operator, type, t) {
    return is_null(t)
      ? undefined
      : equal(operator, head(head(t))) && equal(type, head(tail(head(t))))
      ? head(t)
      : match(operator, type, tail(t));
  }

  function put(operator, type, f) {
    set_table(pair(list(operator, type, f)), table);
  }

  function get(operator, type) {
    const item = match(operator, type, match);
    return item ? head(tail(tail(item))) : undefined;
  }

  function dispatch(m) {
    return m === "get"
      ? get
      : m === "put"
      ? put
      : new Error(m, "invalid message");
  }

  return dispatch;
}

function member(item, x) {
  return is_null(x) ? null : item === head(x) ? x : member(item, tail(x));
}

function stream_tail(s) {
  return tail(s)();
}

function stream_ref(s, n) {
  return n === 0 ? head(s) : stream_ref(stream_tail(s), n - 1);
}

function stream_map(f, s) {
  return is_null(s)
    ? null
    : pair(f(head(s)), () => stream_map(f, stream_tail(s)));
}

function stream_for_each(f, s) {
  if (is_null(s)) {
    return true;
  } else {
    f(head(s));
    return stream_for_each(f, stream_tail(s));
  }
}

function display_stream(s) {
  return stream_for_each(display, s);
}

function take(s, n) {
  return is_null(s) || n === 0
    ? null
    : pair(head(s), take(stream_tail(s), n - 1));
}

function display_n(s, n) {
  return display(take(s, n));
}

function stream_filter(pred, stream) {
  return is_null(stream)
    ? null
    : pred(head(stream))
    ? pair(head(stream), () => stream_filter(pred, stream_tail(stream)))
    : stream_filter(pred, stream_tail(stream));
}

function stream_enumerate_interval(low, high) {
  return low > high
    ? null
    : pair(low, () => stream_enumerate_interval(low + 1, high));
}

function memo(f) {
  let already_run = false;
  let result = undefined;

  return () => {
    if (!already_run) {
      result = f();
      already_run = true;
      return result;
    } else {
      return result;
    }
  };
}

function stream_map_2(f, s1, s2) {
  return pair(f(head(s1), head(s2)), () =>
    stream_map_2(f, stream_tail(s1), stream_tail(s2))
  );
}

function interleave(s1, s2) {
  return is_null(s1)
    ? s2
    : pair(head(s1), () => interleave(s2, stream_tail(s1)));
}

function pairs(s, t) {
  return pair(list(head(s), head(t)), () =>
    interleave(
      stream_map((x) => list(head(s), x), stream_tail(t)),
      pairs(stream_tail(s), stream_tail(t))
    )
  );
}

module.exports = {
  pair,
  head,
  tail,
  list,
  is_null,
  append,
  map,
  is_pair,
  reverse,
  deep_reverse,
  display,
  tree_map,
  filter,
  accumulate,
  enumerate_tree,
  enumerate_interval,
  every,
  flatmap,
  length,
  member,
  stream_tail,
  stream_ref,
  stream_map_2,
  stream_map,
  stream_for_each,
  stream_filter,
  stream_enumerate_interval,
  display_stream,
  memo,
  interleave,
  take,
  pairs,
  display_n,
};
