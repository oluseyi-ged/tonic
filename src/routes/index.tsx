/* eslint-disable react-native/no-inline-styles */
import {Loader} from '@components';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Onboarding, SplashScreen} from '@screens';
import {clearLogged} from '@slices/logged';
import moment from 'moment';
import React, {useEffect} from 'react';
import {
  AppState,
  InteractionManager,
  Keyboard,
  StatusBar,
  View,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {RootState, useAppDispatch, useAppSelector} from 'store';
import AppStackScreens from './AppStack';
import AuthStackScreens from './AuthStack';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const dispatch = useAppDispatch();

  const {user, loading} = useAppSelector((store: RootState) => store);

  useEffect(() => {
    const checkTargetTime = () => {
      const targetTime = moment(user?.expires_at, 'YYYY-MM-DD HH:mm:ss');
      const currentTime = moment();

      if (currentTime >= targetTime) {
        dispatch(clearLogged());
      }
    };

    const interval = setInterval(checkTargetTime, 1000); // Check every second

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, [dispatch, user]);

  const logOut = () => {
    // dispatch(setLogged(false));
  };

  useEffect(() => {
    let timeoutId;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(logout, 5 * 60 * 1000);
    };

    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'active') {
        resetTimeout();
      }
    };

    const handleKeyboardActivity = () => {
      resetTimeout();
    };

    const logout = () => {
      logOut();
    };

    resetTimeout();

    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    const keyboardShowSubscription = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardActivity,
    );
    const keyboardHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardActivity,
    );
    InteractionManager.runAfterInteractions(() => {
      resetTimeout();
      Keyboard.addListener('keyboardDidShow', handleKeyboardActivity);
      Keyboard.addListener('keyboardDidHide', handleKeyboardActivity);
    });

    return () => {
      clearTimeout(timeoutId);
      appStateSubscription.remove();
      keyboardShowSubscription.remove();
      keyboardHideSubscription.remove();
    };
  }, []);

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
          <Stack.Screen name="Auth" component={AuthStackScreens} />
        </Stack.Navigator>
      </NavigationContainer>
      {loading && <Loader />}
      <FlashMessage duration={3000} />
    </View>
  );
};

export default RootNavigator;
