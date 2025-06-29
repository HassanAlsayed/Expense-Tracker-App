import { router } from "expo-router";
import { ImageBackground, Text, TextInput, TouchableOpacity, View} from "react-native";
import style from './styles';

export default function signup() {

   const HandleLogIn = () => {
        router.push('/login');
    }
  return (
        
        <View style={style.container}>
              <ImageBackground source={require('../../assets/images/loginProf.png')} style={style.loginProf} resizeMode='cover'/> 
           
            
            <View style={[style.inputs_container,{flex:1.5}]}>
               <Text style={style.starting_text}>Let's Get Started</Text>
                <Text style={style.header}>Create an account to track your expenses</Text>
                <TextInput 
                    placeholder="Enter your name" 
                    keyboardType='name-phone-pad' 
                    style={style.inputs}
                    autoCapitalize="none"
                    autoCorrect={true}
                />
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
            
            <TouchableOpacity   
                style={style.loginButton} 
                onPress={() => console.log("Login pressed")}
            >
                <Text style={style.loginButtonText}>Sign Up</Text>
            </TouchableOpacity> 
            
            <Text style={style.signupText}>
                Already have an account?{' '}
                <Text style={style.signupLink} onPress={HandleLogIn}>
                    Log In
                </Text>
            </Text>
            </View>

        </View>
    )
}