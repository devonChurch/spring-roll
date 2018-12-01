import React, { Component } from "react";
import * as d3 from "d3";
import {
  Chart,
  Ticks,
  createChartScaffold,
  createYAxisHooks,
  createXAxisHooks
} from "../../helpers/";

class ChartScaffold extends Component {
  render() {
    const {
      children,
      chartItems,
      xAxisMargin,
      yAxisMargin,
      calcYMax,
      calcYMin,
      svgHeight,
      svgWidth
    } = this.props;
    const chartScaffold = createChartScaffold({
      xAxisMargin,
      yAxisMargin,
      svgHeight,
      svgWidth
    });
    const {
      chartMarginLeft,
      chartMarginRight,
      chartMarginTop,
      chartMarginBottom,
      contentHeight,
      contentWidth
    } = chartScaffold;

    // Y-Axis.
    const { yScale, createYAxis } = createYAxisHooks({
      yMin: d3.min(chartItems, calcYMin),
      yMax: d3.max(chartItems, calcYMax),
      contentHeight
    });
    // X-Axis
    const { xScale, createXAxis } = createXAxisHooks({
      contentWidth,
      chartItems
    });

    return (
      <Chart viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {children({
          ...chartScaffold,
          chartItems,
          yScale,
          xScale
        })}

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

export default ChartScaffold;
