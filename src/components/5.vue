<template>
  <div ref="chartContainer" style="width: 100%; height: 500px"></div>
</template>

<script>
import * as d3 from "d3"; // 导入 D3.js 库

export default {
  data() {
    return {
      width: 1024,
      height: 500,
      margin: 50,
      radius: { min: 20, max: 50 },
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    async drawChart() {
      const { width, height, margin, radius } = this;

      // 你的所有 D3.js 代码放在这里
      const svg = d3
        .select(this.$refs.chartContainer)
        .append("svg")
        .attr("font-size", "11pt")
        .attr("viewBox", [0, 0, width, height]);

      const arcs = svg
        .selectAll("path")
        .data(links)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("stroke-width", (d) => w(d.value))
        .attr("d", arc)
        .call((g) =>
          g
            .append("title")
            .text(
              (d) =>
                `${d.source.name} - ${d.target.name}\n${toCurrency(d.value)}`
            )
        )
        .on("mouseover", this.highlight)
        .on("mouseout", this.restore);

      const circles = svg
        .selectAll(".node")
        .data(nodes)
        .join("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${x(d.name)},${height - margin})`)
        .on("mouseover", this.highlight)
        .on("mouseout", this.restore);

      circles
        .append("circle")
        .attr("r", (d) => r(d.total))
        .attr("fill", (d) => color(d.name));

      circles
        .append("g")
        .attr("text-anchor", "middle")
        .attr("transform", `translate(0,${radius.max + 20})`)
        .call((g) => g.append("text").text((d) => d.name))
        .call((g) =>
          g
            .append("text")
            .attr("dy", "1em")
            .text((d) => toCurrency(d.total))
        );

      // 完成绘图后，你可以在此处返回 SVG 元素节点，如果需要的话
      return svg.node();
    },
    highlight(e, d, restore) {
      if (d.name) {
        arcs
          .filter((a) => a.source === d || a.target === d)
          .transition()
          .duration(500)
          .attr("stroke", (d) => (restore ? "#ccc" : color(d.target.name)));

        circles
          .select("circle")
          .transition()
          .duration(500)
          .attr("fill", (c) =>
            restore || linkedNodes(d).some((n) => n === c)
              ? color(c.name)
              : "#ccc"
          );
      } else if (d.source) {
        arcs
          .transition()
          .duration(500)
          .attr("stroke", (a) =>
            restore || a !== d ? "#ccc" : color(a.target.name)
          );
        circles
          .select("circle")
          .transition()
          .duration(500)
          .attr("fill", (c) =>
            restore || c === d.source || c === d.target ? color(c.name) : "#ccc"
          );
      }
    },
    restore(e, d) {
      this.highlight(e, d, true);
    },
  },
};
</script>

<style scoped>
/* 可以在此处添加组件的样式 */
</style>
