import {StyleSheet} from 'react-native';
import {Colors} from '../../../styles';
import {getDimensions} from '../../../services/DimensionsManager';

export default StyleSheet.create({
  backgroundOrangePinkViewStyle: {
    width: getDimensions().width,
    height: getDimensions().height - 150,
    backgroundColor: Colors.orangePinkWithOpacity(1),
    position: 'absolute',
    bottom: 0,
  },
  viewContainerStyle: {
    flex: 1,
    backgroundColor: Colors.peachTwo,
  },
  topViewContainerStyle: {
    position: 'absolute',
    width: getDimensions().width,
    height: 196,
    alignItems: 'center',
  },
  leftAbsoluteViewStyle: {
    width: 125,
    height: 125,
    borderRadius: 30,
    backgroundColor: 'red',
    position: 'absolute',
    left: -40,
    top: 0,
    transform: [
      {
        rotate: '32deg',
      },
    ],
  },
  rightAbsoluteViewStyle: {
    width: 300,
    height: 300,
    borderRadius: 40,
    backgroundColor: 'red',
    position: 'absolute',
    right: -100,
    top: -15,
    transform: [
      {
        rotate: '122deg',
      },
    ],
  },
});
