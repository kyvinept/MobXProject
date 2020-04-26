import React from 'react';
import ImagePicker, {ImagePickerResponse} from 'react-native-image-picker';
import NavigationService from '../navigations/NavigationService';
import {Alert} from 'react-native';
import {SelectionItem} from '../scenes/selection';

export interface ImageModel {
  width: number;
  height: number;
  uri: string;
}

enum ImageLoading {
  camera = 'camera',
  gallery = 'gallery',
}

class CameraManager {
  loadImage = (
    response: ImagePickerResponse,
    modifyImage: boolean,
    callback: (imageModel: ImageModel) => void,
  ) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      if (modifyImage) {
        NavigationService.present('CameraScreen', {
          imageModel: {
            height: response.height,
            width: response.width,
            uri: response.uri,
          },
          callback,
        });
      } else {
        callback({
          height: response.height,
          width: response.width,
          uri: response.uri,
        });
      }
    }
  };

  loadImageFromGallery = (
    modifyImage: boolean,
    callback: (imageModel: ImageModel) => void,
  ) => {
    ImagePicker.launchImageLibrary({}, response => {
      this.loadImage(response, modifyImage, callback);
    });
  };

  loadImageFromCamera = (
    modifyImage: boolean,
    callback: (imageModel: ImageModel) => void,
  ) => {
    ImagePicker.launchCamera({}, response => {
      this.loadImage(response, modifyImage, callback);
    });
  };

  getImageUrlFromLibrary = (
    modifyImage: boolean,
    callback: (imageModel: ImageModel) => void,
  ) => {
    const onSelectItem = (item: SelectionItem) => {
      switch (item.name) {
        case ImageLoading.camera:
          this.loadImageFromCamera(modifyImage, callback);
          break;

        case ImageLoading.gallery:
          this.loadImageFromGallery(modifyImage, callback);
          break;
      }
    };

    NavigationService.present('SelectionScreen', {
      data: Object.values(ImageLoading).map(item => ({name: item})),
      onSelectItem: onSelectItem,
    });
  };
}

export default new CameraManager();
