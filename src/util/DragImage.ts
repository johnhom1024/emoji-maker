/*
 * @Date: 2022-03-26 21:39:44
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
 */

// util
import DragItem from '@/util/extends/DragItem';
import { createImage, isPointInRect } from '@/util';

// image
const CloseIcon = '/static/close.png';
const ScaleIcon = '/static/scale.png';

interface IconObj {
  path: string,
  width: number,
  height: number,
  x: number,
  y: number,
}
class DragImage extends DragItem {
  // img的dom节点
  imageEl: CanvasImageSource;
  canvas: object;

  centerX: number = 0; // 中心的x轴坐标
  centerY: number = 0; // 中心的Y轴坐标

  // 旋转的角度
  rotate: number = 0;

  // 关闭icon的dom节点
  closeIconObj = {} as IconObj;

  scaleIconObj = {} as IconObj;

  // 静态属性，记录icon不变的属性
  static closeIconInfo: {
    inited: boolean,
    el: CanvasImageSource,
    width: number,
    height: number,
    path: string,
  };

  static scaleIconInfo: {
    inited: boolean,
    el: CanvasImageSource,
    width: number,
    height: number,
    path: string,
  };

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
    this.ctx.save();
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
    // 变更原点至图片的中点
    this.ctx.translate(this.centerX, this.centerY);
    //根据transform的旋转角度旋转坐标轴 角度 * PI / 180 得到弧度
    this.ctx.rotate(this.rotate * Math.PI / 180);
    //变更回来
    this.ctx.translate(-this.centerX, -this.centerY);

    this.ctx.drawImage(this.imageEl, this.x, this.y, this.width, this.height)
    // 如果为选中状态，则画出虚线边框
    if (this.selected) {
      // 设置线段和距离的长度
      this.ctx.lineWidth = 3;
      this.ctx.setLineDash([15, 8]);
      this.ctx.lineDashOffset = 10;
      this.ctx.strokeStyle = 'red';
      // 生成一个矩形
      this.ctx.strokeRect(this.x, this.y, this.width, this.height);
      // this.ctx.stroke();
      this.drawCloseIcon();
      this.drawScaleIcon();

    }
    this.ctx.restore();
  }

  // 在左上角画出关闭icon
  async drawCloseIcon() {
    // 如果没有初始化dom节点
    if (!DragImage.closeIconInfo.inited) {
      const closeEl = await createImage(CloseIcon, this.canvas);
      // 将dom节点放在类的静态变量里，减少内存占用
      DragImage.closeIconInfo = {
        ...DragImage.closeIconInfo,
        el: closeEl,
        // 设置初始化成功
        inited: true,
      }
    }

    // 初始化实例内部的closeIcon
    if (!this.closeIconObj.path) {
      const { path, width, height } = DragImage.closeIconInfo;
      this.closeIconObj = {
        path,
        width,
        height,
        x: 0,
        y: 0,
      }
    }

    const { width, height } = this.closeIconObj;
    const { el } = DragImage.closeIconInfo;

    const closeX = this.x - width / 2;
    const closeY = this.y - height / 2;
    this.closeIconObj.x = closeX;
    this.closeIconObj.y = closeY;

    this.ctx.drawImage(el, closeX, closeY, width, height);
  }

  // 右下角画出放大icon
  async drawScaleIcon() {
    if (!DragImage.scaleIconInfo.inited) {
      const scaleEl = await createImage(ScaleIcon, this.canvas);
      // 将dom节点放在类的静态变量里，减少内存占用
      DragImage.scaleIconInfo = {
        ...DragImage.scaleIconInfo,
        el: scaleEl,
        // 设置初始化成功
        inited: true,
      }
    }

    // 初始化实例内部的closeIcon
    if (!this.scaleIconObj.path) {
      const { width, height, path } = DragImage.scaleIconInfo;
      // 初始化变量
      this.scaleIconObj = {
        x: 0,
        y: 0,
        width,
        height,
        path
      }
    }

    const { width, height } = this.scaleIconObj;
    const { el } = DragImage.scaleIconInfo;

    // x坐标
    const scaleX = this.x + this.width - width / 2;
    const scaleY = this.y + this.height - height / 2;
    this.scaleIconObj.x = scaleX;
    this.scaleIconObj.y = scaleY;
    this.ctx.drawImage(el, scaleX, scaleY, width, height);
  }

  // 鼠标点下时，是否处于当前图片内部
  isInWhere(x: number, y: number): string {
    let action = super.isInWhere(x, y);

    // 判断点击位置是否处于closeIcon区域内
    if (this.isInCloseIcon(x, y)) {
      action = 'close';
    }

    if (this.isInScaleIcon(x, y)) {
      action = 'transform';
    }

    return action;

  }

  // 如果为true，则说明鼠标点击到了closeIcon区域内
  isInCloseIcon(x: number, y: number): boolean {
    // 判断点击位置是否处于closeIcon区域内
    const { x: closeX, y: closeY, width, height } = this.closeIconObj;

    return isPointInRect({
      touch: {
        x,
        y,
      },
      rect: {
        x: closeX,
        y: closeY,
        width,
        height,
      },
      centerPoint: {
        x: this.centerX,
        y: this.centerY,
      },
      rotate: this.rotate
    })
  }

  // 如果为true，则说明鼠标点击到了scaleIcon区域内
  isInScaleIcon(x: number, y: number): boolean {
    const { x: scaleX, y: scaleY, width, height } = this.scaleIconObj;

    return isPointInRect({
      touch: {
        x,
        y,
      },
      rect: {
        x: scaleX,
        y: scaleY,
        width,
        height,
      },
      centerPoint: {
        x: this.centerX,
        y: this.centerY,
      },
      rotate: this.rotate
    })
  }

  drawScaleIconTopLeftPoint() {
    const { x: scaleX, y: scaleY } = this.scaleIconObj;

    const [endX, endY] = this.getEndPointByRotate(scaleX, scaleY);

    this.ctx.beginPath();
    this.ctx.arc(endX, endY, 10, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  static initIcon() {
    DragImage.initCloseIcon();
    DragImage.initScaleIcon();
  }

  static initCloseIcon() {
    return new Promise((resolve, reject) => {
      uni.getImageInfo({
        src: CloseIcon,
        success: async (imageInfo) => {
          const { width, height } = imageInfo;

          DragImage.closeIconInfo = {
            el: {} as CanvasImageSource,
            inited: false,
            width,
            height,
            path: CloseIcon
          }
          resolve(true);
        },
        fail: (error) => {
          reject(error);
        },
      })
    })
  }

  static initScaleIcon() {
    return new Promise((resolve, reject) => {
      uni.getImageInfo({
        src: ScaleIcon,
        success: async (imageInfo) => {
          const { width, height } = imageInfo;

          DragImage.scaleIconInfo = {
            el: {} as CanvasImageSource,
            inited: false,
            width,
            height,
            path: ScaleIcon
          }
          resolve(true);
        },
        fail: (error) => {
          reject(error);
        },
      })
    })
  }
}

// 初始化icon
DragImage.initIcon();

export default DragImage;