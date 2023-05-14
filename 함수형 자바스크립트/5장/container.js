const { tap } = require("./utils.js");

class _Wrapper {
  constructor(val) {
    this.val = val;
  }

  map(f) {
    return f(this.val);
  }

  toString() {
    return `Wrapper ${this.val}`;
  }

  fmap(f) {
    return new _Wrapper(f(this.val));
  }
}

// 팩토리 함수
const wrap = (val) => new _Wrapper(val);

const logTap = tap(console.log);

const wrapped = wrap("Get Functional");

wrapped
  .fmap((a) => a + "Hi")
  .fmap((a) => a + "Hi")
  .fmap(logTap);

class Wrapper {
  constructor(val) {
    this.val = val;
  }

  static of(a) {
    return new Wrapper(a);
  }

  map(f) {
    return Wrapper.of(f(this.val));
  }

  join() {
    if (!(this.val instanceof Wrapper)) {
      return this;
    }
    return this.val.join();
  }

  get() {
    return this.val;
  }
}

Wrapper.of(5)
  .map((a) => a + 10)
  .map((a) => a + 10)
  .map((a) => Wrapper.of(a))
  .map((a) => Wrapper.of(a))
  .join()
  .map(logTap);

// 모나드
class Empty {
  map(_) {
    return this;
  }

  fmap(_) {
    return new Empty();
  }

  toString() {
    return "Empty ()";
  }
}

const empty = () => new Empty();

const isEven = (n) => n % 2 === 0;
const half = (val) => (isEven(val) ? wrap(val / 2) : empty());

half(3).map(logTap); // Empty
half(2).map(logTap);
