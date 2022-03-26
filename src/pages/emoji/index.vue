<!--
 * @Date: 2022-03-23 21:44:20
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
-->
<template>
  <view>
    <!-- 画布 -->
    <view class="vh-80 drawer">
      <canvas
        type="2d"
        id="canvas"
        style="width: 100%; height: 80vh"
        @touchstart="handleTouchstart"
      ></canvas>
    </view>
    <!-- 操作 -->
    <view class="operation">
      <button @click="chooseImage">选择图片</button>
    </view>
  </view>
</template>

<script>
import { createImage } from '@/util/index';
export default {
  data() {
    return {
      ctx: null,
      canvas: null,
    }
  },
  onLoad() {
    // 通过 SelectorQuery 获取 Canvas 节点
    wx.createSelectorQuery()
      .select('#canvas')
      .fields({
        node: true,
        size: true,
      })
      .exec(this.init.bind(this));
  },
  methods: {
    init(res) {
      if (res[0]) {
        const {width, height, node} = res[0];
        const canvas = node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        this.ctx = ctx;
        this.canvas = canvas;

        console.log(this.ctx, 'ctx');
        console.log(this.canvas, 'canvas');

        // ctx.scale(dpr, dpr)
        // 设置矩形的颜色为红色
        // ctx.fillStyle = 'red';
        // ctx.fillRect(0, 0, 100, 100);
        // ctx.draw();
      }
    },
    chooseImage() {
      uni.chooseImage({
        count: 1,
        sourceType: ["album"],
        success:  (res) => {
          const tempFilePaths = res.tempFilePaths[0];
          uni.getImageInfo({
            src: tempFilePaths,
            success: async (imageInfo) => {
              const { width, height, path } = imageInfo;
              const image = await createImage(path, this.canvas)

              this.ctx.drawImage(image, 0, 0, width, height);
            },
          });
        },
        fail: () => {
          console.log("图片选择失败");
        },
      });
    },
    handleTouchstart(e) {
      console.log(e);
    }
  },
};
</script>

<style lang="scss">
page {
  padding: 0 30rpx;
  box-sizing: border-box;
}
</style>

<style lang="scss" scoped>
.vh-80 {
  height: 80vh;
  border: 2rpx solid black;
}
</style>
