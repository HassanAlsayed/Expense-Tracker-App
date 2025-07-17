import Icon from 'react-native-vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { useDataStore } from '@/utils/useData';

export default function TabsLayout() {

  const {imageUrl} = useDataStore();

    return(
        <Tabs screenOptions={{headerShown:false, 
        tabBarStyle:{backgroundColor:'#061A40'},
        tabBarInactiveTintColor:'grey',
        tabBarActiveTintColor:'green'}}>
            <Tabs.Screen name="transaction"  options={{title:"transaction",tabBarIcon: ({color}) => (
            <Icon name="compare-arrows" size={30} color={color} />
          ),
        }}></Tabs.Screen>
            <Tabs.Screen name="chart"  options={{title:"Chart",tabBarIcon: ({color}) => (
            <Icon name="bar-chart" size={30} color={color} />
          ),}}></Tabs.Screen>
            <Tabs.Screen 
  name="profile" 
  options={{ 
    title: "Profile",
    tabBarIcon: ({ color }) => (
      imageUrl ? (
        <Image 
          source={{ uri: imageUrl }} 
          style={{ width: 30, height: 30, borderRadius: 15 }} 
        />
      ) : (
        <Icon name="person" size={30} color={color} />
      )
    )
  }} 
/>

          
        </Tabs>
    )
}