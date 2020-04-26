import {StyleSheet} from 'react-native';
import {Colors, Typography} from '../../../styles';

export default StyleSheet.create({
  touchableImageContainerStyle: {
    overflow: 'hidden',
    flex: 1,
  },
  imageStyle: {
    height: 187,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackgroundContainerStyle: {
    overflow: 'hidden',
    borderRadius: 15,
  },
  startImageButtonStyle: {
    width: 74,
    height: 74,
  },
  startContainerImageStyle: {
    position: 'absolute',
  },
  addImageEmptyBlock: {
    width: '100%',
    height: 187,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightPeriwinkle30,
  },
  cameraImageStyle: {
    width: 86,
    height: 86,
    opacity: 0.7,
  },
  chooseFromGalleryImageStyle: {
    width: 25,
    height: 23,
  },
  getAnotherImageTouchableContainerStyle: {
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  fillTouchableContainerStyle: {
    position: 'absolute',
    top: 8,
    width: 16,
    height: 16,
    right: 8,
  },
  fillImageStyle: {
    width: 16,
    height: 16,
  },
});
