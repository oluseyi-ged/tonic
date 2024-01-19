/* eslint-disable react-native/no-inline-styles */
// import { SizedBox } from '@components/sized-box';
import {SizedBox} from '@components';
import {SvgIcon} from '@components/svg-icon';
import {HDP} from '@helpers';
import {palette} from '@theme';
import React, {FC} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import style from './styles';
interface Props {
  title?: any;
  iconName?: string;
  loading?: boolean;
  onPress?: () => void;
  bordered?: boolean;
  containerStyle?: any;
  textStyle?: any;
  backgroundColor?: any;
  iconContainerStyle?: any;
  iconSize?: number;
  disabled?: boolean;
}

export const Button: FC<Props> = ({
  title,
  iconName,
  onPress,
  loading,
  containerStyle,
  textStyle,
  backgroundColor = palette.black,
  iconContainerStyle,
  bordered,
  iconSize,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        style.containerCommonStyle,
        {backgroundColor},
        bordered && style.borderStyle,
        containerStyle,
        (disabled || loading) && {backgroundColor: palette.fadeBlack},
      ]}>
      {loading ? (
        <ActivityIndicator color={palette.white} />
      ) : (
        <View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: HDP(21)}}>
            <Text
              style={[
                style.textCommonStyle,
                bordered && style.borderTextStyle,
                textStyle,
              ]}>
              {title}
            </Text>
            {iconName && (
              <View style={[style.iconContainer, iconContainerStyle]}>
                <SvgIcon name={iconName} size={iconSize || 20} />
                <SizedBox width={HDP(12)} />
              </View>
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};
