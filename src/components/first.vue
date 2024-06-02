<template>
  <div id="first">
    <button :class="buttonClass11" @click="goPage('/vue1')"></button>
    <button :class="buttonClass22" @click="goPage('/vue2')"></button>
    <button :class="buttonClass33" @click="goPage('/vue3')"></button>
    <button :class="buttonClass44" @click="goPage('/vue4')"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      biaoTiSrc: "../img/main/帝禹洪荒.png",
      muLuSrc: "../img/main/目录框.png",
      muLuSmallSrc: "../img/main/小标题.png",
      buttonClass11: "c01",
      buttonClass22: "c02",
      buttonClass33: "c03",
      buttonClass44: "c04",
    };
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
#first {
  /* 设置背景图片 */
  background-image: url("../img/first/主界面1.png");

  /* 设置背景图片覆盖整个元素 */
  background-size: 100% 100%;
  background-position: center;

  /* 设置元素的高度和宽度，确保它覆盖整个web界面 */
  height: 100vh; /* 视口高度 */
  width: 100vw; /* 视口宽度 */

  /* 为了防止页面滚动，移除默认的外边距 */
  margin: 0;
  overflow: hidden; /* 隐藏任何可能的溢出内容 */

  /* 其他样式 */
  display: flex; /* 使用Flexbox布局，方便内容居中或其他布局需求 */
  justify-content: center; /* 水平居中内容 */
  align-items: center; /* 垂直居中内容 */
  position: relative; /* 添加相对定位 */
}
.c01 {
  background-image: url("../img/first/目录一.png");
  background-size: cover; /* 确保图片覆盖整个按钮 */
  background-position: center; /* 图片居中显示 */
  /* 设置透明背景颜色 */
  background-color: transparent;
  width: 4vw;
  height: 28vh;

  position: absolute;
  top: 56%;
  left: 41.5%;

  /* 其他可选样式 */
  border: none; /* 移除边框 */
  padding: 0; /* 移除内边距 */
  margin: 0; /* 移除外边距 */
  overflow: hidden; /* 隐藏超出按钮尺寸的图片部分 */
  cursor: pointer; /* 鼠标悬停时变为手型 */
}
.c02 {
  background-image: url("../img/first/目录二.png");
  background-size: cover; /* 确保图片覆盖整个按钮 */
  background-position: center; /* 图片居中显示 */
  width: 4vw;
  height: 28vh;
  /* 设置透明背景颜色 */
  background-color: transparent;

  position: absolute;
  top: 58.8%;
  left: 46.5%;

  /* 其他可选样式 */
  padding: 10px 20px; /* 内边距 */
  border: none; /* 无边框 */
  cursor: pointer; /* 鼠标悬停时变为手型 */
}
.c03 {
  background-image: url("../img/first/目录三.png");
  background-size: cover; /* 确保图片覆盖整个按钮 */
  background-position: center; /* 图片居中显示 */
  width: 4vw;
  height: 28vh;
  /* 设置透明背景颜色 */
  background-color: transparent;

  position: absolute;
  top: 56%;
  left: 51.5%;

  /* 其他可选样式 */
  padding: 10px 20px; /* 内边距 */
  border: none; /* 无边框 */
  cursor: pointer; /* 鼠标悬停时变为手型 */
}
.c04 {
  background-image: url("../img/first/目录四.png");
  background-size: cover; /* 确保图片覆盖整个按钮 */
  background-position: center; /* 图片居中显示 */
  width: 4vw;
  height: 28vh;
  /* 设置透明背景颜色 */
  background-color: transparent;

  position: absolute;
  top: 60%;
  left: 56.5%;

  /* 其他可选样式 */
  padding: 10px 20px; /* 内边距 */
  border: none; /* 无边框 */
  cursor: pointer; /* 鼠标悬停时变为手型 */
}
</style>