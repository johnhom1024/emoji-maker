/*
 * @Date: 2022-03-23 22:58:24
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
 */

import { createImage, getScale } from "@/util";
import DragImage from './DragImage';

class DragCanvas {
  ctx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
  canvas = {};
  canvasWidth = 0;
  canvasHeight = 0;
  pixelRatio = 1;

  // 记录鼠标点下的坐标
  clickInitialX = 0;
  clickInitialY = 0;

  // 画布中的图片
  imgArray: Array<DragImage> = [];

  // canvasClassIdName: 为canvas画布的节点类名id
  constructor(canvasClassIdName: string) {
    // 获取当前设备的pixelRatio
    this.pixelRatio = wx.getSystemInfoSync().pixelRatio;
    // 获取canvas画布的对象
    wx.createSelectorQuery()
      .select(canvasClassIdName)
      .fields({
        node: true,
        context: true,
        size: true,
      })
      .exec(this.init.bind(this));

  }

  init(res: Array<any>) {
    if (res[0]) {
      const { width, height, node } = res[0];

      this.canvasWidth = width * this.pixelRatio;
      this.canvasHeight = height * this.pixelRatio;


      const canvas = node;
      this.ctx = canvas.getContext('2d');
      this.canvas = canvas;
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
    }
  }


  async chooseImage(): Promise<void> {
    uni.chooseImage({
      count: 1,
      sourceType: ['album'],
      success: (res => {
        const tempFilePath = res.tempFilePaths[0];
        uni.getImageInfo({
          src: tempFilePath,
          success: async (imageInfo) => {
            const { width, height, path } = imageInfo;
            const imageEl = await createImage(path, this.canvas)
            this.drawImg(imageEl, width, height);
          }
        })
      })
    });
  }

  drawImg(imageEl: CanvasImageSource, width: number, height: number) {

    const x = 0;
    const y = 0;

    const scale = getScale(width, height);

    const dragImage = new DragImage({ imageEl, x, y, width: width * scale, height: height * scale, ctx: this.ctx })

    // 将imagepush进imgArray中
    this.imgArray.push(dragImage)

    dragImage.paint();
  }

  // 画出imgArray中的每个图片
  paint() {
    this.imgArray.forEach(dragImage => {
      dragImage.paint();
    });
  }

  fillText(text:string, x:number, y:number) {
    this.ctx.font = "48px sans-serif";
    this.ctx.fillText(text, x, y);
  }

  // 清除画布中的内容
  clearRect() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  // 清空画布
  clearCanvas() {
    this.imgArray = [];
    this.clearRect();
  }


  // touchstart事件
  touchstart(e: any) {
    const { x, y } = e.touches[0];

    this.clickInitialX = x * this.pixelRatio;
    this.clickInitialY = y * this.pixelRatio;

  }

  touchmove(e: any) {
    const { x, y } = e.touches[0];

    // 水平移动的距离
    const diffX = x * this.pixelRatio - this.clickInitialX;
    const diffY = y * this.pixelRatio - this.clickInitialY;

    // 调整imgArray中的图片位置
    this.imgArray.forEach(imgObj => {
      const { x: positionX, y: positionY } = imgObj;

      const finalX = positionX + diffX;
      const finalY = positionY + diffY;

      imgObj.x = finalX;
      imgObj.y = finalY;
    })

    // 画出imgArray中的图片

    this.clickInitialX = x * this.pixelRatio;
    this.clickInitialY = y * this.pixelRatio;

    this.clearRect();
    this.paint();
  }

  save() {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: this.canvasWidth,
      height: this.canvasHeight,
      canvas: this.canvas,
      complete(res:any) {
        if (res.errMsg === 'canvasToTempFilePath:ok') {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.showToast({
                title: '图片保存成功',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  }

}

export default DragCanvas;