function Cut(num, callback) {
  let cnt = 0;
  return function () {
    cnt++;
    if (cnt === num) callback();
  };
}

const done = Cut(3, () => console.log("done"));

done();
done();
done();

function JustOnce(callback) {
  let alreadyCalled = false;
  return function (...args) {
    if (alreadyCalled) return;
    alreadyCalled = true;
    return callback(...args);
  };
}

const logOnce = JustOnce((a) => console.log(a));
logOnce(3);
logOnce(4);
