<template>
  <div ref="chart" style="width: 800px; height: 500px; left: -160px"></div>
</template>

<script>
import * as echarts from "echarts/core";
import { ScatterChart, LinesChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";
import { TitleComponent, TooltipComponent } from "echarts/components";

echarts.use([
  ScatterChart,
  LinesChart,
  SVGRenderer,
  TitleComponent,
  TooltipComponent,
]);

export default {
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const chartDom = this.$refs.chart;
      const myChart = echarts.init(chartDom);

      const circleCount = 13; // 上半圆小圆数量
      const circleCount1 = 5; // 下边缘小圆数量
      const bottomCircleCount = 13; // 底部小圆数量

      const circleData = [];
      const lineData = [];
      const textData = [];
      const start = ["鼓", "祝融", "共工", "颛顼", "应龙"];
      const end = [
        ["烛九阴", "葆江", "黄帝", "钦䲹"],
        ["炎帝", "听沃", "炎居", "节并", "戏器"],
        ["炎帝", "听沃", "炎居", "节并", "戏器"],
        ["黄帝", "昌意", "韩流"],
        ["黄帝", "蚩尤", "大禹"],
      ];
      const nameEnd = [
        "烛九阴",
        "葆江",
        "黄帝",
        "钦䲹",
        "炎帝",
        "听沃",
        "炎居",
        "节并",
        "戏器",
        "昌意",
        "韩流",
        "蚩尤",
        "大禹",
      ];

      // 生成半圆上半部分的小圆数据
      for (let i = 0; i < circleCount; i++) {
        const angle = (i / (circleCount - 1)) * Math.PI; // 0 到 π 的角度范围
        const x = 3 * Math.cos(angle);
        const y = 3 * Math.sin(angle);

        //显示文本
        if (y >= 0) {
          const textX = x * 1.2; // 调整文本位置，沿着圆心连接线延伸
          const textY = y * 1.2;
          circleData.push({
            value: [x, y],
            index: i,
            name: nameEnd[i],
            label: {
              show: false,
              position: [textX, textY],
              align: "center",
              verticalAlign: "middle",
              rotate: Math.atan2(y, x) * (180 / Math.PI) - 90, // 修改旋转角度
              formatter: function (params) {
                return params.data.name.split("").join("\n"); // 名字中的每个字符换行显示
              },
              fontSize: 14,
              color: "#000",
            },
          });
        }
      }

      // 在半圆的下边缘均匀排列小圆
      const bottomY = -1; // 下边缘的 y 坐标

      for (let i = 0; i < circleCount1; i++) {
        const x = -3 + (6 * i) / (circleCount1 - 1); // 在 x 轴上均匀分布小圆
        const circle = {
          value: [x, bottomY],
          index: circleCount + i,
          name: start[i],
        };
        circleData.push(circle);

        // 修改此部分逻辑，使下边缘小圆名字为start[i]的和上半圆小圆中名字和end的第i行相同的那些小圆相连
        end[i].forEach((endName) => {
          const upperIndex = circleData.findIndex(
            (d) => d.name === endName && d.index < circleCount
          );
          if (upperIndex !== -1) {
            lineData.push([
              { value: [x, bottomY], index: circleCount + i }, // 下边缘的小圆作为起点
              circleData[upperIndex], // 上半圆中名字和end的第i行相同的点作为终点
            ]);
          }
        });
      }

      // 在底部均匀排列小圆
      for (let i = 0; i < bottomCircleCount; i++) {
        const x = -3 + (6 * i) / (bottomCircleCount - 1); // 在 x 轴上均匀分布底部小圆
        const bottomCircle = {
          value: [x, -2],
          index: circleCount + circleCount1 + i,
          name: nameEnd[i],
          label: {
            show: true,
            position: "bottom",
            distance: 20, // 标签与点的距离，增加距离使标签向下移动
            formatter: function (params) {
              const name = params.data.name;
              return name.split("").join("\n");
            },
            fontSize: 14, // 字体大小
            color: "#000", // 字体颜色
          },
        };
        circleData.push(bottomCircle);

        // 修改此部分逻辑，使下边缘小圆名字为start[i]的和底部小圆中名字和end的第i行相同的那些小圆相连
        start.forEach((startName, index) => {
          if (bottomCircle.name && end[index].includes(bottomCircle.name)) {
            const bottomEdgeCircleIndex = circleCount + index;
            lineData.push([
              {
                value: bottomCircle.value,
                index: bottomCircle.index,
              },
              {
                value: circleData[bottomEdgeCircleIndex].value,
                index: bottomEdgeCircleIndex,
                hidden: true, // 默认隐藏
              },
            ]);
          }
        });
      }

      const option = {
        series: [
          {
            type: "scatter",
            symbolSize: 20,
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
          {
            type: "scatter",
            symbol: "none", // 不显示点，只显示文本
            label: {
              show: true,
              formatter: (params) => {
                return params.data.name;
              },
              position: "right",
              align: "center",
              verticalAlign: "middle",
              rotate: (params) => {
                return params.data.rotation * (180 / Math.PI); // 角度转换为度
              },
              fontSize: 14,
              color: "#000",
            },
            data: textData,
          },
        ],
        xAxis: { show: false },
        yAxis: { show: false },
        grid: { top: "center", left: "center", height: "50%" },
        //小黑框
        tooltip: {
          trigger: "item",
          backgroundColor: "#000", // 背景颜色为黑色
          textStyle: {
            color: "#fff", // 文字颜色为白色
          },
          formatter: function (params) {
            if (
              params.seriesType === "scatter" &&
              params.data.index < circleCount + circleCount1
            ) {
              return params.data.name; // 只显示上半圆小圆的名称
            }
          },
        },
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
