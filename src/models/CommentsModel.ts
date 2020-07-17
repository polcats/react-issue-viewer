import { observable } from 'mobx';
import { projectId, gitBeakerAPI } from '../api/GitBeakerAPI';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';
import { CommentAPIProps } from '../api/CommentAPITypes';
import getGitLabMarkDown from '../api/GitLabMarkDownAPI';

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
        gitBeakerAPI.IssueDiscussions.all(projectId, issueId),
      );
      let data: CommentAPIProps[] = JSON.parse(
        JSON.stringify(projectDiscussions),
      );

      for (let i = 0; i < data.length; ++i) {
        data[i].notes[0].body = yield* _await(
          getGitLabMarkDown(data[i].notes[0].body),
        );
      }

      this.comments.push({ iid: issueId, data: data });
    } catch (e) {}
  });
}

export default CommentsModel;
