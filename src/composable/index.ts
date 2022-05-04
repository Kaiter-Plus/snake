import { reactive, ref } from 'vue'
import { random } from '../utils'

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
