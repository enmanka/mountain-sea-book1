<template>
  <!-- 一个可爱的会动的网状小图 -->
  <div ref="chart" style="width: 100%; height: 600px"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "EChartsDemo",
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      // 示例数据
      var graphData = {
        nodes: [
          { name: "Node 1", value: 10 },
          { name: "Node 2", value: 20 },
          { name: "Node 3", value: 30 },
          { name: "Node 4", value: 40 },
          { name: "Node 5", value: 50 },
        ],
        links: [
          { source: "Node 1", target: "Node 2", value: 5 },
          { source: "Node 2", target: "Node 3", value: 8 },
          { source: "Node 3", target: "Node 4", value: 10 },
          { source: "Node 4", target: "Node 5", value: 12 },
          { source: "Node 5", target: "Node 1", value: 6 },
        ],
      };

      // 初始化图表
      var myChart = echarts.init(this.$refs.chart);

      // 设置图表配置项
      var option = {
        title: {
          text: "示例图表",
        },
        series: [
          {
            type: "graph",
            layout: "force",
            data: graphData.nodes,
            links: graphData.links,
            emphasis: {
              label: {
                show: true,
                position: "right",
              },
            },
            roam: true,
            draggable: true,
          },
        ],
      };

      // 将配置应用到图表中
      myChart.setOption(option);
    },
  },
};
</script>

<style>
/* 在这里添加任何自定义样式 */
</style>