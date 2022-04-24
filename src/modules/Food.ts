import { getRandom } from '../utils/index'

class Food {
  element: HTMLElement

  constructor() {
    // 后面的 ! 表示该元素不可能为 null
    this.element = document.getElementById('food')!
  }

  // 获取食物的 x 坐标
  get left() {
    return this.element.offsetLeft
  }

  // 获取食物的 x 坐标
  get top() {
    return this.element.offsetTop
  }

  // 改变位置
  changePosition() {
    const top = getRandom(0, 29) * 10
    const left = getRandom(0, 29) * 10
    this.element.style.top = `${top}px`
    this.element.style.left = `${left}px`
  }

}


export default Food