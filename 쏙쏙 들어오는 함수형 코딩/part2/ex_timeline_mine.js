function Queue() {
  const queue = [];
  let working = false;

  return {
    runNext() {
      if (queue.length === 0) return;
      if (working) return;

      working = true;

      const f = queue.shift();
      // f는 callback을 필연적으로 가지는 함수이다.

      f(() => {
        console.log("i am started");
        working = false;
        this.runNext();
      });
    },

    enqueue(f) {
      queue.push(f);
      this.runNext();
      //   setTimeout(() => {}, 0);
    },
  };
}

const ff = (cb) => {
  setTimeout(() => cb(), 2000);
};

const queue = Queue();

queue.enqueue(ff);
queue.enqueue(ff);
queue.enqueue(ff);
queue.enqueue(ff);
