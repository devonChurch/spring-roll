import React, { Component } from "react";
import createRandom from "lodash.random";
import BarChart from "./chart/bar/";

const createEntry = (_, index) => ({
  date: new Date(`2018-11-${index + 1}`),
  total: createRandom(1, 10)
});
const createData = () => new Array(10).fill(0).map(createEntry);

class App extends Component {
  state = { data: createData() };

  render() {
    const { data } = this.state;
    // const shell = { x: [], y: [] };
    // const { x: xData, y: yData } = data.reduce(
    //   ({ x, y }, { date, total }) => ({
    //     x: [...x, date],
    //     y: [...y, total]
    //   }),
    //   shell
    // );
    return (
      <div>
        <BarChart
          data={data}
          xAxisMargin={20}
          yAxisMargin={50}
          // From container query....
          svgHeight={300}
          svgWidth={500}
        />
      </div>
    );
  }
}

export default App;
