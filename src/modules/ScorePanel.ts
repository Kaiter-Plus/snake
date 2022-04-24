import { MAXLEVEL, NEXTLEVEL } from '../settings'

class ScorePanel {
  // 初始分数
  score: number = 0
  // 初始等级
  level: number = 1
  // 分数元素
  scoreElement: HTMLElement
  // 等级元素
  LevelElement: HTMLElement
  // 最大等级
  maxLevel: number
  // 每升一级需要的分数
  nextLevel: number

  constructor() {
    // 初始化元素
    this.scoreElement = document.getElementById('score')!
    this.LevelElement = document.getElementById('level')!
    // 初始化配置
    this.maxLevel = MAXLEVEL
    this.nextLevel = NEXTLEVEL
  }

  // 增加枫树
  addScore() {
    this.scoreElement.innerText = `${++this.score}`
    // 如果满足升级条件，升级
    if (this.score % this.nextLevel === 0 && this.level < this.maxLevel) {
      this.levelUp()
    }
  }

  // 升级
  levelUp() {
    this.LevelElement.innerText = `${++this.level}`
  }

  // 重置
  reset() {
    this.score = 0
    this.level = 1
    this.scoreElement.innerText = `${this.score}`
    this.LevelElement.innerText = `${this.level}`
  }
}

export default ScorePanel
