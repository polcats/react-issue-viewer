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
import Issues from './Issues';
import Labels from './Labels';
import Comments from './Comments';

@model('issueViewer/App')
class App extends Model({
  issueStore: prop<Issues>(),
  labelStore: prop<Labels>(),
  commentStore: prop<Comments>(),
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
    labelStore: new Labels({ labels: [] }),
    issueStore: new Issues({
      items: new Map(),
    }),
    commentStore: new Comments({
      items: new Map(),
    }),
  });

  registerRootStore(store);
  return store;
};

const appContext = createContext(createAppStore());

export { appContext };
