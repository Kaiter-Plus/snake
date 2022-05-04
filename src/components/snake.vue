<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useFood, usePanel } from '../composable'

// 食物位置信息
const { foodPosition, changeFoodPosition } = useFood()

// 蛇头位置
const x = ref<number>(0)
const y = ref<number>(0)

// 分数等级面板
const { score, level } = usePanel()

const direction = ref<string>('')

const style = computed(() => {
  return `transform: translate(${10 * x.value}px , ${10 * y.value}px)`
})

// 蛇的移动
const move = () => {
  switch (direction.value) {
    case 'ArrowUp':
      y.value -= 1
      break
    case 'ArrowRight':
      x.value += 1
      break
    case 'ArrowDown':
      y.value += 1
      break
    case 'ArrowLeft':
      x.value -= 1
      break
  }
  // 吃到食物
  if (x.value === foodPosition.x && y.value === foodPosition.y) {
    // 改变食物的位置
    changeFoodPosition()
    // 增加分数
    score.value += 1
    // 增加等级
    if (score.value % 1 === 0) level.value += 1
  }
  setTimeout(move, 300 - (level.value - 1) * 30)
}

const keydownHandler = (e: KeyboardEvent) => {
  if (/Arrow.+/.test(e.key)) direction.value = e.key
}

onMounted(() => {
  document.addEventListener('keydown', keydownHandler)
  move()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', keydownHandler)
})
</script>

<template>
  <div class="snake" :style="style"></div>
</template>
