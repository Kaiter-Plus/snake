import { ref } from 'vue'
import { random } from '../utils'

// 食物的位置
export function useFood() {
  const x = ref(10)
  const y = ref(10)

  const changeFoodPosition = () => {
    x.value = random()
    y.value = random()
  }

  return {
    x,
    y,
    changeFoodPosition
  }
}
