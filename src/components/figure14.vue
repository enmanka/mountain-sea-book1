<template>
  <div id="my_dataviz"></div>
  <!-- <el-tooltip
        class="box-item"
        effect="dark"
        content="Top Left prompts info"
        placement="top-start"
      >
        <el-button>top-start</el-button>
      </el-tooltip> -->
</template>

<script>
import * as d3 from 'd3';
import { pointer } from 'd3';


export default {
  data()
  {
    return{
      ddata: [
        { "xx":1,"yy":6,"num":39 },
        { "xx":1,"yy":5,"num":18 },
        { "xx":1,"yy":4,"num":17 },
        { "xx":1,"yy":3,"num":20 },
        { "xx":1,"yy":2,"num":20 },

        { "xx":2,"yy":6,"num":77 },
        { "xx":2,"yy":5,"num":47 },
        { "xx":2,"yy":4,"num":73 },
        { "xx":2,"yy":3,"num":40 },
        { "xx":2,"yy":2,"num":20 },
        
        { "xx":3,"yy":6,"num":46 },
        { "xx":3,"yy":5,"num":24 },
        { "xx":3,"yy":4,"num":20 },
        { "xx":3,"yy":3,"num":20 },
        { "xx":3,"yy":2,"num":20 },

        { "xx":4,"yy":6,"num":100 },
        { "xx":4,"yy":5,"num":63 },
        { "xx":4,"yy":4,"num":67 },
        { "xx":4,"yy":3,"num":122 },
        { "xx":4,"yy":2,"num":48 },

        { "xx":5,"yy":6,"num":87 },
        { "xx":5,"yy":5,"num":39 },
        { "xx":5,"yy":4,"num":63 },
        { "xx":5,"yy":3,"num":42 },
        { "xx":5,"yy":2,"num":20},

      ],
      data2:[
       {"index":1,"high":100},
       {"index":2,"high":70},
       {"index":3,"high":60},
       {"index":4,"high":100},
       {"index":5,"high":80},
       {"index":6,"high":100},
       {"index":7,"high":30},
       {"index":8,"high":110},
]
    }
  },
  mounted() {
    this.drawScatterPlot();
  },
  methods: {
    drawScatterPlot(){
      // set the dimensions and margins of the graph
      const margin = { top: 70, right: 70, bottom: 50, left: 50 };
      const width = 700 - margin.left - margin.right;
       const height = 550 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      const svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Inline data
      const data = this.ddata;
      const data2=this.data2;
      
      // 刻度标签数组
      const categories = ["山脉数", "  ",  "神异", "植被", "鸟兽", "河流", "山川"];
      const shan=[" ","南山经","西山经","北山经","东山经","中山经",];
      // Add X axis
      var x = d3.scaleLinear()
    .domain([0, 5])
    .range([ 0, width ]);

    
    var xName = d3.scaleBand()
        .domain(shan)
        .range([0,width])
        .paddingInner(1);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xName).tickSize(-6))
    .selectAll("text")
        .style("font-size","20px")
        .style("font-family","FangSong")
    
      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0,6])
        .range([height, 0]);

        // Create the Y axis for names
      var yName = d3.scaleBand()
        .domain(categories)
        .range([ height,0])
        .paddingInner(1);
        
      svg.append("g")
        .call(d3.axisLeft(yName).tickSize(0))
        .selectAll("text")
        .style("font-size","20px")
        .style("font-family","FangSong")


      // Add a scale for bubble size
      const z = d3.scaleLinear()
        .domain([1,100])
        .range([1, 40]);

      const customColors = [
     "#EEB4B4","#87CEEB","#9BCD9B","#A2CD5A","#E9967A","#FFD700"
      ];

      // 定义颜色比例尺，将自定义颜色数组作为范围
      const colorScale = d3
        .scaleOrdinal()
        .domain([0,8])
        .range(customColors);

        // Create a color scale using these means.
  var myColor = d3.scaleSequential()
    .domain([0,10])
    .interpolator(d3.interpolateViridis);


  //     // -1- Create a tooltip div that is hidden by default:
  // var tooltip = d3.select("#my_dataviz")
  //   .append("div")
  //     .style("opacity", 0)
  //     .attr("class", "tooltip")
  //     .style("background-color", "black")
  //     .style("border-radius", "5px")
  //     .style("padding", "10px")
  //     .style("color", "white")

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  // var showTooltip = function(d) {
  //   tooltip
  //     .transition()
  //     .duration(200)
  //   tooltip
  //     .style("opacity", 1)
  //     .html("num:" + d.num)
  //     .style("left", (d3.mouse(this)[0]+30) + "px")
  //     .style("top", (d3.mouse(this)[1]+30) + "px")
  // }
  // var moveTooltip = function(d) {
  //   console.log(d3.mouse(this)[0]+30)
  //   tooltip
  //     .style("left", (d3.mouse(this)[0]+30) + "px")
  //     .style("top", (d3.mouse(this)[1]+30) + "px")
  // }

//   var showTooltip = function(d) {
//   const [x, y] = pointer(this); // 获取鼠标位置
//   tooltip
//     .transition()
//     .duration(200)
//   tooltip
//     .style("opacity", 1)
//     .html("num:" + d.num)
//     .style("left", (x + 30) + "px") // 根据鼠标位置调整提示框位置
//     .style("top", (y + 30) + "px")
// }

// var moveTooltip = function(d) {
//   const [x, y] = pointer(this); // 获取鼠标位置
//   tooltip
//     .style("left", (x + 30) + "px") // 根据鼠标位置调整提示框位置
//     .style("top", (y + 30) + "px")
// }
  var hideTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }
      // Add dots
      svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "bubbles")
        .attr("cx", function(d) { return x(d.xx); })
        .attr("cy", function(d) { return y(d.yy); })
        .attr("r", function(d) { return z(d.num); })
        .style("fill", (d) => colorScale(d.xx))
        .style("opacity", "0.8")
        .on("mousedown",(event,d)=>{
        let rect = svg.current.getBoundingClientRect();
        let coordinates = [event.offsetX + rect.left, event.offsetY + rect.top]
        fstooltip
        .style("left",coordinates[0] + "px")
        .style("top",coordinates[1] + "px")
        .html("+d.index+")
        .style("display","inline-block");

      let tooltipWidth = fstooltip.node().offsetWidth;
      let tooltipHeight = fstooltip.node().offsetHeight;
      let left = Math.min(coordinates[0].rect.right - tooltipWidth - 5);
      let top = Math.min(coordinates[1].rect.bottom - tooltipHeight - 5);

      fstooltip.style("left",left + "px")
      .style("top",top + "px")
      .style("display","inline-block");
      })
      .on("mouseup",(event,d)=>{
        fstooltip.style("display","none");
      });

      // Add background grid
      svg.selectAll("line.horizontalGrid").data(y.ticks(5)).enter()
        .append("line")
        .attr("class", "horizontalGrid")
        .attr("x1", 0)
        .attr("x2", width+60)
        .attr("y1", function(d){ return y(d);})
        .attr("y2", function(d){ return y(d);})
        .style("stroke", "#ccc")
        .style("stroke-width", "1px");

      svg.selectAll("line.verticalGrid").data(x.ticks(10)).enter()
        .append("line")
        .attr("class", "verticalGrid")
        .attr("x1", function(d){ return x(d);})
        .attr("x2", function(d){ return x(d);})
        .attr("y1", -40)
        .attr("y2", height)
        .style("stroke", "#ccc")
        .style("stroke-width", "1px");

var rr=35;
// 绘制半个椭圆的路径
svg.append('g')
    .selectAll("path")
    .data(data2)
    .enter()
    .append("path")
    .attr("d", function(d){
        var center = x(d.index);
        var h = y(d.high);
        return "M " + (center - rr) + " 0 A "+rr+" "+(d.high)+" 0 0 1 " + (center + rr) + " 0";
    })
    .attr("transform", "translate(0," + height + ")")
    .style("fill", "#69b3a2")
    .style("opacity", "0.7")
    .attr("stroke", "white")
    .attr("stroke-width","2px");
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
</style>