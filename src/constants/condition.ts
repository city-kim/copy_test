import type { Condition } from '../types/condition'

const conditions: Array<Condition> = [
  {
    filter: 'carModel',
    name: '차종',
    list: ['경형/소형', '준중형', '중형/대형', '수입', 'SUV'],
    isCanDuplicate: true,
  },
  {
    filter: 'regionGroups',
    name: '대여지역',
    list: ['서울/경기/인천', '제주', '부산/창원', '대구/경북', '대전', '광주'],
    isCanDuplicate: true,
  },
  {
    filter: 'order',
    name: '가격',
    list: ['낮은 가격순', '높은 가격순'],
    isCanDuplicate: false,
  },
  {
    filter: 'carTypeTags',
    name: '인기',
  },
  {
    filter: 'carTypeTags',
    name: '특가',
  },
  {
    filter: 'carTypeTags',
    name: '신차급',
  },
  {
    filter: 'carTypeTags',
    name: '빠른대여',
  },
  {
    filter: 'carTypeTags',
    name: '프리미엄',
  }
]

export {
  conditions
}