<template>
  <div ref="chart" style="width: 150%; height: 600px; left: -150px"></div>
</template>

<script>
import * as echarts from "echarts/core";
import { ScatterChart, LinesChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";
import { TitleComponent } from "echarts/components";

echarts.use([ScatterChart, LinesChart, SVGRenderer, TitleComponent]);

export default {
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const chartDom = this.$refs.chart;
      const myChart = echarts.init(chartDom);

      const circleCount = 15; // 上半圆小圆数量
      const circleCount1 = 5; // 下边缘小圆数量
      const bottomCircleCount = 15; // 底部小圆数量

      const circleData = [];
      const lineData = [];

      // 生成半圆上半部分的小圆数据
      for (let i = 0; i < circleCount; i++) {
        const angle = (i / (circleCount - 1)) * Math.PI; // 0 到 π 的角度范围
        const x = 3 * Math.cos(angle);
        const y = 3 * Math.sin(angle);

        if (y >= 0) {
          circleData.push({ value: [x, y], index: i, name: `Circle${i}` });
        }
      }

      // 在半圆的下边缘均匀排列小圆
      const bottomY = -1; // 下边缘的 y 坐标

      for (let i = 0; i < circleCount1; i++) {
        const x = -3 + (6 * i) / (circleCount1 - 1); // 在 x 轴上均匀分布小圆
        circleData.push({
          value: [x, bottomY],
          index: circleCount + i,
          name: `BottomCircle${i}`,
        });

        // 将下边缘的小圆与上半圆的某个点连接
        const upperIndex = Math.floor(Math.random() * circleCount); // 随机选择上半圆的一个点
        lineData.push([
          { value: [x, bottomY], index: circleCount + i }, // 下边缘的小圆作为起点
          circleData[upperIndex], // 上半圆的某个点作为终点
        ]);
      }

      // 在底部均匀排列小圆
      for (let i = 0; i < bottomCircleCount; i++) {
        const x = -3 + (6 * i) / (bottomCircleCount - 1); // 在 x 轴上均匀分布底部小圆
        circleData.push({
          value: [x, -2],
          index: circleCount + circleCount1 + i,
          name: `小圆${i}`,
          label: {
            show: true,
            position: "bottom",
            distance: 20, // 标签与点的距离，增加距离使标签向下移动
            rotate: -90, // 旋转标签，使标签垂直于点
            formatter: "{b}", // 显示名称
            fontSize: 10, // 字体大小
            color: "#000", // 字体颜色
          },
        });

        // 随机选择底部小圆和下边缘小圆之间连线
        const bottomCircleIndex = circleCount + circleCount1 + i;
        const bottomEdgeCircleIndex =
          circleCount + Math.floor(Math.random() * circleCount1);
        lineData.push([
          {
            value: circleData[bottomCircleIndex].value,
            index: bottomCircleIndex,
          },
          {
            value: circleData[bottomEdgeCircleIndex].value,
            index: bottomEdgeCircleIndex,
            hidden: true, // 默认隐藏
          },
        ]);
      }

      const option = {
        series: [
          {
            type: "scatter",
            symbolSize: 10,
            itemStyle: {
              color: "#000",
            },
            data: circleData,
            emphasis: {
              itemStyle: {
                color: "#ff0000",
              },
            },
            label: {
              show: false,
              formatter: (params) => {
                return params.data.name;
              },
            },
          },
          {
            id: "lines", // 为lines系列添加唯一的id
            type: "lines",
            coordinateSystem: "cartesian2d",
            data: lineData.map((line) => ({
              coords: [line[0].value, line[1].value],
              lineStyle: {
                color: line[1].hidden ? "transparent" : "#00f",
              },
              emphasis: {
                lineStyle: {
                  color: line[1].hidden ? "transparent" : "#00ff00",
                  width: 3,
                },
              },
            })),
          },
        ],
        xAxis: { show: false },
        yAxis: { show: false },
        grid: { top: "center", left: "center", height: "50%" },
        tooltip: { show: false },
        legend: { show: false },
      };

      myChart.setOption(option);

      // 监听鼠标点击事件
      myChart.on("click", (params) => {
        const dataIndex = params.dataIndex;
        const seriesType = params.seriesType;

        if (seriesType === "scatter" && params.seriesIndex === 0) {
          const currentCircle = circleData[dataIndex];
          const currentCircleIndex = currentCircle.index;

          // 判断点击的是下边缘小圆
          if (
            currentCircleIndex >= circleCount &&
            currentCircleIndex < circleCount + circleCount1
          ) {
            // 下边缘小圆点击事件处理
            lineData.forEach((line) => {
              if (line[1].index === currentCircleIndex) {
                line[1].hidden = false; // 显示当前连线
              } else if (
                line[1].index >= circleCount &&
                line[1].index < circleCount + circleCount1
              ) {
                line[1].hidden = true; // 隐藏其他下边缘小圆的连线
              }
            });

            // 重新设置图表选项以显示新的线段
            myChart.setOption({
              series: [
                {
                  id: "lines",
                  data: lineData.map((line) => ({
                    coords: [line[0].value, line[1].value],
                    lineStyle: {
                      color: line[1].hidden ? "transparent" : "#00f",
                    },
                    emphasis: {
                      lineStyle: {
                        color: line[1].hidden ? "transparent" : "#00ff00",
                        width: 3,
                      },
                    },
                  })),
                },
              ],
            });
          }

          // 判断点击的是底部小圆
          if (currentCircleIndex >= circleCount + circleCount1) {
            // 底部小圆点击事件处理
            lineData.forEach((line) => {
              if (line[0].index === currentCircleIndex) {
                line[1].hidden = false; // 显示当前连线
              }
            });

            // 重新设置图表选项以显示新的线段
            myChart.setOption({
              series: [
                {
                  id: "lines",
                  data: lineData.map((line) => ({
                    coords: [line[0].value, line[1].value],
                    lineStyle: {
                      color: line[1].hidden ? "transparent" : "#00f",
                    },
                    emphasis: {
                      lineStyle: {
                        color: line[1].hidden ? "transparent" : "#00ff00",
                        width: 3,
                      },
                    },
                  })),
                },
              ],
            });
          }
        }
      });

      // 监听鼠标悬停事件
      myChart.on("mouseover", (params) => {
        const dataIndex = params.dataIndex;
        const seriesType = params.seriesType;

        if (seriesType === "scatter") {
          const currentCircle = circleData[dataIndex];

          // 突出显示当前散点和与之相连的线段两端的散点
          myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0, // 散点系列的索引
            dataIndex: dataIndex,
          });

          lineData.forEach((line, index) => {
            if (line[0].index === currentCircle.index) {
              // 突出显示线段的另一端散点
              myChart.dispatchAction({
                type: "highlight",
                seriesIndex: 0, // 散点系列的索引
                dataIndex: line[1].index,
              });

              // 突出显示线段本身
              myChart.dispatchAction({
                type: "highlight",
                seriesIndex: 1,
                dataIndex: index,
              });
            }
          });
        }
      });

      // 监听鼠标移出事件
      myChart.on("mouseout", (params) => {
        const dataIndex = params.dataIndex;
        const seriesType = params.seriesType;

        if (seriesType === "scatter") {
          // 取消突出显示当前散点和与之相连的线段两端的散点
          myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0, // 散点系列的索引
            dataIndex: dataIndex,
          });

          lineData.forEach((line, index) => {
            if (line[0].index === circleData[dataIndex].index) {
              // 取消突出显示线段的另一端散点
              myChart.dispatchAction({
                type: "downplay",
                seriesIndex: 0, // 散点系列的索引
                dataIndex: line[1].index,
              });

              // 取消突出显示线段本身
              myChart.dispatchAction({
                type: "downplay",
                seriesIndex: 1,
                dataIndex: index,
              });
            }
          });
        }
      });
    },
  },
};
</script>
