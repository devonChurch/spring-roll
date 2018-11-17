import React, { Component } from "react";
import * as d3 from "d3";

console.log(d3);

class BarChart extends Component {
  render() {
    const {
      data,
      xData,
      yData,
      height: heightMax,
      width: widthMax
    } = this.props;
    const widthMin = 0;
    const heightMin = 0;
    const yMin = 0;
    const yMax = d3.max(data, ({ total }) => total);
    const yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([heightMin, heightMax]);

    console.log({ data, yMax });
    return (
      <svg viewBox={`0 0 ${widthMax} ${heightMax}`}>
        {data.map(({ name, total }, index) => (
          <rect
            key={name}
            fill={"skyblue"}
            x={index * 50}
            y={heightMax - yScale(total)}
            width={50}
            height={yScale(total)}
          />
        ))}
      </svg>
    );
  }
}

export default BarChart;
