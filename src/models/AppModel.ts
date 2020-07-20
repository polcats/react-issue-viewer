import { createContext } from 'react';
import { model, Model, prop, registerRootStore } from 'mobx-keystone';
import IssuesModel from './IssuesModel';
import LabelsModel from './LabelsModel';
import DiscussionsModel from './CommentsModel';
import DescriptionsModel from './DescriptionsModel';

@model('issueViewer/AppModel')
class AppModel extends Model({
  issueStore: prop<IssuesModel>(),
  labelStore: prop<LabelsModel>(),
}) {
  constructor(data: any) {
    super(data);
    this.issueStore.load();
    this.labelStore.load();
  }
}

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

const appContext = createContext(createAppStore());

export { appContext };
export default AppModel;
