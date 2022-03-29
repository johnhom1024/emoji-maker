/*
 * @Date: 2022-03-27 14:56:48
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
 */

import DragItem from '@/util/extends/DragItem';
class DragText extends DragItem {
  // 文字
  text: string = '';

  constructor({
    text = '',
    width = 0,
    height = 48,
    x = 0,
    y = 0,
    ctx = {} as CanvasRenderingContext2D,
  }: Partial<{
    text: string,
    width: number,
    height: number,
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
  }>) {
    super({ width, height, x, y, ctx });
    this.text = text;
  }

  paint() {
    this.ctx.font = "48px sans-serif";
    this.ctx.fillText(this.text, this.x, this.y);

    if (this.selected) {
      // 设置外框
      this.ctx.setLineDash([10, 10]);
      this.ctx.lineDashOffset = 10;
      this.ctx.strokeStyle = 'red';
      // 生成一个矩形
      this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}

export default DragText;