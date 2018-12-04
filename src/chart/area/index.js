import React, { Component } from "react";
import * as d3 from "d3";
import { Area } from "../../helpers/";

export class AreaStacked extends Component {
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

    const createStacks = (stackKey, stackIndex) => {
      const getPreviousValues = (
        chartItem,
        currentTotal = 0,
        currentIndex = stackIndex
      ) => {
        const previousIndex = currentIndex - 1;
        const previousKey = stackKeys[previousIndex];
        const previousValue = chartItem[previousKey];
        const previousTotal = currentTotal + (previousValue || 0);

        return previousValue === undefined
          ? previousTotal
          : getPreviousValues(chartItem, previousTotal, previousIndex);
      };
      const getYTop = chartItem =>
        yScale(getPreviousValues(chartItem) + chartItem[stackKey]);
      const getYBottom = chartItem => yScale(getPreviousValues(chartItem));
      const createArea = d3
        .area()
        .x(({ date }) => xScale(date))
        .y1(getYTop)
        .y0(getYBottom)
        .curve(d3.curveCatmullRom.alpha(0.00001));

      return createArea(chartItems);
    };
    const stacks = stackKeys.map(createStacks);

    const transformX = chartMarginLeft + xScale.bandwidth() / 2;
    const transformY = chartMarginTop;

    return (
      <g transform={`translate(${transformX}, ${transformY})`}>
        {stacks.map((stack, stackIndex) => (
          <Area key={stackIndex} d={stack} fill={stackColors[stackIndex]} />
        ))}
      </g>
    );
  }
}

export class AreaStandard extends Component {
  render() {
    const { stackKey, stackColor, ...props } = this.props;
    return (
      <AreaStacked
        {...props}
        stackKeys={stackKey && [stackKey]}
        stackColors={stackColor && [stackColor]}
      />
    );
  }
}

export default AreaStandard;
