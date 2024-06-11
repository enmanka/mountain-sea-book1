<template>
  <div id="chartId"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      data: [
        { nam: "南山经", fre: 6175 },
        { nam: "西山经", fre: 15272 },
        { nam: "东山经", fre: 13583 },
        { nam: "北山经", fre: 6755},
        { nam: "中山经", fre: 10357 },
      ],
    };
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const data = this.data;

      // 定义自定义颜色数组
      const customColors = ["#A9D8B3", "#D8959C", "#D4C7E7", "#578FD1", "#BBDFF0"];

      // 定义颜色比例尺，将自定义颜色数组作为范围
      const colorScale = d3
        .scaleOrdinal()
        .domain(data.map((d) => d.nam))
        .range(customColors);

      const margin = { top: 30, right: 10, bottom: 30, left: 50 };
      const width = 400 - margin.left - margin.right;
      const height = 250 - margin.top - margin.bottom;

      // 选择目标元素并添加SVG
      const svg = d3
        .select("#chartId")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const x = d3
        .scaleLinear()
        .domain([0, 16000])
        .range([0, width]);

      const y = d3
        .scaleBand()
        .domain(data.map((d) => d.nam))
        .range([0, height])
        .padding(0.1);

      const format = d3.format(".0f");

      // 为每个柱子设置填充颜色
      svg
        .append("g")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", 0)
        .attr("y", (d) => y(d.nam))
        .attr("width", (d) => x(d.fre))
        .attr("height", y.bandwidth())
        .attr("fill", (d) => colorScale(d.nam));

      svg
        .append("g")
        .attr("fill", "white")
        .attr("text-anchor", "end")
        .selectAll("text")
        .data(data)
        .join("text")
        .attr("x", (d) => x(d.fre))
        .attr("y", (d) => y(d.nam) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("dx", -4)
        .text((d) => format(d.fre))
        .call((text) =>
          text
            .filter((d) => x(d.fre) < 20) // 短柱子的文本调整
            .attr("dx", 4)
            .attr("fill", "black")
            .attr("text-anchor", "start")
        );

      svg
        .append("g")
        .attr("transform", `translate(0,0)`)
        .call(d3.axisTop(x).ticks(8));

      svg
        .append("g")
        .call(d3.axisLeft(y).tickSize(0))
        .call((g) => g.select(".domain").remove())
        .selectAll("text")
        .style("font-size", "13px");
     
      svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height+28)
      .text("山海经各篇目总字数")
      .style("font-family","FangSong")
      .style("font-size","18px")
    },
  },
};
</script>

<style scoped lang="less">
#chartId {
  width: 100%;
  height: auto;
}
</style>
