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
import camelcaseKeys from 'camelcase-keys';

@model('issueViewer/Issues')
class Issues extends Model({
  items: prop_mapObject<Map<number, Issue>>(),
}) {
  @observable
  loading = true;

  @observable
  failedLoading = false;

  @modelFlow
  load = _async(function* (this: Issues) {
    this.loading = true;
    try {
      const projectIssues = camelcaseKeys(
        (yield* _await(
          gitBeakerAPI.Issues.all({
            projectId: projectId,
            groupId: groupId,
          }),
        )) as Issue[],
        { deep: true },
      );

      const openIssues = projectIssues.filter(
        (item: Issue) => item.closedAt === null,
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

export default Issues;
