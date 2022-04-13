/*
 * @Date: 2022-03-29 21:59:21
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 在画布中可拖拽的物体
 */


interface BaseInfo {
  width: number,
  height: number,
  x: number,
  y: number,
  selected?: boolean,
  ctx: CanvasRenderingContext2D,
}

// 抽象类
abstract class DragItem {
  width: number = 0;
  height: number = 0;
  x: number = 0;
  y: number = 0;
  // 中心点坐标
  centerX: number = 0;
  centerY: number = 0;
  selected: boolean = true;
  // 旋转的角度
  rotate: number = 0;
  ctx: CanvasRenderingContext2D

  constructor({
    width = 0,
    height = 0,
    x = 0,
    y = 0,
    ctx,
  }: BaseInfo) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.centerX = x + width / 2;
    this.centerY = y + height / 2;
    this.ctx = ctx;
  }

  // 必须在派生类中实现
  // 将该实例画到画布中
  abstract paint(): void;

  // 鼠标点下时，是否处于物体内部
  isInWhere(x: number, y: number): string {
    // 图片最右边的X坐标
    const rightX = this.x + this.width;
    // 图片最底部的Y坐标
    const bottomY = this.y + this.height;

    // 判断当前物体是否有旋转
    if (this.rotate !== 0) {

    }

    let action = 'none';
    if (this.isPointInRect(x, y)) {
      action = 'move';
    }

    return action;
  };

  /**
 * 判断落点是否在长方形内
 * @param {Array} rect 长方形坐标, 按顺序分别是：左上、右上、左下、右下。 
 *                     数组：[[x1, y1], [x2, y2], [x3, y3], [x4, y4]]
 * @return {boolean} 
 */
  isPointInRect(touchX: number, touchY: number) {
    // 长方形的四个点的坐标
    const [x1, y1] = this.topLeft;
    const [x2, y2] = this.topRight;
    const [x3, y3] = this.bottomLeft;
    const [x4, y4] = this.bottomRight;
    // 四个向量
    const v1 = [x1 - touchX, y1 - touchY];
    const v2 = [x2 - touchX, y2 - touchY];
    const v3 = [x3 - touchX, y3 - touchY];
    const v4 = [x4 - touchX, y4 - touchY];

    if ((v1[0] * v2[1] - v2[0] * v1[1]) > 0
      && (v2[0] * v4[1] - v4[0] * v2[1]) > 0
      && (v4[0] * v3[1] - v3[0] * v4[1]) > 0
      && (v3[0] * v1[1] - v1[0] * v3[1]) > 0) {
      return true;
    } else {
      return false;
    }
  }

  // 获取左上角的坐标
  get topLeft() {
    const x = this.x;
    const y = this.y;

    return this.getEndPointByRotate(x, y);
  }

  // 右上角坐标
  get topRight() {
    const x = this.x + this.width;
    const y = this.y;

    return this.getEndPointByRotate(x, y);
  }

  // 左下角坐标
  get bottomLeft() {
    const x = this.x;
    const y = this.y + this.height;

    return this.getEndPointByRotate(x, y);

  }

  // 右下角坐标
  get bottomRight() {
    const x = this.x + this.width;
    const y = this.y + this.height;
    
    return this.getEndPointByRotate(x, y);
  }

  getEndPointByRotate(startX, startY) {
    const radian = this.rotate * Math.PI / 180;
    const [x1, y1] = [startX - this.centerX, startY - this.centerY];
    const x2 = x1 * Math.cos(radian) - y1 * Math.sin(radian);
    const y2 = x1 * Math.sin(radian) + y1 * Math.cos(radian);
    return [x2 + this.centerX, y2 + this.centerY];
  }

}


export default DragItem;