import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, Platform, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  pageWrap: {
    flex: 1,
    paddingHorizontal: HDP(46),
    justifyContent: 'space-between',
    height,
  },
  container: {
    position: 'absolute',
    flex: 1,
    width,
    alignSelf: 'center',
    bottom: 30,
  },
  skipView: {
    flex: 0.1,
    justifyContent: 'space-between',
  },
  swipeCont: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeLabel: {
    color: palette.dark,
    fontSize: RF(24),
    fontFamily: family.Bold,
    textAlign: 'center',
  },
  swipeDesc: {
    color: '#96823D',
    fontFamily: family.Regular,
    fontSize: RF(14),
    textAlign: 'center',
  },
  swipeTextContainer: {
    paddingHorizontal: HDP(30),
  },
  btnContain: {
    paddingHorizontal: HDP(20),
    width: '100%',
    flex: 0.1,
    justifyContent: 'space-between',
    // backgroundColor: 'green',
  },
  indicator: {
    height: HDP(10),
    width: HDP(10),
    backgroundColor: '#D9D9D9',
    marginHorizontal: 3,
    borderRadius: 10,
  },
  flowContainer: {
    width,
    flex: 0.25,
    // backgroundColor: 'red',
  },
  skipBtn: {
    position: 'absolute',
    right: 0,
    marginTop: Platform.OS === 'ios' ? HDP(54) : HDP(24),
    paddingHorizontal: HDP(21),
  },
  arrowNext: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: HDP(7.36),
    backgroundColor: palette.purpleFade,
    paddingHorizontal: HDP(30),
    paddingVertical: HDP(13),
    alignSelf: 'flex-end',
    borderRadius: HDP(8),
  },
  arrowBack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: HDP(7.36),
    borderColor: palette.purple,
    borderWidth: 1,
    paddingHorizontal: HDP(30),
    paddingVertical: HDP(12),
    alignSelf: 'flex-end',
    borderRadius: HDP(8),
  },
  arrowText: {
    color: palette.white,
    fontFamily: family.Medium,
    fontSize: RF(16),
  },
  arrowGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proceedText: {
    color: palette.textWhite,
    fontFamily: family.Bold,
    fontSize: RF(16),
  },
  proceedCta: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: HDP(55),
    backgroundColor: '#000',
    paddingHorizontal: HDP(12),
    paddingVertical: HDP(12),
    borderRadius: HDP(52),
    justifyContent: 'space-between',
  },
  ctaGrid: {
    justifyContent: 'center',
    alignItems: 'center',
    width,
    paddingHorizontal: HDP(45),
    marginTop: HDP(16),
  },
  skipText: {
    color: palette.black,
    fontFamily: family.Regular,
    fontSize: RF(14),
    textDecorationLine: 'underline',
  },
  indicate: {
    height: HDP(6),
    width: HDP(6),
    backgroundColor: '#000',
    justifyContent: 'center',
    borderRadius: HDP(10),
  },
  unindicate: {
    height: HDP(6),
    width: HDP(6),
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: HDP(10),
  },
  iconBg: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderRadius: HDP(1000),
    padding: HDP(4),
  },
  textSpan: {
    color: '#031522',
    fontFamily: family.Bold,
    fontSize: RF(14),
  },
});

export default style;
