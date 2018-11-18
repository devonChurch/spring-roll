import React, { Component } from "react";
import * as d3 from "d3";
import {
  Chart,
  Bar,
  Ticks,
  createChartScaffold,
  createYAxisHooks,
  createXAxisHooks
} from "../../helpers/";

class BarPlainChart extends Component {
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

export default BarPlainChart;
