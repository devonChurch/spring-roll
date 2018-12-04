import React, { Component, Fragment } from "react";
import createRandom from "lodash.random";
import Chart from "./chart/scaffold/";
import Bar, { BarStacked } from "./chart/bar/";
import Line from "./chart/line";
import Area, { AreaStacked } from "./chart/area";
import Scatter from "./chart/scatter";
import { Page, Button } from "./helpers/";

const createEntry = (_, index) => {
  const apple = createRandom(0, 6);
  const banana = createRandom(-4, 4);
  const potato = -createRandom(0, 2);

  return {
    date: new Date(`2018-11-${index + 1}`),
    apple,
    banana,
    potato
  };
};
const createData = () => new Array(7).fill(0).map(createEntry);

class App extends Component {
  state = { data: createData() };

  updateData = () => this.setState(() => ({ data: createData() }));

  render() {
    const { data } = this.state;

    return (
      <Fragment>
        <Button onClick={this.updateData}>Update Data</Button>
        <Page>
          <Chart
            chartItems={data}
            yAxisKeys={["apple", "banana", "potato"]}
            shouldYAxisMinBeZero
            xAxisMargin={20}
            yAxisMargin={50}
            // From container query....
            svgHeight={300}
            svgWidth={500}
          >
            {chart => (
              <BarStacked
                {...chart}
                stackKeys={["apple", "banana", "potato"]}
                stackColors={["skyblue", "teal", "purple"]}
              />
            )}
          </Chart>
          <Chart
            chartItems={data}
            yAxisKeys={["apple", "banana", "potato"]}
            xAxisMargin={20}
            yAxisMargin={50}
            // From container query....
            svgHeight={300}
            svgWidth={500}
          >
            {chart => <Bar {...chart} stackKey="apple" stackColor="skyblue" />}
          </Chart>
          <Chart
            chartItems={data}
            yAxisKeys={["apple", "banana", "potato"]}
            xAxisMargin={20}
            yAxisMargin={50}
            // From container query....
            svgHeight={300}
            svgWidth={500}
          >
            {chart => (
              <AreaStacked
                {...chart}
                stackKeys={["apple", "banana", "potato"]}
                stackColors={["skyblue", "teal", "purple"]}
              />
            )}
          </Chart>
          <Chart
            chartItems={data}
            yAxisKeys={["apple", "banana", "potato"]}
            xAxisMargin={20}
            yAxisMargin={50}
            // From container query....
            svgHeight={300}
            svgWidth={500}
          >
            {chart => (
              <Fragment>
                <Area {...chart} stackKey="apple" stackColor="lightgray" />
                <Scatter {...chart} stackKey="potato" stackColor="purple" />
                <Scatter {...chart} stackKey="banana" stackColor="teal" />
                <Scatter {...chart} stackKey="apple" stackColor="skyblue" />
              </Fragment>
            )}
          </Chart>
          <Chart
            chartItems={data}
            yAxisKeys={["apple", "banana", "potato"]}
            xAxisMargin={20}
            yAxisMargin={50}
            // From container query....
            svgHeight={300}
            svgWidth={500}
          >
            {chart => (
              <Fragment>
                <Line {...chart} stackKey="apple" stackColor="skyblue" />
                <Line {...chart} stackKey="banana" stackColor="teal" />
                <Line {...chart} stackKey="potato" stackColor="purple" />
                <Scatter {...chart} stackKey="apple" stackColor="skyblue" />
                <Scatter {...chart} stackKey="banana" stackColor="teal" />
                <Scatter {...chart} stackKey="potato" stackColor="purple" />
              </Fragment>
            )}
          </Chart>
          <Chart
            chartItems={data}
            yAxisKeys={["apple", "banana", "potato"]}
            xAxisMargin={20}
            yAxisMargin={50}
            // From container query....
            svgHeight={300}
            svgWidth={500}
          >
            {chart => (
              <Fragment>
                <Scatter {...chart} stackKey="apple" stackColor="skyblue" />
                <Scatter {...chart} stackKey="banana" stackColor="teal" />
                <Scatter {...chart} stackKey="potato" stackColor="purple" />
              </Fragment>
            )}
          </Chart>
        </Page>
      </Fragment>
    );
  }
}

export default App;
