import { observable, computed } from 'mobx';
import { projectId, groupId, gitlabAPI } from '../GitlabAPI';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';

@model('issueViewer/CommentsModel')
class CommentsModel extends Model({
  comments: prop<any[]>() || undefined,
}) {
  @observable
  loading = true;

  @observable
  failedLoading = false;

  @modelFlow
  load = _async(function* (this: CommentsModel, issueId: number) {
    this.loading = true;
    try {
      let projectDiscussions = yield* _await(
        gitlabAPI.IssueDiscussions.all(projectId, issueId),
      );
      let data = JSON.stringify(projectDiscussions);
      let filtered = JSON.parse(data);
      this.comments.push({ iid: issueId, data: filtered });
      console.log(JSON.parse(JSON.stringify(this.comments)));
    } catch (e) {
      this.failedLoading = true;
    }
  });
}

export default CommentsModel;
