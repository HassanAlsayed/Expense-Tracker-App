import {
  Modal,
  View,
  Pressable,
  StyleSheet,
  Text,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import { ModalImageProps } from './types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { addImage, removeImage } from '@/app/Config/functions';
import { useDataStore } from './useData';

export default function HandleImagePick({ modalImageVisible, setModalImageVisible}: ModalImageProps) {

  const {email,setImage,imageUrl} = useDataStore();

   const askPermissions = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    return (
      cameraPermission.status === 'granted' &&
      mediaPermission.status === 'granted'
    );
  };

  const pickFromCamera = async () => {
    const permission = await askPermissions();
    if (!permission) return Alert.alert('Permission denied');

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      setModalImageVisible(false);
       await addImage(email,result.assets[0].uri);
       setImage(result.assets[0].uri);
    }
  };


  const pickFromGallery = async () => {
    const permission = await askPermissions();
    if (!permission) return Alert.alert('Permission denied');

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
       setModalImageVisible(false);
       await addImage(email,result.assets[0].uri);
       setImage(result.assets[0].uri);
    }
  };

  const handleRemoveImage = async () =>{
    await removeImage(email);
    setModalImageVisible(false);
    setImage('');
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalImageVisible}
      onRequestClose={() => setModalImageVisible(false)}
    >
        <TouchableWithoutFeedback onPress={()=>setModalImageVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <Pressable style={styles.iconButton} onPress={pickFromCamera}>
              <Icon name="photo-camera" size={25} color="#4CAF50" />
              <Text>Camera</Text>
            </Pressable>
            <Pressable style={styles.iconButton} onPress={pickFromGallery}>
              <Icon name="photo-library" size={25} color="#4CAF50" />
              <Text>Gallery</Text>
            </Pressable>
            {imageUrl ? (<Pressable style={styles.iconButton} onPress={handleRemoveImage}>
              <Icon name="delete" size={25} color="#4CAF50" />
              <Text>Remove</Text>
            </Pressable>) : 
            <></>}
          </View>
          
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 250,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  iconButton: {
  //  backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});