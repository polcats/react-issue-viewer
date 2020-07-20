import { observable } from 'mobx';
import { projectId, gitBeakerAPI } from '../services/GitLab';
import {
  model,
  Model,
  modelFlow,
  prop_mapObject,
  _async,
  _await,
} from 'mobx-keystone';
import { Comment } from '../models/Comment';
import getGitLabMarkDown from '../services/GitLab';
import { Issue } from './Issue';

@model('issueViewer/CommentsModel')
class CommentsModel extends Model({
  items: prop_mapObject<Map<number, Comment>>(),
}) {
  @observable
  loading = true;

  @modelFlow
  load = _async(function* (this: CommentsModel, issues: Map<number, Issue>) {
    const items = Array.from(issues);
    for (let i = 0; i < items.length; ++i) {
      try {
        let projectDiscussions = yield* _await(
          gitBeakerAPI.IssueDiscussions.all(projectId, items[i][1].iid),
        );

        let data: any = projectDiscussions;
        for (let i = 0; i < data.length; ++i) {
          data[i].notes[0].body = yield* _await(
            getGitLabMarkDown(data[i].notes[0].body),
          );
        }

        this.items.set(items[i][1].iid, data);
      } catch (e) {}
    }
    this.loading = false;
  });
}

export default CommentsModel;
