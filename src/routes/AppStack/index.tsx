/* eslint-disable @typescript-eslint/no-unused-vars */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabsStackScreens} from '@routes/Tabs';
import {Collections, Describe, More, Payments} from '@screens';

import React from 'react';

const AppStack = createNativeStackNavigator();
const AppStackScreens = ({navigation}) => {
  return (
    <AppStack.Navigator initialRouteName={'AppHome'}>
      <AppStack.Screen
        name="AppHome"
        component={TabsStackScreens}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="AppMore"
        component={More}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Payments"
        component={Payments}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Collections"
        component={Collections}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Describe"
        component={Describe}
        options={{
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  );
};

export default AppStackScreens;
