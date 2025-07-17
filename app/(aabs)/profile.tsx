import { useDataStore } from "@/utils/useData";
import { router } from "expo-router";
import { Alert, Image, Share, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import fn from '../../utils/scaling';
import { addImage, logOut } from "../Config/functions";
import CurrencyModal from "@/utils/currencyModal";
import { useState } from "react";
import HandleImagePick from "@/utils/handleImagePick";
import { UpdateUserName } from "@/utils/updateUserName";


export default function Profile() {

  const [modalVisible,setModalVisible] = useState(false);
  const [modalImageVisible,setModalImageVisible] = useState(false);
  const [modalEditVisible,setModalEditVisible] = useState(false);

    const handleRecommendFriends = async() =>{
      const appRepo = 'https://github.com/HassanAlsayed/Expense-Tracker-App'

       try {
             const result = await Share.share({
             message: `Check out this amazing tracker app:${appRepo}`,
    });
        
    if (result.action === Share.sharedAction) {
      console.log("Shared!");
    } else if (result.action === Share.dismissedAction) {
      console.log("Dismissed");
    }
  } catch (error) {
    console.error(error);
  }
  }

   const handleChangeCurrency = () =>{
     setModalVisible(true);
  }

  const handleAboutUs = () =>{
    router.push('/aboutUs');
  }


  const profile = [
    {title:'Recommend to friends', icon:'thumb-up',methode:handleRecommendFriends},
    {title:'Change Currency', icon:'currency-exchange',methode:handleChangeCurrency},
    {title:'About Us', icon:'info',methode:handleAboutUs},
  ]

  const {getUserName,email,imageUrl} = useDataStore();

  const handleLogout = async () =>{
    await logOut();
    Alert.alert('you logged out sucessfully');
    router.push('/(auth)/login');
  }

  const handleImage = async () =>{
    setModalImageVisible(true);
    await addImage(email,imageUrl);
  }
  

  return (
   <SafeAreaView style={styles.container}>
  <TouchableWithoutFeedback onPress={() => {setModalVisible(false);
    setModalImageVisible(false);
     setModalEditVisible(false)
    }}>
    <View style={{ flex: 1 }}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Pressable onPressOut={handleImage}>
           <View style={styles.imageWrapper}>
  {imageUrl ? (
    <Image source={{ uri: imageUrl }} style={styles.profileImage} />
  ) : (
    <View style={styles.placeholder}>
      <Icon name="person" size={45} color="#4CAF50" />
      <Text style={{ color: '#888', marginTop: 5 }}>No image</Text>
    </View>
  )}
</View>

          </Pressable>
        </View>
        
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{getUserName}</Text>
          <View style={styles.actionIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={() => setModalEditVisible(true)}>
              <Icon name="edit" size={20} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPressOut={handleLogout}>
              <Icon name="logout" size={20} color="#FF5252" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.wrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {profile.map((item, index) => (
            <Pressable style={styles.profileItem} key={index} onPressOut={item.methode}>
              <Icon name={item.icon} size={24} color="#4CAF50" />
              <Text style={styles.title}>{item.title}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <CurrencyModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <HandleImagePick modalImageVisible={modalImageVisible} setModalImageVisible={setModalImageVisible} />
      <UpdateUserName modalEditVisible={modalEditVisible} setModalEditVisible={setModalEditVisible} />
    </View>
  </TouchableWithoutFeedback>
</SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050F28',
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    marginBottom: 10,
    marginTop: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#4CAF50',
    resizeMode:'cover'
  },
  usernameContainer: {
    alignItems: 'center',
  },
  username: {
    fontSize: fn.getFontSize(22),
    color: 'white',
    fontWeight: '600',
    marginBottom: 15,
  },
  actionIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  wrapper: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginVertical: 8,
    marginHorizontal: 5,
    minHeight: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: fn.getFontSize(18),
    color: 'white',
    fontWeight: '500',
    textTransform: 'capitalize',
    minWidth: fn.wp(25),
    paddingLeft: 10,
    flex: 1,
  },
  imageWrapper: {
  width: 150,
  height: 150,
  borderRadius: 75,
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
  borderWidth: 3,
  borderColor: '#4CAF50',
},

placeholder: {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
}

});