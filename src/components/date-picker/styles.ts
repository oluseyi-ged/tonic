import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    height: HDP(49),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: HDP(20),
    borderRadius: HDP(8),
    // padding: HDP(14),
    backgroundColor: '#F4F4F4',
    borderWidth: 1,
    borderColor: '#E9E9E9',
  },
  placeholderText: {
    fontSize: RF(10),
    color: '#A5A5A5',
    fontFamily: family.Regular,
  },
  label: {
    fontSize: RF(10),
    color: '#7A7978',
    fontFamily: family.Medium,
  },
  error: {
    fontSize: RF(10),
    color: '#800000',
    fontFamily: family.Regular,
    alignSelf: 'flex-start',
    marginTop: HDP(5),
  },
  bordered: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: palette.mutedGreen,
  },
  dateFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
    borderRadius: HDP(8),
    padding: HDP(14),
    height: HDP(48),
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E9E9E9',
  },
});

export default styles;
