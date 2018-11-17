import React, { Component } from "react";
import * as d3 from "d3";
import styled from "styled-components";

const Chart = styled.svg`
  outline: 1px solid black;
`;

const Bar = styled.rect`
  fill: orange;
`;

const Ticks = styled.g`
  .domain,
  .tick line {
    // display: none;
  }

  text {
    font-size: 10px;
  }
`;

const MARGIN_DEFAULT = 10;

class BarChart extends Component {
  render() {
    const { data, xAxisMargin, yAxisMargin, svgHeight, svgWidth } = this.props;
    // Chart.
    const chartMarginLeft = yAxisMargin || MARGIN_DEFAULT;
    const chartMarginRight = MARGIN_DEFAULT;
    const chartMarginTop = MARGIN_DEFAULT;
    const chartMarginBottom = xAxisMargin || MARGIN_DEFAULT;
    // Content.
    const contentHeight = svgHeight - chartMarginTop - chartMarginBottom;
    const contentWidth = svgWidth - chartMarginLeft - chartMarginRight;
    // Y-Axis.
    const yMin = 0;
    const yMax = d3.max(data, ({ total }) => total);
    const yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([contentHeight, 0]);
    const yAxis = d3.axisLeft(yScale);
    const createYAxis = node => d3.select(node).call(yAxis);
    // X-Axis
    // const [xMin, xMax] = d3.extent(data, ({ date }) => date);
    const xScale = d3
      .scaleBand()
      .domain(data.map(({ date }) => date))
      .range([0, contentWidth]);
    const xFormat = d3.timeFormat("%d");
    const xAxis = d3
      .axisBottom(xScale)
      .ticks([10, 50])
      .tickFormat(xFormat);
    const createXAxis = node => d3.select(node).call(xAxis);

    return (
      <Chart viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {data.map(({ date, total }, index) => (
          <Bar
            key={date.getTime()}
            x={chartMarginLeft + index * xScale.bandwidth()}
            y={yScale(total) + chartMarginTop}
            width={xScale.bandwidth()}
            height={contentHeight - yScale(total)}
          />
        ))}

        <Ticks
          ref={createYAxis}
          transform={`translate(${chartMarginLeft}, ${chartMarginTop})`}
        />

        <Ticks
          ref={createXAxis}
          transform={`translate(${chartMarginLeft}, ${svgHeight -
            chartMarginBottom})`}
        />
      </Chart>
    );
  }
}

export default BarChart;
