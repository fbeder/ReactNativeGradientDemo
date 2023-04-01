import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from 'victory-native';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {CallbackArgs} from 'victory-core/src/types/callbacks';

const data = [
  {date: 1, consumption: 13000, target: 5000},
  {date: 2, consumption: 16500, target: 5000},
  {date: 3, consumption: 14250, target: 5000},
  {date: 4, consumption: 19000, target: 5000},
];

export default class App extends React.Component {
  private calculatePercent(value: number, target: number, consumption: number) {
    return 100 - (target / consumption) * value * 100;
  }

  private generateDefs() {
    return (
      <Defs>
        {data.map((value, index) => {
          const gradient = 'test' + index;
          const target = 100 - (value.target / value.consumption) * 100;

          const red =
            this.calculatePercent(1.6, value.target, value.consumption).toFixed(
              2,
            ) + '%';

          const gold =
            this.calculatePercent(1.4, value.target, value.consumption).toFixed(
              2,
            ) + '%';

          const yellow =
            this.calculatePercent(1.2, value.target, value.consumption).toFixed(
              2,
            ) + '%';

          const green = target.toFixed(2) + '%';

          return (
            <LinearGradient id={gradient} x1="0" y1="0" x2="0" y2="1">
              <Stop offset={red} stopColor="red" />
              <Stop offset={gold} stopColor="orange" />
              <Stop offset={yellow} stopColor="gold" />
              <Stop offset={green} stopColor="yellow" />
              <Stop offset="100%" stopColor="green" />
            </LinearGradient>
          );
        })}
      </Defs>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          {this.generateDefs()}
          <VictoryBar
            style={{
              data: {
                fill: (datum: CallbackArgs) => {
                  return 'url(#test' + datum.index + ')';
                },
              },
            }}
            data={data}
            x="date"
            y="consumption"
          />
          <VictoryLine
            style={{
              data: {stroke: 'black'},
              parent: {border: '1px solid #ccc'},
            }}
            data={data}
            x="date"
            y="target"
          />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});
