import type { ConditionBase } from '../../../types/condition'

import Icon from '../../icon'

import './tab.css'

interface ListFilterTabProps {
  filter: string // 필터종류
  name: string // 필터명
  isListType: boolean // 리스트 타입인지여부
  activeList: string[] // 활성화된 필터 리스트
  tabAddAction: ({filter, name}: ConditionBase) => void // 탭에서 액션 발생시 부모 컴포넌트에 전달
  clearFilter: ({filter, name, isListType}: ConditionBase & {isListType: boolean}) => void // 필터 삭제용
}

function ListFilterTab (props: ListFilterTabProps) {

  const isTabActive = () => {
    // 필터의 탭이 활성화되어있는지 확인
    if (props.isListType) {
      // 리스트 타입의 경우 activeList에 값이 있으면 활성화된것으로 판단
      return props.activeList.length > 0 ? true : false
    } else {
      // 아닌경우 activeList에 해당 필터가 있는지 확인
      return props.activeList.includes(props.name)
    }
  }
  return (
    <div className={`${!props.isListType && 'special'}`}>
      <input
        type="button"
        onClick={() => {props.tabAddAction({filter: props.filter, name: props.name})}}
        value={props.name}
      />
      <button
        className={isTabActive() ? 'active' : ''}
        type="button"
        onClick={() => {props.clearFilter({filter: props.filter, name: props.name, isListType: props.isListType})}}
      >
        <Icon
          name={'close'}
          width={25}
          height={25}
        ></Icon>
      </button>
    </div>
  )
}

export default ListFilterTab