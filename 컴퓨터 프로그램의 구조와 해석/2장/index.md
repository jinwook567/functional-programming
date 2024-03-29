# 복합 데이터가 필요한 이유

- 개념적 수준을 높인다.
  - 만일 유리수를 다룬다고 하였을 때 2개의 원시 정수로 다루는 것보다, 분자와 분모를 접착제로 붙여서 하나로 다루는 것이 프로그램의 이해도를 높인다.
- 모듈성을 높인다.
  - 개별 객체로써 활용되는 부분과, 개별 객체를 정의하고 세부 사항을 처리하는 부분을 나눌 수 있다.
  - 이러한 개념을 데이터 추상화라고 한다.
- 언어의 표현력이 증가한다.
  - 함수는 함수가 사용하는 함수가 어떤 개별 객체에 대해 동작하는지만 알면 된다.

# 데이터 추상화

- 복합 데이터 객체가 쓰이는 방식과 그 복합 데이터를 좀 더 기본적인 데이터 객체들로 구축하는 구체적인 방식을 분리할 수 있게 하는 방법론
- 핵심은, 복합 데이터 객체를 사용하는 프로그램이 추상 데이터에 대해 작동하도록 프로그램을 짜는 것이다.
- 프로그램은 데이터에 관해 최소한의 가정만 두어야 한다. 구체적 데이터 표현을 해당 데이터를 사용하는 프로그램과는 독립적으로 정의해야한다.
  - ProductCard를 UI와 데이터의 부분을 추상한 것과 유사한 방식이라고 볼 수 있다.
- 유리수 만드는 프로그램을 통해서 배울 수 있던 점은 유리수 약분이 필요할 때, 사칙 연산에 대한 함수는 수정이 일어나지 않았다.
  - make_rat이 복합 데이터를 생성함으로서, 추상화 장벽으로 존재하기 때문이다.

# 추상화 장벽

- 일반적인 데이터 추상화는 데이터 객체 형식마다 그 형식의 데이터 객체에 관한 모든 조작을 표현하는 데 사용할 기본적인 연산들을 정의하고 오직 그 연산들만으로 데이터를 조작한다는 개념이 깔려있다.
- 객체 지향에서 캡슐화와 매우 유사하다. 각 수준의 함수들은 추상화 장벽을 정의하고 서로 다른 수준을 연결하는 인터페이스로써 작용된다.
- 이 방식은 프로그램을 유지보수하기 쉽게 만들어준다. 아주 적은 수의 프로그램 모듈만 구체적인 표현에 의존하도록 설계하기 때문.
  - 만일 어떤 데이터의 자료 구조가 변경될 경우, 해당 추상화 장벽의 함수들만 변경되면 된다. 해당 추상화 장벽 위에 있는 함수들은 변경될 필요가 없다.
- 유리수 프로그램을 추가로 예를 들면, 최대 공약수 관련 로직을 make_rat 대신 numer나 denom에 삽입할 수 있다. 만일 조회 대신 생성이 빈번하다면 이 방식이 유리하다.
  - 추상화 장벽을 통해 어떤 시점에서 gcd를 호출할 지 정하지 않아도 된다. 유연함을 가지게 된다.

# 데이터란 무엇인가

- 어떠한 선택자들과 생성자들, 그리고 유효한 표현을 위해 그 함수들이 반드시 충족하는 조건들의 집합으로 정의된다.
