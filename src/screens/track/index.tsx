/* eslint-disable react-native/no-inline-styles */

import React, {FC, useCallback, useMemo, useRef} from 'react';
import {ImageBackground, Text, View} from 'react-native';
// import mapStyles from './mapStyles.json';
import {MapBg, MiniBg} from '@assets/images';
import {SizedBox, SvgIcon} from '@components';
import BottomSheet from '@gorhom/bottom-sheet';
import {HDP} from '@helpers';
// import {useFocusEffect} from '@react-navigation/native';
import style from './styles';

export const Track: FC = ({navigation}: any) => {
  const bottomSheetRef = useRef<any>(null);
  const snapPoints = useMemo(() => ['95%', '15%'], []);

  //   useFocusEffect(
  //     React.useCallback(() => {
  //       bottomSheetRef?.current.snapToIndex(
  //   index: 0
  // )
  //     }, []),
  //   );

  const status = [
    {
      id: 'In Delivery',
      stat: 'Bali, Indonesia',
      icon: '🚚',
      time: '00.00 PM',
    },
    {
      id: 'Transit - Sending City',
      stat: 'Jakarta, Indonesia',
      icon: '📬',
      time: '21.00 PM',
    },
    {
      id: 'Send Form Sukabumi',
      stat: 'Sukabumi, Indonesia',
      icon: '📦',
      time: '19.00 PM',
    },
  ];

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <ImageBackground source={MapBg} style={style.pageWrap}>
      <View style={style.container}>
        <View style={style.mapHead}>
          <SvgIcon
            name="caret-left"
            onPress={() => navigation.goBack()}
            size={40}
          />
          <Text style={style.mapHeader}>Tracking Details</Text>
          <View style={{width: HDP(40)}} />
        </View>
        <View style={style.refBox}>
          <View style={style.bordered}>
            <Text style={style.refText}>SCP6653728497</Text>
          </View>
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={style.modalStyle}
        handleIndicatorStyle={style.handleStyle}
        onChange={handleSheetChanges}>
        <View style={style.contentContainer}>
          <View style={style.modalHead}>
            <View>
              <Text style={style.idStat}>Estimate arrives in</Text>
              <Text style={style.estText}>2h 40m</Text>
            </View>
            <SvgIcon name="menu" size={15} />
          </View>
          <SizedBox height={30} />

          <ImageBackground source={MiniBg} style={style.yellowBox}>
            <View>
              <Text style={style.boxMain}>Sukabumi, Indonesia</Text>
              <SizedBox height={8} />
              <Text style={style.descText}>No receipt : SCP6653728497</Text>
            </View>
            <View style={style.line} />
            <View>
              <Text style={style.boxMain}>2,50 USD</Text>
              <SizedBox height={8} />
              <Text style={style.descText}>Postal fee</Text>
            </View>
            <View style={style.line} />
            <View>
              <Text style={style.boxMain}>Bali, Indonesia</Text>
              <SizedBox height={8} />
              <Text style={style.descText}>Parcel, 24kg</Text>
            </View>
          </ImageBackground>
          <SizedBox height={40} />
          <View>
            <Text style={style.boxMain}>History</Text>
            <SizedBox height={40} />
            {status?.map((item, i) => (
              <>
                <View style={style.itemGrid}>
                  <View style={style.itemSide}>
                    <View
                      style={[
                        style.iconRound,
                        i === 0 && {backgroundColor: '#FFD337'},
                      ]}>
                      <Text style={{fontSize: HDP(24)}}>{item?.icon}</Text>
                    </View>
                    <View>
                      <Text style={style.idText}>{item?.id}</Text>
                      <Text style={style.idStat}>{item?.stat}</Text>
                    </View>
                  </View>

                  <Text style={style.timeText}>{item?.time}</Text>
                </View>
                {i !== 2 ? <View style={style.upright} /> : null}
              </>
            ))}
          </View>
        </View>
      </BottomSheet>
    </ImageBackground>
  );
};
