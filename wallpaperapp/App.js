import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Onboard from './appfiles/onboarding'; 
import Cars from './appfiles/Cars';
import Greenery from './appfiles/Greenery';
import Livewallpaper from './appfiles/livewallpaper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Flowers from './appfiles/Flowers';
import { StyleSheet } from 'react-native';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="onboarding" 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'onboarding') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Cars') {
              
              iconName = focused ? 'car-outline' : 'car-outline';
            }
            else if (route.name === 'Flowers'){
              iconName= focused ? 'flower-outline':'flower-outline'
            }
            else if (route.name==='Greenery'){
              iconName=focused ? 'leaf-outline':'leaf-outline'
            }
            else if (route.name==='livewallpaper'){
              iconName=focused ? 'caret-forward-circle-outline':'caret-forward-circle-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FD6C6C',
          tabBarInactiveTintColor: 'black',
          
          
          tabBarStyle: route.name === 'onboarding' ? { display: 'none' } : {backgroundColor:'#FFC8C8'},
        })}
      >
        <Tab.Screen name="onboarding" component={Onboard} options={{ headerShown: false ,tabBarButton:()=>null}} />
        <Tab.Screen name="Cars" component={Cars} options={{ headerShown: false }} />
        <Tab.Screen name="Flowers" component={Flowers} options={{ headerShown: false }} />
        <Tab.Screen name='Greenery' component={Greenery} options={{headerShown:false}}/>
        <Tab.Screen name='livewallpaper' component={Livewallpaper} options={{headerShown:false}}/>
        
        

      </Tab.Navigator>
    </NavigationContainer>
  );
}
