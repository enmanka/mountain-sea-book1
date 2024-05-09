<template>
  <div>
    <!-- 搜索框 -->
    <input
      type="text"
      v-model="searchTerm"
      @input="searchNode"
      placeholder="输入节点名称搜索"
    />
    <!-- 节点名称下拉列表 -->
    <select v-model="selectedNode" @change="onSelectedNodeChange">
      <option value="">选择节点名称</option>
      <option v-for="node in allNodeNames" :value="node">{{ node }}</option>
    </select>
    <!-- 关系图 -->
    <div ref="chart" style="width: 100%; height: 600px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "EChartsDemo7",
  data() {
    return {
      searchTerm: "", // 搜索框中的搜索词
      selectedNode: "", // 选择的节点名称
      originalGraphData: null, // 原始图表数据
      currentGraphData: null, // 当前显示的图表数据
    };
  },
  computed: {
    // 获取所有节点的名称
    allNodeNames() {
      if (!this.originalGraphData) return [];
      return this.originalGraphData.nodes.map((node) => node.name);
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      var chartDom = this.$refs.chart;
      var myChart = echarts.init(chartDom);

      // 显示加载动画
      myChart.showLoading();

      // 模拟异步请求数据
      setTimeout(() => {
        // 获取数据
        var graphData = this.generateRandomGraphData();

        // 保存原始图表数据
        this.originalGraphData = graphData;

        // 隐藏加载动画
        myChart.hideLoading();

        // 设置图表配置项
        var option = {
          title: {
            text: "Les Miserables",
            subtext: "Circular layout",
            top: "bottom",
            left: "right",
          },
          tooltip: {},
          legend: [
            {
              data: graphData.categories.map(function (a) {
                return a.name;
              }),
            },
          ],
          animationDurationUpdate: 1500,
          animationEasingUpdate: "quinticInOut",
          series: [
            {
              name: "Les Miserables",
              type: "graph",
              layout: "circular",
              circular: {
                rotateLabel: true,
              },
              data: graphData.nodes,
              links: graphData.links,
              categories: graphData.categories,
              roam: true,
              label: {
                position: "right",
                formatter: "{b}",
              },
              lineStyle: {
                color: "source",
                curveness: 0.3,
              },
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  width: 10,
                },
              },
            },
          ],
        };

        // 将配置应用到图表中
        myChart.setOption(option);

        // 保存当前显示的图表数据
        this.currentGraphData = graphData;
      }, 1000); // 模拟加载数据的延迟
    },
    generateRandomGraphData() {
      // 生成随机节点、边和分类
      var nodes = [];
      for (var i = 0; i < 10; i++) {
        nodes.push({
          name: "Node " + (i + 1),
          symbolSize: Math.random() * 30 + 40, // 随机大圆点大小
          category: Math.floor(Math.random() * 3), // 随机分类
        });

        // 生成小圆点
        for (var j = 0; j < 5; j++) {
          nodes.push({
            name: "Child " + (i + 1) + "-" + (j + 1),
            symbolSize: Math.random() * 10 + 5, // 随机小圆点大小
            category: Math.floor(Math.random() * 3), // 与大圆点相同的分类
            itemStyle: {
              color: "#aaa", // 小圆点颜色
            },
            x:
              Math.cos((j / 5) * 2 * Math.PI) * (nodes[i].symbolSize + 10) +
              nodes[i].x, // 小圆点位置
            y:
              Math.sin((j / 5) * 2 * Math.PI) * (nodes[i].symbolSize + 10) +
              nodes[i].y, // 小圆点位置
          });
        }
      }

      // 生成随机边
      var links = [];
      for (var k = 0; k < nodes.length; k++) {
        var sourceIndex = k;
        var targetIndex = Math.floor(Math.random() * (nodes.length - 1));
        if (targetIndex >= sourceIndex) {
          targetIndex++;
        }
        links.push({
          source: nodes[sourceIndex].name,
          target: nodes[targetIndex].name,
        });
      }

      // 设置随机分类
      var categories = [];
      for (var l = 0; l < 3; l++) {
        categories.push({
          name: "Category " + (l + 1),
        });
      }

      return {
        nodes: nodes,
        links: links,
        categories: categories,
      };
    },
    searchNode() {
      // 检查原始图表数据是否已设置
      if (!this.originalGraphData) return;

      // 根据搜索框中的搜索词更新图表显示
      if (this.searchTerm.trim() === "") {
        // 如果搜索词为空，则恢复显示原始图表数据
        this.currentGraphData = this.originalGraphData;
      } else {
        // 否则根据搜索词过滤节点，并显示与搜索节点直接相关的节点及其关系连线
        var searchedNode = this.originalGraphData.nodes.find(
          (node) => node.name === this.searchTerm
        );
        if (searchedNode) {
          var searchedNodes = [searchedNode];
          var searchedLinks = [];
          this.originalGraphData.links.forEach((link) => {
            if (
              link.source === searchedNode.name ||
              link.target === searchedNode.name
            ) {
              searchedLinks.push(link);
              if (!searchedNodes.some((node) => node.name === link.source)) {
                searchedNodes.push(
                  this.originalGraphData.nodes.find(
                    (node) => node.name === link.source
                  )
                );
              }
              if (!searchedNodes.some((node) => node.name === link.target)) {
                searchedNodes.push(
                  this.originalGraphData.nodes.find(
                    (node) => node.name === link.target
                  )
                );
              }
            }
          });
          this.currentGraphData = {
            nodes: searchedNodes,
            links: searchedLinks,
            categories: this.originalGraphData.categories,
          };
        } else {
          // 如果搜索词不匹配任何节点，则不显示图表
          this.currentGraphData = null;
        }
      }

      // 更新图表显示
      this.updateChart();
    },
    onSelectedNodeChange() {
      // 将选择的节点名称填入搜索框中，并触发搜索操作
      this.searchTerm = this.selectedNode;
      this.searchNode();
    },
    updateChart() {
      // 更新图表显示
      var myChart = echarts.getInstanceByDom(this.$refs.chart);
      if (myChart && this.currentGraphData) {
        var option = myChart.getOption();
        option.series[0].data = this.currentGraphData.nodes;
        option.series[0].links = this.currentGraphData.links;
        myChart.setOption(option);
      }
    },
  },
};
</script>

<style>
/* 在这里添加任何自定义样式 */
</style>
