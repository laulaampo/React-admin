import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';

export default class Line extends Component {
  getOption = () => {
    // option对象具体参数：参照echarts文档
    return {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量'] // 图例
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'] // x轴每项内容
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20] // Y轴每项数据
        }
      ]
    };
  };
  render() {
    return (
      <ReactEcharts option={this.getOption()} />
    )
  }
}
