import {useContext} from 'react';
import {StoreContext} from './';
import {RootStore} from '..';
import AuthorizationStore from '../authorizationStore';
import QuestiesStore from '../questiesStore';
import QuestyStore from '../questyStore';
import QuestStepsStore from '../questStepsStore';
import QuestStepStore from '../questStepStore';
import LocationStore from '../locationStore';

export const useStore = (): RootStore => useContext(StoreContext);

export const useAuthorizationStore = (): AuthorizationStore =>
  useStore().authorizationStore;

export const useQuestiesStore = (): QuestiesStore => useStore().questiesStore;

export const useQuestyStore = (): QuestyStore => useStore().questyStore;

export const useQuestStepsStore = (): QuestStepsStore => useStore().questStepsStore;

export const useQuestyStepStore = (): QuestStepStore => useStore().questStepStore;

export const useLocationStore = (): LocationStore => useStore().locationStore;
