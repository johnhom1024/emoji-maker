/*
 * @Date: 2022-03-24 11:40:07
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
 */

/**
* 图片要放在 image 里才可以被 canvas 渲染
* @param { String } src 本地临时文件路径
* @param { Object } canvas canvas实例
* @return { Promise } promise返回 image 实例
*/
export function createImage(src: string, canvas: any): Promise<any> {
  // 新建一个图片实例
  const image = canvas.createImage()
  image.src = src

  return new Promise((resolve, reject) => {
    try {
      image.onload = (e: any) => {
        // console.log('iamge-loaded', src, e)
        resolve(image)
      }
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * @description: 判断给出的坐标是否在矩形内部
 * @param {object} touch 点击的坐标 {x, y}
 * @param {object} rect 矩形的信息
 * {
 *  x: number 左上角x轴坐标
 *  y: number 左上角y轴坐标
 *  width: number 宽
 *  height: number 高度
 * }
 * @param {object} centerPoint 旋转的中心坐标 {x, y}
 * @param {number} rotate 矩形旋转的角度
 * @return {boolean}
 */
export function isPointInRect({ touch = { x: 0, y: 0 }, rect = { x: 0, y: 0, width: 0, height: 0 }, centerPoint = { x: 0, y: 0 }, rotate = 0 } = {}) {
  const { x: rectX, y: rectY } = rect;
  // 拿到矩形的四个点的坐标
  let topLeft = [rectX, rectY];
  let topRight = [rectX + rect.width, rectY];
  let bottomLeft = [rectX, rectY + rect.height];
  let bottomRight = [rectX + rect.width, rectY + rect.height];

  // 四个点经过旋转处理
  [topLeft, topRight, bottomLeft, bottomRight] = [topLeft, topRight, bottomLeft, bottomRight].map(point => {
    const [startX, startY] = point;
    return getEndPointByRotate({
      startPoint: {
        x: startX,
        y: startY,
      },
      centerPoint: {
        x: centerPoint.x,
        y: centerPoint.y,
      },
      rotate
    })
  })

  const touchX = touch.x;
  const touchY = touch.y;

  const [x1, y1] = topLeft;
  const [x2, y2] = topRight;
  const [x3, y3] = bottomLeft;
  const [x4, y4] = bottomRight;
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

/**
 * @description: 获得坐标经过某个点旋转之后的新坐标
 * @param {object} startPoint {x: number, y: number}
 * @param {object} centerPoint {x: number, y: number}
 * @param {number} rotate
 * @return {object} {x, y} 返回新的坐标
 */
export function getEndPointByRotate({ startPoint = { x: 0, y: 0 }, centerPoint = { x: 0, y: 0 }, rotate = 0 } = {}) {
  const { x: startX, y: startY } = startPoint;
  const { x: centerX, y: centerY } = centerPoint;

  const radian = rotate * Math.PI / 180;
  const [x1, y1] = [startX - centerX, startY - centerY];
  const x2 = x1 * Math.cos(radian) - y1 * Math.sin(radian);
  const y2 = x1 * Math.sin(radian) + y1 * Math.cos(radian);
  return [x2 + centerX, y2 + centerY];
}