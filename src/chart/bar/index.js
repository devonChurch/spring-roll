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

    return stacks.map((stack, stackIndex) => (
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
    ));
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
