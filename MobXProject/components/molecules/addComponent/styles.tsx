import {StyleSheet} from 'react-native';
import { Colors } from '../../../styles';

export default StyleSheet.create({
  deleteButtonStyle: {
    width: 89,
    height: 54,
    backgroundColor: Colors.coral,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childrenViewStyle: {
    
  },
  titleTextStyle: {
    top: 8,
    fontSize: 15,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: -0.24,
    color: Colors.dusk
  },
  deleteButtonTextStyle: {
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: -0.21,
    color: Colors.white,
  },
  rowContentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentStyle: {
    marginVertical: 4,
  },
  touchableDndViewStyle: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 16,
  },
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  shapeViewStyle: {
    width: 16,
    height: 2,
    marginVertical: 1,
    backgroundColor: Colors.paleGrey,
  },
});
