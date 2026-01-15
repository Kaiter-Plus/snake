<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import Food from './components/food.vue'
import Over from './components/over.vue'
import Panel from './components/panel.vue'
import Snake from './components/snake.vue'
import Start from './components/start.vue'
import { gameState, useFood, usePanel, useSnake } from './composable'
import { GameState } from './constants'
// 蛇
const { snake } = useSnake()
// 食物
const { food } = useFood()
// 分数等级面板
const { score, level } = usePanel()
// 记录游戏开始的时间戳
let startTime = 0
// 加速状态
let speedup = false

// 开始游戏
const start = () => {
  requestAnimationFrame(init)
}

// 游戏初始化
function init(currentTime: number) {
  // 如果是第一次进入，记录当前时间戳
  if (!startTime) startTime = currentTime
  // 计算时间差
  const elapsed = currentTime - startTime
  // 速度
  const speed = speedup ? 9 : level.value - 1
  // 时间差大于300毫秒，蛇移动
  if (elapsed > 300 - speed * 30) {
    // 记录当前时间戳
    startTime = currentTime
    // 蛇移动时可以获取实时的游戏状态
    gameState.value = snake.move()
    // 如果时运行中状态，游戏继续；否则结束
    if (gameState.value === GameState.RUNNING) {
      // 吃到食物
      if (snake.head.position.x === food.position.x && snake.head.position.y === food.position.y) {
        foodEaten()
      }
    }
  }
  requestAnimationFrame(init)
}

// 吃到食物
const foodEaten = () => {
  // 改变食物的位置
  food.changePosition()
  // 增加分数
  score.value += 1
  // 增加等级
  if (score.value % 10 === 0 && level.value <= 10) level.value += 1
  // 增加身体
  snake.bodies.push({
    x: snake.head.position.x,
    y: snake.head.position.y
  })
}

const keydownHandler = (e: KeyboardEvent) => {
  if (/Arrow.+/.test(e.key)) {
    let tempDirection = e.key
    // 如果有身体了，则蛇不能回头
    if (snake.bodies[0]) {
      if (snake.direction === 'ArrowUp' && e.key === 'ArrowDown') tempDirection = 'ArrowUp'
      if (snake.direction === 'ArrowDown' && e.key === 'ArrowUp') tempDirection = 'ArrowDown'
      if (snake.direction === 'ArrowLeft' && e.key === 'ArrowRight') tempDirection = 'ArrowLeft'
      if (snake.direction === 'ArrowRight' && e.key === 'ArrowLeft') tempDirection = 'ArrowRight'
    }
    snake.direction = tempDirection
    // 如果长按按键，加速
    if (e.repeat) {
      speedup = true
    }
  }
}

const keyupHandler = () => {
  speedup = false
}

onMounted(() => {
  // 移动方向
  document.addEventListener('keydown', keydownHandler)
  // 松开时，减速
  document.addEventListener('keyup', keyupHandler)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', keydownHandler)
  document.removeEventListener('keyup', keyupHandler)
})
</script>

<template>
  <!-- 主容器 -->
  <main
    class="w-90 h-105 bg-color rounded-lg mt-20 mx-auto border border-solid border-black border-10 flex flex-col justify-around items-center"
  >
    <!-- 主舞台 -->
    <div class="w-76 h-76 border border-black border-solid border-2 relative">
      <!-- 开始界面 -->
      <Start v-if="gameState === GameState.READY" @start="start" />
      <!-- 游戏界面 -->
      <template v-else-if="gameState === GameState.RUNNING">
        <!-- 蛇 -->
        <Snake />
        <!-- 食物 -->
        <Food />
      </template>
      <!-- 游戏结算界面 -->
      <Over v-else @reset="start" />
    </div>
    <!-- 分数面板 -->
    <Panel />
  </main>
</template>
