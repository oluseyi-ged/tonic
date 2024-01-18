import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: palette.white,
    borderTopRightRadius: HDP(16),
    borderTopLeftRadius: HDP(16),
    position: 'absolute',
    width,
    alignSelf: 'center',
    bottom: HDP(-30),
  },
  modalHeader: {
    fontSize: RF(20),
    fontFamily: family.Bold,
    color: palette.purple,
  },
  modalCTA: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn1: {
    color: palette.purple,
    fontSize: RF(14),
    fontFamily: family.Medium,
  },
  btn2: {
    color: palette.orange,
    fontSize: RF(14),
    fontFamily: family.Medium,
  },
});

export default styles;
