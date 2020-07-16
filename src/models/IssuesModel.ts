import { observable, computed } from 'mobx';
import { projectId, groupId, gitlabAPI } from '../GitlabAPI';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';
import CommentsModel from './CommentsModel';

@model('issueViewer/IssuesModel')
class IssuesModel extends Model({
  issues: prop<any[]>(),
  commentStore: prop<CommentsModel>(),
}) {
  @observable
  loading = true;

  @observable
  failedLoading = false;

  @modelFlow
  load = _async(function* (this: IssuesModel) {
    this.loading = true;
    try {
      let projectIssues = yield* _await(
        gitlabAPI.Issues.all({ projectId, groupId }),
      );
      let data = JSON.stringify(projectIssues);
      let filtered = JSON.parse(data).filter(
        (item: any) => item.closed_at === null,
      );

      for (let i = 0; i < filtered.length; ++i) {
        yield* _await(this.commentStore.load(filtered[i].iid));
      }

      this.commentStore.loading = false;
      this.issues = filtered;
      this.loading = false;
    } catch (e) {
      this.failedLoading = true;
    }
  });
}

export default IssuesModel;
