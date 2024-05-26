<template>
  <div id="img2">
    <div id="chart-container"></div>
  </div>
</template>
<script>
import * as d3 from "d3";

export default {
  mounted() {
    const data = {
      name: "flare",
      children: [
        {
          name: "analytics",
          children: [
            { name: "cluster", value: 70 },
            { name: "graph", value: 65 },
            { name: "optimization", value: 80 },
          ],
        },
        {
          name: "vis",
          children: [
            { name: "axis", value: 30 },
            { name: "color", value: 20 },
            { name: "scale", value: 40 },
          ],
        },
        {
          name: "data",
          children: [
            { name: "converters", value: 60 },
            { name: "DataUtil", value: 50 },
            { name: "DataSet", value: 40 },
          ],
        },
      ],
    };

    const width = 928; // 图形宽度
    const height = 928; // 图形高度
    const radius = width / 6; // 半径

    const color = d3.scaleOrdinal(
      d3.quantize(d3.interpolateRainbow, data.children.length + 1)
    );

    const hierarchy = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);
    const root = d3.partition().size([2 * Math.PI, hierarchy.height + 1])(
      hierarchy
    );
    root.each((d) => (d.current = d));

    const arc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius * 1.5)
      .innerRadius((d) => d.y0 * radius)
      .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

    const svg = d3
      .select("#chart-container")
      .append("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .style("font", "10px sans-serif");

    const path = svg
      .append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
      .attr("fill", (d) => {
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      })
      .attr("fill-opacity", (d) =>
        arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0
      )
      .attr("pointer-events", (d) => (arcVisible(d.current) ? "auto" : "none"))
      .attr("d", (d) => arc(d.current));

    path
      .filter((d) => d.children)
      .style("cursor", "pointer")
      .on("click", clicked);

    const format = d3.format(",d");
    path.append("title").text(
      (d) =>
        `${d
          .ancestors()
          .map((d) => d.data.name)
          .reverse()
          .join("/")}\n${format(d.value)}`
    );

    const label = svg
      .append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
      .attr("dy", "0.35em")
      .attr("font-size", "20px") // 设置字体大小
      .attr("fill-opacity", (d) => +labelVisible(d.current))
      .attr("transform", (d) => labelTransform(d.current))
      .text((d) => d.data.name);

    const parent = svg
      .append("circle")
      .datum(root)
      .attr("r", radius)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("click", clicked);

    function clicked(event, p) {
      parent.datum(p.parent || root);

      root.each(
        (d) =>
          (d.target = {
            x0:
              Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
              2 *
              Math.PI,
            x1:
              Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
              2 *
              Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth),
          })
      );

      const t = svg.transition().duration(750);

      path
        .transition(t)
        .tween("data", (d) => {
          const i = d3.interpolate(d.current, d.target);
          return (t) => (d.current = i(t));
        })
        .filter(function (d) {
          return +this.getAttribute("fill-opacity") || arcVisible(d.target);
        })
        .attr("fill-opacity", (d) =>
          arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0
        )
        .attr("pointer-events", (d) => (arcVisible(d.target) ? "auto" : "none"))
        .attrTween("d", (d) => () => arc(d.current));

      label
        .filter(function (d) {
          return +this.getAttribute("fill-opacity") || labelVisible(d.target);
        })
        .transition(t)
        .attr("fill-opacity", (d) => +labelVisible(d.target))
        .attrTween("transform", (d) => () => labelTransform(d.current));
    }

    function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    function labelTransform(d) {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = ((d.y0 + d.y1) / 2) * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }
  },
};
</script>
<style>
#chart-container {
  position: absolute;
  width: 40%;
  height: 40%;
  top: 17%;
  left: 28%;
}
#img2 {
  /* 设置背景图片 */
  background-image: url("src/img/2.jpg");

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