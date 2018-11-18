import React, { Component, Fragment } from "react";
import createRandom from "lodash.random";
import BarStackedChart from "./chart/bar-stacked/";
import LinePlainChart from "./chart/line-plain";
import { Page, Button } from "./helpers/";

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

  updateData = () => this.setState(() => ({ data: createData() }));

  render() {
    const { data } = this.state;

    return (
      <Fragment>
        <Button onClick={this.updateData}>Update Data</Button>
        <Page>
          <BarStackedChart
            data={data}
            stackKeys={["total"]}
            xAxisMargin={20}
            yAxisMargin={50}
            // From container query....
            svgHeight={300}
            svgWidth={500}
          />
          <BarStackedChart
            data={data}
            stackColors={["skyblue", "teal", "purple"]}
            stackKeys={["apple", "banana", "potato"]}
            xAxisMargin={20}
            yAxisMargin={50}
            // From container query....
            svgHeight={300}
            svgWidth={500}
          />
          <LinePlainChart
            data={data}
            lineKeys={["total"]}
            xAxisMargin={20}
            yAxisMargin={50}
            // From container query....
            svgHeight={300}
            svgWidth={500}
          />
          <LinePlainChart
            data={data}
            lineColors={["skyblue", "teal", "purple"]}
            lineKeys={["apple", "banana", "potato"]}
            xAxisMargin={20}
            yAxisMargin={50}
            // From container query....
            svgHeight={300}
            svgWidth={500}
          />
        </Page>
      </Fragment>
    );
  }
}

export default App;
