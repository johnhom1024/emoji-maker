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
      <button class="mb-20" type="primary" @click="chooseImage">
        选择图片
      </button>
      <button class="mb-20" @click="clearCanvas">清除画布</button>
      <button class="mb-20" @click="save">生成图片</button>
    </view>
  </view>
</template>

<script>
import DragCanvas from "@/util/DragCanvas";

export default {
  data() {
    return {
      dragCanvasInstance: null,
    };
  },
  onLoad() {
    this.dragCanvasInstance = new DragCanvas("#canvas");
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
    },
    save() {
      uni.showModal({
        title: "提示",
        content: "制作的表情包将保存到手机相册",
        success: (res) => {
          if (res.confirm) {
            this.dragCanvasInstance.save();
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
page {
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #fff;
}
</style>

<style lang="scss" scoped>
.vh-50 {
  height: 50vh;
}
.mb-20 {
  margin-bottom: 20rpx;
}
.drawer {
  padding: 30rpx;
  background-color: #efefef;
}
.canvas-container {
  background: #fff;
  border: 2rpx solid #e1e1e1;
}
.operation {
  padding: 30rpx;
}
</style>
