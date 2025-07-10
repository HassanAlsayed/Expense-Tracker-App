import React from 'react';
import { SafeAreaView } from 'react-native';
import DonutChartSVG from '../../utils/DonutChartSVG';


export default function Chart() {
  return (
    <SafeAreaView style={{ flex: 1 , justifyContent:'center', alignItems:'center', backgroundColor:'#050F28'}}>
        <DonutChartSVG />
    </SafeAreaView>
  );
}
