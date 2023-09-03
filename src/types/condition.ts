interface ConditionBase { // 필터의 기본 타입
  filter: string
  name: string
}

interface ConditionWithList { // 리스트 형태의 필터타입
  list?: string[]
  isCanDuplicate?: boolean
}

type Condition = ConditionBase & ConditionWithList

interface selectedConditions { // 선택상태인 필터 조건값
  [key: string]: Array<string>
}

export type {
  ConditionBase,
  Condition,
  selectedConditions
}