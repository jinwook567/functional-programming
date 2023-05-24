function ValueCell(initialValue) {
  let currentValue = initialValue;
  let oldValue;
  const watchers = [];

  return {
    val: () => currentValue,
    update: (f) => {
      oldValue = currentValue;
      const newValue = f(oldValue);
      currentValue = newValue;

      if (oldValue !== newValue) {
        watchers.forEach((watcher) => {
          watcher(newValue);
        });
      }
    },
    addWatcher: (f) => {
      watchers.push(f);
    },
  };
}

const number = ValueCell(1);
console.log(number.val());
number.addWatcher((num) => console.log(num + 100));
number.update((num) => num + 1);

console.log(number.val());

function FormulaCell(upstreamCell, f) {
  const myCell = ValueCell(upstreamCell.val());
  upstreamCell.addWatcher((newValue) => {
    myCell.update(() => f(newValue));
  });

  return {
    val: myCell.val,
    addWatcher: myCell.addWatcher,
  };
}
const numCell = ValueCell(10);
const numCellAdd10 = FormulaCell(numCell, (newValue) => newValue + 10);

numCell.update((oldValue) => oldValue + 10);
console.log(numCell.val());
console.log(numCellAdd10.val());
