import { FlatList, Pressable, SafeAreaView, Text } from "react-native";
import style from "./style";
import Iconn from 'react-native-vector-icons/MaterialIcons';
import InputText from "./inputText";
import { useEffect, useRef, useState } from "react";
import { indexPosProps } from "@/utils/types";

export const IncomeRoute = ({indexPos,amount,id,Name,Icon,TypeClicked}:indexPosProps) => {

  const incomes = [
  { name: "Commission", icon: "trending-up" , index:0},
  { name: "Deposite", icon: "account-balance-wallet" ,index:1},
  { name: "Rent", icon: "business", index:2},
  { name: "Salary", icon: "attach-money" ,index:3},
  { name: "Saving", icon: "savings" , index:4},
  { name: "Loto", icon: "casino" ,index:5}  
];


const [showInput, setShowInput] = useState(false);
const [name, setName] = useState('');
const [icon, setIcon] = useState('');
const [index, setIndex] = useState(0);
const [slectedBlock, setSelectedBlock] = useState<number>();

const indexRef = useRef<FlatList>(null);

const ROW_HEIGHT = 120;

const handlePressBlock = (index:number) =>{
  setShowInput(true);
  setName(incomes[index].name);
  setIcon(incomes[index].icon);
  setIndex(incomes[index].index);
  setSelectedBlock(index);
  
  const rowIndex = Math.floor(index / 3);
const numRows = Math.ceil(incomes.length / 3);
const safeRowIndex = Math.min(rowIndex, numRows - 1);

indexRef.current?.scrollToIndex({
  index: safeRowIndex,
  animated: true,
});

}

useEffect(() => {
  if (typeof indexPos !== "undefined") {
    const rowIndex = Math.floor(indexPos / 3);
    indexRef.current?.scrollToIndex({ index: rowIndex, animated: true });
    setShowInput(true);
  }
}, [indexPos]);
  
  return(
      <SafeAreaView style={style.scene}>
      <FlatList  
      showsVerticalScrollIndicator={false}
      ref={indexRef}
      data={incomes}
      numColumns={3}
      getItemLayout={(incomes, index) => ({
        length: ROW_HEIGHT,
        offset: ROW_HEIGHT * index,
        index,
      })}
      columnWrapperStyle={style.scrollContainer}
      keyExtractor={(item,index) => index.toString()}
      renderItem={({ item, index }) => (
       <Pressable
        onPress={() => handlePressBlock(index)}
        style={[
          style.expenseBlock,
           (slectedBlock === index || indexPos === index) && style.expenseBlockFocused ,
        ]}
      >
        <Iconn name={item.icon} size={30} color="white" />
        <Text style={style.text} numberOfLines={1}>
          {item.name}
        </Text>
      </Pressable>
  )}
      >
      </FlatList>
         <InputText name={name} icon={icon} index={index} showInput={showInput} type="income" amount={amount} 
         id={id} Name={Name} Icon={Icon} indexPos={indexPos} TypeClicked={TypeClicked}/>

      </SafeAreaView>
    );
};