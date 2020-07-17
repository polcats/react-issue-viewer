import { observable } from 'mobx';
import { projectId, gitlabAPI } from '../api/GitlabAPI';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';

@model('issueViewer/CommentsModel')
class CommentsModel extends Model({
  comments: prop<any[]>() || undefined,
}) {
  @observable
  loading = true;

  @modelFlow
  load = _async(function* (this: CommentsModel, issueId: number) {
    try {
      let projectDiscussions = yield* _await(
        gitlabAPI.IssueDiscussions.all(projectId, issueId),
      );
      let data = JSON.stringify(projectDiscussions);
      let filtered = JSON.parse(data);
      this.comments.push({ iid: issueId, data: filtered });
    } catch (e) {}
  });
}

export default CommentsModel;
