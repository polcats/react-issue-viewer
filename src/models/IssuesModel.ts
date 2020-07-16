import { observable, computed } from 'mobx';
import { projectId, groupId, gitlabAPI } from '../GitlabAPI';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';
import CommentsModel from './CommentsModel';

@model('issueViewer/IssuesModel')
class IssuesModel extends Model({
  issues: prop<any[]>(),
  commentStore: prop<CommentsModel>(),
}) {
  private retries = 5;

  @observable
  loading = true;

  @observable
  failedLoading = false;

  @modelFlow
  load = _async(function* (this: IssuesModel) {
    if (this.retries === 0) {
      alert('Cannot load issues at the moment.');
      return;
    }

    this.loading = true;
    try {
      let projectIssues = yield* _await(
        gitlabAPI.Issues.all({ projectId, groupId }),
      );
      let data = JSON.stringify(projectIssues);
      let filtered = JSON.parse(data).filter(
        (item: any) => item.closed_at === null,
      );

      filtered.map(async (issue: any) => {
        await this.commentStore.load(issue.iid);
      });

      console.log('KEK' + JSON.stringify(this.commentStore.comments));
      this.commentStore.loading = false;

      this.issues = filtered;
      this.loading = false;
    } catch (e) {
      this.retries--;
      this.failedLoading = true;
      this.load();
    }
  });
}

export default IssuesModel;
