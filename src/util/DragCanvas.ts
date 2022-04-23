/*
 * @Date: 2022-03-23 22:58:24
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
 */

import { createImage, getScale } from "@/util";
import DragItem from '@/util/extends/DragItem';
import DragCustomEvent from './DragCustomEvent';
import DragImage from './DragImage';
import DragText from './DragText';
import { isEmpty } from 'lodash-es';
class DragCanvas {
  ctx = {} as CanvasRenderingContext2D;
  canvas = {};
  canvasWidth = 0;
  canvasHeight = 0;
  pixelRatio = 1;

  // 拖拽点击事件
  dragCustomEvent = {} as DragCustomEvent;

  // 记录鼠标点下的坐标
  clickInitialX = 0;
  clickInitialY = 0;


  selectedDragItem = {
    obj: {} as DragItem,
    action: 'none',
    index: 0,
  }

  // 画布中的物体数组
  dragArray: Array<DragItem> = [];

  // canvasClassIdName: 为canvas画布的节点类名id
  constructor(canvasClassIdName: string) {
    // 初始化自定义的订阅发布事件
    this.dragCustomEvent = new DragCustomEvent();
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
            await this.drawImg(path, width, height);
          }
        })
      })
    });
  }

  // 将图片画到canvas中
  async drawImg(path: string, width: number, height: number): Promise<DragImage> {
    width = width * this.pixelRatio;
    height = height * this.pixelRatio;
    
    const imageEl = await createImage(path, this.canvas)

    // 将图片生成在正中间
    const centerCanvasX = this.canvasWidth / 2;
    const centerCavnasY = this.canvasHeight / 2;

    const imageX = centerCanvasX - width / 2;
    const imageY = centerCavnasY - height / 2;

    const scale = getScale(width, height);


    const dragImage = new DragImage({ imageEl, x: imageX, y: imageY, width: width * scale, height: height * scale, ctx: this.ctx, canvas: this.canvas })

    // 将image push进dragArray中
    this.dragArray.push(dragImage)

    dragImage.paint();

    return dragImage;
  }

  // 画出dragArray中的每个物体
  paint() {
    this.dragArray.forEach(dragItem => {
      dragItem.paint();
    })
  }

  // 在画布的底部中间位置生成文字
  fillText(text: string): DragText {
    const textItem = new DragText({ text, canvasHeight: this.canvasHeight, canvasWidth: this.canvasWidth, ctx: this.ctx });
    this.dragArray.push(textItem);
    textItem.paint();
    return textItem;
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

    // 清空对象
    this.selectedDragItem = {
      obj: {} as DragItem,
      index: 0,
      action: 'none'
    }

    this.dragArray.forEach((item, index) => {
      // 先将所有的拖拽元素selected属性设置为false
      item.selected = false;

      // 将最后一个处于选中区域的元素赋值给lastItem
      const action = item.isInWhere(this.clickInitialX, this.clickInitialY);
      if (action !== 'none') {
        this.selectedDragItem = {
          obj: item,
          action,
          index,
        }
      }
    })

    // 如果lastItem不为空对象
    if (Object.keys(this.selectedDragItem.obj).length) {
      const { obj, action, index } = this.selectedDragItem;
      // 设置selected属性为true
      obj.selected = true;
      // 发射选中事件      
      this.dragCustomEvent.emit('selected', obj);

      switch (action) {
        case 'close':
          // 删除对应的元素
          this.dragArray.splice(index, 1);
          break;

        default:
          break;
      }
    }

    this.paint();
  }

  touchmove(e: any) {
    let { x, y } = e.touches[0];

    x = x * this.pixelRatio;
    y = y * this.pixelRatio;
    // 水平移动的距离
    const diffX = x - this.clickInitialX;
    const diffY = y - this.clickInitialY;

    // 处理action
    const { action, obj } = this.selectedDragItem;
    if (!isEmpty(obj)) {
      const { x: positionX, y: positionY, centerX, centerY, rotate } = obj;
      switch (action) {
        // 处理旋转
        case 'transform':
          //算出手指按下时形成的角度，注意y坐标在第一个参数
          const angleBefore = Math.atan2(this.clickInitialY - centerY, this.clickInitialX - centerX) / Math.PI * 180;
          //算出手指移动时形成的角度，注意y坐标在第一个参数
          const angleAfter = Math.atan2(y - centerY, x - centerX) / Math.PI * 180;
          // 旋转的角度
          obj.rotate = rotate + angleAfter - angleBefore;
          break;
        // 处理移动
        case 'move':
          const finalX = positionX + diffX;
          const finalY = positionY + diffY;

          obj.x = finalX;
          obj.y = finalY;
          break;
        default:
          break;
      }
    }

    this.clickInitialX = x;
    this.clickInitialY = y;

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

  // 事件订阅

  on(event: string, fn: Function) {
    return this.dragCustomEvent.on(event, fn);
  }

}

export default DragCanvas;