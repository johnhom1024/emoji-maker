<template>
  <app-layout ref="applayout">
    <view class="color-primary"> hello world </view>
    <button @click="changeColor">改变颜色</button>
  </app-layout>
</template>

<script>
import AppLayout from '@/components/AppLayout.vue';
export default {
  components: {
    AppLayout
  },
  data() {
    return {

    }
  },
  methods: {
    changeColor() {
      this.$refs.applayout.primaryColor = 'red';
    }
  }
}
</script>

<style lang="scss" scoped>
.color-primary {
  color: var(--color-primary);
}
</style>