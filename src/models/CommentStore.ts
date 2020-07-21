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
import { Comment } from './Comment';
import { Issue } from './Issue';
import camelcaseKeys from 'camelcase-keys';

@model('issueViewer/CommentStore')
class CommentStore extends Model({
  items: prop_mapObject<Map<number, Comment>>(),
}) {
  @observable
  loading = true;

  @modelFlow
  load = _async(function* (this: CommentStore, issues: Map<number, Issue>) {
    const items = Array.from(issues);
    for (let i = 0; i < items.length; ++i) {
      try {
        const projectDiscussions = camelcaseKeys(
          (yield* _await(
            gitBeakerAPI.IssueDiscussions.all(
              projectId as string,
              items[i][1].iid,
            ),
          )) as Comment,
          { deep: true },
        );

        console.log(projectDiscussions);

        this.items.set(items[i][1].iid, projectDiscussions);
      } catch (e) {}
    }
    this.loading = false;
  });
}

export default CommentStore;
