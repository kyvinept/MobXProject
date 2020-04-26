import React from 'react';
import {
  ImageProps,
  Image,
  ImageSourcePropType,
  View,
  TouchableOpacity,
  ImageBackground,
  ImageBackgroundProps,
} from 'react-native';
import styles from './styles';
import {IAddComponent} from '../../../stores/questStepStore';
import AddComponent, {AddComponentProps} from '../addComponent';
import NavigationService from '../../../navigations/NavigationService';
import {SelectMediaItem} from '../../../scenes/selectMedia';
import {ImageModel} from '../../../services/CameraManager';

export interface AddComponentImageProps extends IAddComponent {
  index?: number;
  image?: ImageSourcePropType;
  drag?: () => void;
  preview?: boolean;
  editing?: boolean;
  onSelectedImage?: (image: ImageModel) => void;
  onPressDeleteImageButton?: () => void;
  onPressDeleteButton?: () => void;
  backgroundColor?: string;
  removeLeftOffset?: boolean;
}

const AddComponentImage = (props: AddComponentImageProps) => {
  const renderCloseButton = () => {
    const fillImageProps: ImageProps = {
      source: require('../../../assets/images/fill1.png'),
      resizeMode: 'contain',
      style: styles.fillImageStyle,
    };

    return (
      <TouchableOpacity
        hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
        onPress={props.onPressDeleteImageButton}
        style={styles.fillTouchableContainerStyle}>
        <Image {...fillImageProps} />
      </TouchableOpacity>
    );
  };

  const onPressAddImage = () => {
    if (props.onSelectedImage) {
      NavigationService.present('SelectMediaScreen', {
        type: 'Photos',
        onSelectItem: (item: SelectMediaItem) => {
          if (item.image) {
            props.onSelectedImage && props.onSelectedImage(item.image);
          }
        },
      });
    }
  };

  const renderGetAnotherImageButton = () => {
    const chooseFromGalleryImageProps: ImageProps = {
      source: require('../../../assets/images/choosePhotoGallery.png'),
      resizeMode: 'contain',
      style: styles.chooseFromGalleryImageStyle,
    };

    return (
      <TouchableOpacity
        hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
        onPress={onPressAddImage}
        style={styles.getAnotherImageTouchableContainerStyle}>
        <Image {...chooseFromGalleryImageProps} />
      </TouchableOpacity>
    );
  };

  const renderImage = (image: ImageSourcePropType) => {
    const imageProps: ImageProps = {
      source: {...(image as object)},
      resizeMode: 'contain',
      style: styles.imageStyle,
    };

    const imageBackgrounProps: ImageBackgroundProps = {
      source: {...(image as object)},
      resizeMode: 'cover',
      blurRadius: 50,
      style: styles.imageStyle,
    };

    return (
      <View style={styles.imagesContainerStyle}>
        <ImageBackground {...imageBackgrounProps}>
          <ImageBackground {...imageProps}>
            {renderCloseButton()}
            {renderGetAnotherImageButton()}
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  };

  const renderAddImageView = () => {
    const imageProps: ImageProps = {
      source: require('../../../assets/images/camera.png'),
      resizeMode: 'contain',
      style: styles.cameraImageStyle,
    };

    return (
      <TouchableOpacity
        disabled={props.preview}
        onPress={onPressAddImage}
        style={styles.addImageEmptyBlock}>
        <Image {...imageProps} />
      </TouchableOpacity>
    );
  };

  const addComponentProps: AddComponentProps = {
    removeLeftOffset: props.removeLeftOffset,
    index: props.index || 0,
    editing: props.editing || false,
    drag: props.drag,
    backgroundColor: props.backgroundColor,
    children: props.image ? renderImage(props.image) : renderAddImageView(),
    onPressDeleteButton: props.onPressDeleteButton,
  };

  return <AddComponent {...addComponentProps} />;
};

export default AddComponentImage;
