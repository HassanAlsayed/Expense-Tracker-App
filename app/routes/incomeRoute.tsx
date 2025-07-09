import { FlatList, Pressable, SafeAreaView, Text } from "react-native";
import style from "./style";
import Icon from 'react-native-vector-icons/MaterialIcons';
import InputText from "./inputText";
import { useRef, useState } from "react";

export const IncomeRoute = () => {

  const incomes = [
  { name: "Commission", icon: "trending-up" , },
  { name: "Deposite", icon: "account-balance-wallet" ,},
  { name: "Rent", icon: "business", },
  { name: "Salary", icon: "attach-money" ,},
  { name: "Saving", icon: "savings" , },
  { name: "Loto", icon: "casino" ,}  
];


const [showInput, setShowInput] = useState(false);
const [name, setName] = useState('');
const [icon, setIcon] = useState('');
const [slectedBlock, setSelectedBlock] = useState<number>();

const indexRef = useRef<FlatList>(null)



const handlePressBlock = (index:number) =>{
  setShowInput(true);
  setName(incomes[index].name);
  setIcon(incomes[index].icon);
  setSelectedBlock(index);
  const rowIndex = Math.floor(index/3);
  indexRef.current?.scrollToIndex({index:rowIndex,animated:true})
}
  
  return(
      <SafeAreaView style={style.scene}>
      <FlatList  
      showsVerticalScrollIndicator={false}
      ref={indexRef}
      data={incomes}
      numColumns={3}
      columnWrapperStyle={style.scrollContainer}
      keyExtractor={(item,index) => index.toString()}
      renderItem={({ item, index }) => (
       <Pressable
        onPress={() => handlePressBlock(index)}
        style={[
          style.expenseBlock,
          slectedBlock === index && style.expenseBlockFocused,
        ]}
      >
        <Icon name={item.icon} size={30} color="white" />
        <Text style={style.text} numberOfLines={1}>
          {item.name}
        </Text>
      </Pressable>
  )}
      >
      </FlatList>
        <InputText  showInput={showInput} name={name} icon={icon} type='income'/>

      </SafeAreaView>
    );
};