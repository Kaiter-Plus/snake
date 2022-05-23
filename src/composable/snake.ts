import { reactive, ref } from 'vue'

// 蛇头的位置
const snakeHeadPosition = reactive({ x: 0, y: 0 })
// 方向
const direction = ref<string>('')
// 蛇的身体
const bodies = ref<Record<string, number>[]>([])
export function useSnake() {
  return {
    direction,
    bodies,
    snakeHeadPosition
  }
}
