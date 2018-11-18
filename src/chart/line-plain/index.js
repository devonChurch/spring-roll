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
    const { data, xAxisMargin, yAxisMargin, svgHeight, svgWidth } = this.props;
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
    const createLine = d3
      .line()
      .x(({ date }) => xScale(date))
      .y(({ total }) => yScale(total))
      .curve(d3.curveCatmullRom.alpha(0.05));
    const line = createLine(data);

    console.log(line);

    return (
      <Chart viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <Line
          d={line}
          transform={`translate(${chartMarginLeft +
            xScale.bandwidth() / 2}, ${chartMarginTop})`}
        />

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
