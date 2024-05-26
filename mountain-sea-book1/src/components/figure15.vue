<template>
  <!-- 这里放置组件的模板内容 -->
  <div id="my_dataviz"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  data() {
    return {
      data2:[
        {"mount1":"10","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"9","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"8","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"8","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"8","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"20","mount7":"60","mount8":"50", },
        {"mount1":"8","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"10","mount7":"60","mount8":"50", },
        {"mount1":"7","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"7","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"7","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"4","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"6","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"6","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"5","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"5","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"5","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"5","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"5","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"5","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"6","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"6","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"6","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"6","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"7","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        {"mount1":"8","mount2":"80","mount3":"40","mount4":"70","mount5":"90","mount6":"30","mount7":"60","mount8":"50", },
        
      ],
    }
  },
  mounted() {
    // 在组件挂载后调用方法来处理数据
    this.processData();
  },
  methods: {
    processData() {
      // set the dimensions and margins of the graph
      var margin = { top: 80, right: 30, bottom: 50, left: 110 },
        width = 860 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // read data
      var data = this.data2;

      // Get the different categories and count them
      var categories = ["mount1", "mount2","mount3","mount4","mount5","mount6","mount7","mount8"];
      var n = categories.length;

      // Compute the mean of each group
      var allMeans = [];
      for (var i in categories) {
        var currentGroup = categories[i];
        var mean = d3.mean(data, function (d) { return +d[currentGroup]; });
        allMeans.push(mean);
      }

      // Create a color scale using these means.
      var myColor = d3.scaleSequential()
        .domain([0, 100])
        .interpolator(d3.interpolateViridis);

      // Add X axis
      var x = d3.scaleLinear()
        .domain([0,100])
        .range([0, width]);
      svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues([0, 25, 50, 75, 100]).tickSize(-height))
        .select(".domain").remove();

      // Create a Y scale for densities
      var y = d3.scaleLinear()
        .domain([0, 0.25])
        .range([height, 0]);

      // Create the Y axis for names
      var yName = d3.scaleBand()
        .domain(categories)
        .range([0, height])
        .paddingInner(1);
      svg.append("g")
        .call(d3.axisLeft(yName).tickSize(0))
        .select(".domain").remove();

      // Compute kernel density estimation for each column:
      var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(10)); // increase this 40 for more accurate density.
      var allDensity = [];
      for (var i = 0; i < n; i++) {
        var key = categories[i];
        var density = kde(data.map(function (d) { return d[key]; }));
        allDensity.push({ key: key, density: density });
      }

      // Add areas
      svg.selectAll("areas")
        .data(allDensity)
        .enter()
        .append("path")
        .attr("transform", function (d) { return "translate(0," - height + ")" })
        .attr("fill", function (d) {
          var grp = d.key;
          var index = categories.indexOf(grp);
          var value = allMeans[index];
          return myColor(value);
        })
        .datum(function (d) { return d.density })
        .attr("opacity", 0.7)
        .attr("stroke", "#000")
        .attr("stroke-width", 0.1)
        .attr("d", d3.line()
          .curve(d3.curveBasis)
          .x(function (d) { return x(d[0]); })
          .y(function (d) { return y(d[1]); })
        );

      // This is what I need to compute kernel density estimation
      function kernelDensityEstimator(kernel, X) {
        return function (V) {
          return X.map(function (x) {
            return [x, d3.mean(V, function (v) { return kernel(x - v); })];
          });
        };
      }
      function kernelEpanechnikov(k) {
        return function (v) {
          return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
        };
      }
    }
  }
};
</script>
