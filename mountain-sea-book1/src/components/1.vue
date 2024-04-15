<template>
  <div id="img1">
    <button id="c11" @click="goPage('/vue2')"></button>
    <button id="c12" @click="goPage('/vue3')"></button>
    <button id="c13" @click="goPage('/vue4')"></button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goPage(path) {
      this.$router.push(path);
      //console.log(this.$router.push(path));
    },
  },
};
</script>
<style>
#img1 {
  /* 设置背景图片 */
  background-image: url("src/img/1.jpg");

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
#c11 {
  width: 2vw;
  height: 17vh;
  /* 设置透明背景颜色 */
  background-color: transparent;

  /* 设置位置，这里使用绝对定位作为例子 803 663*/
  position: absolute;
  /* top: 242px;
  left: 418px; */
  top: 3%;
  left: 7.8%;

  /* 其他可选样式 */
  padding: 10px 20px; /* 内边距 */
  border: none; /* 无边框 */
  color: white; /* 文本颜色 */
  font-size: 100px; /* 字体大小 */
  cursor: pointer; /* 鼠标悬停时变为手型 */
}
#c12 {
  width: 1vw;
  height: 17vh;
  /* 设置透明背景颜色 */
  background-color: transparent;

  position: absolute;
  top: 2%;
  left: 12%;

  /* 其他可选样式 */
  padding: 10px 20px; /* 内边距 */
  border: none; /* 无边框 */
  color: white; /* 文本颜色 */
  font-size: 100px; /* 字体大小 */
  cursor: pointer; /* 鼠标悬停时变为手型 */
}
#c13 {
  width: 1vw;
  height: 17vh;
  /* 设置透明背景颜色 */
  background-color: transparent;

  position: absolute;
  top: 3%;
  left: 16.2%;

  /* 其他可选样式 */
  padding: 10px 20px; /* 内边距 */
  border: none; /* 无边框 */
  color: white; /* 文本颜色 */
  font-size: 100px; /* 字体大小 */
  cursor: pointer; /* 鼠标悬停时变为手型 */
}
</style>