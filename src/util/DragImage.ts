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
const CloseIcon = '/static/close.png';
const ScaleIcon = '/static/transform.png';
class DragImage extends DragItem {
  // img的dom节点
  imageEl: CanvasImageSource;
  canvas: object;

  // 静态属性
  // 关闭icon的dom节点
  static closeIconObj: {
    el?: object,
    path: string,
    width: number,
    height: number,
  }

  static scaleIconObj: {
    path: string,
    width: number,
    height: number,
  }


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

  async drawCloseIcon() {
    const { el, path, width, height } = DragImage.closeIconObj;
    let closeIconEl = null;
    if (!el) {
      closeIconEl = await createImage(path, this.canvas);
      DragImage.closeIconObj.el = closeIconEl;
    } else {
      closeIconEl = el;
    }

    this.ctx.drawImage(closeIconEl, this.x - width / 2, this.y - height / 2, width, height);
  }

  static initIcon() {

    // 获取closeIcon的信息
    uni.getImageInfo({
      src: CloseIcon,
      success: (imageInfo) => {
        const { width, height } = imageInfo;
        DragImage.closeIconObj = {
          path: CloseIcon,
          width,
          height
        }
      }
    })

    // 获取scale-icon的信息
    uni.getImageInfo({
      src: ScaleIcon,
      success: (imageInfo) => {
        const { width, height } = imageInfo;
        DragImage.scaleIconObj = {
          path: ScaleIcon,
          width,
          height,
        }
      }
    })
  }
}

// 初始化静态变量
DragImage.initIcon();

export default DragImage;