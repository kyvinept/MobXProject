import React from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import styles from './styles';
import {getDimensions} from '../../../services/DimensionsManager';
import {Colors} from '../../../styles';

export interface AddComponentProps {
  index: number;
  children: JSX.Element;
  title?: string;
  onChangeText?: (text: string, index: number) => void;
  drag?: () => void;
  removeLeftOffset?: boolean;
  disableDeleteButton?: boolean;
  onPressDeleteButton?: () => void;
  backgroundColor?: string;
  editing: boolean;
  scrollDisable?: boolean;
}

const AddComponent = (props: AddComponentProps) => {
  const renderDndButton = () => {
    return (
      <TouchableOpacity
        onLongPress={props.drag}
        style={styles.touchableDndViewStyle}>
        <View style={styles.shapeViewStyle} />
        <View style={styles.shapeViewStyle} />
      </TouchableOpacity>
    );
  };

  const renderDeleteButton = () => {
    return (
      <TouchableOpacity
        style={styles.deleteButtonStyle}
        onPress={props.onPressDeleteButton}>
        <Text style={styles.deleteButtonTextStyle}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const renderChildren = () => {
    return (
      <View
        style={[
          styles.childrenViewStyle,
          {width: getDimensions().width - (props.editing ? 80 : 40)},
        ]}>
        {props.children}
      </View>
    );
  };

  return (
    <ScrollView
      key={props.index}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={props.editing && !props.scrollDisable}>
      <View
        style={[
          styles.contentStyle,
          {
            backgroundColor: props.backgroundColor || Colors.white,
            marginLeft: props.removeLeftOffset ? 0 : 20,
          },
        ]}>
        <View style={styles.rowContentStyle}>
          <View>
            {props.title && (
              <Text style={styles.titleTextStyle}>{props.title}</Text>
            )}
            {renderChildren()}
          </View>
          {renderDndButton()}
          {!props.disableDeleteButton && renderDeleteButton()}
        </View>
      </View>
    </ScrollView>
  );
};

export default AddComponent;
