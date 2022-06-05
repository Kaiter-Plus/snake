import { describe, expect, it } from 'vitest'
import { useFood } from '../src/composable'

describe('food', () => {
  const { food } = useFood()
  it('change position', () => {
    food.position.x = 0
    food.position.y = 0
    food.changePosition()
    expect(food.position.x).not.toBe(0)
    expect(food.position.y).not.toBe(0)
  })
})
