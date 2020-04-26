import React, {useRef, useState} from 'react';
import {
  ImageProps,
  Image,
  ImageSourcePropType,
  View,
  TouchableOpacity,
  ImageBackground,
  ImageBackgroundProps,
  ImageURISource,
} from 'react-native';
import styles from './styles';
import {IAddComponent} from '../../../stores/questStepStore';
import AddComponent, {AddComponentProps} from '../addComponent';
import Video from 'react-native-video';
import NavigationService from '../../../navigations/NavigationService';
import { SelectMediaItem } from '../../../scenes/selectMedia';

export interface AddComponentVideoProps extends IAddComponent {
  index?: number;
  editing?: boolean;
  video?: ImageURISource;
  drag?: () => void;
  onSelectedVideo?: (videoUrl: string) => void;
  onPressDeleteVideoButton?: () => void;
  onPressDeleteButton?: () => void;
}

const AddComponentVideo = (props: AddComponentVideoProps) => {
  const videoRef = useRef<Video | null>(null);
  const [videoPaused, setVideoPaused] = useState(true);

  const renderCloseButton = () => {
    const fillImageProps: ImageProps = {
      source: require('../../../assets/images/fill1.png'),
      resizeMode: 'contain',
      style: styles.fillImageStyle,
    };

    return (
      <TouchableOpacity
        hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
        onPress={props.onPressDeleteVideoButton}
        style={styles.fillTouchableContainerStyle}>
        <Image {...fillImageProps} />
      </TouchableOpacity>
    );
  };

  const onPressAddVideo = () => {
    if (props.onSelectedVideo) {
      NavigationService.present('SelectMediaScreen', {
        type: 'Videos',
        onSelectItem: (item: SelectMediaItem) => {
          if (item.image) {
            props.onSelectedVideo && props.onSelectedVideo(item.image.uri);
          }
        },
      });
    }
  };

  const renderGetAnotherImageButton = () => {
    const chooseFromGalleryImageProps: ImageProps = {
      source: require('../../../assets/images/videoButton.png'),
      resizeMode: 'contain',
      style: styles.chooseFromGalleryImageStyle,
    };

    return (
      <TouchableOpacity
        hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
        onPress={onPressAddVideo}
        style={styles.getAnotherImageTouchableContainerStyle}>
        <Image {...chooseFromGalleryImageProps} />
      </TouchableOpacity>
    );
  };

  const renderImage = (image: ImageSourcePropType) => {
    const backgroundImageProps: ImageBackgroundProps = {
      source: {...(image as object)},
      resizeMode: 'cover',
      blurRadius: 10,
      style: styles.imageStyle,
    };

    const appleId =
      props.video && props.video.uri && props.video.uri.substring(5, 41);
    const ext = 'mp4';
    const uri = `assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`;

    return (
      <View style={styles.imageBackgroundContainerStyle}>
        <ImageBackground {...backgroundImageProps}>
          <Video
            ref={videoRef}
            source={{uri: uri}}
            repeat={true}
            paused={videoPaused}
            resizeMode={'contain'}
            style={{height: '100%', width: '100%'}}
            onTouchStart={() => setVideoPaused(true)}
          />
          {videoPaused && renderVideoPauseButton()}
          {renderGetAnotherImageButton()}
          {renderCloseButton()}
        </ImageBackground>
      </View>
    );
  };

  const renderVideoPauseButton = () => {
    const startImageProps: ImageProps = {
      source: require('../../../assets/images/videoButtonCopy.png'),
      style: styles.startImageButtonStyle,
    };

    return (
      <TouchableOpacity
        style={styles.startContainerImageStyle}
        onPress={() => setVideoPaused(false)}>
        <Image {...startImageProps} />
      </TouchableOpacity>
    );
  };

  const renderAddImageView = () => {
    const imageProps: ImageProps = {
      source: require('../../../assets/images/videoButton.png'),
      resizeMode: 'contain',
      style: styles.cameraImageStyle,
    };

    return (
      <TouchableOpacity
        onPress={onPressAddVideo}
        style={[
          styles.addImageEmptyBlock,
        ]}>
        <Image {...imageProps} />
      </TouchableOpacity>
    );
  };

  const addComponentProps: AddComponentProps = {
    index: props.index || 0,
    editing: props.editing || false,
    drag: props.drag,
    children: props.video ? renderImage(props.video) : renderAddImageView(),
    onPressDeleteButton: props.onPressDeleteButton,
  };

  return <AddComponent {...addComponentProps} />;
};

export default AddComponentVideo;
