import {StyleSheet} from 'react-native';
import {Colors} from '../../styles';
import {getDimensions} from '../../services/DimensionsManager';

export default StyleSheet.create({
  questInfoStyle: {
    marginTop: 30,
  },
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  flexStyle: {
    flex: 1,
  },
  backgroundOrangePinkViewStyle: {
    width: getDimensions().width,
    height: getDimensions().height - 150,
    backgroundColor: Colors.orangePinkWithOpacity(1),
    position: 'absolute',
    bottom: 0,
  },
  viewContainerStyle: {
    flex: 1,
    backgroundColor: Colors.peachTwo,
  },
  closeButtonStyle: {
    width: 10,
    height: 10,
    position: 'absolute',
    left: getDimensions().width - 27,
    top: 17,
  },
  closeButtonImageStyle: {
    width: 10,
    height: 10,
  },
  topCloseContainerStyle: {
    alignItems: 'center',
  },
  topCloseViewStyle: {
    borderRadius: 100,
    height: 3.5,
    width: 36,
    backgroundColor: Colors.lightPeriwinkle30,
  },
  flexDirectionRowStyle: {
    flexDirection: 'row',
  },
  ratingStarImageStyle: {
    width: 17,
    height: 17,
  },
  ratingBottomContainerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  ratingTextStyle: {
    fontSize: 13,
    marginRight: 4,
    marginTop: 1,
  },
  rightPartViewStyle: {
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    flex: 1,
  },
  mapFilterButtonImageStyle: {
    width: 21,
    height: 21,
  },
  mapButtonStyle: {
    position: 'absolute',
    left: getDimensions().width - 90,
    top: -22,
    width: 44,
    height: 44,
    backgroundColor: Colors.denimBlue,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentViewStyle: {
    paddingTop: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 138,
    width: getDimensions().width,
  },
  alreadyPlayedTextStyle: {
    fontSize: 12,
    color: Colors.cloudyBlue,
    marginTop: 8,
  },
  questInfoMainPartImageContainerStyle: {
    backgroundColor: Colors.denimBlue,
    marginRight: 20,
    width: 63,
    height: 63,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
  },
  questNameTextStyle: {
    fontSize: 17,
  },
  authorNameTextStyle: {
    fontSize: 14,
    color: Colors.peach,
  },
  questInfoMainPartContainerStyle: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  questInfoMainPartImageStyle: {
    height: 29,
    width: 29,
  },

  shareTextStyle: {
    fontSize: 17,
    color: Colors.white,
  },
  shareButtonStyle: {
    position: 'absolute',
    width: 46,
    right: 20,
    top: 12,
  },

  paramsNameTextStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.dark,
  },
  paramsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paramsVerticalContainerStyle: {
   
  },
  mapButtonImageStyle: {
    width: 26,
    height: 26,
  },
  paramsTextStyle: {
    flex: 1,
    color: Colors.lightBlueGrey,
    fontSize: 15,
    marginHorizontal: 15,
  },
  paramsTextVerticalStyle: {
    color: Colors.lightBlueGrey,
    fontSize: 15,
    marginTop: 15,
  },
  separatorStyle: {
    height: 1,
    backgroundColor: Colors.lightBlueGreyTwo,
    width: getDimensions().width - 40,
    marginVertical: 16,
  },
  showAllTextStyle: {
    color: Colors.peach,
    fontSize: 13,
  },

  favoriteContainerViewStyle: {
    flexDirection: 'row',
    marginTop: 5,
  },
  favoriteImageStyle: {
    width: 11,
    height: 10,
    marginTop: 3,
    marginRight: 6,
  },
  favoriteTextStyle: {
    fontSize: 13,
    color: Colors.salmon,
  },

  applyButtonAdditionalStyle: {
    width: '100%',
    marginBottom: 14,
  },
  bottomButtonsContainerStyle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 160,
  },
});
