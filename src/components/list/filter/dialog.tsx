import type { Condition } from '../../../types/condition'

import Icon from '../../icon'

import './dialog.css'

interface ListFilterDialogProps {
  conditions: Condition // 필터 리스트
  activeDetailList: string[] // 활성화된 상세조건 리스트
  closeDialog: () => void // dialog에서 닫기 버튼 부모 컴포넌트에 전달
  dialogAction: ({isCanDuplicate, filter}: {
    isCanDuplicate: boolean,
    filter: string
  }) => void // dialog에서 액션 발생시 부모 컴포넌트에 전달
}

function ListFilterDialog (props: ListFilterDialogProps) {

  const isActive = (filter: string) => {
    // 이미 선택된 상세조건인지 확인
    return props.activeDetailList.includes(filter)
  }
  return (
    <dialog
      className='list-dialog'
      open
    >
      <button
        type="button"
        onClick={() => { props.closeDialog() }}
      >
        <Icon
          name={'close'}
          width={30}
          height={30}
        ></Icon>
      </button>
      <fieldset>
        {
          props.conditions.list &&
          props.conditions.list.map((filter: string) => (
            <button
              type="button"
              className={isActive(filter) ? 'active' : ''}
              key={filter}
              onClick={() => { props.dialogAction({
                isCanDuplicate: props.conditions.isCanDuplicate || false,
                filter: filter
              })}}
            >
              {filter}
            </button>
          ))
        }
      </fieldset>
    </dialog>
  )
}

export default ListFilterDialog