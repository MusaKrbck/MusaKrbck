import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import VehiclesScreen from '../screens/VehiclesScreen';
import VehicleDetailScreen from '../screens/VehicleDetailScreen';
import TravelCalculatorScreen from '../screens/TravelCalculatorScreen';
import CompareScreen from '../screens/CompareScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const VehiclesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0a0a1a',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="VehiclesList" 
        component={VehiclesScreen} 
        options={{ title: 'Uzay Araçları' }}
      />
      <Stack.Screen 
        name="VehicleDetail" 
        component={VehicleDetailScreen} 
        options={{ title: 'Araç Detayları' }}
      />
      <Stack.Screen 
        name="Compare" 
        component={CompareScreen} 
        options={{ title: 'Araç Karşılaştırma' }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Ana Sayfa') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Uzay Araçları') {
              iconName = focused ? 'rocket' : 'rocket-outline';
            } else if (route.name === 'Yolculuk Hesaplayıcı') {
              iconName = focused ? 'calculator' : 'calculator-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#0a0a1a',
            borderTopColor: '#1f1f3a',
          },
          headerStyle: {
            backgroundColor: '#0a0a1a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen name="Ana Sayfa" component={HomeScreen} />
        <Tab.Screen 
          name="Uzay Araçları" 
          component={VehiclesStack} 
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Yolculuk Hesaplayıcı" component={TravelCalculatorScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;