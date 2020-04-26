import {StyleSheet} from 'react-native';
import {Colors} from '../../styles';
import {getDimensions} from '../../services/DimensionsManager';

export default StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  monthTextStyle: {
    fontSize: 20,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.48,
    color: Colors.dusk,
  },
  timePickerStyle: {
    flex: 1,
  },
  topMonthContainerStyle: {
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 30,
    flexDirection: 'row',
  },
  buttonsStyle: {
    justifyContent: 'space-between',
    width: 47,
    flexDirection: 'row',
  },
  flexStyle: {
    flex: 1,
  },
  arrowViewStyle: {
    width: 36,
    marginTop: 7,
    marginBottom: 40,
    height: 3.5,
    borderRadius: 100,
    backgroundColor: Colors.lightPeriwinkle30,
  },
  applyButtonContainerStyle: {
    position: 'absolute',
    bottom: 30,
    width: getDimensions().width - 40,
  },
});
