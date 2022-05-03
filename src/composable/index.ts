import { reactive } from 'vue'
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
