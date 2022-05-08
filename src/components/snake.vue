<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useFood, usePanel } from '../composable'

type SnakeBody = Record<string, number>

// 食物位置信息
const { foodPosition, changeFoodPosition } = useFood()

// 蛇头位置
const x = ref<number>(0)
const y = ref<number>(0)

// 蛇的身体
const bodies = ref<SnakeBody[]>([])

// 分数等级面板
const { score, level } = usePanel()

const direction = ref<string>('')

const style = computed<string>(() => {
  return `transform: translate(${10 * x.value}px , ${10 * y.value}px)`
})

// 蛇的移动
const move = () => {
  // 移动身体
  const length = bodies.value.length
  if (length > 0) {
    const body = {
      x: x.value,
      y: y.value
    }
    bodies.value.pop()
    bodies.value.splice(0, 0, body)
  }
  // 蛇头移动
  switch (direction.value) {
    case 'ArrowUp':
      y.value -= 1
      break
    case 'ArrowRight':
      x.value += 1
      break
    case 'ArrowDown':
      y.value += 1
      break
    case 'ArrowLeft':
      x.value -= 1
      break
  }
  // 碰到墙壁, 游戏结束
  if (x.value < 0 || x.value > 29 || y.value < 0 || y.value > 29) return alert('over! collide border')
  // 碰到身体
  if (bodies.value.some(body => x.value === body.x && y.value === body.y)) return alert('over! collide body')
  // 吃到食物
  if (x.value === foodPosition.x && y.value === foodPosition.y) {
    // 改变食物的位置
    changeFoodPosition()
    // 增加分数
    score.value += 1
    // 增加身体
    bodies.value.push({
      x: x.value,
      y: y.value
    })
    // 增加等级
    if (score.value % 10 === 0) level.value += 1
  }
  setTimeout(move, 300 - (level.value - 1) * 30)
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
  <div class="snake">
    <div class="snake-head" :style="style"></div>
    <div
      class="snake-body"
      v-for="item in bodies"
      :style="`transform: translate(${10 * item.x}px , ${10 * item.y}px)`"
    ></div>
  </div>
</template>
