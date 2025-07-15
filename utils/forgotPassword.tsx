import { 
  Modal, 
  View,
  TouchableWithoutFeedback, 
  StyleSheet, 
  Text,
  TouchableOpacity, 
  TextInput, 
  Alert
} from 'react-native';
import { ModalBlockProps } from './types';
import fn from './scaling';
import { useState } from 'react';
import { resetPassword } from '@/app/Config/functions';
import LoadingDots from './LoadingDots ';

export default function ForgotPassword({ modalVisible, setModalVisible }: ModalBlockProps) {

    const [email,setEmail] = useState('');
     const [loading,setloading] = useState(false);

    const handleReset = async () => {
        setloading(true);
      await resetPassword(email);
      Alert.alert("Reset password link send via email");
     setModalVisible(false);
    }
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
              <Text style={styles.modalTitle}>Reset Password</Text>
              <View style={styles.textContainer}>
                <TextInput
                  placeholder='Email'
                  keyboardType='email-address'
                  style={styles.inputs}
                  value={email}
                  onChangeText={(text)=>{
                    setEmail(text)
                  }}
                />
              </View>
              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.4 }]}
                onPress={handleReset}
              >
             {!loading ? (<Text style={styles.buttonText}>Reset</Text>) 
               : (
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
    backgroundColor: 'white',
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
    color: '#333',
  },
  textContainer: {
    flexDirection: 'column',
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  inputs: {
    width: '100%',
    height: fn.hp(6),
    minHeight: 45,
    maxHeight: 60,
    borderRadius: fn.wp(2),
    borderColor: '#999',
    borderWidth: 1,
    paddingHorizontal: fn.wp(4),
    backgroundColor: '#fff',
    fontSize: fn.getFontSize(16),
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
