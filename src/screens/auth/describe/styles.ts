import {HDP, RF} from '@helpers';
import {family} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  pageWrap: {
    flex: 1,
    paddingHorizontal: HDP(59),
    height,
    backgroundColor: '#fff',
  },
  slantWrap: {
    width: width * 1.1,
    alignSelf: 'center',
    backgroundColor: '#232323',
    height: height * 0.45,
    transform: [{rotate: '-5deg'}],
    position: 'absolute',
    top: HDP(-30),
    borderRadius: HDP(70),
  },
  slantInner: {
    position: 'absolute',
    bottom: HDP(60),
    transform: [{rotate: '5deg'}],
    width: width * 0.65,
    alignSelf: 'center',
  },
  slantText: {
    fontSize: RF(18),
    color: 'white',
    fontFamily: family.Bold,
  },
  bottomView: {
    position: 'absolute',
    height: height * 0.5,
    bottom: 0,
    alignSelf: 'center',
  },
  countryBtn: {
    flexDirection: 'row',
    borderRadius: HDP(8),
    backgroundColor: '#F4F4F4',
    paddingVertical: HDP(10),
    paddingHorizontal: HDP(24),
    width: width * 0.9,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  flagCta: {
    width: width * 0.7,
    fontSize: RF(30),
  },
  label: {
    fontSize: RF(10),
    color: '#7A7978',
    fontFamily: family.Medium,
    marginBottom: HDP(8),
  },
  backBtn: {
    position: 'absolute',
    zIndex: 9999999,
    top: 70,
    left: 50,
    transform: [{rotate: '5deg'}],
  },
  langBox: {
    position: 'absolute',
    bottom: HDP(60),
    transform: [{rotate: '5deg'}],
    width: width * 0.25,
    top: HDP(90),
    right: HDP(40),
    zIndex: 9999999,
  },
});

export default style;
