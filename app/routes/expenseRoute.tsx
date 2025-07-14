import { FlatList, Pressable, SafeAreaView, Text } from "react-native";
import Iconn from 'react-native-vector-icons/MaterialIcons';
import style from "./style";
import InputText from "./inputText";
import { useEffect, useRef, useState } from "react";
import { indexPosProps } from "@/utils/types";
 
export const ExpenseRoute = ({indexPos,amount,id,Name,Icon,TypeClicked}:indexPosProps) => {

const expenses = [
  { name: "Accessories", icon: "watch" ,index:0},           
  { name: "Bills", icon: "receipt-long" , index:1},           
  { name: "Clothes", icon: "checkroom", index:2 },             
  { name: "Entertainment", icon: "music-note",index:3 },           
  { name: "Food", icon: "fastfood" , index:4},               
  { name: "Footwear", icon: "directions-walk" ,index:5},       
  { name: "Fuel", icon: "local-gas-station" ,index:6},             
  { name: "General", icon: "more-horiz" , index:7},           
  { name: "Health", icon: "medical-services" ,index:8},          
  { name: "Holidays", icon: "beach-access" ,index:9},
  { name: "Home", icon: "home" ,index:10},
  { name: "Kids", icon: "child-care",index:11 },
  { name: "Medical", icon: "medical-services",index:12 },
  { name: "Others", icon: "help-outline" ,index:13},
  { name: "Pets", icon: "pets" ,index:14},
  { name: "Shopping", icon: "shopping-bag",index:15 },
  { name: "Sports", icon: "sports-soccer" ,index:16},
  { name: "Transportations", icon: "directions-bus" ,index:17},
  { name: "Vehicle", icon: "directions-car",index:18 }
];

const [showInput, setShowInput] = useState(false);
const [name, setName] = useState('');
const [icon, setIcon] = useState('');
const [index, setIndex] = useState(0);
const [slectedBlock, setSelectedBlock] = useState<number>();
const ROW_HEIGHT = 120;

const indexRef = useRef<FlatList>(null)


const handlePressBlock = (id: number) => {
  setShowInput(true);
  setName(expenses[id].name);
  setIcon(expenses[id].icon);
  setIndex(expenses[id].index);
  setSelectedBlock(id);

 const firstItemOfRow = Math.floor(index / 3) * 3;

const safeIndex = Math.min(firstItemOfRow, expenses.length - 1);

indexRef.current?.scrollToIndex({
  index: safeIndex,
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
        ref={indexRef}
        showsVerticalScrollIndicator={false}
        data={expenses}
        numColumns={3}
        getItemLayout={(expenses, index) => ({
        length: ROW_HEIGHT,
        offset: ROW_HEIGHT * index,
        index,
      })}
        keyExtractor={(item,index) => index.toString()}
        columnWrapperStyle={style.scrollContainer}
        renderItem={({ item, index }) => (
       <Pressable
        onPress={() => handlePressBlock(index) }
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
        <InputText name={name} icon={icon} index={index} showInput={showInput} type="expense" amount={amount}
         id={id} Name={Name} Icon={Icon} indexPos={indexPos} TypeClicked={TypeClicked}/>
      </SafeAreaView>
    );

  };