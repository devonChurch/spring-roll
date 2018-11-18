import React, { Component } from "react";
import * as d3 from "d3";
import {
  Chart,
  Line,
  Ticks,
  createChartScaffold,
  createYAxisHooks,
  createXAxisHooks
} from "../../helpers/";

class LinePlainChart extends Component {
  render() {
    const {
      data,
      lineColors = [],
      lineKeys = [],
      xAxisMargin,
      yAxisMargin,
      svgHeight,
      svgWidth
    } = this.props;
    const {
      chartMarginLeft,
      chartMarginRight,
      chartMarginTop,
      chartMarginBottom,
      contentHeight,
      contentWidth
    } = createChartScaffold({ xAxisMargin, yAxisMargin, svgHeight, svgWidth });

    // Y-Axis.
    const { yScale, createYAxis } = createYAxisHooks({
      yMin: 0,
      yMax: d3.max(data, ({ total }) => total),
      contentHeight
    });
    // X-Axis
    const { xScale, createXAxis } = createXAxisHooks({ contentWidth, data });
    // Line.
    const createLine = key =>
      d3
        .line()
        .x(({ date }) => xScale(date))
        .y(({ [key]: value }) => yScale(value))
        .curve(d3.curveCatmullRom.alpha(0.001))(data);

    const lines = lineKeys.map((key, index) => ({
      key,
      path: createLine(key),
      stroke: lineColors[index]
    }));

    return (
      <Chart viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {lines.map(({ key, path, stroke }) => (
          <Line
            key={key}
            d={path}
            stroke={stroke}
            transform={`translate(${chartMarginLeft +
              xScale.bandwidth() / 2}, ${chartMarginTop})`}
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

export default LinePlainChart;
