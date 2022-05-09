<script setup lang="ts">
import Food from './components/food.vue'
import Panel from './components/panel.vue'
import Snake from './components/snake.vue'
import { useFood, usePanel } from './composable'

// 食物位置信息
const { changeFoodPosition } = useFood()
// 分数等级面板
const { score, level } = usePanel()

const foodEaten = () => {
  // 改变食物的位置
  changeFoodPosition()
  // 增加分数
  score.value += 1
  // 增加等级
  if (score.value % 10 === 0) level.value += 1
}

const gameOver = (message: string) => {
  alert(message)
}
</script>

<template>
  <!-- 主容器 -->
  <main
    class="w-90 h-105 bg-slate-300 rounded-lg mt-20 mx-auto border border-gray-200 border-10 flex flex-col justify-around items-center"
  >
    <!-- 主舞台 -->
    <div class="w-76 h-76 bg-gray-300 border border-gray-200 border-2 relative">
      <!-- 蛇 -->
      <Snake @foodEaten="foodEaten" @gameOver="gameOver" />
      <!-- 食物 -->
      <Food />
    </div>
    <!-- 分数面板 -->
    <Panel />
  </main>
</template>
