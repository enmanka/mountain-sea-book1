<template>
    <div id="my_dataviz"></div>
  </template>
  
  <script>
  import * as d3 from 'd3';
  
  export default {
    mounted() {
      this.drawCorrelogram();
    },
    methods: {
      drawCorrelogram() {
        const margin = { top: 20, right: 20, bottom: 20, left: 50 };
        const width = 430 - margin.left - margin.right;
        const height = 430 - margin.top - margin.bottom;
  
        const svg = d3.select("#my_dataviz")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
        // 创建坐标轴的比例尺
        const xScale = d3.scaleLinear()
          .domain([0, 8]) // 最左边不画
          .range([0, width]);
  
        const yScale = d3.scaleLinear()
          .domain([0, 5])
          .range([height, 0]);
  
        // 添加X轴横线
        svg.append("g")
          .selectAll("line")
          .data(yScale.ticks())
          .enter()
          .append("line")
          .attr("x1", 0)
          .attr("y1", d => yScale(d))
          .attr("x2", width)
          .attr("y2", d => yScale(d))
          .attr("stroke", "#ddd")
          .attr("stroke-width", 1);
  
        // 添加Y轴竖线
        svg.append("g")
          .selectAll("line")
          .data(xScale.ticks().slice(1)) // 最左边不画
          .enter()
          .append("line")
          .attr("x1", d => xScale(d))
          .attr("y1", 0)
          .attr("x2", d => xScale(d))
          .attr("y2", height)
          .attr("stroke", "#ddd")
          .attr("stroke-width", 1);
  
        // 添加X轴
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(xScale));
  
        // 添加Y轴
        svg.append("g")
          .call(d3.axisLeft(yScale));
  
        // 生成8*5个数据点的数组
        const circleData = [];
        for (let i = 1; i < 9; i++) { // 最左边不画
          for (let j = 0; j < 4; j++) {
            circleData.push({ x: i, y: j });
          }
        }
  
        const ellipseData = [];
        for (let i = 0; i < 8; i++) { 
          ellipseData.push({ x: i, y: 4 });
        }
  
        // 为每个数据点创建圆或椭圆
        svg.selectAll("shapes")
          .data([...circleData, ...ellipseData])
          .enter()
          .append(function(d) {
            return d.y === 4 ? document.createElementNS("http://www.w3.org/2000/svg", "ellipse") : "circle";
          })
          .attr("cx", d => xScale(d.x))
          .attr("cy", d => yScale(d.y))
          .attr("r", d => d.y === 4 ? 8 : 5)
          .style("fill", "steelblue");
      }
    }
  }
  </script>
  