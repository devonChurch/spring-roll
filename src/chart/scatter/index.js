import React, { Component } from "react";
import * as d3 from "d3";
import { Dot } from "../../helpers/";

class ScatterStandard extends Component {
  render() {
    const {
      chartItems,
      stackColor,
      stackKey,
      xScale,
      yScale,
      chartMarginLeft,
      chartMarginTop,
      contentHeight
    } = this.props;

    // Dots.
    const dots = chartItems.map(({ [stackKey]: value }, dotIndex) => ({
      cx: dotIndex * xScale.bandwidth(),
      cy: yScale(value)
    }));

    const transformX = chartMarginLeft + xScale.bandwidth() / 2;
    const transformY = chartMarginTop;

    return (
      <g transform={`translate(${transformX}, ${transformY})`}>
        {dots.map(({ cx, cy }) => (
          <Dot key={`${cx}-${cy}`} {...{ cx, cy }} r="5" fill={stackColor} />
        ))}
      </g>
    );
  }
}

export default ScatterStandard;
