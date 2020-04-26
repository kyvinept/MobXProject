import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  ImageProps,
  Text,
  TouchableOpacity,
  Animated,
  TextInput,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native';
import styles from './styles';
import MapView, {MapEvent, Marker} from 'react-native-maps';
import {LocationModel} from '../../../services/LocationManager';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {getDimensions} from '../../../services/DimensionsManager';
import strings from '../../../translations';
import {Colors} from '../../../styles';
import {useLocationStore} from '../../../stores/provider/useStore';
import {useObserver} from 'mobx-react';

export interface BackgroundLocationFormProps {
  customCurrentLocation?: LocationModel;
  showCurrentLocation?: boolean;
  children?: JSX.Element[] | JSX.Element | Element;
  renderCircle?: () => Element | undefined;
  renderMarker?: () => Element | undefined;
  onPressMap?: (event: MapEvent<{}>) => void;
  onPressBackButton?: () => void;
  onSearchEndEditing?: (text: string) => void;
  onSearchChangeText?: (text: string) => void;
}

const BackgroundLocationForm = (props: BackgroundLocationFormProps) => {
  const locationStore = useLocationStore();

  const [shownSearch, setShownSearch] = useState(false);
  const [searchLocationWidth] = useState(new Animated.Value(36));
  const [searchLocationTextFieldWidth] = useState(new Animated.Value(0));

  useEffect(() => {
    props.customCurrentLocation &&
      locationStore.setLocationModel(props.customCurrentLocation);
  });

  const onMapReady = () => {
    if (!props.customCurrentLocation) {
      locationStore.getCurrentLocation();
    }
  };

  const renderBackButton = () => {
    const backButtonImageProps: ImageProps = {
      source: require('../../../assets/images/circleMapBack.png'),
      style: styles.backImageStyle,
    };

    return (
      <TouchableOpacity
        onPress={props.onPressBackButton}
        style={styles.backImageContainerStyle}>
        <Image {...backButtonImageProps} />
      </TouchableOpacity>
    );
  };

  const manipulateLocationSearch = (shown: boolean) => {
    !shown && setShownSearch(true);

    Animated.parallel([
      Animated.timing(searchLocationWidth, {
        toValue: shown ? 36 : getDimensions().width - 86,
      }),
      Animated.timing(searchLocationTextFieldWidth, {
        toValue: shown ? 0 : getDimensions().width - 146,
      }),
    ]).start(() => {
      shown && setShownSearch(false);
    });
  };

  const renderSearchButton = () => {
    const imageProps: ImageProps = {
      source: require('../../../assets/images/searchTapBarActive.png'),
      style: styles.rightImagesStyle,
      resizeMode: 'contain',
    };

    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
      TouchableOpacity,
    );

    return (
      <AnimatedTouchableOpacity
        onPress={() => manipulateLocationSearch(shownSearch)}
        style={[
          styles.circleViewStyle,
          styles.searchViewStyle,
          {width: searchLocationWidth},
        ]}>
        <Image {...imageProps} />
        {shownSearch && renderTextInput()}
      </AnimatedTouchableOpacity>
    );
  };

  const renderTextInput = () => {
    const onEndEditing = (
      e: NativeSyntheticEvent<TextInputEndEditingEventData>,
    ) => {
      manipulateLocationSearch(true);
      props.onSearchEndEditing && props.onSearchEndEditing(e.nativeEvent.text);
    };

    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

    return (
      <AnimatedTextInput
        placeholder={strings.search}
        style={[
          styles.searchTextInputStyle,
          {width: searchLocationTextFieldWidth},
        ]}
        placeholderTextColor={Colors.lightBlueGreyThree}
        onEndEditing={onEndEditing}
        onChangeText={props.onSearchChangeText}
      />
    );
  };

  const renderCurrentLocationButton = () => {
    const imageProps: ImageProps = {
      source: require('../../../assets/images/yourLocationIcon.png'),
      style: styles.rightImagesStyle,
      resizeMode: 'contain',
    };

    const buttonAction = () => {
      locationStore.getCurrentLocation();
    };

    return (
      <TouchableOpacity
        onPress={buttonAction}
        style={[styles.circleViewStyle, styles.currentLocationButton]}>
        <Image {...imageProps} />
      </TouchableOpacity>
    );
  };

  const renderCurrentLocationMarker = () => {
    return (
      locationStore.currentLocation && (
        <Marker coordinate={{...locationStore.currentLocation}}>
          <View style={styles.currentMarkerContainerStyle}>
            <View style={styles.currentMarkerViewStyle}>
              <Image
                source={require('../../../assets/images/yourLocationIconWhite.png')}
              />
            </View>
          </View>
        </Marker>
      )
    );
  };

  const renderMapView = () => {
    const onRegionChange = (region: LocationModel) => {
      locationStore.setLocationModel(region);
    };

    return (
      <MapView
        onMapReady={onMapReady}
        region={{...locationStore.location}}
        onRegionChangeComplete={onRegionChange}
        onPress={props.onPressMap}
        style={styles.mapContainerStyle}>
        {props.renderCircle && props.renderCircle()}
        {props.renderMarker && props.renderMarker()}
        {props.showCurrentLocation && renderCurrentLocationMarker()}
      </MapView>
    );
  };

  const renderButtons = () => {
    return (
      <View style={styles.containerStyle} pointerEvents={'box-none'}>
        {renderBackButton()}
        {renderSearchButton()}
        {renderCurrentLocationButton()}
      </View>
    );
  };

  const renderBottomSpacer = () => {
    return (
      <View
        style={{
          height: getBottomSpace(),
          width: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
        }}
      />
    );
  };

  return useObserver(() => (
    <SafeAreaView style={styles.containerStyle} pointerEvents={'box-none'}>
      {renderMapView()}
      {renderButtons()}
      {props.children}
      {renderBottomSpacer()}
    </SafeAreaView>
  ));
};

export default BackgroundLocationForm;
