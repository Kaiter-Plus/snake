<script setup lang="ts">
import { computed } from 'vue'
import { useFood } from '../composable'

const { x, y } = useFood()

const style = computed(() => {
  return `transform: translate(${10 * x.value}px , ${10 * y.value}px)`
})
</script>

<template>
  <div class="w-2.5 h-2.5 absolute grid grid-cols-2 grid-rows-2" :style="style">
    <div class="w-1 h-1 bg-violet-500 transform rotate-45"></div>
    <div class="w-1 h-1 bg-violet-500 transform rotate-45"></div>
    <div class="w-1 h-1 bg-violet-500 transform rotate-45"></div>
    <div class="w-1 h-1 bg-violet-500 transform rotate-45"></div>
  </div>
</template>
