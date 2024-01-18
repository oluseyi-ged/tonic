import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: HDP(8),
    flexDirection: 'row',
    height: HDP(49),
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderWidth: 1,
    borderColor: '#E9E9E9',
  },
  label: {
    fontSize: RF(10),
    color: '#7A7978',
    fontFamily: family.Medium,
    alignSelf: 'flex-start',
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
  bvnLength: {
    position: 'absolute',
    bottom: HDP(-5),
    right: 0,
    fontSize: RF(8),
    color: palette.grey,
  },
});

export default styles;
