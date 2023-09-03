interface CarItem {
  carClassId: number // 차량 ID
  carClassName: string // 차량 이름
  carModel: string // 차량 종류
  image: string // 차량 이미지 url
  drivingDistance: number // 주행거리(km)
  year: number // 연식
  price: number // 할인 적용 전 가격(원)
  discountPercent: number // 할인율(%)
  regionGroups: Array<string> // 지역
  carTypeTags: Array<string> // 차량 태그
}

export type {
  CarItem
}