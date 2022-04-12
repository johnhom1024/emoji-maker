/*
 * @Date: 2022-03-23 22:58:24
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
 */

import { createImage, getScale } from "@/util";
import DragItem from '@/util/extends/DragItem';
import DragImage from './DragImage';
import DragText from './DragText';
class DragCanvas {
  ctx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
  canvas = {};
  canvasWidth = 0;
  canvasHeight = 0;
  pixelRatio = 1;

  // 记录鼠标点下的坐标
  clickInitialX = 0;
  clickInitialY = 0;

  // 画布中的物体数组
  dragArray: Array<DragItem> = [];

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

  // 将图片画到canvas中
  drawImg(imageEl: CanvasImageSource, width: number, height: number) {

    const x = 0;
    const y = 0;

    const scale = getScale(width, height);

    const dragImage = new DragImage({ imageEl, x, y, width: width * scale, height: height * scale, ctx: this.ctx, canvas: this.canvas })

    // 将image push进dragArray中
    this.dragArray.push(dragImage)

    dragImage.paint();
  }

  // 画出dragArray中的每个物体
  paint() {

    this.dragArray.forEach(dragItem => {
      dragItem.paint();
    })
  }

  fillText(text: string) {
    const x = 100;
    const y = 100;
    
    const textItem = new DragText({ text, x, y, ctx: this.ctx });

    this.dragArray.push(textItem);
    textItem.paint();
  }

  // 清除画布中的内容
  clearRect() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  // 清空画布
  clearCanvas() {
    this.dragArray = [];
    this.clearRect();
  }


  // touchstart事件
  touchstart(e: any) {
    const { x, y } = e.touches[0];

    this.clickInitialX = x * this.pixelRatio;
    this.clickInitialY = y * this.pixelRatio;

    // 先清除画布
    this.clearRect();
    // 重新渲染
    let isSelected = false;

    // 倒过来遍历数组
    for (let index = this.dragArray.length - 1; index >= 0; index--) {
      const dragItem = this.dragArray[index];

      if (!isSelected) {
        isSelected = dragItem.isToggleInside(this.clickInitialX, this.clickInitialY);
      } else {
        // 剩余的图片要取消选中
        dragItem.selected = false;
      }
    }

    this.dragArray.forEach(dragItem => {
      dragItem.paint();
    })
  }

  touchmove(e: any) {
    const { x, y } = e.touches[0];

    // 水平移动的距离
    const diffX = x * this.pixelRatio - this.clickInitialX;
    const diffY = y * this.pixelRatio - this.clickInitialY;

    // 调整dragArray中的图片位置
    this.dragArray.forEach(dragItem => {
      const { x: positionX, y: positionY, selected = false } = dragItem;

      if (!selected) {
        return;
      }
      const finalX = positionX + diffX;
      const finalY = positionY + diffY;

      dragItem.x = finalX;
      dragItem.y = finalY;
    })

    // 画出dragArray中的图片

    this.clickInitialX = x * this.pixelRatio;
    this.clickInitialY = y * this.pixelRatio;

    this.clearRect();
    this.paint();
  }

  // 生成图片，并且保存到相册中
  save() {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: this.canvasWidth,
      height: this.canvasHeight,
      canvas: this.canvas,
      complete(res: any) {
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

  translate() {
    this.ctx.translate(100, 100);
  }

}

export default DragCanvas;