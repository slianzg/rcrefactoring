## 📢 개요

### 🏁 목표

1. 관심사 분리와 유지보수에 용이한 **3-Layered Architecture (3계층)**를 이해하고 적용 합니다.
2. 객체지향프로그래밍의 기초인 **Class**를 이해하고 적용합니다.
3. ORM 변경을 통해, 3-Layered Architecture **적용 전후의 유지보수 용이성**을 체감합니다.

---

## 📢 요구사항

## 필수 요구사항

### 1️⃣ 개발

1. **본인이 작성한 숙련 주차 과제 코드**를 복사해서 심화 주차 과제를 위한 저장소를 생성합니다.
    - 숙련 주차 과제를 완성하지 못한 경우
        - 숙련 주차 해설 영상에 제공 된 [소스코드](https://github.com/kyung-yeon/resume-api)를 Import해서 사용합니다.
2. 숙련주차에서 작성한 코드를 **3-Layered Architecture**를 적용해서 구조를 변경합니다.
3. Controller, Service, Repository Layer는 **Class**를 이용해 구현합니다.
    - Class의 Method는 **화살표 함수(Arrow Function)** 형태로 구현합니다.
4. Controller, Service, Repository 의 Class 에 Jest 를 사용한 테스트 코드를 작성합니다.

### 2️⃣ API 동작 확인

- [Thunder Client](https://www.thunderclient.com/) 등을 이용하여 구현 한 API가 정상 동작하는지 확인합니다.

### 3️⃣ Test Case 동작 확인

- 모든 Test Case 가 잘 동작하는지 확인합니다.

### 4️⃣ 배포

1. **AWS EC2** 인스턴스에 프로젝트를 배포합니다.
2. **PM2**를 이용해 **Express 서버가 종료** 되거나, **EC2 인스턴스가 재부팅** 되어도 다시 실행되도록 설정합니다.

<aside>

  🛠 **기술 스택**

</aside>

1. **웹 프레임워크**
Node.js의 대표적인 웹 프레임워크인 **Express**를 이용합니다.
2. **패키지 매니저
npm** 또는 **yarn** 중 편한것을 이용합니다.
    - 🚨 **주의사항**
        - 둘 중 어떤 것을 사용해도 좋지만, 혼용해서 사용하면 안됩니다.
        - `package-lock.json`, `yarn.lock`이 동시에 있으면 안됩니다. (의도와 다른 동작을 일으킬 수 있습니다.)
3. **모듈 시스템**
기본 모듈 시스템(**CommonJS, type: "commonjs"**) 또는 
ES6 부터 도입 된 모듈 시스템(**ESModule, type: "module"**)을 이용합니다.
    - 🚨 **주의사항**
        - 둘 중 어떤 것을 사용해도 좋지만, 혼용해서 사용하면 안됩니다.
        - `require/exports`와 `import/export`가 동시에 있으면 안됩니다.
4. **데이터베이스**
숙련 주차 강의 후반에서 다룬 **MySQL**을 사용합니다. 
직접 설치하지 않고, Cloud 서비스인 **AWS RDS**를 이용합니다.
5. **ORM(Object Relational Mapping)
MySQL**의 데이터를 쉽게 읽고 쓰게 해주는 **[Prisma](https://www.prisma.io/)를 사용합니다.**
---


# 환경변수
- DATABASE_URL
- TOKEN_SECRET_KEY

# API 명세서 URL
- https://legend-maxilla-125.notion.site/Node-js-API-96c2d59f2e6048a78faa2159282f0fe5?pvs=4

# ERD URL
- https://www.erdcloud.com/d/RGJKnRJgrCLsiG8XT
