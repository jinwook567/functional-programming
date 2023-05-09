// 고계 함수 관련 예시
const people = [{ address: { country: "US" } }];

function printPeople_imperative(people) {
  for (let i = 0; i < people.length; i++) {
    if (people[i].address.country === "US") console.log(people);
  }
}

// 아래의 함수는 selector와 printer를 함수로 받는 함수이다.
// selector와 printer를 함수로 받음으로써 함수의 범용성과 재사용도가 훨씬 높아지게 된다.
function printPeople(people, selector, printer) {
  people.forEach((person) => {
    if (selector(person)) printer(person);
  });
}
printPeople(
  people,
  (people) => people.address.country === "US",
  (people) => console.log(people)
);

//무인수 스타일 코드로 개선도 가능하다.
// curry를 이용하면 무인수 스타일의 코딩에 더 도움이 된다.
const inUs = (people) => people.address.country === "US";
const log = console.log;

printPeople(people, inUs, log);

const arr = [1, 2, 3, 4, 5];

arr.forEach((a) => {
  var k = a;
});

console.log(k);
// k는 없다. 함수 스코프의 장점.

for (let i = 0; i < arr.length; i++) {
  var k = arr[i];
}

console.log(k);
// k는 있다.

// 모듈 패턴
var MyMoudle = (function myModule(exportedVar) {
  let _privateVar = "";

  exportedVar.method = function () {};

  return exportedVar;
})(MyMoudle || {});
