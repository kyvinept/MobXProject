import React from 'react';
import {
  View,
  TouchableOpacity,
  ImageProps,
  Image,
  Text,
} from 'react-native';
import styles from './styles';
import strings from '../../../translations';
import AddComponent, {AddComponentProps} from '../addComponent';
import { IAddComponent } from '../../../stores/questStepStore';
import { Colors } from '../../../styles';
import {LatLong} from '../../../services/LocationManager';
import TextInput, {TextInputProps} from '../../molecules/textInput';

export interface AddComponentAnswerProps extends IAddComponent {
  index: number;
  title: string;
  text?: string;
  componentType: 'answer' | 'hint';
  drag?: () => void;
  editing?: boolean;
  placeholder?: string;
  errorText?: string;
  componentLocation?: LatLong;
  maxNumber?: number;
  onChangeText?: (text: string) => void;
  onPressMapButton?: () => void;
}

const AddComponentAnswer = (props: AddComponentAnswerProps) => {
  const renderTextInput = () => {
    const textInputProps: TextInputProps = {
      value: props.text,
      multiline: false,
      errorText: props.errorText,
      placeholder: props.placeholder,
      placeholderTextColor: Colors.lightBlueGrey,
      maxLength: props.maxNumber,
      onChangeText: text => {
        props.onChangeText && props.onChangeText(text);
      },
      viewContainerStyles: styles.textInputStyle,
    };

    return <TextInput {...textInputProps} />;
  };

  const renderMapButton = () => {
    const imageProps: ImageProps = {
      source: require('../../../assets/images/mapButton.png'),
      resizeMode: 'contain',
      style: styles.mapButtonStyle
    };

    return (
      <TouchableOpacity style={props.errorText ? styles.tapOpacityErrorStyle : styles.tapOpacityStyle}
       onPress={props.onPressMapButton}>
        <Image {...imageProps} />
      </TouchableOpacity>
    );
  };

  const renderChildren = () => {
    return (
      <View style={styles.childrenContainerStyle}>
        {renderTextInput()}
        {renderMapButton()}
      </View>
    );
  };

  const addComponentProps: AddComponentProps = {
    index: props.index,
    title: props.title,
    scrollDisable: true,
    drag: props.drag,
    editing: props.editing || false,
    children: renderChildren(),
    disableDeleteButton: true,
  };

  return <AddComponent {...addComponentProps} />;
};

export default AddComponentAnswer;
