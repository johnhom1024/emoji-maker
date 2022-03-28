/*
 * @Date: 2022-03-26 21:39:44
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
 */

class DragImage {
  // img的dom节点
  imageEl: CanvasImageSource;
  width: number = 0;
  height: number = 0;
  x: number = 0;
  y: number = 0;
  selected = true;
  ctx: CanvasRenderingContext2D

  constructor({
    imageEl = {} as CanvasImageSource,
    width = 0,
    height = 0,
    x = 0,
    y = 0,
    ctx = {} as CanvasRenderingContext2D
  }: Partial<{
    imageEl: CanvasImageSource,
    width: number,
    height: number,
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
  }>) {
    this.imageEl = imageEl;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
  }

  // 将该图片画在画布中
  paint() {
    this.ctx.drawImage(this.imageEl, this.x, this.y, this.width, this.height)
    // 如果为选中状态，则画出虚线边框
    if (this.selected) {
      // 设置线段和距离的长度
      this.ctx.setLineDash([10, 10]);
      this.ctx.lineDashOffset = 10;
      this.ctx.strokeStyle = 'red';
      // 生成一个矩形
      this.ctx.strokeRect(this.x, this.y, this.width, this.height);
      // this.ctx.stroke();
    }

    // this.ctx.restore();
  }

  // 鼠标点下时，是否处于该图片内部
  isToggle(x:number, y:number) {
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
  }

}

export default DragImage;