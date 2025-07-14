import { router } from "expo-router";
import { ImageBackground, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform,Alert } from "react-native";
import style from './styles';
import { signIn } from "../Config/functions";
import { useState } from "react";
import { useDataStore } from "@/utils/useData";
import LoadingDots from "@/utils/LoadingDots ";
import ForgotPassword from "@/utils/forgotPassword";


export default function LogIn() {

     const [credential,setCredential] = useState({
            email:'',
            password:'',
        });
     const [loading,setloading] = useState(false);
     const [modalVisible,setModalVisible] = useState(false);

        
    const HandleSignIn = () => {
        router.push('/signup');
    }

    const {setEmail} = useDataStore();


const handleLogIN = async () => {
  if (!credential.email.trim()) {
    Alert.alert("Validation Error", "Email is required.");
    return;
  }
  
  if (!credential.password) {
    Alert.alert("Validation Error", "Password is required.");
    return;
  }
  
  const password = credential.password;
  const hasNumber = /\d/.test(password);
  
  if (password.length < 8 || !hasNumber) {
    Alert.alert(
      "Validation Error",
      "Password must be at least 8 characters long and contain at least one number."
    );
    return;
  }
    setloading(true);
  const user = await signIn(credential);
  if (user) {
    setEmail(credential.email);
    router.push('/(tabs)/transaction');
  } else {
    Alert.alert("Login Failed", "Invalid credentials or user does not exist.");
    router.push('/signup');
 }
};



    
    return (
        <KeyboardAvoidingView 
            style={{flex: 1}} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <ScrollView 
                contentContainerStyle={{flex: 1}}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                bounces={false}
            >
                <View style={style.container}>
                    <ImageBackground 
                        source={require('../../assets/images/loginProf.png')} 
                        style={style.loginProf} 
                        resizeMode='cover'
                    />
                    
                    <View style={[style.inputs_container,{flex:1}]}>
                        <Text style={style.header}>Login now to track your expenses</Text>
                        
                        <TextInput 
                            placeholder="Enter your email" 
                            keyboardType="email-address" 
                            style={style.inputs}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={credential.email}
                            onChangeText={(text) =>{
                                setCredential((prev) =>({
                                    ...prev,
                                    email:text
                                }))
                            }}
                        />
                        
                        <TextInput 
                            placeholder="Enter your password" 
                            secureTextEntry={true}
                            style={style.inputs}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={credential.password}
                             onChangeText={(text) =>{
                                setCredential((prev) =>({
                                    ...prev,
                                    password:text
                                }))
                            }}
                        />
                        
                        <TouchableOpacity onPress={()=> setModalVisible(true)}>
                            <Text style={style.forgotPassword}>Forgot Password?</Text>
                        </TouchableOpacity>
                    
                       <TouchableOpacity   
                                style={[
                                        style.loginButton,
                                        loading && { opacity: 0.4 }  
                                    ]}
                                onPress={handleLogIN}
                                disabled={loading}
                            >
                            {!loading ? (
                                <Text style={style.loginButtonText}>Log In</Text>
                            ) : (
                                <LoadingDots
                                style={{ width: 50, height: 20 }}
                                animationDuration={800}
                                color={'blue'} 
                                />
                            )}     
                            </TouchableOpacity> 
                        
                        <Text style={style.signupText}>
                            Don't have an account?{' '}
                            <Text style={style.signupLink} onPress={HandleSignIn}>
                                Sign Up
                            </Text>
                        </Text>
                    </View>
                </View>
           {modalVisible &&  <ForgotPassword modalVisible={modalVisible} setModalVisible={setModalVisible}/>}

            </ScrollView>
        </KeyboardAvoidingView>
    )
}