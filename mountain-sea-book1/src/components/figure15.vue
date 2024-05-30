<template>
  <!-- 这里放置组件的模板内容 -->
  <div id="my_dataviz"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  data() {
    return {
      ddata: [
        {
          "Almost Certainly": "95",
          "Highly Likely": "80",
          "Very Good Chance": "85",
          "Probable": "75",
          "Likely": "66",
          "Probably": "75",
          "We Believe": "66",
          "Better Than Even": "55",
          "About Even": "50",
          "We Doubt": "40",
          "Improbable": "20",
          "Unlikely": "30",
          "Probably Not": "15",
          "Little Chance": "20",
          "Almost No Chance": "5",
          "Highly Unlikely": "25",
          "Chances Are Slight": "25"
        },
        {
          "Almost Certainly": "95",
          "Highly Likely": "75",
          "Very Good Chance": "75",
          "Probable": "51",
          "Likely": "75",
          "Probably": "51",
          "We Believe": "51",
          "Better Than Even": "51",
          "About Even": "50",
          "We Doubt": "20",
          "Improbable": "49",
          "Unlikely": "25",
          "Probably Not": "49",
          "Little Chance": "5",
          "Almost No Chance": "5",
          "Highly Unlikely": "10",
          "Chances Are Slight": "5"
        },
        {
          "Almost Certainly": "95",
          "Highly Likely": "85",
          "Very Good Chance": "85",
          "Probable": "70",
          "Likely": "75",
          "Probably": "70",
          "We Believe": "80",
          "Better Than Even": "60",
          "About Even": "50",
          "We Doubt": "30",
          "Improbable": "10",
          "Unlikely": "25",
          "Probably Not": "25",
          "Little Chance": "20",
          "Almost No Chance": "1",
          "Highly Unlikely": "5",
          "Chances Are Slight": "15"
        }
      ]
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
      var data = this.ddata;

      // Get the different categories and count them
      var categories = ["Almost Certainly", "Very Good Chance", "We Believe", "Likely", "About Even", "Little Chance", "Chances Are Slight", "Almost No Chance"];
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
        .domain([-10, 120])
        .range([0, width]);
      svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues([0, 25, 50, 75, 100]).tickSize(-height))
        .select(".domain").remove();

      // Add X axis label:
      svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 40)
        .text("Probability (%)");

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
      var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)); // increase this 40 for more accurate density.
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
        .attr("transform", function (d) { return "translate(0," + (yName(d.key) - height) + ")" })
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
