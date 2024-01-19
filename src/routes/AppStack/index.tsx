/* eslint-disable @typescript-eslint/no-unused-vars */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabsStackScreens} from '@routes/Tabs';
import {Orders, Track} from '@screens';

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
        name="Orders"
        component={Orders}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Track"
        component={Track}
        options={{
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  );
};

export default AppStackScreens;
