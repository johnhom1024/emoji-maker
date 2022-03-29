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
  selected: boolean = true;
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
    this.ctx = ctx;
  }

  // 必须在派生类中实现
  // 将该实例画到画布中
  abstract paint(): void;

  // 鼠标点下时，是否处于物体内部
  isToggleInside(x: number, y: number): boolean {
     // 图片最右边的X坐标
     const rightX = this.x + this.width;
     // 图片最底部的Y坐标
     const bottomY = this.y + this.height;
 
 
     if (x >= this.x && x <= rightX && y >= this.y && y <= bottomY) {
       this.selected = true;
     } else {
       this.selected = false;
     }
 
     return this.selected;
  };


}


export default DragItem;