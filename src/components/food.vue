<script setup lang="ts">
import { computed } from 'vue'
import { useFood } from '../composable'

const { food } = useFood()

const style = computed(() => {
  return `transform: translate(${10 * food.position.x}px , ${10 * food.position.y}px)`
})
</script>

<template>
  <div class="w-2.5 h-2.5 absolute flex flex-wrap justify-between content-between" :style="style">
    <div class="w-1 h-1 bg-dark-500 transform rotate-45"></div>
    <div class="w-1 h-1 bg-dark-500 transform rotate-45"></div>
    <div class="w-1 h-1 bg-dark-500 transform rotate-45"></div>
    <div class="w-1 h-1 bg-dark-500 transform rotate-45"></div>
  </div>
</template>
