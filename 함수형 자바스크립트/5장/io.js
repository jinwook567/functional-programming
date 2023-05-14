const { is, curry } = require("./utils.js");

class IO {
  constructor(effect) {
    if (!is(Function, effect)) {
      throw new Error("IO 모나드는 함수가 필수입니다.");
    }
    this.effect = effect;
  }

  static of(a) {
    return new IO(() => a); //값을 함수 형태로 전달.
  }

  static from(f) {
    return new IO(f);
  }

  map(f) {
    const self = this;
    return new IO(() => f(self.effect()));
  }

  chain(f) {
    return f(this.effect());
  }

  run() {
    return this.effect();
  }
}

const someObj = { a: 1, b: 2, c: 3 };

const read = curry((a, selector) => selector(a));
const write = curry((a, f) => f(a));

const readObj = read(someObj);
const writeObj = write(someObj);

const ioF = IO.of(readObj((obj) => obj.a)).map((num) => num + 1);

const addProperty = IO.of(readObj((obj) => obj)).map(() =>
  writeObj((obj) => ((obj["c"] = 5), obj))
);

console.log(addProperty.run());
