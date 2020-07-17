import { observable } from 'mobx';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';
import { projectId, groupId, gitBeakerAPI } from '../api/GitBeakerAPI';
import { IssueAPIProps } from '../api/IssueAPITypes';
import CommentsModel from './CommentsModel';
import DescriptionsModel from './DescriptionsModel';

@model('issueViewer/IssuesModel')
class IssuesModel extends Model({
  issues: prop<IssueAPIProps[]>(),
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
        gitBeakerAPI.Issues.all({ projectId, groupId }),
      );

      let data: IssueAPIProps[] = JSON.parse(JSON.stringify(projectIssues));
      let openIssues = data.filter((item) => item.closed_at === null);

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
