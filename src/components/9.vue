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
      <option v-for="node in allNodeNames" :key="node" :value="node">
        {{ node }}
      </option>
    </select>
    <!-- 关系图 -->
    <div ref="chart" style="width: 600px; height: 500px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "EChartsDemo",
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
      const chartDom = this.$refs.chart;
      const myChart = echarts.init(chartDom);

      // 显示加载动画
      myChart.showLoading();

      // 模拟异步请求数据
      setTimeout(() => {
        // 获取数据
        const graphData = this.generateGraphData();

        // 保存原始图表数据
        this.originalGraphData = graphData;

        // 隐藏加载动画
        myChart.hideLoading();

        // 设置图表配置项
        const option = {
          tooltip: {},
          legend: [
            {
              data: graphData.categories.map((a) => a.name),
              orient: "vertical",
              x: "left", //可设定图例在左、右、居中
            },
          ],
          animationDurationUpdate: 1500,
          animationEasingUpdate: "quinticInOut",
          series: [
            {
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
                show: true, // 显示所有节点的标签
                position: "right",
                formatter: "{b}",
                rich: {
                  vertical: {
                    rotate: 90, // 标签旋转90度
                  },
                },
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
    generateGraphData() {
      // 数据集转换为ECharts格式
      const rawData = [
        ["鼓", "烛九阴"],
        ["鼓", "葆江"],
        ["鼓", "黄帝"],
        ["鼓", "钦䲹"],
        ["英招", "帝俊"],
        ["陆吾", "帝俊"],
        ["少昊", "凤鸿氏"],
        ["耆童", "颛顼"],
        ["黎", "颛顼"],
        ["武罗", "后羿"],
        ["祝融", "炎帝"],
        ["祝融", "听沃"],
        ["祝融", "炎居"],
        ["祝融", "节并"],
        ["祝融", "戏器"],
        ["祝融", "共工"],
        ["后羿", "嫦娥"],
        ["后羿", "黄帝"],
        ["刑天", "黄帝"],
        ["共工", "祝融"],
        ["共工", "炎帝"],
        ["共工", "听沃"],
        ["共工", "炎居"],
        ["共工", "节并"],
        ["共工", "戏器"],
        ["夸父", "女魃"],
        ["夸父", "应龙"],
        ["大禹", "鲧"],
        ["句芒", "少昊"],
        ["冰夷", "应龙"],
        ["雷神", "华胥"],
        ["羲和", "帝俊"],
        ["太子长琴", "祝融"],
        ["常羲", "帝俊"],
        ["夏耕之尸", "黄帝"],
        ["夏耕之尸", "刑天"],
        ["相柳", "后羿"],
        ["禺彊", "黄帝"],
        ["玄冥", "颛顼"],
        ["应龙", "黄帝"],
        ["应龙", "蚩尤"],
        ["应龙", "大禹"],
        ["烛九阴", "十二祖巫"],
        ["帝俊", "后羿"],
        ["帝俊", "太阳神鸟"],
        ["黄帝", "炎帝"],
        ["黄帝", "蚩尤"],
        ["黄帝", "玄嚣"],
        ["黄帝", "女魃"],
        ["颛顼", "黄帝"],
        ["颛顼", "昌意"],
        ["颛顼", "韩流"],
        ["伏羲", "女娲"],
        ["炎帝", "巫山神女"],
        ["炎帝", "白鹊"],
        ["炎帝", "赤松子"],
        ["炎帝", "精卫"],
        ["嫘祖", "黄帝"],
        ["舜", "大禹"],
        ["雷神", "华胥"],
        ["雷神", "伏羲"],
        ["伏羲", "附宝"],
        ["伏羲", "少典"],
        ["伏羲", "任姒"],
        ["女娲", "附宝"],
        ["女娲", "少典"],
        ["女娲", "任姒"],
        ["附宝", "少典"],
        ["少典", "任姒"],
        ["少典", "黄帝"],
        ["任姒", "炎帝"],
        ["黄帝", "昌意"],
        ["黄帝", "苗龙"],
        ["黄帝", "禺號"],
        ["黄帝", "骆明"],
        ["昌意", "韩流"],
        ["韩流", "颛顼"],
        ["颛顼", "老童"],
        ["老童", "重"],
        ["老童", "黎"],
        ["老童", "吴回"],
        ["黎", "噎"],
        ["苗龙", "融吾"],
        ["融吾", "弄明"],
        ["弄明", "白犬"],
        ["禺號", "禺疆"],
        ["骆明", "白马"],
        ["白马", "炎融"],
        ["炎帝", "瑶姬"],
        ["炎帝", "女娃"],
        ["炎帝", "炎居"],
        ["炎居", "节并"],
        ["节并", "戏器"],
        ["戏器", "祝融"],
        ["戏器", "吴回"],
        ["祝融", "太子长琴"],
        ["共工", "术器"],
        ["共工", "后土"],
        ["后土", "噎鸣"],
        ["噎明", "鼓"],
        ["信", "夸父"],
      ];

      // 构建节点和连线数据
      const nodes = [];
      const links = [];
      const categories = [
        { name: "多关系人物" },
        { name: "较多关系人物" },
        { name: "单关系人物" },
      ];

      const nodeLinkCount = {};

      rawData.forEach(([source, target]) => {
        if (!nodeLinkCount[source]) nodeLinkCount[source] = 0;
        if (!nodeLinkCount[target]) nodeLinkCount[target] = 0;
        nodeLinkCount[source]++;
        nodeLinkCount[target]++;
        links.push({ source, target });
      });

      Object.keys(nodeLinkCount).forEach((node) => {
        let category = 2;
        let symbolSize = 10;
        if (nodeLinkCount[node] >= 4) {
          category = 0;
          symbolSize = 30;
        } else if (nodeLinkCount[node] >= 2) {
          category = 1;
          symbolSize = 20;
        }
        nodes.push({ name: node, category, symbolSize });
      });

      return {
        nodes,
        links,
        categories,
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
        const searchedNode = this.originalGraphData.nodes.find(
          (node) => node.name === this.searchTerm
        );
        if (searchedNode) {
          const searchedNodes = [searchedNode];
          const searchedLinks = [];
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
      const myChart = echarts.getInstanceByDom(this.$refs.chart);
      if (myChart && this.currentGraphData) {
        const option = myChart.getOption();
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
