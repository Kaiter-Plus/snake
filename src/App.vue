<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import Food from './components/food.vue'
import Panel from './components/panel.vue'
import Snake from './components/snake.vue'
import { useFood, usePanel, useSnake } from './composable'

// 蛇
const { snakeHeadPosition, direction, bodies } = useSnake()
// 食物
const { foodPosition, changeFoodPosition } = useFood()
// 分数等级面板
const { score, level } = usePanel()

// 蛇的移动
const move = () => {
  // 移动身体
  const length = bodies.value.length
  if (length > 0) {
    const body = {
      x: snakeHeadPosition.x,
      y: snakeHeadPosition.y
    }
    bodies.value.pop()
    bodies.value.splice(0, 0, body)
  }
  // 蛇头移动
  switch (direction.value) {
    case 'ArrowUp':
      snakeHeadPosition.y -= 1
      break
    case 'ArrowRight':
      snakeHeadPosition.x += 1
      break
    case 'ArrowDown':
      snakeHeadPosition.y += 1
      break
    case 'ArrowLeft':
      snakeHeadPosition.x -= 1
      break
  }
  // 碰到墙壁, 游戏结束
  if (snakeHeadPosition.x < 0 || snakeHeadPosition.x > 29 || snakeHeadPosition.y < 0 || snakeHeadPosition.y > 29)
    return gameOver('over! collide border')
  // 碰到身体
  if (bodies.value.some(body => snakeHeadPosition.x === body.x && snakeHeadPosition.y === body.y))
    return gameOver('over! collide body')
  // 吃到食物
  if (snakeHeadPosition.x === foodPosition.x && snakeHeadPosition.y === foodPosition.y) {
    foodEaten()
    // 增加身体
    bodies.value.push({
      x: snakeHeadPosition.x,
      y: snakeHeadPosition.y
    })
  }
  setTimeout(move, 300 - (level.value - 1) * 30)
}

// 吃到食物
const foodEaten = () => {
  // 改变食物的位置
  changeFoodPosition()
  // 增加分数
  score.value += 1
  // 增加等级
  if (score.value % 10 === 0 && level.value <= 10) level.value += 1
}

// 游戏结束提示
const gameOver = (message: string) => {
  alert(message)
}

const keydownHandler = (e: KeyboardEvent) => {
  if (/Arrow.+/.test(e.key)) {
    let tempDirection = e.key
    // 如果有身体了，则蛇不能回头
    if (bodies.value[0]) {
      if (direction.value === 'ArrowUp' && e.key === 'ArrowDown') tempDirection = 'ArrowUp'
      if (direction.value === 'ArrowDown' && e.key === 'ArrowUp') tempDirection = 'ArrowDown'
      if (direction.value === 'ArrowLeft' && e.key === 'ArrowRight') tempDirection = 'ArrowLeft'
      if (direction.value === 'ArrowRight' && e.key === 'ArrowLeft') tempDirection = 'ArrowRight'
    }
    direction.value = tempDirection
  }
}

onMounted(() => {
  document.addEventListener('keydown', keydownHandler)
  move()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', keydownHandler)
})
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
