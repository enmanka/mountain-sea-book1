<template>
  <div id="main" @mousemove="handleMouseMove">
    <button :class="buttonClass1" @click="goPage('/vue1')"></button>
    <button :class="buttonClass2" @click="goPage('/vue2')"></button>
    <button :class="buttonClass3" @click="goPage('/vue3')"></button>
    <button :class="buttonClass4" @click="goPage('/vue4')"></button>
  </div>
</template>

<script>
//import { useRouter } from "vue-router";
export default {
  data() {
    return {
      buttonClass1: "c1",
      buttonClass2: "c2",
      buttonClass3: "c3",
      buttonClass4: "c4",
    };
  },
  methods: {
    //控制台输出鼠标坐标
    handleMouseMove(event) {
      const x = event.clientX;
      const y = event.clientY;
      console.log(`Mouse coordinates: (${x}, ${y})`);
    },
    goPage(path) {
      this.$router.push(path);
      //console.log(this.$router.push(path));
    },
  },
};
</script>

<style>
#main {
  /* 设置背景图片 */
  background-image: url("src/img/main.jpg");

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
.c1 {
  /* width: 56px;
  height: 214px; */
  /* width: 7%;
  height: 32.3%; */
  width: 5vw;
  height: 35vh;
  /* 设置透明背景颜色 */
  background-color: transparent;

  /* 设置位置，这里使用绝对定位作为例子 803 663*/
  position: absolute;
  /* top: 242px;
  left: 418px; */
  top: 33%;
  left: 49.5%;

  /* 其他可选样式 */
  padding: 10px 20px; /* 内边距 */
  border: none; /* 无边框 */
  color: white; /* 文本颜色 */
  font-size: 100px; /* 字体大小 */
  cursor: pointer; /* 鼠标悬停时变为手型 */
}
.c2 {
  width: 5vw;
  height: 35vh;
  /* 设置透明背景颜色 */
  background-color: transparent;

  position: absolute;
  top: 35.8%;
  left: 57%;

  /* 其他可选样式 */
  padding: 10px 20px; /* 内边距 */
  border: none; /* 无边框 */
  color: white; /* 文本颜色 */
  font-size: 100px; /* 字体大小 */
  cursor: pointer; /* 鼠标悬停时变为手型 */
}
.c3 {
  width: 5vw;
  height: 35vh;
  /* 设置透明背景颜色 */
  background-color: transparent;

  position: absolute;
  top: 33%;
  left: 64.5%;

  /* 其他可选样式 */
  padding: 10px 20px; /* 内边距 */
  border: none; /* 无边框 */
  color: white; /* 文本颜色 */
  font-size: 100px; /* 字体大小 */
  cursor: pointer; /* 鼠标悬停时变为手型 */
}
.c4 {
  width: 5vw;
  height: 35vh;
  /* 设置透明背景颜色 */
  background-color: transparent;

  position: absolute;
  top: 37%;
  left: 72%;

  /* 其他可选样式 */
  padding: 10px 20px; /* 内边距 */
  border: none; /* 无边框 */
  color: white; /* 文本颜色 */
  font-size: 100px; /* 字体大小 */
  cursor: pointer; /* 鼠标悬停时变为手型 */
}
</style>