import {StyleSheet} from 'react-native';
import {Colors, Typography} from '../../../styles';

export default StyleSheet.create({
  touchableImageContainerStyle: {
    overflow: 'hidden',
    flex: 1,
  },
  imagesContainerStyle: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  imageStyle: {
    height: 187,
    width: '100%',
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
  addImageEmptyBlock: {
    width: '100%',
    height: 187,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundImageColor,
  },
  cameraImageStyle: {
    width: 47,
    height: 42,
    opacity: 0.7,
  },
});
