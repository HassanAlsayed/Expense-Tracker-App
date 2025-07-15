import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ModalBlockCurrency } from './types';
import { useState } from 'react';
import LoadingDots from './LoadingDots ';
import { Picker } from '@react-native-picker/picker';
import { useDataStore } from './useData';
import { getCurrency } from '@/app/Config/functions';

export default function CurrencyModal({ modalVisible, setModalVisible }: ModalBlockCurrency) {
  
  const [Currency, SetCurrency] = useState('$');
  const [loading, setloading] = useState(false);

  const {setCurrency,email} = useDataStore();

 const handleChange = async () => {
  setloading(true);
  try {
    setCurrency(Currency);
    await getCurrency(email, Currency);
    setModalVisible(false);
  } catch (error) {
    console.error(error);
  } finally {
    setloading(false);
  }
};


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Select Currency</Text>
              
              <View style={styles.textContainer}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={Currency}
                    onValueChange={(itemValue, itemIndex) => {SetCurrency(itemValue)}}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    dropdownIconColor="#fff"
                  >
                    <Picker.Item label="USD (US Dollar)" value="$" />
                    <Picker.Item label="EUR (Euro)" value="€" />
                    <Picker.Item label="LBP (Lebanese Lira)" value="L.L" />
                    <Picker.Item label="GBP (British Pound)" value="£" />
                    <Picker.Item label="JPY (Japanese Yen)" value="¥" />
                    <Picker.Item label="CAD (Canadian Dollar)" value="C$" />
                    <Picker.Item label="AUD (Australian Dollar)" value="A$" />
                    <Picker.Item label="CHF (Swiss Franc)" value="CHF" />
                    <Picker.Item label="CNY (Chinese Yuan)" value="¥" />
                    <Picker.Item label="INR (Indian Rupee)" value="₹" />
                    <Picker.Item label="SAR (Saudi Riyal)" value="﷼" />
                    <Picker.Item label="AED (UAE Dirham)" value="د.إ" />
                    <Picker.Item label="TRY (Turkish Lira)" value="₺" />
                    <Picker.Item label="SEK (Swedish Krona)" value="kr" />
                    <Picker.Item label="NOK (Norwegian Krone)" value="kr" />
                    <Picker.Item label="DKK (Danish Krone)" value="kr" />
                    <Picker.Item label="ZAR (South African Rand)" value="R" />
                    <Picker.Item label="BRL (Brazilian Real)" value="R$" />
                    <Picker.Item label="MXN (Mexican Peso)" value="$" />
                    <Picker.Item label="EGP (Egyptian Pound)" value="E£" />
                    <Picker.Item label="KWD (Kuwaiti Dinar)" value="د.ك" />

                  </Picker>
                </View>
              </View>
              
              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.4 }]}
                onPress={handleChange}
              >
                {!loading ? (
                  <Text style={styles.buttonText}>Update</Text>
                ) : (
                  <LoadingDots
                    style={{ width: 50, height: 20 }}
                    animationDuration={800}
                    color={'blue'}
                  />
                )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#050F28',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  textContainer: {
    flexDirection: 'column',
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: '#1a2040',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a3050',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  picker: {
    height: 50,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  pickerItem: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});