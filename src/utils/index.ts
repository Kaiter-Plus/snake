/**
 * 生成 [min, max) 之间的随机数
 *
 * @param min 生成随机数的最小值（包含）
 * @param max 生成随机数的最大值（不包含）
 * @returns 生成的随机数
 */
export function random(min: number = 0, max: number = 30): number {
  return Math.floor(Math.random() * max + min)
}
