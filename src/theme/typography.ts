import {Platform} from 'react-native';

/*
Available font weights

300 Light
400 Regular
500 Medium
600 SemiBold
700 Bold
*/

export const family = {
  Light: Platform.select({
    ios: 'Overpass-Light', // The font family name
    android: 'Overpass-Light', // The file name
  }),
  Bold: Platform.select({
    ios: 'Overpass-Bold', // The font family name
    android: 'Overpass-Bold', // The file name
  }),
  Regular: Platform.select({
    ios: 'Overpass-Regular', // The font family name
    android: 'Overpass-Regular', // The file name
  }),
  ExtraBold: Platform.select({
    ios: 'Overpass-ExtraBold', // The font family name
    android: 'Overpass-ExtraBold', // The file name
  }),
  Medium: Platform.select({
    ios: 'Overpass-Medium', // The font family name
    android: 'Overpass-Medium', // The file name
  }),
  SemiBold: Platform.select({
    ios: 'Overpass-SemiBold', // The font family name
    android: 'Overpass-SemiBold', // The file name
  }),
};
