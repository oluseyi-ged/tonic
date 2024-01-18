import { HDP, RF } from '@helpers';
import { family, palette } from '@theme';
import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  containerCommonStyle: {
    backgroundColor: palette.white,
    paddingHorizontal: HDP(16),
    paddingTop: HDP(32),
    paddingBottom: HDP(16),
    width: width * 0.9,
    borderRadius: HDP(16),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,



  },
  cover: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)'


  },
  text: {
    color: palette.dark,
    fontSize: RF(20),
    fontFamily: family.Bold,
  },

  outlinedButton: {
    color: palette.green
  },

});

export default styles;
