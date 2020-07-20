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
        const projectDiscussions = yield* _await(
          gitBeakerAPI.IssueDiscussions.all(projectId, items[i][1].iid),
        );
        const data: Comment = JSON.parse(JSON.stringify(projectDiscussions));
        this.items.set(items[i][1].iid, data);
      } catch (e) {}
    }
    this.loading = false;
  });
}

export default CommentsModel;
