<template>
  <div id="img3"></div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style>
#img3 {
  /* 设置背景图片 */
  background-image: url("src/img/3.jpg");

  /* 设置背景图片覆盖整个元素 */
  background-size: cover;
  background-position: center;

  /* 设置元素的高度和宽度，确保它覆盖整个web界面 */
  height: 100vh; /* 视口高度 */
  width: 100vw; /* 视口宽度 */

  /* 为了防止页面滚动，移除默认的外边距 */
  margin: 0;

  /* 其他样式 */
  display: flex; /* 使用Flexbox布局，方便内容居中或其他布局需求 */
  justify-content: center; /* 水平居中内容 */
  align-items: center; /* 垂直居中内容 */
  position: relative; /* 添加相对定位 */
}
</style>