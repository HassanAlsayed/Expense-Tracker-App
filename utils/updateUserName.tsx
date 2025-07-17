import { Modal, View, TextInput, Text, Pressable, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { ModalEditProps, } from "./types";
import { useState } from "react";
import { updateUserName } from "@/app/Config/functions";
import { useDataStore } from "./useData";
import LoadingDots from "./LoadingDots ";

export const UpdateUserName = ({modalEditVisible, setModalEditVisible}: ModalEditProps) => {
  const [loading, setloading] = useState(false);
  const {email,getUserName,setUserName} = useDataStore();
  const [userName, SetUserName] = useState<string>(getUserName);


  const handleEdit = async () => {
    setloading(true);
   
    try{
    await updateUserName(email,userName);
    setModalEditVisible(false);
    setUserName(userName);
        
    }catch (error) {
    console.error(error);
  } finally {
    setloading(false);
  }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalEditVisible}
      onRequestClose={() => setModalEditVisible(false)}
    >
        <TouchableWithoutFeedback onPress={()=>setModalEditVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Edit UserName</Text>
          
          <TextInput
            style={styles.textInput}
            placeholder="Enter new username"
            value={userName}
            onChangeText={(text) =>{
                SetUserName(text)
            }}
            autoFocus={true}
          />
          
          <View style={styles.buttonContainer}>
            <Pressable 
              style={[styles.button, styles.editButton , loading && {opacity:0.4}]} 
              onPress={handleEdit}
            >
                {!loading ? ( <Text style={styles.editButtonText}>Edit</Text>) :  (
                  <LoadingDots
                    style={{ width: 50, height: 20 }}
                    animationDuration={800}
                    color={'blue'}
                  />
                )}
             
            </Pressable>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#050F28',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 300,
    maxWidth: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    minHeight: 45,
    maxHeight: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth:100,
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#007bff',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});