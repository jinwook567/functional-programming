function is(typeRef, val) {
  return (
    val instanceof typeRef ||
    (val != null &&
      (val.constructor === typeRef || (typeRef.name === "Object" && typeof val === "object")))
  );
}

function checkType(type, val) {
  if (!is(type, val)) throw new TypeError("형식이 호환되지 않습니다.");
  return val;
}

function Tuple(...typeArgs) {
  function T(...valueArgs) {
    if (typeArgs.length !== valueArgs.length) {
      throw new TypeError("튜플 항수가 프로토타입과 일치하지 않음.");
    }

    if (valueArgs.some((val) => val === null || val === undefined)) {
      throw new ReferenceError("튜플은 null 또는 undefined를 가질 수 없습니다.");
    }

    valueArgs.forEach((val, index) => {
      this[`_${index + 1}`] = checkType(typeArgs[index], val);
    }, this);

    Object.freeze(this);
  }

  T.prototype.values = function () {
    return Object.keys(this).map((k) => this[k], this);
  };

  return T;
}

const StringPair = Tuple(String, String);
const name = new StringPair("Turing", "Iverson");
const values = name.values();

// 책에 있는 compose 함수형으로 리팩토링
function compose(...args) {
  return function (a) {
    // reverse 메소드는 원본 배열을 변경시킴. 따라서 배열을 복사해서 처리.
    return [...args].reverse().reduce((acc, f) => f(acc), a);
  };
}

// 합성 중간에 값 확인하기 위해서 사용됨.
const tap = (f, a) => (f(a), a);
const log = (a) => tap(console.log, a); // curry를 적용하면 더 개선할 수 있음.

const add30 = compose(
  (a) => a + 10,
  log,
  (a) => a + 20
);

console.log(add30(10));

function partial(f, ...args) {
  return function (...args2) {
    return f(...args, ...args2);
  };
}

const validLen = (param, str) => str.length === param;
const checkLenSsn = partial(validLen, 9);
const normalize = (str) => str.replace(/\-/g, "");
const trim = (str) => str.replace(/^\s*|\s*$/g, "");

console.log(checkLenSsn("12345678"));
console.log(checkLenSsn("123456789"));

const cleanInput = compose(normalize, trim);
const isValidSsn = compose(checkLenSsn, cleanInput);

console.log(isValidSsn("123-456-789"));
console.log(isValidSsn("123-456-7891"));

const identity = (a) => a;

const isNotValid = (a) => a === false || a === null || a === undefined;

const alt = (f1, f2) => (val) => !isNotValid(f1(val)) ? f1(val) : f2(val);

console.log(
  alt(
    (a) => a + 100,
    (a) => a + 10
  )(10)
);

console.log(
  alt(
    (a) => null,
    (a) => a + 10
  )(10)
);

const seq =
  (...fs) =>
  (val) => {
    fs.forEach((f) => f(val));
  };

seq(console.log, console.log)(10);

const fork = (join, f1, f2) => {
  return (val) => join(f1(val), f2(val));
};

console.log(
  fork(
    (a, b) => a + b,
    (a) => a + 10,
    (a) => a + 20
  )(30)
);
