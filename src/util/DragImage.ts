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
  }

}

export default DragImage;