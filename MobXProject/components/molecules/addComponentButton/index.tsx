import React, {useState} from 'react';
import {
  View,
  ImageProps,
  Animated,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageSourcePropType,
} from 'react-native';
import styles from './styles';
import {getDimensions} from '../../../services/DimensionsManager';

const ANIMATION_DURATION = 200;

export interface AddComponentButtonProps {
  onPressImage: () => void;
  onPressText: () => void;
  onPressVideo: () => void;
  hideImage: boolean;
  hideText: boolean;
  hideVideo: boolean;
}

const AddComponentButton = (props: AddComponentButtonProps) => {
  const [isPlusButtonTapped, setIsPlusButtonTapped] = useState(false);

  const [additionalButtonBottomOffset] = useState(new Animated.Value(105));

  const [additionalVideoButtonBottomOffset] = useState(new Animated.Value(105));

  const [textComponentLeftOffset] = useState(
    new Animated.Value(getDimensions().width / 2 - 17.5),
  );

  const [imageComponentLeftOffset] = useState(
    new Animated.Value(getDimensions().width / 2 - 17.5),
  );

  const videoComponentLeftOffset = new Animated.Value(
    getDimensions().width / 2 - 17.5,
  );

  const renderHiddenButton = (
    bottomOffset: Animated.Value,
    leftOffset: Animated.Value,
    imageSource: ImageSourcePropType,
    onPress: () => void,
  ) => {
    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
      TouchableOpacity,
    );

    const imageProps: ImageProps = {
      source: imageSource,
    };

    return (
      <AnimatedTouchableOpacity
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        onPress={onPress}
        style={[
          styles.containerHiddenButtonStyle,
          {bottom: bottomOffset, left: leftOffset},
        ]}>
        <Image {...imageProps} />
      </AnimatedTouchableOpacity>
    );
  };

  const plusButtonTapped = () => {
    if (!isPlusButtonTapped) {
      Animated.parallel([
        Animated.timing(additionalButtonBottomOffset, {
          toValue: 140,
          duration: ANIMATION_DURATION,
        }),
        Animated.timing(additionalVideoButtonBottomOffset, {
          toValue: 170,
          duration: ANIMATION_DURATION,
        }),
        Animated.timing(textComponentLeftOffset, {
          toValue: getDimensions().width / 2 - 70,
          duration: ANIMATION_DURATION,
        }),
        Animated.timing(imageComponentLeftOffset, {
          toValue: getDimensions().width / 2 + 35,
          duration: ANIMATION_DURATION,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(additionalButtonBottomOffset, {
          toValue: 105,
          duration: ANIMATION_DURATION,
        }),
        Animated.timing(additionalVideoButtonBottomOffset, {
          toValue: 105,
          duration: ANIMATION_DURATION,
        }),
        Animated.timing(textComponentLeftOffset, {
          toValue: getDimensions().width / 2 - 17.5,
          duration: ANIMATION_DURATION,
        }),
        Animated.timing(imageComponentLeftOffset, {
          toValue: getDimensions().width / 2 - 17.5,
          duration: ANIMATION_DURATION,
        }),
      ]).start();
    }

    setIsPlusButtonTapped(!isPlusButtonTapped);
  };

  const renderHiddenButtons = () => {
    return (
      <View>
        {!props.hideText && renderHiddenButton(
          additionalButtonBottomOffset,
          textComponentLeftOffset,
          require('../../../assets/images/addTextButton.png'),
          props.onPressText,
        )}
        {!props.hideImage && renderHiddenButton(
          additionalButtonBottomOffset,
          imageComponentLeftOffset,
          require('../../../assets/images/addImageButton.png'),
          props.onPressImage,
        )}
        {!props.hideVideo && renderHiddenButton(
          additionalVideoButtonBottomOffset,
          videoComponentLeftOffset,
          require('../../../assets/images/addVideoButton.png'),
          props.onPressVideo,
        )}
      </View>
    );
  };

  const imageProps: ImageProps = {
    source: require('../../../assets/images/createButtonPlus.png'),
    resizeMode: 'contain',
    style: styles.plusButtonImageStyle,
  };

  return (
    <SafeAreaView>
      {renderHiddenButtons()}
      <TouchableOpacity
        style={styles.containerPlusButtonStyle}
        onPress={plusButtonTapped}>
        <View style={styles.viewPlusButtonStyle}>
          <Image {...imageProps} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddComponentButton;
