<template>
  <div id="my_dataviz"></div>
  <div id="tooltip" class="tooltip" style="display: none;"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  data() {
    return {
      ddata: [
        { "xx": 1, "yy": 6, "num": 49 ,"text":"山川个数：39"},
        { "xx": 1, "yy": 5, "num": 28 ,"text":"河流个数：18"},
        { "xx": 1, "yy": 4, "num": 27 ,"text":"鸟兽个数：17"},
        { "xx": 1, "yy": 3, "num": 15 ,"text":"植物个数：5"},
        { "xx": 1, "yy": 2, "num": 15 ,"text":"神灵个数：3"},
        { "xx": 2, "yy": 6, "num": 77 ,"text":"山川个数：77"},
        { "xx": 2, "yy": 5, "num": 47 ,"text":"河流个数：47"},
        { "xx": 2, "yy": 4, "num": 73 ,"text":"鸟兽个数：73"},
        { "xx": 2, "yy": 3, "num": 40 ,"text":"植物个数：40"},
        { "xx": 2, "yy": 2, "num": 15 ,"text":"神灵个数：9"},
        { "xx": 3, "yy": 6, "num": 46 ,"text":"山川个数：46"},
        { "xx": 3, "yy": 5, "num": 24 ,"text":"河流个数：24"},
        { "xx": 3, "yy": 4, "num": 20 ,"text":"鸟兽个数：20"},
        { "xx": 3, "yy": 3, "num": 20 ,"text":"植物个数：15"},
        { "xx": 3, "yy": 2, "num": 15 ,"text":"神灵个数：4"},
        { "xx": 4, "yy": 6, "num": 100 ,"text":"山川个数：5370"},
        { "xx": 4, "yy": 5, "num": 63 ,"text":"河流个数：63"},
        { "xx": 4, "yy": 4, "num": 67 ,"text":"鸟兽个数：67"},
        { "xx": 4, "yy": 3, "num": 100 ,"text":"植物个数：122"},
        { "xx": 4, "yy": 2, "num": 48 ,"text":"神灵个数：48"},
        { "xx": 5, "yy": 6, "num": 87 ,"text":"山川个数：87"},
        { "xx": 5, "yy": 5, "num": 39 ,"text":"河流个数：39"},
        { "xx": 5, "yy": 4, "num": 63 ,"text":"鸟兽个数：63"},
        { "xx": 5, "yy": 3, "num": 42 ,"text":"植物个数：42"},
        { "xx": 5, "yy": 2, "num": 15 ,"text":"神灵个数：3"},
      ],
      data2: [
        { "index": 1, "high": 40 ,"text":"䧿山<br>南次二山<br>南次三山"},
        { "index": 2, "high": 60 ,"text":"西山首经<br>西次二经<br>西次三经<br>西次四经"},
        { "index": 3, "high": 60 ,"text":"东山经<br>东次二经<br>东次三经<br>东次四经"},
        { "index": 4, "high": 120 ,"text":"中山一经<br>中次二经<br>中次三经<br>中次四经<br>中次五经<br>中次六经<br>中次七经<br>中次八经<br>中次九经<br>中次十经<br>中次十一经<br>中次十二经"},
        { "index": 5, "high": 40 ,"text":"首经<br>北山二经<br>北山三经"},

      ],
    };
  },
  mounted() {
    this.drawScatterPlot();
  },
  methods: {
    drawScatterPlot() {
      const margin = { top: 70, right: 70, bottom: 50, left: 50 };
      const width = 600 - margin.left - margin.right;
      const height = 550 - margin.top - margin.bottom;

      const svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const data = this.ddata;
      const data2 = this.data2;

      const categories = ["篇目", "  ", "神异", "植被", "鸟兽", "河流", "山川"];
      const shan = [" ", "南山经", "西山经", "北山经", "东山经", "中山经"];

      var x = d3.scaleLinear()
        .domain([0, 5])
        .range([0, width]);

      var xName = d3.scaleBand()
        .domain(shan)
        .range([0, width])
        .paddingInner(2);
          
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xName).tickSize(-6))
        .selectAll("text")
        .style("font-size", "20px")
        .style("font-family", "FangSong");

      const y = d3.scaleLinear()
        .domain([0, 6])
        .range([height, 0]);

      var yName = d3.scaleBand()
        .domain(categories)
        .range([height, 0])
        .paddingInner(1);

      svg.append("g")
        .call(d3.axisLeft(yName).tickSize(0))
        .selectAll("text")
        .style("font-size", "20px")
        .style("font-family", "FangSong");

      const z = d3.scaleLinear()
        .domain([1, 100])
        .range([1, 40]);

      const customColors = ["#EEB4B4", "#87CEEB", "#9BCD9B", "#A2CD5A", "#E9967A", "#FFD700"];
      const colorScale = d3.scaleOrdinal()
        .domain([0, 8])
        .range(customColors);

      svg.append('g')
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "bubbles")
        .attr("cx", function (d) { return x(d.xx); })
        .attr("cy", function (d) { return y(d.yy); })
        .attr("r", function (d) { return z(d.num); })
        .style("fill", (d) => colorScale(d.xx))
        .style("opacity", "0.8")
        .on("mouseover", (event, d) => {
          const [x, y] = d3.pointer(event);
          const tooltip = d3.select("#tooltip");
          tooltip.style("left", (x+530) + "px")
            .style("top", (y+170) + "px")
            .html(d.text)
            .style("display", "inline-block");
        })
        .on("mouseout", () => {
          d3.select("#tooltip").style("display", "none");
        });

        
      var rr = 35;
      svg.append('g')
        .selectAll("path")
        .data(data2)
        .enter()
        .append("path")
        .attr("class","clipse")
        .attr("d", function (d) {
          var center = x(d.index);
          var h = y(d.high);
          return "M " + (center - rr) + " 0 A " + rr + " " + (d.high) + " 0 0 1 " + (center + rr) + " 0";
        })
        .attr("transform", "translate(0," + height + ")")
        .style("fill", "#69b3a2")
        .style("opacity", "0.7")
        .on("mouseover", (event, d) => {
          const [x, y] = d3.pointer(event);
          const tooltip = d3.select("#tooltip");
          tooltip.style("left", (x+500) + "px")
            .style("top", (y+500) + "px")
            .html(d.text)
            .style("display", "inline-block");
        })
        .on("mouseout", () => {
          d3.select("#tooltip").style("display", "none");
        });

      svg.selectAll("line.horizontalGrid").data(y.ticks(5)).enter()
        .append("line")
        .attr("class", "horizontalGrid")
        .attr("x1", 0)
        .attr("x2", width + 80)
        .attr("y1", function (d) { return y(d); })
        .attr("y2", function (d) { return y(d); })
        .style("stroke", "#ccc")
        .style("stroke-width", "1px");

      svg.selectAll("line.verticalGrid").data(x.ticks(5)).enter()
        .append("line")
        .attr("class", "verticalGrid")
        .attr("x1", function (d) { return x(d); })
        .attr("x2", function (d) { return x(d); })
        .attr("y1", -40)
        .attr("y2", height)
        .style("stroke", "#ccc")
        .style("stroke-width", "1px");

    }
  }
};
</script>

<style>
.bubbles {
  stroke-width: 2px;
  stroke: white;
}
.bubbles:hover {
  stroke: black;
}
.clipse {
  stroke-width: 2px;
  stroke: white;
}
.clipse:hover {
  stroke: black;
}
.tooltip {
  position: absolute;
  text-align: center;
  width: auto;
  height: auto;
  padding: 8px;
  font: 14px sans-serif;
  background: #d1edc4;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
}
</style>
