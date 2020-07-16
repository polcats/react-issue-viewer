import { observable, computed } from 'mobx';
import { projectId, groupId, gitlabAPI } from '../GitlabAPI';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';

@model('issueViewer/CommentsModel')
class CommentsModel extends Model({
  comments: prop<any[]>() || undefined,
}) {
  private retries = 5;

  @observable
  loading = true;

  @observable
  failedLoading = false;

  @modelFlow
  load = _async(function* (this: CommentsModel, issueId: number) {
    console.log('COMMENT STORE');
    if (this.retries === 0) {
      alert('Cannot load issues at the moment.');
      return;
    }

    // this.loading = true;
    try {
      let projectDiscussions = yield* _await(
        gitlabAPI.IssueDiscussions.all(projectId, issueId),
      );
      let data = JSON.stringify(projectDiscussions);
      let filtered = JSON.parse(data);
      this.comments.push({ iid: issueId, data: filtered });
      // this.loading = false;
      console.log(JSON.parse(JSON.stringify(this.comments)));
    } catch (e) {
      // console.log('Error:' + e);
      // this.retries--;
      // this.failedLoading = true;
      // this.load(issueId);
    }
  });

  getComments(issueId: number) {
    let kumen = JSON.stringify(this.comments);
    // .filter(
    //   (comment: any) => {
    //     console.log(comment.id + ' ' + issueId);
    //     return comment.id == issueId;
    //   },
    // );
    console.log('Getting kumen: ' + kumen);
    return '';
  }
}

export default CommentsModel;
