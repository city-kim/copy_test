# web-frontend

## 기술스택

- React + TypeScript
- zustand
- react-router

## 과제 내용

리스트를 출력한다
차종: '경형/소형', '준중형', '중형/대형', '수입', 'SUV'은 or 조건이다
지역: '서울/경기/인천', '제주', '부산/창원', '대구/경북', '대전', '광주'은 OR 조건이다
태그: '인기', '특가', '신차급', '빠른대여', '프리미엄'는 차종, 지역과 함께 AND 조건이다

## Getting Started

```
npm install
npm run dev

"local에서 json-server 실행" (json-server를 실행해야 api 통신이 가능)
npx json-server db.json --routes routes.json --port 8080
```

## api url

- 전체 리스트: `http://localhost:8080/carClasses`
- 상세 정보: `http://localhost:8080/carClasses/${carClassId}`
