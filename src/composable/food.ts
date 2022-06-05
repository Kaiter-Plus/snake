import { reactive } from 'vue'
import { Position } from '../constants'
import { random } from '../utils'
import { useSnake } from './snake'

interface Food {
  position: Position
  changePosition: () => void
}

const food = reactive<Food>({
  position: { x: random(), y: random() },
  changePosition: () => {
    const x = random()
    const y = random()
    // 如果该处坐标不是蛇的身体，则可生成新的食物位置；否则重新生成
    if (!isExist({ x, y })) {
      food.position.x = x
      food.position.y = y
    } else {
      food.changePosition()
    }
  }
})

// 检测该位置是否有蛇的身体
const { snake } = useSnake()
function isExist(position: Position) {
  return snake.bodies.some(item => {
    return item.x === position.x && item.y === position.y
  })
}

// 食物信息
export function useFood() {
  return {
    food
  }
}
