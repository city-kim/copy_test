/**
 * 숫자가 전달되면 3자리마다 콤마를 추가하여 반환
 * @param num 콤마가 추가될 숫자 (ex: 1000000)
 * @returns 1,000,000
 */
function addComma (num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
/**
 * 전달된 digit에 따라 숫자를 반올림하여 반환
 * @param num 반올림할 값 (ex: 1360)
 * @returns 1400
 */
function roundingDigits (num: number) {
  return Math.round(num / 1000) * 1000
}
/**
 * 숫자가 전달되면 천, 만 단위로 변환하여 반환
 * @param num 변환될 숫자 (ex: 123, 4567, 89101)
 * @returns 123, 4천, 8만
 */
function unitsInKorean (num: number) {
  if (num > 9999) {
    return Math.floor(num / 10000) + '만'
  } else if (num > 999) {
    return Math.floor(num / 1000) + '천'
  }
  return num
}

export {
  addComma,
  roundingDigits,
  unitsInKorean
}