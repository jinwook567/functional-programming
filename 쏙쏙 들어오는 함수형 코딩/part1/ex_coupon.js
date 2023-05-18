// 액션
// 이메일 데이터베이스 조회
// 이메일 보내기
// 쿠폰 데이터베이스 조회

// 계산
// 쿠폰 조건 판별
// 이메일 만들기

function getEmailList() {}
function getCouponList() {}

// sendEmail 함수에서 한번에 mail 보내는 것이 서버에 무리를 준다면, getEmailList의 숫자를 제한하면서 동작시킨다.
function sendEmail(from, to, content) {
  const subscribers = getEmailList();
  const couponList = getCouponList();

  const emails = emailsForSubscribers(subscribers, couponList);
  // 보내기 로직 수행.
}

function considerRank(count) {
  return count >= 10 ? "best" : "good";
}

function selectCouponByRank(couponList, rank) {
  const res = [];
  for (let i = 0; i < couponList.length; i++) {
    if (couponList[i] === rank) res.push(couponList[i]);
  }
  return res;
}

function emailForSubscriber(subscriber, couponListForSubscriber) {
  return {
    from: "ddd@naver.com",
    to: subscriber.email,
    content: couponListForSubscriber.join(" "),
  };
}

function emailsForSubscribers(subscribers, couponList) {
  const res = [];

  for (let i = 0; i < subscribers.length; i++) {
    const subscriber = subscribers[i];
    const rank = considerRank(subscriber.count);
    const email = emailForSubscriber(subscriber, selectCouponByRank(couponList, rank));
    res.push(email);
  }

  return res;
}
