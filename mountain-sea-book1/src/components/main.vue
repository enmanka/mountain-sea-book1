<template>
  <div id="main" @mousemove="handleMouseMove">
    <img id="muLu" :src="muLuSrc"></img>
    <img id="muLuSmall" :src="muLuSmallSrc"></img>
    <img id="biaoTi" :src="biaoTiSrc"></img>
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
      biaoTiSrc: "src/img/main/帝禹洪荒.png",
      muLuSrc: "src/img/main/目录框.png",
      muLuSmallSrc: "src/img/main/小标题.png",
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
  background-image: url("src/img/main/背景1.png");

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
#biaoTi {
  position: absolute; /* 或使用 relative, fixed, sticky 等值 */
  top: 1%; /* 距离容器顶部的距离 */
  left: 5%; /* 距离容器左侧的距离 */
  width: 20%; /* 图片的宽度 */
  height: 66%; /* 图片的高度 */
}
#muLu {
  position: absolute; /* 或使用 relative, fixed, sticky 等值 */
  top: 20%; /* 距离容器顶部的距离 */
  left: 40%; /* 距离容器左侧的距离 */
  width: 50%; /* 图片的宽度 */
  height: 60%; /* 图片的高度 */
}
#muLuSmall {
  position: absolute; /* 或使用 relative, fixed, sticky 等值 */
  top: 24%; /* 距离容器顶部的距离 */
  left: 20%; /* 距离容器左侧的距离 */
  width: 16%; /* 图片的宽度 */
  height: 60%; /* 图片的高度 */
}
.c1 {
  background-image: url("src/img/main/山川海泽.png");
  background-size: cover; /* 确保图片覆盖整个按钮 */
  background-position: center; /* 图片居中显示 */
  /* 设置透明背景颜色 */
  background-color: transparent;
  width: 5vw;
  height: 35vh;

  position: absolute;
  top: 33%;
  left: 49.5%;

  /* 其他可选样式 */
  border: none; /* 移除边框 */
  padding: 0; /* 移除内边距 */
  margin: 0; /* 移除外边距 */
  overflow: hidden; /* 隐藏超出按钮尺寸的图片部分 */
  cursor: pointer; /* 鼠标悬停时变为手型 */
}
.c2 {
  background-image: url("src/img/main/鱼虫鸟兽.png");
  background-size: cover; /* 确保图片覆盖整个按钮 */
  background-position: center; /* 图片居中显示 */
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
  cursor: pointer; /* 鼠标悬停时变为手型 */
}
.c3 {
  background-image: url("src/img/main/神灵祭仪.png");
  background-size: cover; /* 确保图片覆盖整个按钮 */
  background-position: center; /* 图片居中显示 */
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
  background-image: url("src/img/main/源远流长.png");
  background-size: cover; /* 确保图片覆盖整个按钮 */
  background-position: center; /* 图片居中显示 */
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