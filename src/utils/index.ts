/**
 * 获取某个范围的随机数
 * 
 * @param min 生成的最小数
 * @param max 生成的最大数
 * @returns [min, max] 范围内的随机数
 */
export function getRandom(min: number, max: number): number {
  return Math.round(Math.random() * max) + min
}
