function DroppingQueue(max, worker) {
  let working = false;
  const queue = [];

  function runNext() {
    if (working) return;
    if (queue.length === 0) return;

    working = true;

    const { val, cb } = queue.shift();

    worker(val, (a) => {
      working = false;
      setTimeout(() => cb(a), 0);
      runNext();
    });
  }

  return function (val, cb) {
    queue.push({ val, cb });

    while (queue.length > max) {
      queue.shift();
    }

    setTimeout(runNext, 0);
  };
}

function ex_worker(value, done) {
  setTimeout(() => {
    console.log(value);
    done(value);
  }, 2000);
}

const enqueue = DroppingQueue(1, ex_worker);
const add1 = (a) => console.log(a + 1);

enqueue(1, add1);
enqueue(2, add1);
enqueue(3, add1);
enqueue(4, add1);
enqueue(5, add1);
