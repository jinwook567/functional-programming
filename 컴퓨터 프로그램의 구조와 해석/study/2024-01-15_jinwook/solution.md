# 2.66

```js
function lookup(given_key, set_of_records) {
  return is_null(set_of_records)
    ? false
    : given_key === key(head(set_of_records))
    ? head(set_of_records)
    : given_key < key(head(set_of_records))
    ? lookup(given_key, left(set_of_records))
    : lookup(given_key, right(set_of_records));
}
```

# 2.67

```js
function make_leaf(symbol, weight) {
  return list("leaf", symbol, weight);
}

function is_leaf(object) {
  return head(object) === "leaf";
}

function symbol_leaf(x) {
  return head(tail(x));
}

function weight_leaf(x) {
  return head(tail(tail(x)));
}

function make_code_tree(left, right) {
  return list(
    "code_tree",
    left,
    right,
    append(symbols(left), symbols(right)),
    weight(left) + weight(right)
  );
}

function left_branch(tree) {
  return head(tail(tree));
}

function right_branch(tree) {
  return head(tail(tail(tree)));
}

function symbols(tree) {
  return is_leaf(tree) ? list(symbol_leaf(tree)) : head(tail(tail(tail(tree))));
}

function weight(tree) {
  return is_leaf(tree) ? weight_leaf(tree) : head(tail(tail(tail(tail(tree)))));
}

function decode(bits, tree) {
  function decode_1(bits, current_branch) {
    if (is_null(bits)) {
      return null;
    } else {
      const next_branch = choose_branch(head(bits), current_branch);
      return is_leaf(next_branch)
        ? pair(symbol_leaf(next_branch), decode_1(tail(bits), tree))
        : decode_1(tail(bits), next_branch);
    }
  }

  return decode_1(bits, tree);
}

function choose_branch(bit, branch) {
  return bit === 0
    ? left_branch(branch)
    : bit === 1
    ? right_branch(branch)
    : new Error(`${bit}, bad bit --choose_branch`);
}

function adjoin_set(x, set) {
  return is_null(set)
    ? list(x)
    : x < head(set)
    ? pair(x, set)
    : pair(head(set), adjoin_set(x, tail(set)));
}

function make_leaf_set(pairs) {
  if (is_null(pairs)) {
    return null;
  } else {
    const first_pair = head(pairs);
    return adjoin_set(
      make_leaf(head(first_pair), head(tail(first_pair))),
      make_leaf_set(tail(pairs))
    );
  }
}

const sample_tree = make_code_tree(
  make_leaf("A", 4),
  make_code_tree(
    make_leaf("B", 2),
    make_code_tree(make_leaf("D", 1), make_leaf("C", 1))
  )
);

const sample_message = list(0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0);

display(decode(sample_message, sample_tree));
// (A, (D, (A, (B, (B, (C, (A, null)))))))
```

# 2.68

```js
function hasSymbol(symbol, tree) {
  return is_leaf(tree)
    ? symbol_leaf(tree) === symbol
    : hasSymbol(symbol, left_branch(tree)) ||
        hasSymbol(symbol, right_branch(tree));
}

function encode_symbol(symbol, tree) {
  return is_null(tree)
    ? null
    : hasSymbol(symbol, left_branch(tree))
    ? pair(1, encode_1(symbol, left_branch(tree)))
    : hasSymbol(symbol, right_branch(tree))
    ? pair(0, encode_1(symbol, right_branch(tree)))
    : throw error("invalid symbol");
}
```

# 2.69

```js
function successive_merge(leaves) {
  return length(leaves) === 1
    ? head(leaves)
    : successive_merge(
        adjoin_set(
          make_code_tree(head(leaves), head(tail(leaves))),
          tail(tail(leaves))
        )
      );
}
```

- leaves와 tree의 weight가 다형적으로 작동한다..
- 가장 작은 weight를 가진 2개를 뽑아서 트리를 만든다..
- 트리와 노드가 합쳐져서 마지막에 하나의 트리가 완성된다.

# 2.70

```js
const pairs = list(
  list("A", 2),
  list("GET", 2),
  list("NA", 16),
  list("YIP", 9),
  list("BOOM", 1),
  list("JOB", 2),
  list("SHA", 3),
  list("WAH", 1)
);

function generate_huffman_tree(pairs) {
  return successive_merge(make_leaf_set(pairs));
}

display(encode(list("Get", "a", "job"), generate_huffman_tree(pairs)));
```

- 8개의 symbol을 부호화하기 위해서는 3개의 비트가 필요하다. 위 문자는 36개의 메시지를 가지고 있으므로 총 36\*3 = 108개의 비트가 필요하다.

# 2.71

- 오른쪽에는 트리가 아닌 리프 노드가 존재하는 트리가 나오게된다.
- 도수가 가장 낮은 기호의 부호화에 필요한 비트는 n-1개, 가장 높은 기호의 부호화에 필요한 비트는 1개이다.

# 2.72

# 2.73

## a

- 미분 연산 관련 함수를 데이터로 표현하였다. is_number, is_variable은 더이상 추가되지 않을 기본적인 연산이기 때문이 아닐까.

## b

```js
function install_package() {
  function product(exp, variable) {
    return make_sum(
      make_product(multiplier(exp), deriv(multiplicand(exp), variable)),
      make_product(deriv(multiplier(exp), variable), multiplicand(exp))
    );
  }

  function sum(exp, variable) {
    return make_sum(deriv(addend(exp), variable), deriv(augend(exp), variable));
  }

  put("derive", "product", product);
  put("derive", "sum", sum);
  return "done";
}
```

## c

```js
function exp(exp, variable) {
  return make_exp(
    make_product(
      make_product(exponent(exp), make_exp(base(exp), exponent(exp) - 1)),
      deriv(base(exp), variable)
    )
  );
}

put("derive", "exp", exp);
```

## d

- put으로 넣어주는 부분의 순서를 get과 동일하게 변경해주면 된다.

# 2.74

## a

- get_record 함수에 대한 key값을 정의하고, 개별 부서의 파일은 해당 key값에 대응되는 함수를 작성한다.
- 예시로 key값을 record라고 한다면, 개별 부서의 파일은 record를 키값으로 등록한 함수를 정의해야한다. 그리고 해당 함수는 인사 파일에서 주어진 이름의 직원 레코드를 찾아 돌려준다.
