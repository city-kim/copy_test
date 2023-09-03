const iconList = {
  close: 'M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'
} as const

interface IconProps {
  name: keyof typeof iconList
  width: number
  height: number
}

function Icon ({name, width, height}: IconProps) {
  // iconList의 key값을 name으로 받아서 iconList의 value값을 path의 d값으로 넣어준다.
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
    >
      <path d={iconList[name]}/>
    </svg>
  )
}

export default Icon