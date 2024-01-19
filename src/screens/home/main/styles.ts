import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: palette.white,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: HDP(24),
  },
  maintext: {
    fontSize: RF(18),
    color: '#092C4C',
    fontFamily: family.Bold,
    paddingLeft: HDP(24),
  },
  swipeCont: {
    backgroundColor: '#F1F6FB',
    borderRadius: HDP(32),
    width: width * 0.8,
    alignSelf: 'center',
    overflow: 'hidden',
    height: height * 0.35,
    marginRight: HDP(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImg: {
    height: '80%',
    width: '80%',
    resizeMode: 'cover',
  },
  ctaGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width,
  },
  indicate: {
    height: HDP(6),
    width: HDP(6),
    backgroundColor: '#000',
    justifyContent: 'center',
    borderRadius: HDP(4),
  },
  unindicate: {
    height: HDP(6),
    width: HDP(6),
    backgroundColor: '#E5F0FC',
    justifyContent: 'center',
    borderRadius: HDP(100),
  },
  orderCta: {
    flexDirection: 'row',
    backgroundColor: '#FFD337',
    paddingVertical: HDP(27),
    paddingRight: HDP(27),
    paddingLeft: HDP(32),
    alignItems: 'center',
    gap: HDP(27),
  },
  orderText: {
    fontSize: RF(14),
    color: '#96823D',
    fontFamily: family.Regular,
    width: '30%',
  },
  lottieText: {
    fontSize: RF(14),
    color: '#424242',
    fontFamily: family.Regular,
    width: '45%',
  },
  lottieGrid: {
    flexDirection: 'row',
    paddingVertical: HDP(30),
    paddingRight: HDP(48),
    gap: HDP(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
