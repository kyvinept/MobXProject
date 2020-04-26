import QuestiesStore from './questiesStore';

export class RootStore {
  questiesStore: QuestiesStore;
  ...

  constructor() {
    this.questiesStore = new QuestiesStore();
  }
}

const stores = new RootStore();
export default stores;
