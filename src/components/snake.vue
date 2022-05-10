<script setup lang="ts">
import { computed } from 'vue'
import { useSnake } from '../composable'

// 蛇头位置
const { snakeHeadPosition, bodies } = useSnake()

const style = computed<string>(() => {
  return `transform: translate(${10 * snakeHeadPosition.x}px , ${10 * snakeHeadPosition.y}px)`
})
</script>

<template>
  <div class="snake">
    <div class="snake-head" :style="style"></div>
    <div
      class="snake-body"
      v-for="item in bodies"
      :style="`transform: translate(${10 * item.x}px , ${10 * item.y}px)`"
    ></div>
  </div>
</template>
