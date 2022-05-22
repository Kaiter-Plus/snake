import { describe, expect, it } from 'vitest'
import { useFood } from '../src/composable'

describe('food', () => {
  const { foodPosition, changeFoodPosition } = useFood()
  it('change position', () => {
    foodPosition.x = 0
    foodPosition.y = 0
    changeFoodPosition()
    expect(foodPosition.x).not.toBe(0)
    expect(foodPosition.y).not.toBe(0)
  })
})
