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
import MapView, {Marker, MapEvent, Circle} from 'react-native-maps';
import NavigationService from '../../navigations/NavigationService';
import {LocationModel, LatLong} from '../../services/LocationManager';
import {NavigationStackProp} from 'react-navigation-stack';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {getDimensions} from '../../services/DimensionsManager';
import strings from '../../translations';
import {Colors} from '../../styles';
import Button from '../../components/atoms/button';
import {showErrorAlert} from '../../helpers/AlertHelper';
import {useLocationStore} from '../../stores/provider/useStore';
import {useObserver} from 'mobx-react';
import BackgroundLocationForm, {
  BackgroundLocationFormProps,
} from '../../components/organisms/backgroundLocationForm';

export interface SelectLocationScreen {
  navigation: NavigationStackProp;
}

const SelectLocationScreen = (props: SelectLocationScreen) => {
  const locationStore = useLocationStore();

  const location: LatLong | undefined =
    props.navigation.state.params && props.navigation.state.params.location;
  const onSelectLocation =
    props.navigation.state.params &&
    props.navigation.state.params.onSelectLocation;
  const centerPoint: LatLong | undefined =
    props.navigation.state.params && props.navigation.state.params.centerPoint;
  const preview: boolean | undefined =
    props.navigation.state.params && props.navigation.state.params.preview;

  useEffect(() => {
    if (location) {
      locationStore.setLocation(location);
      setSelectedLocation(location);
    } else {
      locationStore.getCurrentLocation();
    }
  }, []);

  const [selectedLocation, setSelectedLocation] = useState<LatLong | undefined>(
    location,
  );

  const renderBottomView = () => {
    return (
      selectedLocation && (
        <View style={styles.bottomContainerViewStyle}>
          <View style={styles.arrowStyle} />
          <Text style={styles.coordinatesTextStyle}>{strings.coordinates}</Text>
          <Text
            style={[styles.coordinatesStyle, {marginBottom: preview ? 30 : 0}]}>
            {selectedLocation.latitude} {selectedLocation.longitude}
          </Text>
          <View style={styles.separatorViewStyle} />
          {!preview && (
            <Button
              viewContainerStyles={styles.applyButtonStyle}
              title={strings.apply}
              onPress={() => {
                onSelectLocation(selectedLocation);
                NavigationService.dismiss();
              }}
            />
          )}
          {!preview && (
            <TouchableOpacity
              onPress={() => setSelectedLocation(undefined)}
              style={styles.resetValuesStyle}>
              <Text style={styles.resetValuesTextStyle}>
                {strings.resetValues}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )
    );
  };

  const renderEmptyBottomView = () => {
    return (
      <View style={styles.bottomContainerViewStyle}>
        <View style={styles.arrowStyle} />
        <Text style={styles.bottomTextStyle}>
          Tap somewhere on the map to create your starting position!
        </Text>
      </View>
    );
  };

  const onPressMap = (event: MapEvent<{}>) => {
    if (centerPoint) {
      const distance =
        Math.sqrt(
          Math.pow(
            centerPoint.latitude - event.nativeEvent.coordinate.latitude,
            2,
          ) +
            Math.pow(
              centerPoint.longitude - event.nativeEvent.coordinate.longitude,
              2,
            ),
        ) * 100;

      if (distance > 10) {
        showErrorAlert(strings.steppointError, () => {});

        return;
      }
    }

    if (preview) {
      return;
    }

    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const renderMarker = () => {
    return (
      selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}>
          <Image
            style={styles.markerBackgroundImageStyle}
            source={require('../../assets/images/locationBigWhite.png')}
          />
          <Image
            source={require('../../assets/images/photoIcon.png')}
            style={styles.markerBackgroundImageInputStyle}
          />
          <View style={styles.markerViewStyle} />
        </Marker>
      )
    );
  };

  const renderCircle = () => {
    return (
      selectedLocation && (
        <Circle
          center={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
          fillColor={Colors.whiteWithOpacity(0.4)}
          strokeColor={Colors.white}
          radius={7}
        />
      )
    );
  };

  const renderContent = () => {
    const backgroundLocationFormProps: BackgroundLocationFormProps = {
      onPressBackButton: NavigationService.dismiss,
      onSearchEndEditing: locationStore.getLocation,
      onPressMap: onPressMap,
      renderCircle: renderCircle,
      renderMarker: renderMarker,
    };

    return (
      <BackgroundLocationForm {...backgroundLocationFormProps}>
        <View>
          {!selectedLocation && renderEmptyBottomView()}
          {selectedLocation && renderBottomView()}
        </View>
      </BackgroundLocationForm>
    );
  };

  return useObserver(() => renderContent());
};

export default SelectLocationScreen;
