import { create } from 'zustand'
import { conditions } from '../constants/condition'

import type { ConditionBase, selectedConditions } from '../types/condition'

interface FilterStore {
  dialogState: { // filter의 dialog 상태
    isShow: boolean
    filter: string
  }
  selectedConditions: selectedConditions
  dialogStateUpdate: ({isShow, filter}: { // 전달된 값으로 dialog 상태를 변경
    isShow: boolean,
    filter?: string
  }) => void
  selectUpdate: ({isAdd, filter, name}: {isAdd: boolean} & ConditionBase) => void // isAdd에 따라 선택된 조건의 값을 업데이트한다
  selectToggle: ({isCanDuplicate, filter, name}: {isCanDuplicate: boolean} & ConditionBase) => void // isCanDuplicate에 따라 선택된 조건의 값을 토글한다
  selectClear: ({filter}: {filter: string}) => void // 선택된 조건의 값을 초기화한다
  selectReset: () => void // 선택된 조건의 값을 초기화한다
}

const selectListInit = () => {
  // conditions에 맞춰 selectedConditions 초기화
  const list:Set<string> = new Set(conditions.map((item) => item.filter))
  const object:selectedConditions = {}

  for (const item of list) {
    object[item] = []
  }
  
  // localStorage에 저장된 조건을 확인
  const storage = localStorage.getItem('selectedConditions')
  if (storage) {
    // 데이터가 있다면 초기화시 localStorage에 저장된 값을 가져온다
    const loadData:selectedConditions = JSON.parse(storage)
    for (const key in loadData) {
      if (list.has(key)) {
        object[key] = loadData[key]
      }
    }
  }

  return object
}

const saveFilter = (selectedConditions: selectedConditions) => {
  // 선택된 조건을 localStorage에 저장한다
  localStorage.setItem('selectedConditions', JSON.stringify(selectedConditions))
}

export const filterStore = create<FilterStore>((set, get) => ({
  dialogState: {
    isShow: false,
    filter: ''
  },
  selectedConditions: selectListInit(),
  dialogStateUpdate: ({isShow, filter}) => {
    set({
      dialogState: {
        isShow: isShow,
        filter: filter || ''
      }
    })
  },
  selectUpdate: ({isAdd, filter, name}) => {
    const selected = new Set(get().selectedConditions[filter])
    if (isAdd) selected.add(name) // 추가일때
    else selected.delete(name) // 아닐경우 삭제

    set((state) => ({
      selectedConditions : {
        ...state.selectedConditions,
        [filter]: [...selected]
      }
    }))
    saveFilter(get().selectedConditions)
  },
  selectToggle: ({isCanDuplicate, filter, name}) => {
    // 토글의 경우에는 지속적인 호출을 방지하고자 dialog가 닫힐때 차량 리스트를 가져온다
    let selected = new Set(get().selectedConditions[filter])
    if (isCanDuplicate) {
      // 중복선택일때
      if (selected.has(name)) selected.delete(name) // 이미 선택된 경우 삭제
      else selected.add(name) // 아닐경우 추가
    } else {
      // 중복선택이 아닌경우
      if (selected.has(name)) selected.delete(name) // 이미 선택된 경우 삭제
      else selected = new Set([name]) // 아닐경우 업데이트
    }

    set((state) => ({
      selectedConditions : {
        ...state.selectedConditions,
        [filter]: [...selected]
      }
    }))
    saveFilter(get().selectedConditions)
  },
  selectClear: ({filter}) => {
    set((state) => ({
      selectedConditions : {
        ...state.selectedConditions,
        [filter]: []
      }
    }))
    saveFilter(get().selectedConditions)
  },
  selectReset: () => {
    localStorage.removeItem('selectedConditions')
    set({ selectedConditions: selectListInit() })
    saveFilter(get().selectedConditions)
  }
}))