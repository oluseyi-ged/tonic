import {palette} from '@theme';
import React, {FC} from 'react';
import {ActivityIndicator, View} from 'react-native';
import style from './styles';

export const Loader: FC = ({}) => {
  return (
    <View style={style.container}>
      <View style={style.loader}>
        <ActivityIndicator color={palette.white} size="large" />
      </View>
    </View>
  );
};
