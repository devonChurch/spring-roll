import React, { Component } from "react";
import * as d3 from "d3";
import { Bar, Stack } from "../../helpers/";

export class BarStacked extends Component {
  render() {
    const {
      chartItems,
      stackColors = [],
      stackKeys = [],
      xScale,
      yScale,
      chartMarginLeft,
      chartMarginTop,
      contentHeight
    } = this.props;

    // Stacks.
    const createStacks = d3.stack().keys(stackKeys);
    const stacks = createStacks(chartItems);

    const transformX = chartMarginLeft;
    const transformY = chartMarginTop;

    return (
      <g transform={`translate(${transformX}, ${transformY})`}>
        {stacks.map((stack, stackIndex) => (
          <Stack key={stackIndex}>
            {stack.map(([yBottom, yTop], barIndex) => (
              <Bar
                key={`${stackIndex}-${barIndex}`}
                x={barIndex * xScale.bandwidth()}
                y={yScale(yTop)}
                width={xScale.bandwidth()}
                height={contentHeight - yScale(yTop - yBottom)}
                fill={stackColors[stackIndex]}
              />
            ))}
          </Stack>
        ))}
      </g>
    );
  }
}

class BarStandard extends Component {
  render() {
    const { stackKey, stackColor, ...props } = this.props;

    return (
      <BarStacked
        {...props}
        stackKeys={stackKey && [stackKey]}
        stackColors={stackColor && [stackColor]}
      />
    );
  }
}

export default BarStandard;
