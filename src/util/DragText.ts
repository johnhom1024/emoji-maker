/*
 * @Date: 2022-03-27 14:56:48
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
 */
class DragText {
  // 文字
  text: string = '';
  x: number = 0;
  y: number = 0;
  selected = true;
  ctx: CanvasRenderingContext2D

  constructor({
    text = '',
    x = 0,
    y = 0,
    ctx = {} as CanvasRenderingContext2D
  }: Partial<{
    text: string,
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
  }>) {
    this.text = text,
    this.x = x;
    this.y = y;
    this.ctx = ctx;
  }

  paint() {
    this.ctx.font = "48px sans-serif";
    this.ctx.fillText(this.text, this.x, this.y);
  }
}

export default DragText;