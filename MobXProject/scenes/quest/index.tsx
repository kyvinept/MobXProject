import React, {Component, useState, useEffect} from 'react';
import {View, Animated} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import styles from './styles';
import QuestTopForm, {
  QuestTopFormProps,
} from '../../components/organisms/questTopForm';
import NavigationService from '../../navigations/NavigationService';
import QuestCreation, {
  QuestCreationProps,
} from '../../components/organisms/questCreation';
import strings from '../../translations';
import {useQuestyStore, useQuestiesStore} from '../../stores/provider/useStore';
import {getDimensions} from '../../services/DimensionsManager';
import {useObserver} from 'mobx-react';
import Header, {HeaderProps} from '../../components/molecules/header';
import Loader from '../../components/atoms/loader';
import {showErrorAlert} from '../../helpers/AlertHelper';
import {QuestDifficulty} from '../../services/Api/models/QuestDifficulty';
import {LatLong} from '../../services/LocationManager';
import Hashtag from '../../services/Api/models/Hashtag';
import BackgroundForm from '../../components/organisms/backgroundForm';
import {SelectionItem} from '../selection';
import QuestShort from '../../services/Api/models/QuestShort';

const CELL_HEIGHT = 101;
const DEFAULT_TOP_VIEW_MARGIN_TOP = -3;
const TOP_VIEW_MARGIN_TOP = 6;
const TOP_VIEW_MARGIN_BOTTOM = 40;
const MORE_DATA = [
  {id: 0, name: 'Edit quest'},
  {id: 1, name: 'Share quest'},
  {id: 2, name: 'Delete quest'},
];

interface QuestScreenProps {
  navigation: NavigationStackProp;
}

const ANIMATION_DURATION = 200;

export interface QuestCreationModel {
  name: string | undefined;
  difficulty: QuestDifficulty | undefined;
  startLocation: LatLong | undefined;
  hashtags: Hashtag[];
}

export const QuestScreen = (props: QuestScreenProps) => {
  const positionY =
    (props.navigation.state.params && props.navigation.state.params.positionY) -
      50 || getDimensions().height;

  const questyStoreRef: QuestShort =
    props.navigation.state.params && props.navigation.state.params.questyStore;
  const questyStore = useQuestyStore();
  const questiesStore = useQuestiesStore();

  const isCreateMode = !(
    props.navigation.state.params && props.navigation.state.params.questyStore
  );

  const [height, setHeight] = useState(new Animated.Value(CELL_HEIGHT));
  const [top, setTop] = useState(new Animated.Value(positionY));
  const [needToRenderBackground, setNeedToRenderBackground] = useState(false);
  const [topViewMarginTop, setTopViewMarginTop] = useState(
    new Animated.Value(DEFAULT_TOP_VIEW_MARGIN_TOP),
  );
  const [topViewMarginBottom, setTopViewMarginBottom] = useState(
    new Animated.Value(0),
  );
  const [isNeededToShow, setIsNeededToShow] = useState(false);
  const [opacity, setOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    questyStore.resetValues();
    questyStoreRef && questyStore.shortConfigure(questyStoreRef);

    Animated.parallel([
      Animated.timing(height, {
        toValue: getDimensions().height - (!isCreateMode ? 97 : 57),
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(top, {
        toValue: isCreateMode ? 0 : 40,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(topViewMarginTop, {
        toValue: TOP_VIEW_MARGIN_TOP,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(topViewMarginBottom, {
        toValue: TOP_VIEW_MARGIN_BOTTOM,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: ANIMATION_DURATION,
      }),
    ]).start(() => {
      setIsNeededToShow(true);
      setNeedToRenderBackground(true);

      if (isCreateMode) {
        questyStore.fetchMetadata();
      } else {
        questyStore.getQuestInfo();
      }
    });
  }, []);

  const dismiss = () => {
    props.navigation.state.params &&
      props.navigation.state.params.onPressDoneCreationButton &&
      props.navigation.state.params.onPressDoneCreationButton(questyStore);
    setIsNeededToShow(false);
    setNeedToRenderBackground(false);

    Animated.parallel([
      Animated.timing(height, {
        toValue: CELL_HEIGHT,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(top, {
        toValue: positionY,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(topViewMarginTop, {
        toValue: -3,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(topViewMarginBottom, {
        toValue: 0,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: ANIMATION_DURATION,
      }),
    ]).start(() => {
      NavigationService.dismiss();
    });
  };

  const createHashtag = (name: string) => {
    questyStore.createHashtag(name).catch(error => {
      showErrorAlert(error.message.toString(), () => {
        questyStore._inProgress = false;
      });
    });
  };

  const onSearchHashtag = (q: string) => {
    questyStore.findHashtags(q);
  };

  const renderCreationForm = () => {
    const onPressContinueButton = async () => {
      try {
        questyStore.validateQuestCreationFields();
        await questyStore.createQuest('Drafted');
        NavigationService.present('QuestStepsScreen', {
          questyStore: questyStore,
        });
      } catch (error) {}
    };

    const questCreationProps: QuestCreationProps = {
      accessebilityModel: questyStore._accessebilityModel,
      name: questyStore.questName,
      nameError: questyStore.questNameError,
      image: questyStore.image,
      startLocation: questyStore.startLocation,
      startDateError: questyStore.startDateError,
      startTimeError: questyStore.startTimeError,
      estimatedDurationModel: questyStore._estimatedDurationModel,
      estimatedDuration: questyStore.estimatedDuration,
      startLocationError: questyStore.startLocationError,
      description: questyStore.description,
      startDate: questyStore.startDate,
      startTime: questyStore.startTime,
      difficulty: questyStore.difficulty,
      difficultyError: questyStore.difficultyError,
      difficultiesModel: questyStore._difficultiesModels,
      hashtags: questyStore.hashtags,
      onChangeAccessibility: questyStore.setAccessibility,
      accessibility: questyStore.accessibility,
      hashtagsError: questyStore.hashtagError,
      onChangeStartDate: questyStore.setStartDate,
      onChangeStartTime: questyStore.setStartTime,
      findedHashtags: questyStore._findedHashtags,
      steps: questyStore.questSteps,
      onCreateHashtag: createHashtag,
      onChangeStartLocation: questyStore.setStartLocation,
      onChangeName: questyStore.setQuestName,
      onChangeImage: questyStore.setImage,
      onChangeDescription: questyStore.setDescription,
      onChangeDifficulty: questyStore.setDifficulty,
      onChangeEstimatedDuration: questyStore.setEstimatedDuration,
      onAddHashtag: questyStore.addHashtag,
      onSearchHashtag: onSearchHashtag,
      onRemoveHashtag: questyStore.removeHashtag,
      onPressContinueButton: onPressContinueButton,
    };

    return <QuestCreation {...questCreationProps} />;
  };

  const onPressFavoriteButton = () => {
    console.log('need to implement favorite action');
  };

  const onPressStepsButton = () => {
    NavigationService.present('QuestStepsInfoScreen', {
      questyStore,
    });
  };

  const renderInfoForm = () => {
    const questTopFormProps: QuestTopFormProps = {
      questId: questyStore.id,
      isNeededToShow: isNeededToShow,
      dismiss: dismiss,
      isMyQuest: false,
      hashtags: questyStore.hashtags,
      questName: questyStore.questName,
      authorName: questyStore.authorName,
      comments: questyStore.comments,
      ratingValue: questyStore.ratingValue,
      alreadyPlayed: questyStore.peoplePlayed,
      distance: questyStore.radius,
      stepsCount: questyStore.stepsCount || 0,
      description: questyStore.description,
      difficulty: questyStore.difficulty,
      onPressDeleteComment: questyStore.deleteComment,
      renderTopCloseView: renderTopCloseView,
      onPressFavoriteButton: onPressFavoriteButton,
      onPressStepsButton: onPressStepsButton,
      onPressDistanceButton: onPressDistanceButton,
      onAddedComment: questyStore.addNewComment,
    };

    return <QuestTopForm {...questTopFormProps} />;
  };

  const onPressDistanceButton = () => {
    NavigationService.present('QuestsMapScreen', {
      hideTapBar: true,
    });
  };

  const renderTopCloseView = () => {
    return (
      <Animated.View
        style={[
          styles.topCloseContainerStyle,
          {marginTop: topViewMarginTop, marginBottom: topViewMarginBottom},
        ]}>
        <View style={styles.topCloseViewStyle} />
      </Animated.View>
    );
  };

  const handleMoreDataItem = async (item: SelectionItem) => {
    switch (item.id.toString()) {
      case '0':
        break;

      case '1':
        break;

      case '2':
        const id = await questyStore.deleteQuest();
        questiesStore.deleteQuest(id);
        dismiss();
        break;
    }
  };

  const renderHeader = () => {
    const onPressLeftButtonAction = () => {
      dismiss();
    };

    const onPressRightButtonAction = () => {
      NavigationService.present('SelectionScreen', {
        data: MORE_DATA,
        onSelectItem: handleMoreDataItem,
      });
    };

    const headerProps: HeaderProps = {
      rightText: isCreateMode ? undefined : strings.more,
      leftImage: !isCreateMode
        ? undefined
        : require('../../assets/images/back.png'),
      title: !isCreateMode ? strings.myQuest : strings.createQuest,
      onPressLeftButton: onPressLeftButtonAction,
      onPressRightButton: onPressRightButtonAction,
    };

    return <Header {...headerProps} />;
  };

  const renderContent = () => {
    return (
      <View style={styles.containerStyle}>
        {renderHeader()}
        <Loader visible={questyStore._inProgress} />
        <Animated.View
          style={[styles.contentViewStyle, {height: height, top: top}]}>
          {isCreateMode && renderCreationForm()}
          {!isCreateMode && renderInfoForm()}
        </Animated.View>
      </View>
    );
  };

  return useObserver(() => (
    <BackgroundForm needToHideBackground={!needToRenderBackground}>
      {renderContent()}
    </BackgroundForm>
  ));
};
