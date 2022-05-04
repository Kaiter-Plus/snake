<script setup lang="ts">
import { usePanel } from '../composable'

const { score, level } = usePanel()
</script>

<template>
  <div class="w-75 flex justify-between font-mono text-lg font-bold">
    <div>
      SCORE:
      <span>{{ score }}</span>
    </div>
    <div>
      LEVEL:
      <span>{{ level }}</span>
    </div>
  </div>
</template>
