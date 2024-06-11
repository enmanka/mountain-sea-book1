<template>
    <div id="chart-container"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  mounted() {
    this.$nextTick(() => {
      const element = document.getElementById('chart-container');
      const width = element.offsetWidth;
      const height = element.offsetHeight;

      this.drawChart(width, height);
    });
  },
  methods: {
    drawChart(width, height) {
        const data = {
      name: "flare",
      children: [
        {
          name: "南山",
          value1: 17,
          children: [
            {
              name: "狌狌",
              value: 6,
              more: "有兽焉，其状如禺而白耳，伏行人走，食之善走",
            },
            {
              name: "鹿蜀",
              value: 6,
              more: "有兽焉，其状如马而白首，其文如虎而赤尾，其音如谣，佩之宜子孙",
            },
            {
              name: "灌灌",
              value: 5,
              more: "有鸟焉，其状如鸠，其音如呵，佩之不惑",
            },
          ],
        },
        {
          name: "北山",
          value1: 63,
          children: [
            {
              name: "天马",
              value: 15,
              more: "有兽焉，其状如白犬而黑头，见人则飞，其鸣自訆",
            },
            {
              name: "[月雚]疏",
              value: 16,
              more: "有兽焉，其状如马，一角有错，可以辟火",
            },
            {
              name: "耳鼠",
              value: 16,
              more: "有兽焉，其状如鼠，而菟首麋身，其音如獋犬，以其尾飞，食之不[月采]，又可以御百毒",
            },
            {
              name: "滑鱼",
              value: 16,
              more: "有鱼焉，其状如[鱼单]，赤背，其音如梧，食之已疣",
            },
          ],
        },
        {
          name: "东山",
          value1: 20,
          children: [
            {
              name: "从从",
              value: 6,
              more: "有兽焉，其状如犬，六足，其鸣自詨",
            },
            {
              name: "蠪侄",
              value: 7,
              more: "有兽焉，其状如狐，而九尾、九首、虎爪，其音如婴儿，是食人",
            },
            {
              name: "鬿誉",
              value: 7,
              more: "有鸟焉，其状如鸡而白首，鼠足而虎爪，亦食人",
            },
          ],
        },
        {
          name: "西山",
          value1: 73,
          children: [
            {
              name: "虫遗",
              value: 14,
              more: "有蛇焉，六足四翼，见则天下大旱",
            },
            {
              name: "肥遗",
              value: 14,
              more: "有鸟焉，其状如鹑，黄身而赤喙，食之已疠，可以杀虫",
            },
            {
              name: "举父",
              value: 15,
              more: "有兽焉，其状如禺而文臂，豹尾而善投，名曰举父",
            },
            {
              name: "䳋渠",
              value: 15,
              more: "有鸟焉，其状如山鸡，黑身赤足，可以已[月暴]",
            },
            {
              name: "羬羊",
              value: 15,
              more: "有兽焉，其状如羊而马尾，其脂可以已腊",
            },
          ],
        },
        {
          name: "中山",
          value1: 67,
          children: [
            {
              name: "蠪蚔",
              value: 16,
              more: "有兽焉，其状如彘而有角，其音如号，食之不眯",
            },
            {
              name: "鴢",
              value: 17,
              more: "有鸟焉，其状如凫，青身而朱目赤尾，食之宜子",
            },
            {
              name: "跂踵",
              value: 17,
              more: "有鸟焉，其状如鸮，而一足彘尾，见则其国大疫",
            },
            {
              name: "狙如",
              value: 17,
              more: "有兽焉，状如鼣鼠，白耳白喙，见则其国有大兵",
            },
          ],
        },
      ],
    };

      const radius = width / 6;
      const customColors = ["#efd7a5", "#c5bac4", "#afd7aa", "#6bb16a", "#7b919c"];
      const color = d3.scaleOrdinal(customColors);

      const hierarchy = d3.hierarchy(data).sum((d) => d.value).sort((a, b) => b.value - a.value);

      const root = d3.partition().size([2 * Math.PI, hierarchy.height + 1])(hierarchy);
      root.each((d) => (d.current = d));

      const arc = d3.arc()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle(0.005)
        .padRadius(radius * 0.8)
        .innerRadius((d) => d.y0 * radius)
        .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

      const svg = d3.select("#chart-container")
        .append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .style("font", "10px sans-serif");

      const path = svg.append("g")
        .selectAll("path")
        .data(root.descendants().slice(1))
        .join("path")
        .attr("fill", (d) => {
          while (d.depth > 1) d = d.parent;
          return color(d.data.name);
        })
        .attr("fill-opacity", (d) => arcVisible(d.current) ? (d.children ? 0.9 : 0.7) : 0)
        .attr("pointer-events", (d) => arcVisible(d.current) ? "auto" : "none")
        .attr("d", (d) => arc(d.current))
        .on("mouseover", function (event, d) {
          const centerText = d3.select("#center-text");
          if (clickedOuterArc) {
            const moreText = d.data.more || "";
            const lines = moreText.split("，");
            centerText.html("");

            lines.forEach((line, index) => {
              centerText.append("tspan")
                .attr("x", 0)
                .attr("dy", index === 0 ? "-0.3em" : "1em")
                .attr("y", (index - (lines.length - 1) / 2) * 30)
                .attr("font-size", "30px")
                .text(line);
            });
          } else {
            if (d.depth === 1) {
              centerText.append("tspan")
                .attr("x", 0)
                .attr("dy", "-1em")
                .attr("font-size", "30px")
                .text(`山名: ${d.data.name}`);

              centerText.append("tspan")
                .attr("x", 0)
                .attr("font-size", "30px")
                .attr("dy", "3em")
                .text(`种类数量: ${d.data.value1}`);
            } else {
              centerText.text(d.data.name);
            }
          }
          d3.select(this).attr("stroke", "#000").attr("stroke-width", 2);
        })
        .on("mouseout", function () {
          d3.select("#center-text").text("");
          d3.select(this).attr("stroke", null);
        });

      path.filter((d) => d.children && d.depth === 1)
        .style("cursor", "pointer")
        .on("click", function (event, d) {
          clickedOuterArc = true;
          clicked(event, d);
        });

      const label = svg.append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
        .selectAll("text")
        .data(root.descendants().slice(1))
        .join("text")
        .attr("dy", "0.35em")
        .attr("font-size", "40px")
        .attr("fill-opacity", (d) => +labelVisible(d.current))
        .attr("transform", (d) => labelTransform(d.current))
        .text((d) => d.data.name);

      svg.append("text")
        .attr("id", "center-text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("font-size", "40px");

      const parent = svg.append("circle")
        .datum(root)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("click", function () {
          clickedOuterArc = false;
          clicked(null, root);
        });

      let clickedOuterArc = false;

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
  }
};
</script>

<style scoped>
.tooltip {
  font-family: Arial, sans-serif;
  font-size: 12px;
  background: lightgray;
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
  pointer-events: none;
  display: none;
}
</style>
