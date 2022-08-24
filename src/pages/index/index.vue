<!--
 * @Date: 2022-03-23 21:44:20
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
-->
<template>
  <view class="full flex flex-column">
    <div class="top-bar px-30 flex">
      <div class="w-200 flex-[0_0_200rpx]">
        <u-button size="small" type="error" shape="circle" @click="clearCanvas"
          >清空画布</u-button
        >
      </div>
      <div class="spacer"></div>
      <div class="w-200">
        <u-button size="small" type="success" shape="circle" @click="save"
          >保存相册</u-button
        >
      </div>
    </div>
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
    <view class="operation flex-auto flex flex-column">
      <div class="mb-30">
        <!-- 操作 -->
        <u-subsection
          :list="tabList"
          :fontSize="28"
          :current="currentIndex"
          @change="changeTab"
        ></u-subsection>
      </div>
      <!-- 操作 -->
      <template v-if="currentIndex === 0">
        <view class="mb-20">
          <u-button type="primary" @click="chooseImage"> 选择图片 </u-button>
        </view>
        <view class="input-wrapper mb-20 flex align-center">
          <view class="w-60 mr-20">
            <u--input
              placeholder="请输入内容"
              v-model="inputText"
              @input="handleInputText"
            ></u--input>
          </view>
          <u-button @click="addText">加上文字</u-button>
        </view>
      </template>

      <!-- 素材 -->
      <template v-if="currentIndex === 1">
        <div class="source-material-list">
          <u-grid :col="4" :border="false" @click="handleClickMaterial">
            <u-grid-item
              v-for="img in materialList"
              :key="img"
              :name="img"
              :customStyle="gridItemStyle"
            >
              <div class="source-material-item w-full">
                <image
                  :src="img"
                  mode="aspectFill"
                  class="source-material-image"
                ></image>
              </div>
            </u-grid-item>
          </u-grid>
        </div>
      </template>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DragCanvas from "@/util/DragCanvas";
import DragText from "@/util/DragText";
import { isEmpty } from "lodash";

// image
const materialList = [
  "/static/material/1.jpg",
  "/static/material/2.jpg",
  "/static/material/3.jpg",
  "/static/material/4.jpg",
];
@Component
export default class CanvasIndex extends Vue {
  tabList = ["通用", "素材"];
  currentIndex = 0;
  materialList = materialList;
  gridItemStyle = {
    padding: "8rpx",
  };

  dragCanvasInstance = {} as DragCanvas;
  inputText = "";
  // 选中的拖拽文字
  selectedDragText = {} as DragText;

  onLoad() {
    this.dragCanvasInstance = new DragCanvas("#canvas");
    this.dragCanvasInstance.on("selected", (dragItem) => {
      // 如果选中的拖拽物体是文字的实例，则获取text属性并且赋值到inputText中
      if (dragItem instanceof DragText) {
        const { text = "" } = dragItem;
        this.selectedDragText = dragItem;
        this.inputText = text;
      }
    });
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
    const textItem = this.dragCanvasInstance.fillText(this.inputText);

    this.selectedDragText = textItem;
  }

  handleInputText() {
    if (!isEmpty(this.selectedDragText)) {
      this.selectedDragText.text = this.inputText;
      // 清除画布
      this.dragCanvasInstance.clearRect();
      // 重新绘制
      this.dragCanvasInstance.paint();
    }
  }

  changeTab(index) {
    this.currentIndex = index;
  }

  // 点击素材中的图片
  handleClickMaterial(path) {
    uni.getImageInfo({
      src: path,
      success: async (imageInfo) => {
        const { width, height } = imageInfo;

        this.dragCanvasInstance.drawImg(path, width, height);
      },
    });
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
.full {
  min-height: 100vh;
}

.p-8 {
  padding: 8rpx;
}

.w-full {
  width: 100%;
}
.w-200 {
  width: 200rpx;
}

.spacer {
  flex-grow: 1;
}
.px-30 {
  padding: 10rpx 30rpx 10rpx;
}
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

.flex-column {
  flex-direction: column;
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

.mb-30 {
  margin-bottom: 30rpx;
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
  padding: 20rpx 30rpx 0;
}
// .input-wrapper {
//   padding: ;
// }

.source-material-list {
  margin-left: -6rpx;
  margin-right: -6rpx;
}
.source-material-item {
  width: 100%;
  padding-top: 100%;
  position: relative;
  border: 2rpx solid #d9d9d9;
  border-radius: 8rpx;
  overflow: hidden;
  .source-material-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
