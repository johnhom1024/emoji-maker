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
        :disable-scroll="true"
        @touchstart="handleTouchstart"
        @touchmove="handleTouchmove"
      ></canvas>
    </view>
    <!-- 操作 -->
    <view class="operation">
      <view class="mb-20">
        <u-button type="primary" @click="chooseImage"> 选择图片 </u-button>
      </view>
      <view class="mb-20">
        <u-button type="error" @click="clearCanvas"> 清除画布 </u-button>
      </view>
      <view class="input-wrapper mb-20 flex align-center">
        <view class="w-60 mr-20">
          <u--input placeholder="请输入内容" v-model="inputText"></u--input>
        </view>
        <u-button @click="addText">加上文字</u-button>
      </view>
      <u-button type="success" @click="save">生成图片</u-button>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DragCanvas from "@/util/DragCanvas";

@Component
export default class CanvasIndex extends Vue {
  dragCanvasInstance = {} as DragCanvas;
  inputText = "";


  onLoad() {
    this.dragCanvasInstance = new DragCanvas("#canvas");
  }


  chooseImage(): void {
    this.dragCanvasInstance.chooseImage();
  }
  handleTouchstart(e) {
    this.dragCanvasInstance.touchstart(e);
  }
  clearCanvas() {
    this.dragCanvasInstance.clearCanvas();
  }
  handleTouchmove(e) {
    this.dragCanvasInstance.touchmove(e);
  }
  save() {
    uni.showModal({
      title: "提示",
      content: "制作的表情包将保存到手机相册",
      success: (res) => {
        if (res.confirm) {
          this.dragCanvasInstance.save();
        }
      },
    });
  }
  addText() {
    this.dragCanvasInstance.fillText(this.inputText);
  }
}
</script>

<style lang="scss">
page {
  min-height: 100vh;
  box-sizing: border-box;
  // background-color: #fff;
}
</style>

<style lang="scss" scoped>
.vh-50 {
  height: 50vh;
}
.mr-20 {
  margin-right: 20rpx;
}
.align-center {
  align-items: center;
}
.w-60 {
  flex: 0 0 60%;
}
.flex {
  display: flex;
}
.flex-auto {
  flex: auto;
}
.w-half {
  width: 50%;
  box-sizing: border-box;
}
.border-none {
  border: 2rpx solid #999999;
  &::after {
    border: none;
  }
}
.left-button {
  border-radius: 10rpx 0 0 10rpx;
  border-right: none;
}
.right-button {
  border-radius: 0 10rpx 10rpx 0;
  border-left: none;
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
// .input-wrapper {
//   padding: ;
// }
</style>
