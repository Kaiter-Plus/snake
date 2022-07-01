import { ref } from 'vue'

// 分数
const score = ref(0)
// 等级
const level = ref(1)
// 重置
function resetPanel() {
  score.value = 0
  level.value = 1
}

// 面板
export function usePanel() {
  return {
    score,
    level,
    resetPanel
  }
}
