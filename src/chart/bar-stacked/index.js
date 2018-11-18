import React, { Component } from "react";
import * as d3 from "d3";
import {
  Chart,
  Bar,
  Stack,
  Ticks,
  createChartScaffold,
  createYAxisHooks,
  createXAxisHooks
} from "../../helpers/";

class BarStackedChart extends Component {
  render() {
    const {
      data,
      stackColors = [],
      stackKeys = [],
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
    // Stacks.
    const createStacks = d3.stack().keys(stackKeys);
    const stacks = createStacks(data);

    return (
      <Chart viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {stacks.map((stack, stackIndex) => (
          <Stack key={stackIndex}>
            {stack.map(([yBottom, yTop], barIndex) => (
              <Bar
                key={`${stackIndex}-${barIndex}`}
                x={chartMarginLeft + barIndex * xScale.bandwidth()}
                y={yScale(yTop) + chartMarginTop}
                width={xScale.bandwidth()}
                height={contentHeight - yScale(yTop - yBottom)}
                fill={stackColors[stackIndex]}
              />
            ))}
          </Stack>
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

export default BarStackedChart;
