import {RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginVertical: 'auto',
  },
  splashText: {
    color: palette.offWhite,
    fontSize: RF(16),
    fontFamily: family.Bold,
    width: width * 0.7,
    textAlign: 'center',
  },
});

export default style;
