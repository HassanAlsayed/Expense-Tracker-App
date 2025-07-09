import React from "react";
import { SafeAreaView } from "react-native";
import { useData } from "@/utils/useData";
import  PieChart from "react-native-pie-chart";
import getRandomColor from "@/utils/getColor";
import TransData from "@/utils/transData";

export default function Chart() {
  const { expenses } = useData();

  const widthAndHeight = 250;
console.log(expenses);

  const series = expenses.map(item => ({
  value: item.value,
  color: getRandomColor()
}));

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
     <PieChart
     widthAndHeight={widthAndHeight}
  series={series}
  cover={0.45}
/>
    </SafeAreaView>
  );
}
