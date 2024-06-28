import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeText } from "src/components";
import { useAppSelector } from "src/store/hooks";
import { appPadding, width } from "src/utils/constants";
import { getChartData } from "./utilities";
const chartWidth = width - 2 * appPadding;
const ChartScreen = () => {
  const { chartDataAdd, chartDataRemove } = useAppSelector((s) => s.cartSlice);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.chartWrapper}>
          <NativeText>Number of items added to cart</NativeText>
          <BarChart
            data={getChartData(chartDataAdd)}
            width={chartWidth}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            yAxisLabel=""
            yAxisSuffix=""
            height={width / 2}
          />
        </View>
        <View style={styles.chartWrapper}>
          <NativeText>Number of items deleted from the cart</NativeText>
          <BarChart
            data={getChartData(chartDataRemove)}
            width={chartWidth}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            yAxisLabel=""
            yAxisSuffix=""
            height={width / 2}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChartScreen;
const styles = StyleSheet.create({
  chartWrapper: {
    margin: appPadding,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});
