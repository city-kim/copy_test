import { conditions } from '../../constants/condition'
import { filterStore } from '../../store/filter'

import type { ConditionBase, Condition } from '../../types/condition'

import ListFilterTab from './filter/tab'
import ListFilterDialog from '../../components/list/filter/dialog'

function ListFilter () {

  const selected = filterStore(state => state.selectedConditions) // 선택된 필터 리스트
  const selectCounter = Object.values(selected).reduce((acc, cur) => acc + cur.length, 0) // 선택된 필터 갯수
  
  const dialogState = filterStore(state => state.dialogState) // dialog 상태값
  const dialogStateUpdate = filterStore(state => state.dialogStateUpdate) // dialog 상태값 업데이트

  const selectUpdate = filterStore(state => state.selectUpdate) // 필터 업데이트하기
  const selectToggle = filterStore(state => state.selectToggle) // 필터 토글하기
  const selectClear = filterStore(state => state.selectClear) // 필터 전체삭제하기
  const selectReset = filterStore(state => state.selectReset) // 필터 초기화하기
  
  const tabAddAction = ({filter, name}: ConditionBase) => {
    // 탭에서 액션 발생시
    if (conditions.find((item) => item.filter === filter)?.list) {
      // 상세조건이 있다면 dialog를 열어준다
      dialogStateUpdate({isShow: true, filter: filter})
    } else {
      // 상세조건이 없다면 바로 필터를 적용한다
      selectUpdate({isAdd: true, filter: filter, name: name})
    }
  }

  const clearFilter = ({filter, name, isListType}: ConditionBase & {isListType: boolean}) => {
    if (isListType) {
      // 리스트 타입인경우 전체삭제
      selectClear({filter: filter})
    } else {
      // 아닌경우 해당 필터 삭제
      selectUpdate({isAdd: false, filter: filter, name: name})
    }
  }

  const closeDialog = () => {
    // dialog에서 닫기 버튼 클릭시
    dialogStateUpdate({isShow: false})
  }

  const dialogAction = ({isCanDuplicate, filter}: {
    isCanDuplicate: boolean,
    filter: string
  }) => {
    // dialog에서 액션 발생시 필터 업데이트 이경우는 토글로한다
    selectToggle({isCanDuplicate: isCanDuplicate, filter: dialogState.filter, name: filter})
  }

  const dialogListCondition = conditions.find((item) => item.filter === dialogState.filter) as Condition
  return (
    <div>
      <div className='list-filter-tab'>
        <fieldset>
          {
            selectCounter > 0 &&
            <div>
              <input
                type="button"
                onClick={() => {selectReset()}}
                value="초기화"
              />
            </div>
          }
          {
            conditions.map((condition) => (
              <ListFilterTab
                key={condition.name}
                filter={condition.filter}
                name={condition.name}
                isListType={condition.list ? true : false}
                activeList={selected[condition.filter]}
                tabAddAction={tabAddAction}
                clearFilter={clearFilter}
              ></ListFilterTab>
            ))
          }
        </fieldset>
      </div>
        {
          dialogState.isShow &&
          <ListFilterDialog
            conditions={dialogListCondition}
            activeDetailList={selected[dialogState.filter]}
            closeDialog={closeDialog}
            dialogAction={dialogAction}
          ></ListFilterDialog>
        }
    </div>
  )
}

export default ListFilter