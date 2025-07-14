import getRandomColor from "@/utils/getColor";
import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#050F28',
    padding: 10,
  },
  scrollContainer: {
  justifyContent: 'space-between',
  paddingHorizontal: 10,
  marginBottom:10

},
  text: {
    color: 'white',
    fontSize: 12,
    textTransform: 'capitalize',
    marginTop: 5,
    textAlign: 'center',
  },
  expenseBlock: {
    backgroundColor: getRandomColor(),
    color: 'white',
    padding: 15,
    width: '30%', 
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
   expenseBlockFocused: {
    borderColor: getRandomColor(), 
    borderWidth: 2,
  },
  expenseBlockDisabled:{
    opacity:0.5
  }
});

export default style;