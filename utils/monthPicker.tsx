import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, FlatList, StyleSheet, View } from 'react-native';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec',
];


type CalendarProps = {
    setVisibleCalendar:(visible:boolean) => void,
    setDate:(date:Date) => void,
}


const MonthPickerCalendar = ({setVisibleCalendar,setDate}:CalendarProps) => {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleSelectMonth = (index:number) => {

        setSelectedMonthIndex(index);
        setVisibleCalendar(false);
        setDate(new Date(selectedYear,index));
    };
   

  return (
    <SafeAreaView style={styles.container}>
      {/* Year change controls (optional) */}
      <View style={styles.yearControls}>
        <TouchableOpacity onPress={() => setSelectedYear((prev) => prev - 1)}>
          <Text style={styles.yearButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.yearText}>{selectedYear}</Text>
        <TouchableOpacity onPress={() => setSelectedYear((prev) => prev + 1)}>
          <Text style={styles.yearButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Month grid */}
      <FlatList
        data={months}
        numColumns={3}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.monthItem,
              index === selectedMonthIndex && styles.selectedMonth,
            ]}
            onPress={() => handleSelectMonth(index)}
          >
            <Text
              style={[
                styles.monthText,
                index === selectedMonthIndex && styles.selectedMonthText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default MonthPickerCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  selected: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  yearControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  yearButton: {
    fontSize: 20,
    color: 'green',
    marginHorizontal: 50,
  },
  yearText: {
    fontSize: 18,
    color:'white'
  },
  monthItem: {
    flex: 1,
    margin: 6,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 16,
  },
  selectedMonth: {
    backgroundColor: 'green',
  },
  selectedMonthText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
