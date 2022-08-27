<template>
  <view :style="[themeColor]">
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      primaryColor: "blue",
    };
  },
  computed: {
    themeColor() {
      const style = {};

      style["--color-primary"] = this.primaryColor;

      return style;
    },
  },
};
</script>
