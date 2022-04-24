/**
 * 获取某个范围的随机数
 * @param {number} min
 * @param {number} max
 * @returns 范围内的随机数
 */
export function getRandom(min: number, max: number): number {
  return Math.round(Math.random() * max) + min
}
