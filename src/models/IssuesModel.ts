import { observable } from 'mobx';
import { projectId, groupId, gitlabAPI } from '../api/GitlabAPI';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';
import CommentsModel from './CommentsModel';
import DescriptionsModel from './DescriptionsModel';

@model('issueViewer/IssuesModel')
class IssuesModel extends Model({
  issues: prop<any[]>(),
  commentStore: prop<CommentsModel>(),
  descStore: prop<DescriptionsModel>(),
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
      let openIssues = JSON.parse(data).filter(
        (item: any) => item.closed_at === null,
      );

      for (let i = 0; i < openIssues.length; ++i) {
        yield* _await(this.commentStore.load(openIssues[i].iid));
      }

      for (let i = 0; i < openIssues.length; ++i) {
        yield* _await(
          this.descStore.render(openIssues[i].iid, openIssues[i].description),
        );
      }

      this.commentStore.loading = false;
      this.descStore.loading = false;
      this.issues = openIssues;
      this.loading = false;
    } catch (e) {
      this.failedLoading = true;
    }
  });
}

export default IssuesModel;
