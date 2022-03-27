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

// 根据图片的宽高，返回图片的缩放比例
export function getScale(imageWidth:number, imageHeight:number): number {
  let scale = 1;
  // 获取最大的一边
  const canvasWidth = 343 * 2;
  const canvasHeight = 482 * 2;

  const heightDiff =  imageHeight - canvasHeight;
  const widthDiff = imageWidth - canvasWidth;

  if (heightDiff > widthDiff) {
    if (heightDiff > 0) {
      
      scale = canvasHeight / imageHeight;
    }
  } else {
    if (widthDiff > 0) {
      scale = canvasWidth / imageWidth;
    }
  }

  return scale;
}