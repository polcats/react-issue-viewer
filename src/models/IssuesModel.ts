import { observable } from 'mobx';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';
import { IssueAPIProps } from '../api/types/IssueAPITypes';
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

    // load issues
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

    // load comments
    try {
      for (let i = 0; i < this.issues.length; ++i) {
        yield* _await(this.commentStore.load(this.issues[i].iid));
      }
      this.commentStore.loading = false;
    } catch (error) {}

    // load rendered descriptions
    try {
      for (let i = 0; i < this.issues.length; ++i) {
        yield* _await(
          this.descStore.render(this.issues[i].iid, this.issues[i].description),
        );
      }
      this.descStore.loading = false;
    } catch (error) {}
  });
}

export default IssuesModel;
