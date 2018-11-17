import React, { Component } from "react";
import createRandom from "lodash.random";
import BarChart from "./chart/bar/";

const createEntry = name => ({ name, total: createRandom(1, 10) });
const createData = () =>
  ["potato", "apple", "banana", "pumpkin", "orange"].map(createEntry);

class App extends Component {
  state = { data: createData() };

  render() {
    const { data } = this.state;
    const shell = { x: [], y: [] };
    const { x: xData, y: yData } = data.reduce(
      ({ x, y }, { name, total }) => ({
        x: [...x, name],
        y: [...y, total]
      }),
      shell
    );
    return (
      <div>
        <BarChart
          data={this.state.data}
          xData={xData}
          yData={yData}
          // From container query....
          height={300}
          width={500}
        />
      </div>
    );
  }
}

export default App;
