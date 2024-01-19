/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Bg} from '@assets/images';
import {SvgIcon} from '@components';
import {HDP} from '@helpers';
import {family} from '@theme';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch} from 'store';
import {SizedBox} from '../../components/sized-box/index';
import style from './styles';

export const Onboarding: FC = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const width = Dimensions.get('window').width;

  const slides = [
    {
      id: 1,
      title: 'Welcome to E-Bikes',
      desc: 'Buy Electric bikes with ease. Try us today for a new journey.',
    },
    {
      id: 2,
      title: 'Discover Future Transportation',
      desc: 'Experience joy with electric bikes. Simplify your commute, reduce carbon footprint.',
    },
    {
      id: 3,
      title: 'Elevate Your Cycling Experience',
      desc: 'Unleash electric bike power – smooth rides, eco-friendly. Explore possibilities today!',
    },
  ];

  const ref = useRef<any>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollIndex = () => {
    const nextSlideIndex = currentIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({offset});
      setCurrentIndex(nextSlideIndex);
    }
  };

  const scrollBack = () => {
    const nextSlideIndex = currentIndex - 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({offset});
      setCurrentIndex(nextSlideIndex);
    }
  };

  useEffect(() => {
    let timer;

    if (currentIndex !== slides.length - 1) {
      timer = setTimeout(() => {
        scrollIndex();
      }, 2000);
    } else {
      timer = setTimeout(() => {
        // Call your function here after 5 seconds
        // navigation.navigate('Auth');
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, navigation, slides.length]);

  const updateIndex = e => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / width);
    setCurrentIndex(newIndex);
  };

  return (
    <ImageBackground source={Bg} style={style.pageWrap}>
      <View style={style.container}>
        <View style={style.flowContainer}>
          <SvgIcon name="box" size={322} height={237} />
          <SizedBox height={20} />
          <FlatList
            ref={ref}
            data={slides}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
            onMomentumScrollEnd={updateIndex}
            renderItem={({item}) => {
              return (
                <View style={style.swipeCont}>
                  <View style={style.swipeTextContainer}>
                    <SizedBox height={59} />
                    <Text style={style.swipeLabel}>{item.title}</Text>
                    <SizedBox height={5} />
                    <Text style={style.swipeDesc}>{item.desc}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        {/* Render indicator */}
        <View style={style.ctaGrid}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: HDP(20),
            }}>
            {slides.map((_, index) => (
              <View
                style={[
                  currentIndex === index ? style.indicate : style.unindicate,
                ]}
              />
            ))}
          </View>
        </View>
        <SizedBox height={48} />
        <View style={style.btnContain}>
          <TouchableOpacity
            style={style.proceedCta}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <SvgIcon name="google" size={24} containerStyle={style.iconBg} />
            <Text style={style.proceedText}>Login with Google</Text>
            <View style={{width: HDP(24)}} />
          </TouchableOpacity>
          <SizedBox height={48} />
          <Text style={[style.swipeDesc, {fontFamily: family.Medium}]}>
            Don’t have any account?
            <Text style={style.textSpan}> Sign Up</Text>
          </Text>
          <SizedBox height={48} />
        </View>
      </View>
    </ImageBackground>
  );
};
