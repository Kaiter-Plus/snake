<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useFood } from '../composable'

const { foodPosition, changeFoodPosition } = useFood()

const x = ref<number>(0)
const y = ref<number>(0)

const direction = ref<string>('')

const style = computed(() => {
  return `transform: translate(${10 * x.value}px , ${10 * y.value}px)`
})

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
  }
  setTimeout(move, 300)
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
