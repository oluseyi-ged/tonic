import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: HDP(0),
    flexDirection: 'row',
    paddingVertical: HDP(20),
    alignItems: 'center',
  },
  headerText: {
    fontSize: RF(18),
    fontFamily: family.Bold,
    color: palette.purpleFade,
    fontWeight: '700',
  },
  locView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locText: {
    fontSize: RF(12),
    fontFamily: family.Bold,
    color: palette.purple,
    marginLeft: HDP(5),
  },
});

export default styles;
