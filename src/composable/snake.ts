import { reactive } from 'vue'
import { GameState } from '../constants/GameState'

interface Position {
  x: number
  y: number
}

interface SnakeHead {
  position: Position
}

interface Snake {
  head: SnakeHead
  direction: string
  bodies: Position[]
  move: () => GameState
}

const snake = reactive<Snake>({
  head: {
    position: { x: 0, y: 0 }
  },
  direction: '',
  bodies: [],
  // 蛇的移动
  move: () => {
    // 移动身体
    const length = snake.bodies.length
    if (length > 0) {
      const body = {
        x: snake.head.position.x,
        y: snake.head.position.y
      }
      snake.bodies.pop()
      snake.bodies.splice(0, 0, body)
    }
    // 蛇头移动
    switch (snake.direction) {
      case 'ArrowUp':
        snake.head.position.y -= 1
        break
      case 'ArrowRight':
        snake.head.position.x += 1
        break
      case 'ArrowDown':
        snake.head.position.y += 1
        break
      case 'ArrowLeft':
        snake.head.position.x -= 1
        break
    }
    // 碰到墙壁, 游戏结束
    if (
      snake.head.position.x < 0 ||
      snake.head.position.x > 29 ||
      snake.head.position.y < 0 ||
      snake.head.position.y > 29
    )
      return GameState.OVER
    // 碰到身体
    if (snake.bodies.some(body => snake.head.position.x === body.x && snake.head.position.y === body.y))
      return GameState.OVER

    return GameState.RUNNING
  }
})

// 蛇的身体
export function useSnake() {
  return {
    snake
  }
}
