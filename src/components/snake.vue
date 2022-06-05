<script setup lang="ts">
import { computed } from 'vue'
import { useSnake } from '../composable'

// 蛇头位置
const { snake } = useSnake()

const style = computed<string>(() => {
  return `transform: translate(${10 * snake.head.position.x}px , ${10 * snake.head.position.y}px)`
})
</script>

<template>
  <div class="snake">
    <div class="snake-head" :style="style"></div>
    <div
      v-for="item in snake.bodies"
      class="snake-body"
      :style="`transform: translate(${10 * item.x}px , ${10 * item.y}px)`"
    ></div>
  </div>
</template>
