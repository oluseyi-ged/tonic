/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Onboarding, SplashScreen} from '@screens';
import React from 'react';
import {StatusBar, View} from 'react-native';
import AppStackScreens from './AppStack';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <View style={{position: 'relative', flex: 1}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Home" component={AppStackScreens} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default RootNavigator;
