// 제어 흐름 관련 예제
const arr = [1, 10, 2, 9, 3, 8];

function f_imperative(arr) {
  const under_5 = []; //f 함수에서는 없는 자료구조

  // f 함수에서는 루프를 순회하는 로직은 filter에 위임
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 5) under_5.push(arr[i]);
  }

  let sum = 0; //f 함수에서는 없는 자료구조

  // 루프를 순회하며 더하는 로직을 reduce 메소드에 위임
  for (let i = 0; i < under_5.length; i++) {
    sum += under_5[i] * under_5[i];
  }

  return sum;
}

// 각각의 블랙박스 연산들이 연결된 형태. 명령형 코드에서 필요했던 자료구조가 함수형에서는 필요하지 않았음.
// 추상화 수준이 매우 높은 코드로 쉽게 알아볼 수 있음.
function f(arr) {
  return arr
    .filter((a) => a < 10)
    .map((a) => a * a)
    .reduce((acc, a) => acc + a, 0);
}

function sum(acc, arr) {
  if (arr.length === 0) return acc;
  const [a, ...rest] = arr;
  // 꼬리 재귀 호출을 이용하여 성능 최적화.
  return sum(acc + a, rest);
}

console.log(sum(0, [1, 2, 3, 4, 5]));

// 재귀를 이용한 전위 순회 알고리즘
class Person {
  constructor(name) {
    this.name = name;
    this.children = [];
    this.parent = null;
  }

  add(child) {
    child.parent = this;
    this.children.push(child);
  }
}

const church = new Person("church");
const turing = new Person("turing");
const rosser = new Person("rosser");
const mendelson = new Person("mendelson");
const sacks = new Person("sacks");

church.add(turing);
church.add(rosser);
rosser.add(mendelson);
rosser.add(sacks);

const tree = { root: church };

function preorder(node, printer) {
  printer(node);
  node.children.forEach((child) => preorder(child, printer));
}

preorder(tree.root, (node) => console.log(node.name));
