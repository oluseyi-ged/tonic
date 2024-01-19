/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Bike, Bike2, Bike3, Bike4, Bike5, Ride} from '@assets/images';
import {Button, SizedBox, SvgIcon} from '@components';
import {HDP} from '@helpers';
import LottieView from 'lottie-react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import style from './styles';

export const Home: FC = ({navigation}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {width, height} = Dimensions.get('window');
  const ref = useRef<any>(null);
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, []);
  const bikes = [
    {
      id: 1,
      image: Bike,
    },
    {
      id: 2,
      image: Bike2,
    },
    {
      id: 3,
      image: Bike3,
    },
    {
      id: 4,
      image: Bike4,
    },
    {
      id: 5,
      image: Bike5,
    },
  ];

  const updateIndex = e => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / width);
    setCurrentIndex(newIndex);
  };

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
        <View style={{paddingLeft: HDP(24)}}>
          <FlatList
            ref={ref}
            data={bikes}
            keyExtractor={item => item.id.toString()} // Specify a unique key for each item
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
            onMomentumScrollEnd={updateIndex}
            renderItem={({item}) => (
              <View
                style={[
                  style.swipeCont,
                  currentIndex !== item?.id - 1 && {opacity: 0.5},
                ]}>
                <Image source={item?.image} style={style.heroImg} />
              </View>
            )}
          />
          <SizedBox height={16} />
          {/* Render indicator */}
          <View style={style.ctaGrid}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: HDP(3),
              }}>
              {bikes.map((_, index) => (
                <View
                  style={[
                    currentIndex === index ? style.indicate : style.unindicate,
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
        <SizedBox height={25} />
        <View style={style.orderCta}>
          <Text style={style.orderText}>Gotten your E-Bike yet?</Text>
          <Button
            onPress={() => navigation.navigate('Orders')}
            title="Your Orders"
            iconName="arrow-right"
            containerStyle={{flex: 1}}
          />
        </View>
        <View style={style.lottieGrid}>
          <LottieView
            ref={animationRef}
            source={Ride}
            autoPlay
            loop
            style={{
              height: HDP(161),
              width: HDP(150),
            }}
          />
          <Text style={style.lottieText}>
            You too can join our Elite squad of E-bikers
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
