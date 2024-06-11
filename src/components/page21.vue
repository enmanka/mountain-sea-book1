<template>
  <div class="img1">
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
      tab-position="left"
    >
      <el-tab-pane label="山川海泽" name="first"><page1 /></el-tab-pane>
      <el-tab-pane label="鱼虫鸟兽" name="second"><page2 /></el-tab-pane>
      <el-tab-pane label="神灵祭仪" name="third"><page3 /></el-tab-pane>
      <el-tab-pane label="源远流长" name="fourth"><page4 /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import pic from "./figure14.vue";
import page1 from "./page1.vue";
import page2 from "./page2.vue";
import page3 from "./page3.vue";
import page4 from "./p41.vue";

const activeName = ref("second");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style lang="less" scoped>
.img1 {
  background-image: url("../img/1/background.png");
  height: 100vh; /* 视口高度 */
  width: 100vw; /* 视口宽度 */
  margin: 0;
  padding: 0%;

  .demo-tabs {
    padding-top: 30px;

    ::v-deep .el-tabs__item {
      font-size: 20px; /* 增大字体大小 */

      padding: 30px;
    }

    .el-tabs__content {
      padding: 32px;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;
    }
  }
}
</style>
