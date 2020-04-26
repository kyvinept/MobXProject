import React from 'react';
import {TouchableOpacity, Text, GestureResponderEvent} from 'react-native';
import styles from './styles';

export interface LinkButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  textStyles?: Object;
  containerViewStyle?: Object;
  aligment?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

const LinkButton = (props: LinkButtonProps) => {
  return (
    <TouchableOpacity
      hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
      style={props.containerViewStyle}
      onPress={props.onPress}>
      <Text
        style={[
          props.textStyles || styles.textStyle,
          {textAlign: props.aligment || 'left'},
        ]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default LinkButton;
