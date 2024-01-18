/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Onb1, Onb2, Onb3} from '@assets/images';
import {setFirst} from '@slices/first';
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
      label: 'Welcome to Financial Freedom',
      desc: 'Empowering you with accessible and affordable banking, one tap at a time.',
    },
    {
      id: 2,
      label: 'Introducing Secure Money Transfers',
      desc: 'Manage your finances with our NFC enabled app, bringing you secure and fast transactions.',
    },
    {
      id: 3,
      label: 'Personalize Your Experience',
      desc: 'Tailor the app to fit your unique needs and preferences, making banking easier for you.',
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
    <ImageBackground
      source={currentIndex === 0 ? Onb1 : currentIndex === 1 ? Onb2 : Onb3}
      style={style.pageWrap}>
      <View />
      <View style={style.container}>
        <View style={style.flowContainer}>
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
                    <Text style={style.swipeLabel}>{item.label}</Text>
                    <SizedBox height={5} />
                    <Text style={style.swipeDesc}>{item.desc}</Text>
                  </View>
                  {/* Render indicator */}
                  <View style={style.ctaGrid}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      {slides.map((_, index) => (
                        <View
                          style={[
                            currentIndex === index
                              ? style.indicate
                              : style.unindicate,
                          ]}>
                          <View key={index} style={[style.indicator]} />
                        </View>
                      ))}
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Auth');
                        dispatch(setFirst(false));
                      }}>
                      <Text style={style.skipText}>Skip</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>

        <View style={style.btnContain}>
          <TouchableOpacity
            style={style.proceedCta}
            onPress={() => {
              navigation.navigate('Auth');
              dispatch(setFirst(false));
            }}>
            <Text style={style.proceedText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
