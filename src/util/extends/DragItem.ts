/*
 * @Date: 2022-03-29 21:59:21
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 在画布中可拖拽的物体
 */


interface BaseInfo {
  width: number,
  height: number,
  x: number,
  y: number,
  selected?: boolean,
  ctx: CanvasRenderingContext2D,
}

// 抽象类
abstract class DragItem {
  width: number = 0;
  height: number = 0;
  x: number = 0;
  y: number = 0;
  centerX: number = 0;
  centerY: number = 0;
  selected: boolean = true;
  // 旋转的角度
  rotate: number = 0;
  ctx: CanvasRenderingContext2D

  constructor({
    width = 0,
    height = 0,
    x = 0,
    y = 0,
    ctx,
  }: BaseInfo) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.centerX = x + width / 2;
    this.centerY = y + height / 2;
    this.ctx = ctx;
  }

  // 必须在派生类中实现
  // 将该实例画到画布中
  abstract paint(): void;

  // 鼠标点下时，是否处于物体内部
  isInWhere(x: number, y: number): string {
    // 图片最右边的X坐标
    const rightX = this.x + this.width;
    // 图片最底部的Y坐标
    const bottomY = this.y + this.height;

    // 判断当前物体是否有旋转，如果有，则将点击的x,y坐标也根据物体中心旋转，得到的新xy坐标再判断是否处于物体内部

    if (this.rotate !== 0) {
      
    }

    let action = 'none';
    if (x >= this.x && x <= rightX && y >= this.y && y <= bottomY) {
      action = 'move';
    }

    return action;
  };


}


export default DragItem;