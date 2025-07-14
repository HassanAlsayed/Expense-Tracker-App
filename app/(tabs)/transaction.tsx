  import { useEffect, useState } from "react";
  import { Text, TouchableOpacity, View, Pressable } from "react-native";
  import Icon from 'react-native-vector-icons/MaterialIcons';
  import fn from '../../utils/scaling';
  import style from "../styles";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { router } from "expo-router";
  import MonthPickerCalendar from "@/utils/monthPicker";
  import { useDataStore } from "@/utils/useData";
  import TransData from "@/utils/transData";


  export default function Transaction()
{
      const [modalVisible,setModalVisible] = useState(false);

       const [visibleCalendar,setVisibleCalendar] = useState(false);
       const {expenses,setDate,date,fetchExpenses,sumOfValues} = useDataStore();

       useEffect(()=>{
         fetchExpenses()
       },[date])


 const { expenseSum, incomeSum, currency } = sumOfValues();
 const totalSum = incomeSum - expenseSum;

  return (
  <SafeAreaView style={style.container}>
    <Pressable onPress={() => setVisibleCalendar(true)}>
      <Text style={{color:'white',fontSize:18}}>{date.toLocaleString('default', { month: 'short', year: 'numeric' })}</Text>
    </Pressable>
    {visibleCalendar ? <MonthPickerCalendar 
    setVisibleCalendar={(visible)=>setVisibleCalendar(visible)}
    setDate={(date) => setDate(date)}
    
    /> :
    <>  
    <View style={style.balanceBox}>
      <Text style={style.titleText}>Total Balance</Text>
      <Text style={style.balanceAmount}>{totalSum}{currency}</Text>
    <View style={style.innerCon}>
       <View  style={style.incomeBox}>
 
      <Icon name="trending-up" size={fn.wp(6)} color="#4CAF50" />
      <Text style={style.boxTitle}>Income</Text>
        <Text style={style.amountText}>
          +{incomeSum}{currency}
        </Text>
     
    </View>
    <View style={style.expenseBox}>

 
      <Icon name="trending-down" size={fn.wp(6)} color="#F44336" />
      <Text style={style.boxTitle}>Expense</Text>
        <Text style={style.amountText}>
          -{expenseSum}{currency}
        </Text>
    </View>
</View>
    </View>

    <View style={style.transactionHeader}>
      <Text style={style.recentText}>Recent Transactions</Text>
      <TouchableOpacity
        onPress={() => router.push('/routes/transactionType')}
        style={style.addButton}
      >
        <Icon name="add" size={fn.wp(10)} color="green" />
      </TouchableOpacity>
    </View>

    {expenses?.length === 0 ? (
      <View style={style.emptyState}>
        <Icon name="receipt-long" size={fn.wp(12)} color="#ccc" />
        <Text style={style.emptyText}>No Transactions found for this month!</Text>
      </View>
    ) : (
      <TransData expenses={expenses} setModalVisible={setModalVisible} modalVisible={modalVisible}/>
       )}
    </> }
    
  </SafeAreaView>
);
}

