<script setup lang="ts">
import { gameState, usePanel, useSnake } from '../composable'
import { GameState } from '../constants'
const emit = defineEmits<{ (e: 'reset'): void }>()
const { snake } = useSnake()
const { resetPanel } = usePanel()
function reset() {
  snake.reset()
  resetPanel()
  gameState.value = GameState.RUNNING
  emit('reset')
}
</script>

<template>
  <div class="h100% flex flex-col justify-center items-center">
    <!-- title -->
    <div class="font-mono text-5 mb-2">GAME OVER</div>
    <!-- start button -->
    <button class="w-30 h-10 rounded-1 bg-transparent hover:bg-gray-200 font-bold" @click="reset">RESET</button>
  </div>
</template>
