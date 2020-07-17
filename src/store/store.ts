import { registerRootStore } from 'mobx-keystone';
import AppModel from '../models/AppModel';
import IssuesModel from '../models/IssuesModel';
import LabelsModel from '../models/LabelsModel';
import DiscussionsModel from '../models/CommentsModel';
import DescriptionsModel from '../models/DescriptionsModel';

const createAppStore = (): AppModel => {
  const store = new AppModel({
    issueStore: new IssuesModel({
      issues: [],
      commentStore: new DiscussionsModel({
        comments: [],
      }),
      descStore: new DescriptionsModel({
        descriptions: [],
      }),
    }),
    labelStore: new LabelsModel({ labels: [] }),
  });

  registerRootStore(store);
  return store;
};

export default createAppStore;
