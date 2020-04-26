import {StyleSheet} from 'react-native';
import {Colors} from '../../../styles';
import { getDimensions } from '../../../services/DimensionsManager';

export default StyleSheet.create({
  plusButtonImageStyle: {
    height: 17,
    width: 17,
  },
  containerPlusButtonStyle: {
    position: 'absolute',
    bottom: 91,
    left: getDimensions().width / 2 - 32,
    width: 64,
    borderRadius: 32,
    height: 64,
    backgroundColor: Colors.lightPeriwinkle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPlusButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: Colors.denimBlue,
    borderRadius: 25,
  },

  containerHiddenButtonStyle: {
    position: 'absolute',
    bottom: 105.5,
    left: getDimensions().width / 2 - 17.5,
    width: 35,
    borderRadius: 17.5,
    height: 35,
    backgroundColor: Colors.lightPeriwinkleTwo,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
