import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: HDP(8),
    height: HDP(78),
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E9E9E9',
    marginBottom: HDP(10),
  },
  label: {
    fontSize: RF(10),
    color: '#7A7978',
    fontFamily: family.Medium,
    alignSelf: 'flex-start',
  },
  bordered: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: palette.mutedGreen,
  },
  error: {
    fontSize: RF(10),
    color: '#800000',
    fontFamily: family.Regular,
    alignSelf: 'flex-start',
    marginTop: HDP(5),
  },
  selectView: {
    borderRadius: HDP(8),
    paddingVertical: HDP(16),
    backgroundColor: '#F4F4F4',
    paddingHorizontal: HDP(24),
    borderWidth: 0,
    borderColor: '#E9E9E9',
  },
  selectText: {
    fontSize: RF(10),
    color: '#00000080',
    fontFamily: family.Regular,
  },
  selectedText: {
    fontSize: RF(10),
    color: '#000000',
    fontFamily: family.Regular,
  },
  selectDropdown: {
    backgroundColor: palette.offWhite,
    borderWidth: 0,
    marginBottom: HDP(10),
  },
});

export default styles;
