<!--
 * @Date: 2022-03-23 21:44:20
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
-->
<template>
  <view class="min-h-screen flex flex-col">
    <div class="px-30 py-10 flex">
      <div class="w-200">
        <u-button size="small" type="error" shape="circle" @click="clearCanvas"
          >清空画布</u-button
        >
      </div>
      <div class="flex-auto"></div>
      <div class="w-200">
        <u-button size="small" type="success" shape="circle" @click="save"
          >保存相册</u-button
        >
      </div>
    </div>
    <!-- 画布 -->
    <view class="h-[50vh] p-30 bg-[#efefef]">
      <canvas
        type="2d"
        id="canvas"
        class="bg-white border-2 rounded-2 border-solid border-[#e1e1e1] w-full h-full"
        :disable-scroll="true"
        @touchstart="handleTouchstart"
        @touchmove="handleTouchmove"
      ></canvas>
    </view>
    <view class="pt-20 px-30 flex-auto flex flex-col">
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
        <view class="mb-20 flex items-center">
          <view class="flex-auto mr-20">
            <u--input
              placeholder="请输入内容"
              v-model="inputText"
              @input="handleInputText"
            ></u--input>
          </view>
          <view  class="w-200">
            <u-button @click="addText">加上文字</u-button>
          </view>
        </view>
      </template>

      <!-- 素材 -->
      <template v-if="currentIndex === 1">
        <div class="-ml-6 -mr-6">
          <u-grid :col="4" :border="false" @click="handleClickMaterial">
            <u-grid-item
              v-for="img in materialList"
              :key="img"
              :name="img"
              :customStyle="gridItemStyle"
            >
              <div
                class=" pt-[100%] relative rounded-8 border-2 border-solid border-[#d9d9d9] overflow w-full overflow-hidden"
              >
                <image
                  :src="img"
                  mode="aspectFill"
                  class="absolute top-0 left-0 w-full h-full"
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