import { create } from 'zustand'

import type { CarItem } from '../types/car'
import type { selectedConditions } from '../types/condition'

interface ItemsStore {
  isLoading: boolean // 로딩중 여부
  error: boolean // 에러 발생 여부
  items: Array<CarItem> // 차량 리스트
  getCarClasses: () => Promise<void> // 차량 리스트 가져오기
  filterItems: (conditions: selectedConditions) => Array<CarItem> // 차량 리스트 필터링
}

export const itemsStore = create<ItemsStore>((set, get) => ({
  isLoading: false,
  error: false,
  items: [],
  getCarClasses: async () => {
    set({ isLoading: true, error: false })
    fetch('http://localhost:8080/carClasses')
    .then(async (response) => {
      if (response.ok) {
        const items = await response.json()
        set({ isLoading: false, items })
      } else {
        throw new Error(response.statusText)
      }
    })
    .catch(() => {
      set({ isLoading: false, items: [], error: true })
    })
  },
  filterItems: (conditions) => {
    // 선택된 조건에 맞춰 필터링된 차량 리스트를 반환하도록 한다
    let array = [...get().items]
    for (const key in conditions) {
      if (conditions[key].length > 0 && key != 'order') {
        array = array.filter((item) => {
          if (key == 'regionGroups') {
            // 대여지역은 배열끼리 비교하여 값이 하나라도 있으면
            return conditions[key].some((condition: string) => {
              return item[key].includes(condition)
            })
          } else if (key == 'carModel') {
            // 차종은 배열에 값이 포함되어 있으면
            return conditions[key].includes(item.carModel)
          } else if (key == 'carTypeTags') {
            // 차종 태그는 배열끼리 비교하여 모든 값이 포함되어 있을경우
            return conditions[key].every((tag) => item[key].includes(tag))
          }
        })
      }
    }

    if (conditions.order.length > 0) {
      // 가격순 정렬은 별도처리
      const [o] = conditions.order
      if (o == '낮은 가격순') {
        array.sort((a, b) => a.price - b.price)
      } else {
        array.sort((a, b) => b.price - a.price)
      }
    }
    return array
  }
}))