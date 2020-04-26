import React from 'react';
import TextInput, {TextInputProps} from '../../molecules/textInput';
import {IAddComponent} from '../../../stores/questStepStore';
import AddComponent, {AddComponentProps} from '../addComponent';
import { Colors } from '../../../styles';

export interface AddComponentTextProps extends IAddComponent {
  title?: string;
  placeholder?: string;
  maxNumber?: number;
  index?: number;
  errorText?: string;
  multiline?: boolean;
  isBigField?: boolean;
  text?: string;
  removeLeftOffset?: boolean;
  onChangeText?: (text: string) => void;
  onPressDeleteButton?: () => void;
  drag?: () => void;
  editing?: boolean;
}

const AddComponentText = (props: AddComponentTextProps) => {
  const renderTextInput = () => {
    const textInputProps: TextInputProps = {
      value: props.text,
      maxLength: props.maxNumber,
      errorText: props.errorText,
      placeholder: props.placeholder,
      isBigField: props.isBigField,
      placeholderTextColor: Colors.lightBlueGrey,
      multiline: props.multiline,
      onChangeText: text => {
        props.onChangeText && props.onChangeText(text);
      },
    };

    return <TextInput {...textInputProps} />;
  };

  const addComponentProps: AddComponentProps = {
    index: props.index || 0,
    title: props.title,
    drag: props.drag,
    removeLeftOffset: props.removeLeftOffset,
    editing: props.editing || false,
    children: renderTextInput(),
    onPressDeleteButton: props.onPressDeleteButton,
  };

  return <AddComponent {...addComponentProps} />;
};

export default AddComponentText;