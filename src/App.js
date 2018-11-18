import React, { Component } from "react";
import createRandom from "lodash.random";
import BarPlainChart from "./chart/bar-plain/";
import BarStackedChart from "./chart/bar-stacked/";
import { Page } from "./helpers/";

const createEntry = (_, index) => {
  const apple = createRandom(0, 6);
  const banana = createRandom(0, 4);
  const potato = createRandom(0, 2);

  return {
    date: new Date(`2018-11-${index + 1}`),
    apple,
    banana,
    potato,
    total: apple + banana + potato
  };
};
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
      <Page>
        <BarPlainChart
          data={data}
          xAxisMargin={20}
          yAxisMargin={50}
          // From container query....
          svgHeight={300}
          svgWidth={500}
        />
        <BarStackedChart
          data={data}
          stackColors={["skyblue", "teal", "purple"]}
          xAxisMargin={20}
          yAxisMargin={50}
          // From container query....
          svgHeight={300}
          svgWidth={500}
        />
      </Page>
    );
  }
}

export default App;
