const {
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
  takeAll,
  join,
  find,
  flattern,
  deepFlat,
  C,
} = require("./fx");

const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

const sum = (a, b) => a + b;

// log(
//   reduce(
//     sum,
//     filter(
//       (price) => price > 15000,
//       map(({ price }) => price, products)
//     )
//   )
// );

// log(
//   go(
//     3,
//     (a) => a + 10,
//     (a) => a + 20
//   )
// );

const add30 = pipe(
  (a) => a + 10,
  (a) => a + 20
);

const c_sum = curry(sum);
const add1 = c_sum(1);

// curry 적용하여 무인수 스타일 코딩
// log(
//   go(
//     products,
//     map(({ price }) => price),
//     filter((price) => price > 15000),
//     reduce(sum)
//   )
// );

const total_price = pipe(
  map(({ price }) => price),
  reduce(sum)
);

// go(
//   range(10),
//   map((a) => a + 1),
//   filter((a) => a < 5),
//   log
// );

// go(
//   L.range(10),
//   L.filter((a) => a < 5),
//   L.map((a) => a + 10),
//   take(2),
//   log
// );

// log(find(({ price }) => price > 15000, products));

const arr = [1, 2, 3, [1, 2, 3, [1, 2, 3, 4, 5]]];

// go([1, 2, 3, [1, 2, 3, [1, 2, 3, 4, 5]]], L.deepFlat, take(Infinity), log);

// log(deepFlat([1, 2, 3, [1, 2, 3, [1, 2, 3, 4, 5]]]));

// go(
//   arr,
//   L.flatMap((a) => a),
//   take(1000),
//   log
// );

const go1 = (f, a) => (a instanceof Promise ? a.then(f) : f(a));

const delay100 = (a) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log("im starated");
      resolve(a);
    }, 2000)
  );

// go1((a) => a + 10, delay100(10)).then(log);

const users = [
  { id: 1, name: "a" },
  { id: 2, name: "aa" },
  { id: 3, name: "aaa" },
  { id: 4, name: "aaaa" },
];

const f = ({ name }) => name;
const getUserById = (id) => find((user) => user.id === id, users);

const g = getUserById;

// go(
//   [delay100(1), delay100(1), delay100(10)],
//   L.filter((a) => a < 10),
//   log
// );

// go(
//   [1, 2, 3, 4, 5, 6, 7],
//   L.map((a) => {
//     log(a);
//     return new Promise((resolve) => setTimeout(resolve(a), 3000));
//   }),
//   L.filter((a) => {
//     log(a);
//     return a < 10;
//   }),
//   takeAll
// );

// go(
//   [1, 2, 3, 4, 5, 6, 7, 8],
//   L.map((a) => {
//     log(a);
//     return new Promise((resolve) => setTimeout(() => resolve(a * a), 1000));
//   }),
//   L.filter((a) => {
//     log(a);
//     return new Promise((resolve) => setTimeout(() => resolve(a % 2), 1000));
//   }),
//   take(2),
//   reduce(sum),
//   log
// );

// go(
//   [1, 2, 3, 4, 5, 6, 7, 8],
//   L.map((a) => {
//     log(a);
//     return new Promise((resolve) => setTimeout(() => resolve(a * a), 1000));
//   }),
//   L.filter((a) => {
//     log(a);
//     return new Promise((resolve) => setTimeout(() => resolve(a % 2), 1000));
//   }),
//   C.take(2),
//   reduce(sum),
//   log
// );

// 동기, 비동기 에러 핸들링 시 파이프라인의 이점
// 함수의 안전한 합성.
function sync(list) {
  try {
    return go(
      list,
      map((a) => JSON.parse(a)),
      filter((a) => a < 10),
      take(2),
      log
    );
  } catch (e) {
    log("catch error..");
    log(e);
  }
}

// sync(["1", "10", "2", "3", "{"]);

// go 함수가 Promise reject을 반환하기에, try catch문으로 안전하게 에러 핸들링을 할 수 있음.
async function async(list) {
  try {
    return await go(
      list,
      map((a) => JSON.parse(a)),
      filter((a) => a < 10),
      take(2),
      log
    );
  } catch (e) {
    log(e);
    return [];
  }
}

// async(["1", "10", "2", "3", "{"]).then(log).catch(log);
