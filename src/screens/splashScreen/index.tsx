import React, {FC, useEffect} from 'react';
import {Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import style from './styles';

export const SplashScreen: FC = ({navigation}: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 2300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={style.container}>
      <Animatable.View animation="flash" direction="normal" duration={2000}>
        <Animatable.View animation="fadeIn" duration={2300}>
          <Text>E-Bikes</Text>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
};
