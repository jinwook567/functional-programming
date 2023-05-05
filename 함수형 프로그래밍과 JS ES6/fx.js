const log = console.log;

const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = acc instanceof Promise ? acc.then((acc) => f(acc, a)) : f(acc, a);
  }
  return acc;
});

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const go = (a, ...fs) => {
  return reduce((acc, f) => f(acc), a, fs);
};

const pipe = (f, ...fs) => {
  return (...args) => go(f(...args), ...fs);
};

const range = (l) => {
  const res = [];
  for (let i = 0; i < l; i++) {
    res.push(i);
  }
  return res;
};

const take = curry((l, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) break;
  }
  return res;
});

const L = {};

L.range = function* (l) {
  for (let i = 0; i < l; i++) {
    yield i;
  }
};

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield f(a);
  }
});

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

L.entries = function* (obj) {
  for (const key in obj) yield [key, obj[key]];
};

L.take = curry(function* (l, iter) {
  let i = 0;
  for (const a of iter) {
    if (i === l - 1) break;
    yield a;
    i++;
  }
});

const join = (sep = ",", iter) => {
  return reduce((acc, a) => `${acc}${sep}${a}`, iter);
};

const find = (f, iter) => {
  return go(iter, L.filter(f), take(1), ([a]) => a);
};

const takeAll = take(Infinity);

const map = curry(pipe(L.map, takeAll));

const filter = curry(pipe(L.filter, takeAll));

L.flattern = function* (iter) {
  for (const a of iter) {
    if (a && a[Symbol.iterator]) for (const b of a) yield b;
    else yield a;
  }
};

L.deepFlat = function* recur(iter) {
  for (const a of iter) {
    if (a && a[Symbol.iterator]) for (const b of recur(a)) yield b;
    else yield a;
  }
};

L.flatMap = curry(pipe(L.map, L.flattern));

const flattern = pipe(L.flattern, takeAll);

const deepFlat = pipe(L.deepFlat, takeAll);

const flatMap = pipe(L.map, flattern);

go(
  1,
  (a) => a + 10,
  (a) => Promise.resolve(a + 10),
  log
);

module.exports = {
  map,
  filter,
  reduce,
  log,
  go,
  pipe,
  curry,
  range,
  L,
  take,
  join,
  find,
  takeAll,
  flattern,
  deepFlat,
  flatMap,
};
