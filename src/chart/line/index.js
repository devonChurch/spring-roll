import React, { Component } from "react";
import * as d3 from "d3";
import { Line } from "../../helpers/";

class LineStandard extends Component {
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

    // Line.
    const pathData = d3
      .line()
      .x(({ date }) => xScale(date))
      .y(({ [stackKey]: value }) => yScale(value))
      .curve(d3.curveCatmullRom.alpha(0.00001))
      (chartItems); // prettier-ignore

    return (
      <g
        transform={`translate(${chartMarginLeft +
          xScale.bandwidth() / 2}, ${chartMarginTop})`}
      >
        <Line d={pathData} stroke={stackColor} />
      </g>
    );
  }
}

export default LineStandard;
