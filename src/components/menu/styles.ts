import {RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  navText: {
    fontSize: RF(8),
    fontFamily: family.Medium,
    color: palette.lightText,
  },
  navActive: {
    fontSize: RF(8),
    fontFamily: family.Medium,
    color: '#6CCF00',
  },
});

export default styles;
