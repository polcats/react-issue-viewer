import { observable } from 'mobx';
import {
  model,
  Model,
  modelFlow,
  prop,
  prop_mapObject,
  _async,
  _await,
} from 'mobx-keystone';
import { Issue } from './Issue';

@model('issueViewer/IssuesModel')
class IssuesModel extends Model({
  issues: prop<Issue[]>(),
  items: prop_mapObject<Map<number, Issue>>(),
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
        import('../services/GitLab').then(async (api) => {
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

      for (let i = 0; i < projectIssues.length; ++i) {
        this.items.set(projectIssues[i].iid, { ...projectIssues[i] });
      }

      this.loading = false;
    } catch (error) {
      this.failedLoading = true;
    }
  });
}

export default IssuesModel;
