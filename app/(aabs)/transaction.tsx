  import { useState } from "react";
  import { FlatList, Pressable, Text, TouchableOpacity, View } from "react-native";
  import Icon from 'react-native-vector-icons/MaterialIcons';
  import fn from '../../utils/scaling';
  import style from "../styles";
  import { router } from "expo-router";
  import ModalBlock from "@/utils/modal";
import getRandomColor from "@/utils/getColor";
import { SafeAreaView } from "react-native-safe-area-context";


 export const TransData = [{
      name:'salary',
      type:'income',
      value:90,
      currency:['$','L.L','€'],
       color:getRandomColor(),
    },
    

    {name:'car',
      type:'expense',
      value:50,
      currency:['$','L.L','€'],
      color:getRandomColor(),
    },
    {name:'car',
      type:'expense',
      value:32,
      currency:['$','L.L','€'],
      color:getRandomColor(),
    },
    {name:'car',
      type:'expense',
      value:54,
      currency:['$','L.L','€'],
    },
    {name:'car',
      type:'expense',
      value:54,
      currency:['$','L.L','€'],
    },
    {name:'car',
      type:'expense',
      value:50,
      currency:['$','L.L','€'],
    },

      {name:'car',
      type:'expense',
      value:5,
      currency:['$','L.L','€'],
    },

    {
      name:'salary',
      type:'income',
      value:90,
      currency:['$','L.L','€'],
       color:getRandomColor(),
      },
    ];
  export default function Transaction() 
{
    const [state,setState] = useState({
       Trans: TransData,
       modalVisible: false,
    });

      const date = new Date();
    return (
      <SafeAreaView style={style.container}>
        <View style={style.balanceBox}>
          <Text style={style.titleText}>Total Balance</Text>
          <Text style={style.balanceAmount}>$2,450.00</Text>
          
          <View style={style.innerCon}>
            <View style={style.incomeBox}>
              <Icon name="trending-up" size={fn.wp(6)} color="#4CAF50" />
              <Text style={style.boxTitle}>Income</Text>
              <Text style={style.amountText}>+$1,200.00</Text>
            </View>
            
            <View style={style.expenseBox}>
              <Icon name="trending-down" size={fn.wp(6)} color="#F44336" />
              <Text style={style.boxTitle}>Expense</Text>
              <Text style={style.amountText}>-$750.00</Text>
            </View>
          </View>
        </View>
        
        <View style={style.transactionHeader}>
          <Text style={style.recentText}>Recent Transactions</Text>
          <TouchableOpacity  onPress={()=>{router.push('/routes/transactionType')}} style={style.addButton}>
          <Icon name='add' size={fn.wp(10)} color='green' />
        </TouchableOpacity>
        </View>
        { state.Trans.length === 0 ? 
          <View style={style.emptyState}>
            <Icon name="receipt-long" size={fn.wp(12)} color="#ccc" />
            <Text style={style.emptyText}>No Transactions found for this month!</Text>
          </View>
          : 
          <FlatList style={style.scrollContainer} data={state.Trans} 
          renderItem={({ item }) => 
    <Pressable onLongPress={()=>setState((prev)=>({
      ...prev,modalVisible:true,
    }))}>
      <View style={style.seeAllTex}>
      <Text style={style.transactionName}>{item.name}</Text>
      
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={style.transactionSign}>
            {item.type === 'income' ? <><Text style={{color:'green'}}>+ {item.value}{item.currency[0]}</Text></> : <><Text style={{color:'red'}}>- {item.value}{item.currency[1]}</Text></>}
          </Text>
          
        </View>
        <Text style={style.transactionDate}>
          {date.toLocaleString('default',{day:'2-digit'})} , {date.toLocaleString('default', { month: 'short' })}
        </Text>
      </View>
    </View>
    </Pressable>
  }
          keyExtractor={(item, index) => index.toString()} showsVerticalScrollIndicator={false}/>
        }
   <ModalBlock
  modalVisible={state.modalVisible}
  setModalVisible={(visible) => {
    setState((prev) => ({
      ...prev,
      modalVisible: visible,  
    }));
  }}
  data={TransData}
  setTransData={(data) =>{
    setState((prev) =>({
      ...prev,
      Trans:data
    }))
  }}
/>
      </SafeAreaView>
    );    
  }

