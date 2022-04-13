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
    el?: CanvasImageSource,
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
    let closeIconEl = {} as CanvasImageSource;
    if (!el) {
      closeIconEl = await createImage(path, this.canvas);
      DragImage.closeIconObj.el = closeIconEl;
    } else {
      closeIconEl = el;
    }

    this.ctx.drawImage(closeIconEl, this.x - width / 2, this.y - height / 2, width, height);
  }

  // 鼠标点下时，是否处于当前图片内部
  isInWhere(x: number, y: number): string {
    let action = super.isInWhere(x, y);

    // 判断点击位置是否处于closeIcon区域内
    const { el, path, width, height } = DragImage.closeIconObj;
    const closeX = this.x - width / 2;
    const closeY = this.y - height / 2;

    // 如果为true，则说明鼠标点击到了删除按钮
    if (x >= closeX && x <= closeX + width && y >= closeY && y <= closeY + height) {
      action = 'close';
    }

    return action;

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