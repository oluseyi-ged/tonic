import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: palette.white,
    position: 'relative',
    padding: HDP(24),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  maintext: {
    fontSize: RF(18),
    color: '#092C4C',
    fontFamily: family.Bold,
  },
  yellowBox: {
    backgroundColor: '#FFD337',
    borderRadius: HDP(32),
    paddingHorizontal: HDP(24),
    paddingBottom: HDP(32),
    paddingTop: HDP(53),
  },
  boxMain: {
    fontSize: RF(18),
    color: '#092C4C',
    fontFamily: family.Bold,
  },
  descText: {
    fontSize: RF(14),
    color: '#96823D',
    fontFamily: family.Regular,
  },
  inputStyle: {
    backgroundColor: 'transparent',
    borderRadius: HDP(28),
    borderColor: '#031420',
    paddingHorizontal: HDP(34),
  },
  inputText: {
    fontSize: RF(12),
    fontFamily: family.Regular,
  },
  trackCta: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    borderRadius: HDP(52),
    paddingVertical: HDP(18),
    paddingHorizontal: HDP(34),
    justifyContent: 'space-between',
  },
  trackText: {
    fontSize: RF(12),
    color: '#FFFFFF',
    fontFamily: family.Regular,
  },
  itemGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: HDP(24),
  },
  itemSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: HDP(16),
  },
  iconRound: {
    backgroundColor: '#F1F6FB',
    borderRadius: HDP(1000),
    height: HDP(56),
    width: HDP(56),
    alignItems: 'center',
    justifyContent: 'center',
  },
  idText: {
    fontSize: RF(14),
    color: '#1E3354',
    fontFamily: family.Medium,
  },
  idStat: {
    fontSize: RF(14),
    color: '#7A809D',
    fontFamily: family.Regular,
  },
});

export default styles;
