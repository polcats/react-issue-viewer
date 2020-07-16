import { observable } from 'mobx';
import { projectId, groupId, gitlabAPI } from '../GitlabAPI';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';

@model('issueViewer/IssuesModel')
class IssuesModel extends Model({
  issues: prop<any[]>() || undefined,
}) {
  private retries = 5;

  @observable
  loading = true;

  @observable
  failedLoading = false;

  // TO BE REFACTORED
  @modelFlow
  getIssues = _async(function* (this: IssuesModel) {
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

      this.issues = filtered;
      this.loading = false;
      console.log(filtered);
    } catch (e) {
      this.retries--;
      this.failedLoading = true;
      this.getIssues();
    }
  });
}

export default IssuesModel;
