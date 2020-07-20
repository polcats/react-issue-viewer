import { observable } from 'mobx';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';
import { IssueAPIProps } from '../api/types/IssueAPITypes';

@model('issueViewer/IssuesModel')
class IssuesModel extends Model({
  issues: prop<IssueAPIProps[]>(),
}) {
  @observable
  loading = true;

  @observable
  failedLoading = false;

  @modelFlow
  load = _async(function* (this: IssuesModel) {
    this.loading = true;
    try {
      let projectIssues: any = [];
      yield* _await(
        import('../api/GitBeakerAPI').then(async (api) => {
          const issues = await api.gitBeakerAPI.Issues.all({
            projectId: api.projectId,
            groupId: api.groupId,
          });
          projectIssues = issues;
          projectIssues = projectIssues.filter(
            (item: any) => item.closed_at === null,
          );
        }),
      );
      this.issues = projectIssues;
      this.loading = false;
    } catch (error) {
      this.failedLoading = true;
    }
  });
}

export default IssuesModel;
