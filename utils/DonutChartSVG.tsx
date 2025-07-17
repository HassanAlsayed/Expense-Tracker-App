import React from 'react';
import { View, Text } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import * as d3Shape from 'd3-shape';
import { useDataStore } from '@/utils/useData';
import fn from '@/utils/scaling';

const DonutChartSVG = () => {
  const { expenses, sumOfValues,currency } = useDataStore();
  const { expenseSum, incomeSum } = sumOfValues();

  if (expenses.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: fn.getFontSize(20), color: 'white' }}>
          No data available...
        </Text>
      </View>
    );
  }

  const transMap = new Map<string, number>();
  expenses.forEach(expense => {
    const currentValue = transMap.get(expense.name) ?? 0;
    transMap.set(expense.name, expense.value + currentValue);
  });

  const transArray = Array.from(transMap, ([name, value]) => ({
    name,
    value,
  }));

  const total = transArray.reduce((sum, item) => sum + item.value, 0);

  const size = 200;
  const radius = size / 2;
  const innerRadius = radius * 0.5;

  const colorList = transArray.map(() =>
    '#' + Math.floor(Math.random() * 12344555).toString(16)
  );

  const pieData = d3Shape
    .pie<{ name: string; value: number }>()
    .value(d => d.value)(transArray);

  const arcGenerator = d3Shape
    .arc<d3Shape.PieArcDatum<{ name: string; value: number }>>()
    .outerRadius(radius)
    .innerRadius(innerRadius);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{
          color: 'white',
          fontSize: fn.getFontSize(20),
          bottom: 20,
        }}
      >
        Total Balance: {incomeSum - expenseSum} {currency ?? '$'}
      </Text>

      <Svg width={size} height={size}>
        <G x={radius} y={radius}>
          {pieData.map((slice, index) => {
            const path = arcGenerator(slice);
            const [labelX, labelY] = arcGenerator.centroid(slice);
            return (
              <G key={index}>
                <Path d={path!} fill={colorList[index]} />
                <SvgText
                  x={labelX}
                  y={labelY}
                  fill="white"
                  fontSize={12}
                  textAnchor="middle"
                >
                  {` ${(
                    (slice.data.value / total) *
                    100
                  ).toFixed(1)}%`}
                </SvgText>
              </G>
            );
          })}
        </G>
      </Svg>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          margin: 20,
        }}
      >
        {transArray.map((item, index) => (
          <View
            key={item.name}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 8,
            }}
          >
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: colorList[index],
                marginRight: 8,
              }}
            />
            <Text
              style={{ color: 'white', fontSize: fn.getFontSize(8) }}
            >
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DonutChartSVG;
