import { describe, expect, it } from 'vitest'
import { useSnake } from '../src/composable/snake'
import { GameState } from '../src/constants/GameState'

describe('snake', () => {
  const { snake } = useSnake()
  it('move up', () => {
    snake.head.position.y = 5
    snake.direction = 'ArrowUp'
    snake.move()
    expect(snake.head.position.y).toBe(4)
  })
  it('move down', () => {
    snake.head.position.y = 5
    snake.direction = 'ArrowDown'
    snake.move()
    expect(snake.head.position.y).toBe(6)
  })
  it('move left', () => {
    snake.head.position.x = 5
    snake.direction = 'ArrowLeft'
    snake.move()
    expect(snake.head.position.x).toBe(4)
  })
  it('move right', () => {
    snake.head.position.x = 5
    snake.direction = 'ArrowRight'
    snake.move()
    expect(snake.head.position.x).toBe(6)
  })
  it('game over by collide border', () => {
    snake.head.position.x = 0
    snake.direction = 'ArrowLeft'
    const gameState = snake.move()
    expect(gameState).toBe(GameState.OVER)
  })
  it('game over by collide bodies', () => {
    snake.head.position = { x: 1, y: 1 }
    snake.bodies = [
      { x: 1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 }
    ]
    snake.direction = 'ArrowLeft'
    const gameState = snake.move()
    expect(gameState).toBe(GameState.OVER)
  })
})
