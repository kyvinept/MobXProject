import React from 'react';
import {Image, ImageProps, TouchableOpacity, Text} from 'react-native';
import {CheckBox} from 'react-native-elements';
import styles from './styles';
import {Stack, Queue} from 'react-native-spacing-system';
import {useState} from 'react';

export interface CheckBoxProps {
  title: string;
  onPress: () => void;
  checked: boolean;
}

const CustomCheckBox = (props: CheckBoxProps) => {
  const checkBoxActiveImageProps: ImageProps = {
    source: require('../../../assets/images/checkboxActive.png'),
    style: styles.checkBoxImageStyle,
    resizeMode: 'contain',
  };

  const checkBoxPassiveImageProps: ImageProps = {
    source: require('../../../assets/images/checkboxPassive.png'),
    style: styles.checkBoxImageStyle,
    resizeMode: 'contain',
  };

  return (
    <TouchableOpacity style={styles.checkBox} onPress={props.onPress}>
      <Image
        {...(props.checked
          ? checkBoxActiveImageProps
          : checkBoxPassiveImageProps)}
      />
      <Queue size={5} />
      <Text style={styles.textCheckStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomCheckBox;
