const { curry, students } = require("./utils.js");

class Maybe {
  static just(a) {
    return new Just(a);
  }

  static nothing() {
    return new Nothing();
  }

  static fromNullable(a) {
    return a === null ? Maybe.nothing() : Maybe.just(a);
  }

  static of(a) {
    return Maybe.just(a);
  }

  get isNothing() {
    return false;
  }

  get isJust() {
    return false;
  }
}

class Just extends Maybe {
  constructor(val) {
    super();
    this.val = val;
  }

  get value() {
    return this.val;
  }

  map(f) {
    return Maybe.fromNullable(f(this.val));
  }

  getOrElse() {
    return this.val;
  }

  filter(f) {
    Maybe.fromNullable(f(this.val) ? this.val : null);
  }

  chain(f) {
    return f(this.val);
  }
}

class Nothing {
  map(f) {
    return this;
  }

  get value() {
    throw new TypeError("nothing은 값을 가져올 수 없습니다.");
  }

  getOrElse(other) {
    return other;
  }

  filter(f) {
    return this;
  }

  chain(f) {
    return this;
  }
}

const find = (db, id) => db.find((a) => a.id === id) || null;
const lift = curry((f, val) => Maybe.fromNullable(val).map(f));

const safeFindObject = curry((db, id) => Maybe.fromNullable(find(db, id)));
// const safeFindObject_lift = pipe(findObject, lift(() => '어떤 함수..'))

const safeFindStudent = safeFindObject(students);

const name_exist = safeFindStudent(4)
  .map((student) => student.name)
  .map((name) => name + "HI").value;

const name_nothing = safeFindStudent(5)
  .map((student) => student.name)
  .map((name) => name + "HI");

const name = safeFindStudent(5)
  .map((student) => student.name)
  .map((name) => name + "HI")
  .getOrElse("존재하지 않는 학생입니다.");
