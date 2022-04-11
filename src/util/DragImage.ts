/*
 * @Date: 2022-03-26 21:39:44
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
 */

// util
import DragItem from '@/util/extends/DragItem';
import { createImage } from '@/util';

// image
const CloseIcon = '/static/image/close.png';
const ScaleIcon = '/static/image/transform.png';
class DragImage extends DragItem {
  // img的dom节点
  imageEl: CanvasImageSource;
  canvas: object;

  constructor({
    imageEl = {} as CanvasImageSource,
    width = 0,
    height = 0,
    x = 0,
    y = 0,
    ctx = {} as CanvasRenderingContext2D,
    canvas = {}
  }: Partial<{
    imageEl: CanvasImageSource,
    width: number,
    height: number,
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
    canvas: object,
  }>) {
    super({ width, height, x, y, ctx });
    this.imageEl = imageEl;
    this.canvas = canvas;
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
      this.drawCloseIcon();
    }

    // this.ctx.restore();
  }

  drawCloseIcon() {
    uni.getImageInfo({
      src: CloseIcon,
      success: async (imageInfo) => {
        const { width, height } = imageInfo;
      },
    })
  }

  static initIcon() {
    
  }

}

export default DragImage;