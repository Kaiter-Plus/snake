import Food from './Food'
import Snake from './Snake'
import ScorePanel from './ScorePanel'
import Direction from './Direction'

// 游戏控制器
class GameController {
  // 食物
  food: Food
  // 蛇
  snake: Snake
  // 积分，等级面板
  scorePanel: ScorePanel
  // 方向
  direction: Direction | null = null
  // 游戏是否结束
  isEnd: boolean = false
  // 游戏运行窗口
  stage: HTMLElement
  // 游戏结束窗口
  over: HTMLElement
  // 再来一局按钮
  reset: HTMLElement

  constructor() {
    this.food = new Food()
    this.snake = new Snake()
    this.scorePanel = new ScorePanel()
    this.stage = document.getElementById('stage')!
    this.over = document.getElementById('over')!
    this.reset = document.getElementById('reset')!
    this.init()
  }

  // 游戏初始化
  init() {
    // 添加键盘按下事件
    document.addEventListener('keydown', this.keyDownHandler.bind(this))
    // 随机生成食物的位置
    this.food.changePosition()
    // 控制蛇的移动
    this.snakeMove()
    // 再来一局
    this.reset.addEventListener('click', this.gameReset.bind(this))
  }

  // 键盘事件处理函数
  keyDownHandler(e: KeyboardEvent) {
    const key: string | undefined = e.key.match(/Arrow(.+)/)?.[1].toUpperCase()

    if (key) {
      // 当有身体时，不能直接反方向回头
      if (this.snake.bodies[1]) {
        // @ts-ignore
        if (this.direction === Direction.UP && Direction[key] === Direction.DOWN) {
          this.direction = Direction.UP
          return
        }
        // @ts-ignore
        if (this.direction === Direction.DOWN && Direction[key] === Direction.UP) {
          this.direction = Direction.DOWN
          return
        }
        // @ts-ignore
        if (this.direction === Direction.LEFT && Direction[key] === Direction.RIGHT) {
          this.direction = Direction.LEFT
          return
        }
        // @ts-ignore
        if (this.direction === Direction.RIGHT && Direction[key] === Direction.LEFT) {
          this.direction = Direction.RIGHT
          return
        }
      }
      // @ts-ignore
      this.direction = Direction[key]
    }
  }

  // 控制蛇的移动
  snakeMove() {
    let top: number = this.snake.top
    let left: number = this.snake.left

    console.log(top, left);
    

    switch (this.direction) {
      case Direction.UP:
        top -= 10
        break
      case Direction.DOWN:
        top += 10
        break
      case Direction.LEFT:
        left -= 10
        break
      case Direction.RIGHT:
        left += 10
        break
    }
    // 设置蛇头的位置
    try {
      this.snake.top = top
      this.snake.left = left
    } catch (err: any) {
      this.gameOver()
    }
    // 判断是否吃到食物了
    this.eatenFood(top, left)
    // 点击一次之后自动移动
    !this.isEnd && setTimeout(this.snakeMove.bind(this), 300 - (this.scorePanel.level - 1) * (300 / this.scorePanel.maxLevel))
  }

  // 吃到食物
  eatenFood(top: number, left: number) {
    if (this.food.top === top && this.food.left == left) {
      // 改变食物的位置
      this.food.changePosition()
      // 增加分数
      this.scorePanel.addScore()
      // 增加蛇的身体
      this.snake.addBody(this.scorePanel.level, this.scorePanel.maxLevel)
    }
  }

  // 游戏结束
  gameOver() {
    this.stage.style.display = 'none'
    this.over.style.display = 'flex'
    // 重置蛇
    this.snake.reset()
    // 重置方向
    this.direction = null
    // 设置结束状态
    this.isEnd = true
  }

  // 再来一局
  gameReset() {
    // 重置分数等级
    this.scorePanel.reset()
    // 重置食物位置
    this.food.changePosition()
    // 显示游戏窗口
    this.stage.style.display = 'block'
    // 隐藏结束游戏窗口
    this.over.style.display = 'none'
    // 设置结束状态
    this.isEnd = false
    // 控制蛇的移动
    this.snakeMove()
  }
}

export default GameController
