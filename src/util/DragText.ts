/*
 * @Date: 2022-03-27 14:56:48
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
 */

import DragItem from '@/util/extends/DragItem';

const fontHeight = 80;
class DragText extends DragItem {
  // 文字
  text: string = '';

  constructor({
    text = '',
    canvasWidth = 0,
    canvasHeight = 0,
    ctx = {} as CanvasRenderingContext2D,
  }: Partial<{
    text: string,
    canvasWidth: number,
    canvasHeight: number,
    ctx: CanvasRenderingContext2D,
  }>) {
    super({ width: 0, height: 0, x: 0, y: 0, ctx });
    // 在使用measureText之前先设置好font
    this.initFontConfig();
    const width = ctx.measureText(text).width;
    this.width = width;
    this.text = text;

    // 设置文字的初始位置 在画布的中下方
    this.x = canvasWidth / 2  - width / 2;
    this.y = canvasHeight - 50 - fontHeight / 2;

  }

  paint() {
    this.width = this.ctx.measureText(this.text).width;
    this.ctx.fillText(this.text, this.x, this.y);

    if (this.selected) {
      // 设置外框
      this.ctx.lineWidth = 3;
      this.ctx.setLineDash([15, 8]);
      this.ctx.lineDashOffset = 10;
      this.ctx.strokeStyle = 'red';
      // 生成一个矩形
      this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  initFontConfig() {
    // 基线在文字上
    this.ctx.textBaseline = 'top';
    // 设置字体大小和字体
    this.ctx.font = `${fontHeight}px sans-serif`;
    this.height = fontHeight;
  }
}

export default DragText;