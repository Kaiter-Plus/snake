<script setup lang="ts">
import { computed } from 'vue'

const style = computed(() => {
  return `transform: translate(${0 * 10}px , ${0 * 10}px)`
})
</script>

<template>
  <div class="snake" :style="style"></div>
</template>
