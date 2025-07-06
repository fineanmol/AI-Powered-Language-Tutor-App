import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface ProgressChartProps {
  data: number[];
}

export const ProgressChart = ({ data }: ProgressChartProps) => {
  const maxValue = Math.max(...data);
  const chartWidth = screenWidth - 80;
  const chartHeight = 150;
  const barWidth = chartWidth / data.length - 8;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <View style={styles.yAxis}>
          <Text style={styles.yAxisLabel}>100%</Text>
          <Text style={styles.yAxisLabel}>75%</Text>
          <Text style={styles.yAxisLabel}>50%</Text>
          <Text style={styles.yAxisLabel}>25%</Text>
          <Text style={styles.yAxisLabel}>0%</Text>
        </View>
        <View style={styles.chart}>
          <View style={styles.barsContainer}>
            {data.map((value, index) => (
              <View key={index} style={styles.barColumn}>
                <View style={styles.barWrapper}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: (value / maxValue) * chartHeight,
                        width: barWidth,
                        backgroundColor: getBarColor(value),
                      },
                    ]}
                  />
                </View>
                <Text style={styles.barValue}>{value}%</Text>
              </View>
            ))}
          </View>
          <View style={styles.xAxis}>
            {days.map((day, index) => (
              <Text key={index} style={styles.xAxisLabel}>
                {day}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const getBarColor = (value: number) => {
  if (value >= 90) return '#10b981';
  if (value >= 75) return '#f59e0b';
  if (value >= 60) return '#f97316';
  return '#ef4444';
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  yAxis: {
    height: 150,
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  yAxisLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  chart: {
    flex: 1,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 150,
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  barColumn: {
    alignItems: 'center',
  },
  barWrapper: {
    height: 150,
    justifyContent: 'flex-end',
  },
  bar: {
    borderRadius: 4,
    marginBottom: 4,
  },
  barValue: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginTop: 4,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 8,
  },
  xAxisLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
});