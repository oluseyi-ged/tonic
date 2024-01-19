/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {SizedBox, SvgIcon, TextInput} from '@components';
import {HDP} from '@helpers';
import React, {FC} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import style from './styles';

export const Orders: FC = ({navigation}: any) => {
  const status = [
    {
      id: 'SCP9374826473',
      stat: 'In the process',
      icon: '📦',
    },
    {
      id: 'SCP6653728497',
      stat: 'In delivery',
      icon: '🚚',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={style.container}>
        <View style={style.header}>
          <SvgIcon name="avi" size={40} />
          <SvgIcon name="bell" size={40} />
        </View>
        <SizedBox height={10} />
        <Text style={style.maintext}>Hello good Morning!</Text>
        <SizedBox height={40} />
        <View style={style.yellowBox}>
          <Text style={style.boxMain}>Track Your Package</Text>
          <SizedBox height={8} />
          <Text style={style.descText}>
            Enter the receipt number that has been given by the officer
          </Text>
          <SizedBox height={29} />
          <TextInput
            placeholder="Enter the receipt number"
            inputStyle={style.inputStyle}
            innerStyle={style.inputText}
            placeholderTextColor="#031420"
          />
          <TouchableOpacity
            style={style.trackCta}
            onPress={() => navigation.navigate('Track')}>
            <Text style={style.trackText}>Track Now</Text>
            <SvgIcon name="arrow-right" size={16} />
          </TouchableOpacity>
        </View>
        <SizedBox height={40} />
        <View>
          <Text style={style.boxMain}>Tracking History</Text>
          <SizedBox height={40} />
          {status?.map((item, i) => (
            <TouchableOpacity style={style.itemGrid}>
              <View style={style.itemSide}>
                <View style={style.iconRound}>
                  <Text style={{fontSize: HDP(24)}}>{item?.icon}</Text>
                </View>
                <View>
                  <Text style={style.idText}>{item?.id}</Text>
                  <Text style={style.idStat}>{item?.stat}</Text>
                </View>
              </View>

              <SvgIcon name="caret-right" size={12} />
            </TouchableOpacity>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
