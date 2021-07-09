/**
 * CamelCase -> snake_case 변환
 * @param str 대상 string
 * @returns snake_case 변환 결과
 */
export const toSnake = (string: string) =>
  string.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`)
