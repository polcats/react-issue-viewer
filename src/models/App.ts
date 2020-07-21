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
import IssueStore from './IssueStore';
import LabelStore from './LabelStore';
import CommentStore from './CommentStore';

@model('issueViewer/App')
class App extends Model({
  issueStore: prop<IssueStore>(),
  labelStore: prop<LabelStore>(),
  commentStore: prop<CommentStore>(),
}) {
  constructor(data: any) {
    super(data);
    this.load();
  }

  @modelFlow
  load = _async(function* (this: App) {
    yield* _await(this.labelStore.load());
    yield* _await(this.issueStore.load());
    this.commentStore.load(this.issueStore.items);
  });
}

const createAppStore = (): App => {
  const store = new App({
    labelStore: new LabelStore({ labels: [] }),
    issueStore: new IssueStore({
      items: new Map(),
    }),
    commentStore: new CommentStore({
      items: new Map(),
    }),
  });

  registerRootStore(store);
  return store;
};

const appContext = createContext(createAppStore());

export { appContext };
