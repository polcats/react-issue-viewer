import { observable } from 'mobx';
import {
  model,
  Model,
  modelFlow,
  prop_mapObject,
  _async,
  _await,
} from 'mobx-keystone';
import { Issue } from './Issue';
import { gitBeakerAPI, projectId, groupId } from '../services/GitLab';

@model('issueViewer/IssuesModel')
class IssuesModel extends Model({
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
      const projectIssues = (yield* _await(
        gitBeakerAPI.Issues.all({
          projectId: projectId,
          groupId: groupId,
        }),
      )) as Issue[];

      const openIssues = projectIssues.filter(
        (item: any) => item.closed_at === null,
      );

      for (let i = 0; i < openIssues.length; ++i) {
        this.items.set(openIssues[i].iid, openIssues[i]);
      }

      this.loading = false;
    } catch (error) {
      this.failedLoading = true;
    }
  });
}

export default IssuesModel;
