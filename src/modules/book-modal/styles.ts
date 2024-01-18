import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: palette.purple,
    width: HDP(78),
    height: HDP(6),
    borderRadius: HDP(200),
    alignSelf: 'center',
  },
  bookText: {
    fontSize: RF(12),
    fontFamily: family.Bold,
    color: palette.dark,
    textAlign: 'center',
  },
  container: {
    paddingHorizontal: HDP(32),
  },
  ctaGrid: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: HDP(11),
  },
  noticeText: {
    fontSize: RF(10),
    fontFamily: family.Bold,
    color: palette.purpleFade,
    textAlign: 'center',
  },
  bookLabel: {
    fontSize: RF(20),
    fontFamily: family.Bold,
    color: palette.purpleFade,
    textAlign: 'center',
    marginBottom: HDP(5),
  },
  quoteDate: {
    fontSize: RF(10),
    fontFamily: family.Regular,
    color: '#13556D80',
    textAlign: 'center',
  },
  quoteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: HDP(14),
  },
  quoteDivide: {
    width: width * 0.4,
    height: 1,
    backgroundColor: '#13556D80',
    alignSelf: 'center',
    marginTop: HDP(5),
  },
  quoteLeft: {
    fontSize: RF(14),
    fontFamily: family.Regular,
    color: palette.dark,
  },
  quoteRight: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.purpleFade,
  },
  quoteDownLeft: {
    fontSize: RF(18),
    fontFamily: family.Bold,
    color: palette.purpleFade,
  },
  quoteDownRight: {
    fontSize: RF(18),
    fontFamily: family.Bold,
    color: palette.purpleFade,
  },
  disclaim: {
    fontSize: RF(6),
    fontFamily: family.Regular,
    color: palette.dark,
    textAlign: 'center',
    width: width * 0.7,
    alignSelf: 'center',
  },
  disclaimSpan: {
    color: palette.purple,
  },
});

export default styles;
