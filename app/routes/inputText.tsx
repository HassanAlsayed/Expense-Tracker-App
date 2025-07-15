import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { addData, updateData } from '../Config/functions';
import { handleProps } from '@/utils/types';
import { useDataStore } from '@/utils/useData';

const { height, width } = Dimensions.get('window');

const numberKeys = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', '⌫'],
];


export default function InputText({showInput,name,icon,type,index,amount,id,Name,Icon,indexPos,TypeClicked}:handleProps) {

  const [value, setValue] = useState('');

  const date = new Date();

  const createdAt = `${date.toLocaleString('default', { day: 'numeric' })},${date.toLocaleString('default', { month: 'short' })}`;


  const handleKeyPress = (key: string) => {
    if (key === '⌫') {
      setValue((prev) => prev.slice(0, -1));
    } else {
      setValue((prev) => prev + key);
    }
  };
  useEffect(() => {
  if (showInput) {
    if (amount > 0) {
      setValue(String(amount));
    } else {
      setValue('');
    }
  }
}, [showInput, amount]);

const {email,currency} = useDataStore();

  const handleDone = async () =>{
   try{

    console.log(amount , Name , Icon , TypeClicked , indexPos);
    
  
   if( Name === "undefined" &&  Icon === "undefined" &&  TypeClicked === "undefined" && typeof indexPos === "undefined")
   {
      await addData({
      id:'',
      name,
      icon,
      type,
      value: Number(value),
      currency:currency,
      createdAt,
      index,
      email,
    });
   }else{
  
    await updateData(id,{
      id:'',
      name:Name,
      icon:Icon,
      type:TypeClicked,
      value:Number(value),
      currency:currency,
      createdAt,
      index:indexPos,
      email:email
    })
  }

    router.push("/(tabs)/transaction");
   }catch(e) {
    console.error(e); 
   }
  }
  const handleClear = () => {
    setValue('');
  };

  return (
    <View style={styles.container}>

      <Modal visible={showInput} animationType="slide" transparent>

        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Tap to enter amount</Text>

          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>
              { value || '0.00'}
            </Text>
            <Text style={styles.currency}>{currency}</Text>
          </View>

          <View style={styles.keysContainer}>
            {numberKeys.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.keyRow}>
                {row.map((key, keyIndex) => (
                  <TouchableOpacity
                    key={keyIndex}
                    style={[
                      styles.keyButton,
                      key === '⌫' && styles.deleteKey,
                      key === '0' && styles.zeroKey,
                    ]}
                    onPress={() => handleKeyPress(key)}
                  >
                    <Text
                      style={[
                        styles.keyText,
                        key === '⌫' && styles.deleteKeyText,
                      ]}
                    >
                      {key}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          {/* Action buttons */}
          <View style={styles.keyboardFooter}>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleDone}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClear}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050F28',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  openButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 5,
    height: height * 0.45, // Further reduced to 0.40
    width: '100%',
    backgroundColor: '#061A40',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 10, // Further reduced
    paddingHorizontal: 20,
  },
  modalTitle: {
    color: 'white',
    fontSize: 16, // Further reduced
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8, // Further reduced
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 15, // Further reduced
  },
  amountText: {
    fontSize: 36, // Further reduced
    fontWeight: '600',
    color: 'white',
  },
  currency: {
    fontSize: 24, // Further reduced
    color: '#4A90E2',
    marginLeft: 6,
  },
  keysContainer: {},
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6, // Much smaller gap
  },
  keyButton: {
    width: (width - 60) / 4.5, // Much smaller width
    height: (width - 60) / 12, // Much smaller height
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8, // Smaller border radius
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  deleteKey: {
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
    borderColor: 'rgba(255, 59, 48, 0.3)',
  },
  zeroKey: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  keyText: {
    fontSize: 16, // Much smaller text
    fontWeight: '600',
    color: 'white',
  },
  deleteKeyText: {
    color: '#FF3B30',
  },
  keyboardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10, // Further reduced
  },
  doneButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 15, // Further reduced
    paddingVertical: 10 , // Further reduced
    borderRadius: 15, // Further reduced
  },
  doneButtonText: {
    color: 'white',
    fontSize: 12, // Further reduced
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 15, // Further reduced
    paddingVertical: 6, // Further reduced
    borderRadius: 15, // Further reduced
  },
  clearButtonText: {
    color: 'white',
    fontSize: 12, // Further reduced
    fontWeight: '600',
  },
});
