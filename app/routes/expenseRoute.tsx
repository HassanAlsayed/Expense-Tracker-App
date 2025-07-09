import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from "./style";
import InputText from "./inputText";
import { useRef, useState } from "react";

export const ExpenseRoute = () => {
const expenses = [
  { name: "Accessories", icon: "watch" ,},           
  { name: "Bills", icon: "receipt-long" },           
  { name: "Clothes", icon: "checkroom" },             
  { name: "Entertainment", icon: "music-note" },           
  { name: "Food", icon: "fastfood" },               
  { name: "Footwear", icon: "directions-walk" },       
  { name: "Fuel", icon: "local-gas-station" },             
  { name: "General", icon: "more-horiz" },           
  { name: "Health", icon: "medical-services" },          
  { name: "Holidays", icon: "beach-access" },
  { name: "Home", icon: "home" },
  { name: "Kids", icon: "child-care" },
  { name: "Medical", icon: "medical-services" },
  { name: "Others", icon: "help-outline" },
  { name: "Pets", icon: "pets" },
  { name: "Shopping", icon: "shopping-bag" },
  { name: "Sports", icon: "sports-soccer" },
  { name: "Transportations", icon: "directions-bus" },
  { name: "Vehicle", icon: "directions-car" }
];

const [showInput, setShowInput] = useState(false);
const [name, setName] = useState('');
const [icon, setIcon] = useState('');
const [slectedBlock, setSelectedBlock] = useState<number>();

const indexRef = useRef<FlatList>(null)



const handlePressBlock = (id:number) =>{

  setShowInput(true);
  setName(expenses[id].name);
  setIcon(expenses[id].icon);
  setSelectedBlock(id);
  const rowIndex = Math.floor(id / 3);
  indexRef.current?.scrollToIndex({index:rowIndex,animated:true});

}
    
    return(
      <SafeAreaView style={style.scene}>
      <FlatList
        ref={indexRef}
        showsVerticalScrollIndicator={false}
        data={expenses}
        numColumns={3}
        keyExtractor={(item,index) => index.toString()}
        columnWrapperStyle={style.scrollContainer}
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
        <InputText  showInput={showInput} name={name} icon={icon} type="expense"/>
      </SafeAreaView>
    );

  };