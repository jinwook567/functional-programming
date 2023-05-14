const identity = (val) => val;

const curry = (f) => {
  const curried = (...args) => {
    if (args.length >= f.length) return f(...args);
    return (...args2) => curried(...args, ...args2);
  };
  return curried;
};

const tap = curry((f, val) => (f(val), val));

const students = [
  { id: 1, name: "a" },
  { id: 2, name: "b" },
  { id: 3, name: "c" },
  { id: 4, name: "d" },
];

function is(typeRef, val) {
  return (
    val instanceof typeRef ||
    (val != null &&
      (val.constructor === typeRef || (typeRef.name === "Object" && typeof val === "object")))
  );
}

module.exports = {
  identity,
  curry,
  tap,
  students,
  is,
};
