class Snake {
  // 蛇的容器
  container: HTMLElement
  // 蛇头
  head: HTMLElement
  // 整条蛇
  bodies: HTMLCollectionOf<HTMLElement>

  constructor() {
    this.container = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div') as HTMLElement
    this.bodies = this.container.getElementsByTagName('div')
  }

  // 获取蛇头的 left
  get left(): number {
    return this.head.offsetLeft
  }

  // 设置蛇头的 left
  set left(left: number) {
    // 不能穿墙
    if (left < 0 || left > 290) {
      throw new Error('蛇撞到墙了')
    }
    // 如果两次的值不一样则修改
    if (this.left !== left) {
      // 移动身体
      this.moveBody()
      // 移动头部
      this.head.style.left = `${left}px`
      // 检测是否碰撞到身体
      this.checkCollision()
    }
  }

  // 获取蛇头的 top
  get top(): number {
    return this.head.offsetTop
  }

  // 设置蛇头的 top
  set top(top: number) {
    // 不能穿墙
    if (top < 0 || top > 290) {
      throw new Error('蛇撞到墙了')
    }
    // 如果两次的值不一样则修改
    if (this.top !== top) {
      // 移动身体
      this.moveBody()
      // 移动头部
      this.head.style.top = `${top}px`
      // 检测是否碰撞到身体
      this.checkCollision()
    }
  }

  // 增加身体
  addBody(currentLevel: number, maxLevel: number) {
    // 新增加的身体默认生成在左上角，先隐藏，在显示
    const element: HTMLElement = document.createElement('div')
    // 隐藏
    element.style.display = 'none'
    this.container.insertAdjacentElement('beforeend', element)
    // 显示
    setTimeout(() => {
      element.style.display = 'block'
    }, 300 - (currentLevel - 1) * (300 / maxLevel))
  }

  // 移动身体
  moveBody() {
    const length = this.bodies.length
    const lastElement = this.bodies[length - 1]
    lastElement.style.top = `${this.bodies[0].offsetTop}px`
    lastElement.style.left = `${this.bodies[0].offsetLeft}px`
    if (length > 2) {
      this.container.insertBefore(lastElement, this.bodies[1])
    }
  }

  // 身体碰撞检测
  checkCollision() {
    for (let i = 1; i < this.bodies.length; i += 1) {
      if (this.top === this.bodies[i].offsetTop && this.left === this.bodies[i].offsetLeft) {
        throw new Error('蛇碰撞到身体了')
      }
    }
  }

  // 重置
  reset() {
    this.head.style.top = `0`
    this.head.style.left = `0`
    while (this.bodies.length != 1) {
      const element = this.bodies[this.bodies.length - 1]
      element.parentNode?.removeChild(element)
    }
  }
}

export default Snake
