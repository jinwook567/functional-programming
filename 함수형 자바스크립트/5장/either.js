const { curry, students } = require("./utils.js");

class Either {
  constructor(val) {
    this.val = val;
  }

  get value() {
    return this.val;
  }

  static left(a) {
    return new Left(a);
  }

  static right(a) {
    return new Right(a);
  }

  static fromNullable(val) {
    return val !== null && val !== undefined ? Either.right(val) : Either.left(val);
  }

  static of(a) {
    return Either.right(a);
  }
}

class Left extends Either {
  map(f) {
    return this;
  }

  get value() {
    throw new TypeError("Left(a) 값을 가져올 수 없습니다.");
  }

  getOrElse(other) {
    return other;
  }

  orElse(f) {
    return f(this.val);
  }

  chain(f) {
    return this;
  }

  getOrElseThrow(a) {
    throw new Error(a);
  }

  filter(f) {
    return this;
  }
}

class Right extends Either {
  map(f) {
    return Either.of(f(this.val));
  }

  getOrElse(other) {
    return this.val;
  }

  orElse() {
    return this;
  }

  chain(f) {
    return f(this.val);
  }

  getOrElseThrow(a) {
    return this.val;
  }

  filter(f) {
    return Either.fromNullable(f(this.val) ? this.val : null);
  }
}

const find = (db, id) => db.find((obj) => obj.id === id);

// from nullable로 추상화 할 수 있음.
const safeFindObject = curry((db, id) => {
  const obj = find(db, id);
  if (obj) {
    return Either.of(obj);
  }
  return Either.left(`${id}인 객체를 찾을 수 없습니다.`);
});

const safeFindStudent = safeFindObject(students);

const result = safeFindStudent(6).orElse(() => ({ id: 6, name: "6" }));
// orElse는 함수를 실행. getOrElse는 단순히 어떤 값을 리턴.
console.log(result);

function decode(url) {
  try {
    const res = decodeURIComponent(url);
    return Either.of(res);
  } catch (e) {
    return Either.left(e);
  }
}

const parse = (url) => url;

decode(" % ")
  .map(parse)
  .map(console.log)
  .orElse(() => console.error("error"));

decode("http%3A%2Feexample.com").map(parse).map(console.log);
