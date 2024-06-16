# 2.24

# 2.25

```js
const x = list(1, 3, list(5, 7), 9);
console.log(head(tail(head(tail(tail(x))))));

const y = list(list(7));
console.log(head(head(y)));

const z = list(1, list(2, list(3, list(4, list(5, list(6, 7))))));
console.log(
  head(tail(head(tail(head(tail(head(tail(head(tail(head(tail(z))))))))))))
);
```

# 2.26

# 2.27

```js
function deep_reverse(items) {
  return is_null(items)
    ? null
    : !is_pair(items)
    ? items
    : append(deep_reverse(tail(items)), pair(deep_reverse(head(items)), null));
}
```

# 2.28

```js
function fringe(items) {
  return is_null(items)
    ? null
    : !is_pair(items)
    ? list(items)
    : append(fringe(head(items)), fringe(tail(items)));
}
```

# 2.29

```js
function make_mobile(left, right) {
  return list(left, right);
}

function make_branch(length, structure) {
  return list(length, structure);
}

function left(list) {
  return head(list);
}

function right(list) {
  return head(tail(list));
}

function left_branch(mobile) {
  return left(mobile);
}

function right_branch(mobile) {
  return right(mobile);
}

function branch_length(branch) {
  return left(branch);
}

function branch_structure(branch) {
  return right(branch);
}

// mobile can be mobile or weight
function total_weight(mobile) {
  return is_null(mobile)
    ? 0
    : !is_pair(mobile)
    ? mobile
    : total_weight(branch_structure(left_branch(mobile))) +
      total_weight(branch_structure(right_branch(mobile)));
}

function is_balanced_mobile(mobile) {
  function torque(branch) {
    return branch_length(branch) * total_weight(branch_structure(branch));
  }

  return is_null(mobile)
    ? true
    : !is_pair(mobile)
    ? true
    : torque(left_branch(mobile)) === torque(right_branch(mobile)) &&
      is_balanced_mobile(branch_structure(left_branch(mobile))) &&
      is_balanced_mobile(branch_structure(right_branch(mobile)));
}
```

- 만일 모빌, 브랜치에 대한 생성자를 변경한다면, 모빌 대한 접근자, 브랜치에 대한 접근자가 수정이 필요하다. 조금 더 엄밀하게 말하면, 모빌의 오른쪽을 가져오는 접근자가 수정되어야 한다.

# 2.30

```js
function square_tree(list) {
  return is_null(list)
    ? null
    : is_pair(list)
    ? pair(square_tree(head(list)), square_tree(tail(list)))
    : list * list;
}

function square_tree(list) {
  return map(
    (sub_tree) =>
      is_pair(sub_tree) ? square_tree(sub_tree) : sub_tree * sub_tree,
    list
  );
}
```

# 2.31

```js
function tree_map(f, tree) {
  return is_null(tree)
    ? null
    : is_pair(tree)
    ? pair(tree_map(f, head(tree)), tree_map(f, tail(tree)))
    : f(tree);
}
```
