import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  pageWrap: {
    backgroundColor: palette.white,
    flex: 1,
    position: 'relative',
  },
  scrollWrap: {
    paddingHorizontal: HDP(32),
  },
  userName: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.dark,
    marginTop: HDP(10),
    marginBottom: HDP(5),
    textAlign: 'center',
  },
  userAvi: {
    width: HDP(90),
    height: HDP(90),
    borderRadius: HDP(100),
    backgroundColor: '#CCDDE2',
    alignSelf: 'center',
  },
  idBox: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: palette.mutedGreen,
    width: width * 0.9,
    paddingVertical: HDP(10),
    borderRadius: HDP(8),
  },
  idText: {
    fontSize: RF(16),
    fontFamily: family.Bold,
    color: palette.fadeBlack,
    alignSelf: 'center',
  },
  optItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: HDP(24),
    borderWidth: 1,
    padding: HDP(16),
    borderRadius: HDP(8),
    borderColor: '#D5F7E5',
    width: width * 0.9,
    alignSelf: 'center',
  },
  optLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optText: {
    fontSize: RF(12),
    fontFamily: family.SemiBold,
    color: palette.dark,
    flex: 1,
  },
  acctLabel: {
    fontSize: RF(14),
    fontFamily: family.SemiBold,
    color: palette.dark,
    textAlign: 'center',
  },
  optDesc: {
    fontSize: RF(10),
    fontFamily: family.Regular,
    color: '#98989A',
    flex: 1,
  },
  sectionText: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.blueBlack,
  },
});

export default styles;
