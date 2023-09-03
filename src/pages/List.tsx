import { useEffect } from 'react'
import { itemsStore } from '../store/items'
import { filterStore } from '../store/filter'

import ListFilter from '../components/list/filter'
import ListItems from '../components/list/items'

import './List.css'
function List() {

  const isDialogShow = filterStore(state => state.dialogState.isShow) // dialog가 열린 필터
  const selectedConditions = filterStore(state => state.selectedConditions) // 선택된 필터 리스트

  const getCarClasses = itemsStore(state => state.getCarClasses) // 차량 리스트 가져오기
  useEffect(() => { // 마운트시 차량 리스트 가져오기
    getCarClasses()
  }, [])

  const isLoading = itemsStore(state => state.isLoading) // 로딩중인지
  const error = itemsStore(state => state.error) // 에러가 있는지
  
  const items = itemsStore(state => state.filterItems(selectedConditions)) // 차량 리스트

  return (
    <section
      className={`list ${isDialogShow ? 'dim-mode' : ''}`}
    >
      <h2>차량 리스트</h2>
      <div className='list-filter-container'>
        <ListFilter></ListFilter>
      </div>
      <div
        className={`list-items-container ${isDialogShow ? 'blocked' : ''}`}
      >
        {
          isLoading ? <div>로딩중...</div> :
          error ? <div>에러가 발생했습니다.</div> :
          items.length < 1 ? <div>선택하신 조건에 맞는 차량이 없습니다.<br/>준비된 다른 차량을 확인해 보세요!</div> :
          items.map((item) => (
            <ListItems
              key={item.carClassId}
              {...item}
            ></ListItems>
          ))
        }
      </div>
    </section>
  )
}

export default List
