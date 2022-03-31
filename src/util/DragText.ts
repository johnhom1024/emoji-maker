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
    height = 48,
    x = 0,
    y = 0,
    ctx = {} as CanvasRenderingContext2D,
  }: Partial<{
    text: string,
    height: number,
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
  }>) {
    super({ width: 0, height, x, y, ctx });
    // 在使用measureText之前先设置好font
    this.initFontConfig();
    const width = ctx.measureText(text).width;
    this.width = width;
    this.text = text;
  }

  paint() {
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

  initFontConfig() {
    // 基线在文字上那个
    this.ctx.textBaseline = 'hanging';
    // 设置字体大小和字体
    this.ctx.font = "48px sans-serif";
  }
}

export default DragText;