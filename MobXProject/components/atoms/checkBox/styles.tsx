import {StyleSheet} from 'react-native';
import { Colors } from '../../../styles';

export default StyleSheet.create({
  checkBox: {
    backgroundColor: 'white',
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkWrap: {
    alignSelf: 'flex-start',    
  },
  textCheckStyle: {
    fontWeight: 'normal',
    fontSize: 13,
    color: Colors.lightBlueGrey,
  },
  checkBoxImageStyle: {
    width: 20,
    height: 20,
  },
});