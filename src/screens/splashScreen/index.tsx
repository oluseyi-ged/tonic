/* eslint-disable @typescript-eslint/no-unused-vars */

import {SvgIcon} from '@components';
import {isObjectEmpty} from '@utils';
import React, {FC, useEffect} from 'react';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {RootState, useAppDispatch, useAppSelector} from 'store';
import style from './styles';

export const SplashScreen: FC = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {logged, first, profile, auth} = useAppSelector(
    (store: RootState) => store,
  );

  useEffect(() => {
    setTimeout(() => {
      // SplashFunctions.openApp(navigation);
      // if (first) {
      //   navigation.navigate('Onboarding');
      // } else
      if (logged) {
        navigation.navigate('Home');
      } else if (!logged) {
        if (!isObjectEmpty(profile) || !isObjectEmpty(auth)) {
          navigation.navigate('Auth', {screen: 'Login'});
        } else {
          navigation.navigate('Auth', {screen: 'Login'});
        }
      }
    }, 2300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={style.container}>
      <Animatable.View animation="flash" direction="normal" duration={2000}>
        <Animatable.View animation="fadeIn" duration={2300}>
          {/* <Image source={splash} /> */}
          <SvgIcon name="logo" size={90} />
        </Animatable.View>
      </Animatable.View>
    </View>
  );
};
