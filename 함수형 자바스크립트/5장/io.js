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

// 예제 흐름 따라기기 위해서 작성. 작동하지 않음.
const changeToStartCase = IO.from(readDom("#student-name"))
  .map(_.startCase)
  .map(writeDom("#student-name"));
//   .map((val) => innerHTML = val)

// 1. readDom을 실행시키면 selector(#student-name) 내부에 담긴 innerHTML을 반환하는 함수.
// 2. _startCase: 내부에 담긴 innerHTML을 반환하는 함수를 실행시키고 얻은 값을 _.startCase 함수에 적용하고 이를 리턴하는 함수를 리턴.
// 3. writeDom: val을 인자로 받고, innerHTML을 변경하고 val을 변경하는 함수를 리턴함. 실행시키면 _.startCase를 담고 있는 함수가 실행되고 _.startCase가 적용된 값이 나온다.
// 그리고 이 값은 val을 인자로 받고 변경시키는 함수에 들어간다. 그리고 이 함수를 리턴하는 함수를 리턴한다! 아직 평가되지 않은 것이다. run 메소드를 실행시키면 평가된다.
