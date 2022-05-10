import { reactive, ref } from 'vue'
import { random } from '../utils'

// 蛇头的位置
const snakeHeadPosition = reactive({ x: 0, y: 0 })
// 方向
const direction = ref<string>('')
// 蛇的身体
type SnakeBody = Record<string, number>
const bodies = ref<SnakeBody[]>([])
export function useSnake() {
  return {
    direction,
    bodies,
    snakeHeadPosition
  }
}

// 食物的位置
const foodPosition = reactive({ x: random(), y: random() })
// 改变食物的位置
const changeFoodPosition = () => {
  foodPosition.x = random()
  foodPosition.y = random()
}
// 食物信息
export function useFood() {
  return {
    foodPosition,
    changeFoodPosition
  }
}

// 分数
const score = ref(0)
// 等级
const level = ref(1)
// 面板
export function usePanel() {
  return {
    score,
    level
  }
}
