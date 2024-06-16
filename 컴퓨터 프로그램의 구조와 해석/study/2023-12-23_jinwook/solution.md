# 2.46

```js
function make_vect(x, y) {
  return pair(x, y);
}

function xcor_vect(vect) {
  return head(vect);
}

function ycor_vect(vect) {
  return tail(vect);
}

function add_vect(vect1, vect2) {
  return make_vect(
    xcor_vect(vect1) + xcor_vect(vect2),
    ycor_vect(vect1) + ycor_vect(vect2)
  );
}

function sub_vect(vect1, vect2) {
  return make_vect(
    xcor_vect(vect1) - xcor_vect(vect2),
    ycor_vect(vect1) - ycor_vect(vect2)
  );
}

function scale_vect(vect, s) {
  return make_vect(xcor_vect(vect) * s, ycor_vect(vect) * s);
}:
```

# 2.47

```js
function make_frame(origin, edge1, edge2) {
  return list(origin, edge1, edge2);
}

function origin_frame(frame) {
  return head(frame);
}

function edge1_frame(frame) {
  return tail(head(frame));
}

function edge2_frame(frame) {
  return tail(tail(head(frame)));
}

function make_frame(origin, edge1, edge2) {
  return pair(origin, pair(edge1, edge2));
}

function origin_frame(frame) {
  return head(frame);
}

function edge1_frame(frame) {
  return tail(head(frame));
}

function edge2_frame(frame) {
  return tail(tail(frame));
}
```
