import * as d3 from "d3";
import styled from "styled-components";

export const Page = styled.main`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  padding: 20px;

  > svg {
    width: 100%;
  }
`;

export const Chart = styled.svg`
  outline: 1px solid black;
`;

export const Bar = styled.rect`
  fill: ${({ fill }) => fill || "orange"};
`;

export const Stack = styled.g``;

export const Line = styled.path`
  fill: transparent;
  stroke: ${({ stroke }) => stroke || "orange"};
  stroke-width: 3;
`;

export const Ticks = styled.g`
  .domain,
  .tick line {
    // display: none;
  }

  text {
    font-size: 10px;
  }
`;

export const createChartScaffold = ({
  xAxisMargin,
  yAxisMargin,
  svgHeight,
  svgWidth
}) => {
  const MARGIN_DEFAULT = 10;
  // Chart.
  const chartMarginLeft = yAxisMargin || MARGIN_DEFAULT;
  const chartMarginRight = MARGIN_DEFAULT;
  const chartMarginTop = MARGIN_DEFAULT;
  const chartMarginBottom = xAxisMargin || MARGIN_DEFAULT;
  // Content.
  const contentHeight = svgHeight - chartMarginTop - chartMarginBottom;
  const contentWidth = svgWidth - chartMarginLeft - chartMarginRight;

  return {
    chartMarginLeft,
    chartMarginRight,
    chartMarginTop,
    chartMarginBottom,
    contentHeight,
    contentWidth
  };
};

export const createYAxisHooks = ({ yMin, yMax, contentHeight }) => {
  const yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([contentHeight, 0]);
  const yAxis = d3.axisLeft(yScale);
  const createYAxis = node => d3.select(node).call(yAxis);

  return { yScale, createYAxis };
};

export const createXAxisHooks = ({ contentWidth, data }) => {
  const xFormat = d3.timeFormat("%d");
  const xScale = d3
    .scaleBand()
    .domain(data.map(({ date }) => date))
    .range([0, contentWidth]);
  const xAxis = d3
    .axisBottom(xScale)
    .ticks([10, 50])
    .tickFormat(xFormat);
  const createXAxis = node => d3.select(node).call(xAxis);

  return { xScale, createXAxis };
};
