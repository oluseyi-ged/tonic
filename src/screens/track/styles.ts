import {HDP, RF} from '@helpers';
import {family} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'relative',
  },
  pageWrap: {
    flex: 1,
    paddingHorizontal: HDP(24),
    justifyContent: 'space-between',
    height,
  },
  map: {
    height,
    width,
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
    padding: HDP(24),
    overflow: 'hidden',
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
    // marginBottom: HDP(24),
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: HDP(24),
    // alignItems: 'center',
  },
  modalStyle: {
    backgroundColor: '#fff',
    shadowColor: '#00000080',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: HDP(50),
  },
  handleStyle: {
    backgroundColor: '#DBE2E9',
    width: HDP(48),
    marginVertical: HDP(16),
  },
  modalHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    width: '100%',
    height: HDP(2),
    backgroundColor: '#EDC127',
    marginVertical: HDP(16),
  },
  timeText: {
    fontSize: RF(12),
    color: '#7A809D',
    fontFamily: family.Regular,
  },
  upright: {
    height: HDP(32),
    width: HDP(2),
    backgroundColor: '#DFE6ED',
    marginLeft: HDP(24),
  },
  estText: {
    fontSize: RF(24),
    color: '#2E3E5C',
    fontFamily: family.Bold,
  },
  mapHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: HDP(49),
  },
  mapHeader: {
    fontSize: RF(18),
    color: '#092C4C',
    fontFamily: family.Medium,
  },
  refText: {
    fontSize: RF(14),
    color: '#051F32',
    fontFamily: family.Medium,
  },
  bordered: {
    borderWidth: 1,
    borderRadius: HDP(28),
    borderColor: '#051F32',
    paddingVertical: HDP(16),
    alignItems: 'center',
  },
  refBox: {
    backgroundColor: '#FFD337',
    borderRadius: HDP(46),
    padding: HDP(16),
  },
});

export default styles;
