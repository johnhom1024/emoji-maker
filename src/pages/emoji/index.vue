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
        @touchmove="handleTouchmove"
      ></canvas>
    </view>
    <!-- 操作 -->
    <view class="operation">
      <button @click="chooseImage">选择图片</button>
      <button @click="clearCanvas">清除画布</button>
    </view>
  </view>
</template>

<script>

import { createImage, getScale } from '@/util/index';
import DragCanvas from '@/util/DragCanvas';

export default {
  data() {
    return {
      dragCanvasInstance: null,
    }
  },
  onLoad() {
    this.dragCanvasInstance = new DragCanvas('#canvas');
  },
  methods: {
    chooseImage() {
      this.dragCanvasInstance.chooseImage();
    },
    handleTouchstart(e) {
      this.dragCanvasInstance.touchstart(e);
    },
    clearCanvas() {
      this.dragCanvasInstance.clearCanvas();
    },
    handleTouchmove(e) {
      this.dragCanvasInstance.touchmove(e);
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
