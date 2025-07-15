import { router } from "expo-router";
import { ImageBackground, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform,Alert} from "react-native";
import style from './styles';
import { useState } from "react";
import { addUserInfo, signUp } from "../Config/functions";
import LoadingDots from "@/utils/LoadingDots ";
import { useDataStore } from "@/utils/useData";

export default function Signup() {

    const [credential,setCredential] = useState({
        email:'',
        password:'',
        userName:'',
        phoneNumber:''
    });
     const [loading,setloading] = useState(false);
     const {setUserName} = useDataStore();

   const HandleLogIn = () => {
        router.push('/login');
    }

    const handleSignUp = async () =>{
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
      
      const user = await signUp(credential);
        if(!user)
        {
            Alert.alert('email already in use');
            setloading(false);
            setCredential({email:'',
                password:'',
                userName:'',
                phoneNumber:''
            });
            return;
         }
        
         setUserName(credential.userName);
       await addUserInfo(credential.email,credential.userName,credential.phoneNumber);
       router.push('/login');
    }

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
                    
                    <View style={[style.inputs_container,{flex:1.5}]}>
                        <Text style={style.header}>Create an account to track your expenses</Text>
                        
                        <TextInput 
                            placeholder="Enter your name" 
                            keyboardType='default' 
                            style={style.inputs}
                            autoCapitalize="words"
                            autoCorrect={true}
                            value={credential.userName}
                            onChangeText={(text)=> 
                                setCredential((prev)=>({
                                ...prev,
                                userName:text,
                            }))
                        }
                        />
                        
                        <TextInput 
                            placeholder="Enter your email" 
                            keyboardType="email-address" 
                            style={style.inputs}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={credential.email}
                            onChangeText={(text)=> 
                                setCredential((prev)=>({
                                ...prev,
                                email:text,
                            }))
                        }
                        />
                        
                       <View style={{paddingBottom: 10}}>
                            <TextInput 
                                placeholder="Enter your password" 
                                secureTextEntry={true}
                                style={style.inputs}
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={credential.password}
                                onChangeText={(text)=> 
                                    setCredential((prev)=>({
                                    ...prev,
                                    password:text,
                                }))
                            }
                            />
                        </View>

                        <TouchableOpacity   
                                style={[
                                        style.loginButton,
                                        loading && { opacity: 0.4 }  
                                    ]}
                                onPress={handleSignUp}
                                disabled={loading}
                            >
                            {!loading ? (
                                <Text style={style.loginButtonText}>Sign Up</Text>
                            ) : (
                                <LoadingDots
                                style={{ width: 50, height: 20 }}
                                animationDuration={800}
                                color={'blue'} 
                                />
                            )}     
                            </TouchableOpacity> 

                        
                        <Text style={style.signupText}>
                            Already have an account?{' '}
                            <Text style={style.signupLink} onPress={HandleLogIn}>
                                Log In
                            </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}