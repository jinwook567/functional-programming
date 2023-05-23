// 고차함수로 만들기.
function withLogging(f) {
  try {
    f();
  } catch (e) {
    snapLogError(e);
  }
}

// 함수를 리턴하는 함수로 만들기.
function wrapLogging(f) {
  return function (arg) {
    try {
      f(arg);
    } catch (e) {
      snapLogError(e);
    }
  };
}

function setUserWithOutLogging() {}

const setUserWithLogging = wrapLogging(setUserWithOutLogging);
