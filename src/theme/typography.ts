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
    ios: 'Inter-Light', // The font family name
    android: 'Inter-Light', // The file name
  }),
  Bold: Platform.select({
    ios: 'Inter-Bold', // The font family name
    android: 'Inter-Bold', // The file name
  }),
  Regular: Platform.select({
    ios: 'Inter-Regular', // The font family name
    android: 'Inter-Regular', // The file name
  }),
  Medium: Platform.select({
    ios: 'Inter-Medium', // The font family name
    android: 'Inter-Medium', // The file name
  }),
  SemiBold: Platform.select({
    ios: 'Inter-SemiBold', // The font family name
    android: 'Inter-SemiBold', // The file name
  }),
};
