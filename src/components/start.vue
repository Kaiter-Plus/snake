<script setup lang="ts">
const emit = defineEmits<{
  (e: 'start'): void
}>()
function gameStart() {
  emit('start')
}
</script>

<template>
  <div class="h100% flex flex-col justify-center items-center">
    <!-- title -->
    <div class="font-mono text-5 mb-2">Snake Game</div>
    <!-- start button -->
    <button class="w-30 h-10 rounded-1 bg-transparent hover:bg-gray-200 font-bold" @click="gameStart">START</button>
  </div>
</template>
