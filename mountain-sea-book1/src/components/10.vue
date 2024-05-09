<template>
  <div ref="chart" style="width: 100%; height: 400px"></div>
</template>  
  
<script>
import * as echarts from "echarts";

export default {
  name: "HalfCircleChart",
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chart);
      // 指定图表的配置项和数据
      let option = {
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(option);
    },
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    // 在组件销毁前，确保销毁图表实例
    this.chart.dispose();
  },
};
</script>  
  
<style scoped>
/* 在这里添加你的样式 */
</style>