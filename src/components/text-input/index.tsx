/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {SizedBox} from '@components';
import {SvgIcon} from '@components/svg-icon';
import {HDP} from '@helpers';
import React, {FC, useEffect, useState} from 'react';
import {TextInput as TN, Text, View} from 'react-native';
import style from './styles';

interface Props {
  padding?: number;
  onSubmit?: () => void;
  // onPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: any;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  value?: any;
  containerStyle?: any;
  inputStyle?: any;
  marginTop?: number;
  textAlign?: 'left' | 'right' | 'center';
  error?: string;
  editable?: boolean;
  maxLength?: number;
  placeholder?: any;
  inputErrMsg?: any;
  bvnLength?: any;
  multiline?: boolean;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad';
  textPaddingVertical?: number;
  bottomTitle?: string;
  rightIcon?: string;
  shouldFocus?: boolean;
  onTouchStart?: () => void;
  [x: string]: any;
  lessMargin?: boolean;
  isError?: boolean;
  label?: string;
  type?: 'password' | 'text';
  iconName1?: string;
  iconName2?: string;
  iconSize1?: number;
  iconSize2?: number;
  onPress1?: any;
  onPress2?: any;
  placeholderTextColor?: string;
  numberOfLines?: number;
  innerStyle?: any;
  bordered?: boolean;
  white?: boolean;
  autoCorrect?: boolean;
}
export const TextInput: FC<Props> = ({
  padding = HDP(12),
  inputStyle,
  placeholder,
  placeholderTextColor = '#A5A5A5',
  keyboardType,
  onSubmit,
  onFocus,
  onBlur,
  editable,
  textAlign,
  textAlignVertical,
  multiline,
  refValue,
  value,
  maxLength,
  type,
  label,
  bvnLength = 0,
  onChangeText,
  iconName1,
  iconName2,
  iconSize1,
  iconSize2,
  onPress1,
  onPress2,
  numberOfLines,
  innerStyle,
  bordered,
  shouldFocus,
  autoCorrect,
  white,
  error,
}) => {
  const [focused, setFocused] = useState(false);
  const [valueText, setValueText] = useState(0);
  const [secure, setSecure] = useState(type === 'password' ? true : false);
  useEffect(() => {
    console.log(value);
    if (value) {
      setValueText(value.length);
    }
  }, [value]);

  return (
    <View>
      {label && (
        <>
          <Text style={[style.label, white && {color: '#13556D'}]}>
            {label}
          </Text>
          <SizedBox height={8} />
        </>
      )}

      <View
        style={[
          style.inputContainer,
          {paddingHorizontal: padding},
          inputStyle,
          bordered && style.bordered,
          // focused && {borderColor: palette.mutedGreen},
        ]}>
        {iconName1 && (
          <SvgIcon name={iconName1} size={iconSize1 || 20} onPress={onPress1} />
        )}
        <TN
          placeholder={placeholder}
          style={[
            {padding, flex: 1, color: bordered ? '#fff' : '#082932'},
            innerStyle,
          ]}
          placeholderTextColor={bordered ? '#EAFFD270' : placeholderTextColor}
          onFocus={() => {
            onFocus;
            setFocused(true);
          }}
          // onBlur={onBlur}
          maxLength={maxLength}
          editable={editable}
          secureTextEntry={secure}
          textAlign={textAlign}
          textAlignVertical={textAlignVertical || 'top'}
          multiline={multiline}
          onSubmitEditing={onSubmit}
          ref={refValue}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          autoCapitalize={'none'}
          numberOfLines={numberOfLines}
          autoFocus={shouldFocus}
          autoCorrect={autoCorrect}
        />
        {iconName2 && (
          <SvgIcon name={iconName2} size={iconSize2 || 20} onPress={onPress2} />
        )}
        {type === 'password' && (
          <SvgIcon
            name={'open-eye'}
            size={20}
            onPress={() => {
              setSecure(!secure);
            }}
          />
        )}
      </View>
      {bvnLength > 0 && (
        <Text style={[style.bvnLength]}>
          {valueText} /{bvnLength}
        </Text>
      )}
      {error?.length ? (
        <>
          <Text style={[style.error]}>{error}</Text>
          <SizedBox height={10} />
        </>
      ) : (
        <SizedBox height={10} />
      )}
    </View>
  );
};
