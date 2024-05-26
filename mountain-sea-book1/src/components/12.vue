<template>
  <div id="chartContainer"></div>
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
      const marginRight = 40; // 增加右边距，确保有空间显示标签
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

      const bars = svg
        .append("g")
        .selectAll("rect")
        .data(this.alphabet)
        .join("rect")
        .attr("x", x(0))
        .attr("y", (d) => y(d.letter))
        .attr("width", (d) => x(d.frequency) - x(0))
        .attr("height", y.bandwidth())
        .attr("fill", (d) => colorScale(d.letter))
        .on("mouseover", function (event, d) {
          d3.select(this).attr("fill", "orange");

          // 确保标签显示在条形图范围外
          svg
            .append("text")
            .attr("class", "hover-label")
            .attr("x", Math.max(x(d.frequency) + 5, marginLeft + 5)) // 右边超出时，显示在条形图内
            .attr("y", y(d.letter) + y.bandwidth() / 2)
            .attr("dy", "0.35em")
            .attr("fill", "black")
            .attr("text-anchor", "start")
            .text(`${d.letter}: ${format(d.frequency)}`);
        })
        .on("mouseout", function (event, d) {
          d3.select(this).attr("fill", colorScale(d.letter));

          svg.selectAll(".hover-label").remove();
        });

      svg
        .append("g")
        .attr("fill", "white")
        .attr("text-anchor", "end")
        .selectAll("text")
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

<style scoped>
#chartContainer {
  max-width: 100%;
  height: auto;
}
</style>
