<script setup lang="ts">
import { computed } from 'vue'
import { useFood } from '../composable'

const { foodPosition } = useFood()

const style = computed(() => {
  return `transform: translate(${10 * foodPosition.x}px , ${10 * foodPosition.y}px)`
})
</script>

<template>
  <div class="w-2.5 h-2.5 absolute flex flex-wrap justify-between content-between" :style="style">
    <div class="w-1 h-1 bg-violet-500 transform rotate-45"></div>
    <div class="w-1 h-1 bg-violet-500 transform rotate-45"></div>
    <div class="w-1 h-1 bg-violet-500 transform rotate-45"></div>
    <div class="w-1 h-1 bg-violet-500 transform rotate-45"></div>
  </div>
</template>
