<template>
  <div id="my_dataviz"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  data()
  {
    return{
      ddata: [
        { "xx":1,"yy":3,"num":4 },
        { "xx":1,"yy":6,"num":6 },
        { "xx":1,"yy":5,"num":1 },
        { "xx":1,"yy":3,"num":5 },
        { "xx":2,"yy":3,"num":4 },
        { "xx":2,"yy":4,"num":7 },
        { "xx":6,"yy":5,"num":2 },
        { "xx":9,"yy":6,"num":5 },
        { "xx":3,"yy":3,"num":4 },
        { "xx":5,"yy":5,"num":6 },
        { "xx":3,"yy":5,"num":3 },
        { "xx":6,"yy":6,"num":5 },
        { "xx":4,"yy":7,"num":4 },
        { "xx":8,"yy":4,"num":6 },
        { "xx":4,"yy":5,"num":4 },
        { "xx":4,"yy":6,"num":5 },
      ]
    }
  },
  mounted() {
    this.drawScatterPlot();
  },
  methods: {
    drawScatterPlot() {
      // set the dimensions and margins of the graph
      const margin = { top: 30, right: 50, bottom: 50, left: 50 };
      const width = 700 - margin.left - margin.right;
      const height = 700 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      const svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Inline data
      const data = this.ddata;

      // Add X axis
      var x = d3.scaleLinear()
    .domain([0, 10])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
      
        // 刻度标签数组
      const categories = ["篇目", " ", "神异", "植被", "兽类", "河流", "山川" ," ",];

      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0,8])
        .range([height, 0]);

        // Create the Y axis for names
      var yName = d3.scaleBand()
        .domain(categories)
        .range([ height,0])
        .paddingInner(1);
        
      svg.append("g")
        .call(d3.axisLeft(yName).tickSize(0))
        .select(".domain").remove()


      // Add a scale for bubble size
      const z = d3.scaleLinear()
        .domain([1,10])
        .range([1, 90]);

      // Add dots
      svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.xx); })
        .attr("cy", function(d) { return y(d.yy); })
        .attr("r", function(d) { return z(d.num); })
        .style("fill", "#69b3a2")
        .style("opacity", "0.7")
        .attr("stroke", "black");

      // Add background grid
      svg.selectAll("line.horizontalGrid").data(y.ticks(8)).enter()
        .append("line")
        .attr("class", "horizontalGrid")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", function(d){ return y(d);})
        .attr("y2", function(d){ return y(d);})
        .style("stroke", "#ccc")
        .style("stroke-width", "1px");

      svg.selectAll("line.verticalGrid").data(x.ticks(10)).enter()
        .append("line")
        .attr("class", "verticalGrid")
        .attr("x1", function(d){ return x(d);})
        .attr("x2", function(d){ return x(d);})
        .attr("y1", 0)
        .attr("y2", height)
        .style("stroke", "#ccc")
        .style("stroke-width", "1px");

    }
  }
};
</script>
