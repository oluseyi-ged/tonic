import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const style = StyleSheet.create({
  pageWrap: {
    backgroundColor: palette.white,
    flex: 1,
    position: 'relative',
  },
  container: {
    paddingHorizontal: HDP(24),
  },
  welcomeLabel: {
    fontSize: RF(24),
    fontFamily: family.Bold,
    color: palette.textWhite,
    width: width * 0.7,
    textAlign: 'center',
    alignSelf: 'center',
  },
  headerLabel: {
    fontSize: RF(32),
    fontFamily: family.Bold,
    color: palette.purple,
    marginBottom: HDP(4),
  },
  headerSub: {
    fontSize: RF(12),
    fontFamily: family.Medium,
    color: '#6A6A6A',
    width: width * 0.8,
  },
  welcomeSub: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: palette.mutedGreen,
    width: width * 0.7,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: HDP(5),
  },
  forgotText: {
    fontSize: RF(10),
    fontFamily: family.Medium,
    color: '#4C4D50',
  },
  tcText: {
    fontSize: RF(8),
    fontFamily: family.Regular,
    color: '#f1f1f150',
    textAlign: 'center',
  },
  tcFade: {
    fontSize: RF(8),
    fontFamily: family.Regular,
    color: '#009FA980',
  },
  ctaGrid: {
    flexDirection: 'row',
    gap: HDP(13),
  },
  forgotTxt: {
    fontSize: RF(10),
    fontFamily: family.Regular,
    color: '#ABABAB',
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginTop: HDP(15),
  },
  ctaTxt: {
    fontSize: RF(10),
    fontFamily: family.Regular,
    color: '#ABABAB',
    textAlign: 'center',
    alignSelf: 'center',
  },
  backCta: {
    justifyContent: 'center',
    gap: HDP(2),
    paddingHorizontal: HDP(32),
    paddingVertical: HDP(10),
    alignItems: 'center',
  },
  backText: {
    fontSize: RF(14),
    fontFamily: family.Regular,
    color: palette.white,
  },
  modalLabel: {
    fontSize: RF(24),
    fontFamily: family.Bold,
    color: palette.dark,
    textAlign: 'center',
  },
  modalSub: {
    fontSize: RF(14),
    fontFamily: family.Medium,
    color: palette.fadeBlack,
    marginTop: HDP(8),
    textAlign: 'center',
  },
  spanTxt: {
    color: palette.green,
  },
  phoneCta: {
    backgroundColor: palette.green,
    borderRadius: HDP(8),
    width: width * 0.9,
    alignSelf: 'center',
    paddingVertical: HDP(20),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: HDP(16),
    alignItems: 'center',
  },
  bvnCta: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.green,
    borderRadius: HDP(8),
    width: width * 0.9,
    alignSelf: 'center',
    paddingVertical: HDP(20),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: HDP(16),
    alignItems: 'center',
  },
  phoneText: {
    fontSize: RF(14),
    fontFamily: family.Medium,
    color: palette.white,
  },
  bvnText: {
    fontSize: RF(14),
    fontFamily: family.Medium,
    color: palette.dark,
  },
  phoneBold: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.white,
  },
  bvnBold: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.green,
  },
  drawer: {
    width: HDP(60),
    height: HDP(4),
    backgroundColor: '#696A6C',
    borderRadius: HDP(100),
    alignSelf: 'center',
  },
  userText: {
    fontSize: RF(16),
    fontFamily: family.Bold,
    color: palette.green,
    textAlign: 'center',
  },
  switchText: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.blueBlack,
    textAlign: 'center',
  },
});

export default style;
