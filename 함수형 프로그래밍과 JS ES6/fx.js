const log = console.log;

const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const reduce = curry((f, acc, iter) => {
  const iterator = iter ? iter[Symbol.iterator]() : acc[Symbol.iterator]();
  if (!iter) {
    acc = iterator.next().value;
  }

  return (function recur(acc) {
    while (true) {
      const { value, done } = iterator.next();
      if (done) break;

      acc = go1(acc, (acc) => go1(value, (value) => f(acc, value)));
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  })(acc);
});

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
  const iterator = iter[Symbol.iterator]();

  return (function recur(res) {
    while (true) {
      const { done, value } = iterator.next();
      if (done || res.length === l) break;

      if (value instanceof Promise) return value.then((val) => recur((res.push(val), res)));
      res.push(value);
    }

    return res;
  })(res);
});

const L = {};

L.range = function* (l) {
  for (let i = 0; i < l; i++) {
    yield i;
  }
};

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield go1(a, f);
  }
});

const nop = Symbol("nop");

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    const b = go1(a, f);
    if (b instanceof Promise) yield b.then((b) => (b ? a : Promise.reject(nop)));
    else if (b) yield a;
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
  [Promise.resolve(2), Promise.resolve(10), 1],
  L.filter((a) => a < 10),
  take(3),
  log
  // filter((a) => a < 10),
  // take(2),
  // log
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
