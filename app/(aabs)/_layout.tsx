import { Tabs } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TabsLayout() {
    return(
        <Tabs initialRouteName='transaction' screenOptions={{headerShown:false,
        tabBarStyle:{backgroundColor:'#061A40'},
        tabBarInactiveTintColor:'grey',
        tabBarActiveTintColor:'green'}}>
            <Tabs.Screen name="transaction" options={{title:"Transaction",tabBarIcon: ({color}) => (
            <Icon name="compare-arrows" size={30} color={color} />
          ),
        }}></Tabs.Screen>
            <Tabs.Screen name="chart" options={{title:"Chart",tabBarIcon: ({color}) => (
            <Icon name="bar-chart" size={30} color={color} />
          ),}}></Tabs.Screen>
            <Tabs.Screen name="profile" options={{title:"Profile",tabBarIcon: ({color}) => (
            <Icon name="person" size={30} color={color} />
          ),}}></Tabs.Screen>
          
        </Tabs>
    )
}