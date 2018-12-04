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
      yAxisKeys,
      shouldYAxisMinBeZero,
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

    const getMinKeysValue = chartItem => {
      const values = yAxisKeys.map(key => chartItem[key]);

      return Math.min(...values);
    };

    const getMaxKeysValue = chartItem => {
      const values = yAxisKeys.map(key => chartItem[key]);

      return Math.max(...values);
    };

    const sanatisedYMin = (() => {
      const rawYMin = d3.min(chartItems, getMinKeysValue);
      const shouldBeZero = shouldYAxisMinBeZero && rawYMin > 0;

      return shouldBeZero ? 0 : rawYMin;
    })();

    // Y-Axis.
    const { yScale, createYAxis } = createYAxisHooks({
      yMin: sanatisedYMin,
      yMax: d3.max(chartItems, getMaxKeysValue),
      contentHeight,
      shouldYAxisMinBeZero
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
