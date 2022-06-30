<script setup lang="ts">
import { gameState, useSnake } from '../composable'
import { GameState } from '../constants'
const emit = defineEmits<{ (e: 'reset'): void }>()
const { snake } = useSnake()
function reset() {
  snake.reset()
  gameState.value = GameState.RUNNING
  emit('reset')
}
</script>

<template>
  <div class="h100% flex flex-col justify-center items-center">
    <!-- title -->
    <div class="font-mono text-5 mb-2">Game Over</div>
    <!-- start button -->
    <button class="w-30 h-10 rounded-1 bg-transparent hover:bg-gray-200 font-bold" @click="reset">RESET</button>
  </div>
</template>
