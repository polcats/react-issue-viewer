import { registerRootStore } from 'mobx-keystone';
import LabelsModel from '../models/LabelsModel';

const createAppStore = (): LabelsModel => {
  const store = new LabelsModel({
    labels: [],
  });

  registerRootStore(store);
  return store;
};

export default createAppStore;
