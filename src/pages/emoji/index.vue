<!--
 * @Date: 2022-03-23 21:44:20
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
-->
<template>
  <view>
    <!-- 画布 -->
    <view class="vh-50 drawer">
      <canvas
        type="2d"
        id="canvas"
        class="canvas-container"
        style="width: 100%; height: 100%"
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
  box-sizing: border-box;
}
</style>

<style lang="scss" scoped>
.vh-50 {
  height: 50vh;
}
.drawer {
  padding: 30rpx;
  background-color: #efefef;
}
.canvas-container {
  border: 2rpx solid #999999;
}
</style>
