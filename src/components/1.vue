<template>
  <div id="img1">
    <button id="c11" @click="goPage('/vue2')"></button>
    <button id="c12" @click="goPage('/vue3')"></button>
    <button id="c13" @click="goPage('/vue4')"></button>
    <div :id="chartId"></div>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {
      alphabet: [], // 初始化为空数组
      chartId: "chartContainer",
    };
  },
  mounted() {
    this.generateAlphabetData(); // 在组件挂载后生成数据
    this.createChart(); // 生成图表
  },
  methods: {
    goPage(path) {
      this.$router.push(path);
      //console.log(this.$router.push(path));
    },
    generateAlphabetData() {
      const alphabet = ["铜", "金", "玉石", "铁", "银"];
      const frequent = [0.2, 0.3, 0.1, 0.2, 0.2];
      const data = [];

      for (let i = 0; i < alphabet.length; i++) {
        const letter = alphabet[i];
        const frequency = frequent[i];
        data.push({ letter, frequency });
      }

      this.alphabet = data; // 将生成的数据赋值给组件的alphabet属性
    },
    createChart() {
      // 定义自定义颜色数组
      const customColors = [
        "#A9D8B3",
        "#D8959C",
        "#D4C7E7",
        "#578FD1",
        "#BBDFF0",
      ];

      // 定义颜色比例尺，将自定义颜色数组作为范围
      const colorScale = d3
        .scaleOrdinal()
        .domain(this.alphabet.map((d) => d.letter))
        .range(customColors);

      const barHeight = 25;
      const marginTop = 30;
      const marginRight = 0;
      const marginBottom = 10;
      const marginLeft = 30;
      const width = 250;
      const height =
        Math.ceil((this.alphabet.length + 0.1) * barHeight) +
        marginTop +
        marginBottom;

      const x = d3
        .scaleLinear()
        .domain([0, d3.max(this.alphabet, (d) => d.frequency)])
        .range([marginLeft, width - marginRight]);

      const y = d3
        .scaleBand()
        .domain(
          d3.sort(this.alphabet, (d) => -d.frequency).map((d) => d.letter)
        )
        .rangeRound([marginTop, height - marginBottom])
        .padding(0.1);

      const format = x.tickFormat(20, "%");

      const svg = d3
        .select(`#${this.chartId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

      // 为每个柱子设置填充颜色
      svg
        .append("g")
        .selectAll("rect")
        .data(this.alphabet)
        .join("rect")
        .attr("x", x(0))
        .attr("y", (d) => y(d.letter))
        .attr("width", (d) => x(d.frequency) - x(0))
        .attr("height", y.bandwidth())
        .attr("fill", (d) => colorScale(d.letter));

      svg
        .append("g")
        .attr("fill", "white")
        .attr("text-anchor", "end")
        .selectAll()
        .data(this.alphabet)
        .join("text")
        .attr("x", (d) => x(d.frequency))
        .attr("y", (d) => y(d.letter) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("dx", -4)
        .text((d) => format(d.frequency))
        .call((text) =>
          text
            .filter((d) => x(d.frequency) - x(0) < 20) // short bars
            .attr("dx", +4)
            .attr("fill", "black")
            .attr("text-anchor", "start")
        );

      svg
        .append("g")
        .attr("transform", `translate(0,${marginTop})`)
        .call(d3.axisTop(x).ticks(0).tickSize(0).tickFormat(""))
        .call((g) => g.select(".domain").remove());

      svg
        .append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickSizeOuter(0));
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
#chartContainer {
  position: absolute;
  top: 30%; /* 调整垂直位置 */
  left: 2%; /* 调整水平位置 */
  width: 35%;
  height: 40%;
}
</style>