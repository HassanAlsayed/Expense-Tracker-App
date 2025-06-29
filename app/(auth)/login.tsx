import { router } from "expo-router";
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import style from './styles';

export default function LogIn() {
    const HandleSignIn = () => {
        router.push('/signup');
    }
    return (
        
        <View style={style.container}>
             <ImageBackground source={require('../../assets/images/loginProf.png')} style={style.loginProf} resizeMode='cover'/>
           
            
            <View style={[style.inputs_container,{flex:1}]}>
                <Text style={style.header}>Login now to track your expenses</Text>
                <TextInput 
                    placeholder="Enter your email" 
                    keyboardType="email-address" 
                    style={style.inputs}
                    autoCapitalize="none"
                    autoCorrect={true}
                />
                <TextInput 
                    placeholder="Enter your password" 
                    secureTextEntry={true}
                    style={style.inputs}
                    autoCapitalize="none"
                    autoCorrect={true}
                />
                <TouchableOpacity>
                    <Text style={style.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
            
            <TouchableOpacity 
                style={style.loginButton} 
                onPress={() => console.log("Login pressed")}
            >
                <Text style={style.loginButtonText}>Log In</Text>
            </TouchableOpacity>
            
            <Text style={style.signupText}>
                Don't have an account?{' '}
                <Text style={style.signupLink} onPress={HandleSignIn}>
                    Sign Up
                </Text>
            </Text>
            </View>

        </View>
    )
}