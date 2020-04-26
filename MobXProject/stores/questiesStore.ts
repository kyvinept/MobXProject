import {
  action,
  observable,
  decorate,
  computed,
  autorun,
  when,
  reaction,
} from 'mobx';
import QuestyStore from './questyStore';
import {
  storeData,
  retrieveData,
  DataType,
  removeData,
} from '../services/AsyncStorageManager';
import {LocationModel} from '../services/LocationManager';
import Hashtag from '../services/Api/models/Hashtag';
import QuestApiService from '../services/Api/QuestApi/QuestApiService';
import {QuestApiInterface} from '../services/Api/QuestApi/QuestApiInterface';
import QuestShort from '../services/Api/models/QuestShort';

export default class QuestiesStore {
  questApi: QuestApiInterface = new QuestApiService();

  _page: number = 1;
  _canLoadMoreQuest = true;
  _searchString?: string;

  _inProgress = false;
  _questies: Array<QuestShort> = [];
  _filterValues: {
    type?: string;
    complication?: string;
    duration?: number;
    centerLocation?: LocationModel;
    radius: number;
  } = {...DEFAULT_FILTER_MODEL};

  popularHashtags: {hashtag: Hashtag; selected?: boolean}[] = [];

  setSearchString = (isMyQuest: boolean, text: string) => {
    this._searchString = text;

    this.getQuests(isMyQuest);
  };

  deleteQuest = (id?: string) => {
    if (id) {
      const newQuesties = [...this._questies];
      const index = newQuesties.findIndex(quest => quest.id == id);
      newQuesties.splice(index, 1);
      this._questies = newQuesties;
    }
  };

  selectHashtag = (isMyQuest: boolean, hashtag: Hashtag) => {
    const index = this.popularHashtags.findIndex(
      item => item.hashtag.id == hashtag.id,
    );
    this.popularHashtags[index].selected = !this.popularHashtags[index]
      .selected;

    this.getQuests(isMyQuest);
  };

  setFilterValues = (params: {
    type?: string;
    complication?: string;
    duration?: number;
    centerLocation?: LocationModel;
    radius?: number;
  }) => {
    this._filterValues.type = params.type;
    this._filterValues.complication = params.complication;
    this._filterValues.duration = params.duration;
    this._filterValues.centerLocation = params.centerLocation;

    if (params.radius) {
      this._filterValues.radius = params.radius;
    }
  };

  getPopularHashtags = async () => {
    this._inProgress = true;
    this.questApi
      .getPopularHashtags()
      .then(hashtags => {
        this.popularHashtags = hashtags.map(hashtag => ({hashtag}));
      })
      .finally(() => {
        this._inProgress = false;
      });
  };

  getMoreQuests = async (isMyQuest: boolean) => {
    if (!this._canLoadMoreQuest) {
      return;
    }

    this._canLoadMoreQuest = false;

    // this._inProgress = true;
    this.questApi
      .getQuests(
        this._page++,
        this.popularHashtags
          .filter(hashtag => hashtag.selected)
          .map(item => item.hashtag.id),
        isMyQuest,
        this._searchString,
      )
      .then(quests => {
        if (quests.length == 0) {
          this._canLoadMoreQuest = false;
          return;
        }

        this._canLoadMoreQuest = true;

        this._questies.push(...quests);
      })
      .catch(() => {
        this._canLoadMoreQuest = false;
      })
      .finally(() => {
        this._inProgress = false;
      });
  };

  getQuests = async (isMyQuest: boolean) => {
    this._canLoadMoreQuest = false;
    this._inProgress = true;
    this._page = 1;

    this.questApi
      .getQuests(
        this._page++,
        this.popularHashtags
          .filter(hashtag => hashtag.selected)
          .map(item => item.hashtag.id),
        isMyQuest,
        this._searchString,
      )
      .then(quests => {
        this._canLoadMoreQuest = true;
        this._questies = quests;    
      })
      .finally(() => {
        this._inProgress = false;
      });
  };
}

decorate(QuestiesStore, {
  popularHashtags: observable,
  _inProgress: observable,
  _questies: observable,
  _filterValues: observable,
  _searchString: observable,

  setSearchString: action,
  addOrUpdateNewQuest: action,
  setFilterValues: action,
  deleteQuest: action,
  filter: action,
  resetFilterValues: action,
  getPopularHashtags: action,
  getQuests: action,
  getMoreQuests: action,
  selectHashtag: action,
});
