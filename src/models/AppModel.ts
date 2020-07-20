import { createContext } from 'react';
import {
  model,
  Model,
  prop,
  registerRootStore,
  modelFlow,
  _async,
  _await,
} from 'mobx-keystone';
import IssuesModel from './IssuesModel';
import LabelsModel from './LabelsModel';
import DiscussionsModel from './CommentsModel';
import DescriptionsModel from './DescriptionsModel';
import CommentsModel from './CommentsModel';

@model('issueViewer/AppModel')
class AppModel extends Model({
  issueStore: prop<IssuesModel>(),
  labelStore: prop<LabelsModel>(),
  descStore: prop<DescriptionsModel>(),
  commentStore: prop<CommentsModel>(),
}) {
  constructor(data: any) {
    super(data);
    this.load();
  }

  @modelFlow
  load = _async(function* (this: AppModel) {
    yield* _await(this.labelStore.load());
    yield* _await(this.issueStore.load());
    this.descStore.load(this.issueStore.items);
    this.commentStore.load(this.issueStore.items);
  });
}

const createAppStore = (): AppModel => {
  const store = new AppModel({
    labelStore: new LabelsModel({ labels: [] }),
    issueStore: new IssuesModel({
      issues: [],
      items: new Map(),
    }),
    descStore: new DescriptionsModel({
      descriptions: [],
    }),
    commentStore: new DiscussionsModel({
      comments: [],
    }),
  });

  registerRootStore(store);
  return store;
};

const appContext = createContext(createAppStore());

export { appContext };
export default AppModel;
