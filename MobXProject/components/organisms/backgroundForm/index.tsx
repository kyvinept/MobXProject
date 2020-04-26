import React from 'react';
import {View, SafeAreaView} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../styles';

export interface BackgroundFormProps {
  children: JSX.Element[] | JSX.Element | undefined;
  needToHideBackground?: boolean;
}

const BackgroundForm = (props: BackgroundFormProps) => {
  const renderBackgroundGradientViews = () => {
    return (
      <View>
        <SafeAreaView>
          {!props.needToHideBackground && (
            <LinearGradient
              style={styles.topViewContainerStyle}
              colors={[Colors.peachTwo, Colors.orangePinkWithOpacity(1)]}
            />
          )}
        </SafeAreaView>
        {!props.needToHideBackground && (
          <LinearGradient
            colors={[Colors.salmonTwo, Colors.wheat]}
            style={styles.leftAbsoluteViewStyle}
          />
        )}
        {!props.needToHideBackground && (
          <LinearGradient
            colors={[Colors.salmonTwo, Colors.wheat]}
            style={styles.rightAbsoluteViewStyle}
          />
        )}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.viewContainerStyle,
        {
          backgroundColor: props.needToHideBackground
            ? Colors.transparent
            : Colors.peachTwo,
        },
      ]}>
      {!props.needToHideBackground && (
        <View style={styles.backgroundOrangePinkViewStyle} />
      )}
      {renderBackgroundGradientViews()}
      {props.children}
    </View>
  );
};

export default BackgroundForm;
