<script setup lang="ts">
import Food from './components/food.vue'
import Panel from './components/panel.vue'
import Snake from './components/snake.vue'
</script>

<template>
  <!-- 主容器 -->
  <main
    class="w-90 h-105 bg-slate-300 rounded-lg mt-20 mx-auto border border-gray-200 border-10 flex flex-col justify-around items-center"
  >
    <!-- 主舞台 -->
    <div class="w-76 h-76 bg-gray-300 border border-gray-200 border-2 relative">
      <!-- 蛇 -->
      <Snake />
      <!-- 食物 -->
      <Food />
    </div>
    <!-- 分数面板 -->
    <Panel />
  </main>
</template>
