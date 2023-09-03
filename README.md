# web-frontend

## 주의사항

- 🔥 **최종 코드 제출은 main 브랜치에 올려주세요. main 브랜치에 merge가 안되어 있으면 불합격 입니다.** 🔥

## 참고

- 🔥 **기존 환경설정에 변경이 있거나 구현하신 내용에 설명이 필요할 시 README.md에 기재 부탁드립니다.** 🔥

## 기술스택

- React + TypeScript
- 상태관리는 필요하다면 외부 패키지(redux, mobx, recoil, zustand, jotai 등) 사용 가능
- 그 외 ui, event관련 패키지 (modal, chip button, scroll, animation등) 사용불가
- styling을 위한 css-in-js(styled-component, emotion 등) 형태의 패키지는 사용가능
- 라우팅을 위해 react-router는 사용가능

## 과제 내용

- 안내 메일에 첨부되어 있는 문서링크

## Getting Started

```
npm install
npm run dev

"local에서 json-server 실행"
npx json-server db.json --routes routes.json --port 8080
```

## api url

- 차량 전체 리스트: `http://localhost:8080/carClasses`
- 차량 상세 정보: `http://localhost:8080/carClasses/${carClassId}`
