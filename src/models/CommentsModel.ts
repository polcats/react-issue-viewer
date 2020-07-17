import { observable } from 'mobx';
import { projectId, gitlabAPI } from '../api/GitlabAPI';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';
import { CommentAPIProps } from '../api/CommentAPITypes';

type CommentsProps = {
  iid: number;
  data: CommentAPIProps[];
};

@model('issueViewer/CommentsModel')
class CommentsModel extends Model({
  comments: prop<CommentsProps[]>() || undefined,
}) {
  @observable
  loading = true;

  @modelFlow
  load = _async(function* (this: CommentsModel, issueId: number) {
    try {
      let projectDiscussions = yield* _await(
        gitlabAPI.IssueDiscussions.all(projectId, issueId),
      );
      let data: CommentAPIProps[] = JSON.parse(
        JSON.stringify(projectDiscussions),
      );

      this.comments.push({ iid: issueId, data: data });
    } catch (e) {}
  });
}

export default CommentsModel;
