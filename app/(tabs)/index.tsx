import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Page() {
  const handleLogin = () =>{
   router.push("/login");
  }
  return (

      <View >
        <Text>Home Page </Text>
        <Button title="LogIn" onPress={handleLogin}/>

      </View>
  );
}


