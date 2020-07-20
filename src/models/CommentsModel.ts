import { observable } from 'mobx';
import { projectId, gitBeakerAPI } from '../api/GitLab';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';
import { CommentAPIProps } from '../api/types/CommentAPITypes';
import getGitLabMarkDown from '../api/GitLab';
import { IssueAPIProps } from '../api/types/IssueAPITypes';

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
  load = _async(function* (this: CommentsModel, issues: IssueAPIProps[]) {
    for (let i = 0; i < issues.length; ++i) {
      try {
        let projectDiscussions = yield* _await(
          gitBeakerAPI.IssueDiscussions.all(projectId, issues[i].iid),
        );

        let data: any = projectDiscussions;
        for (let i = 0; i < data.length; ++i) {
          data[i].notes[0].body = yield* _await(
            getGitLabMarkDown(data[i].notes[0].body),
          );
        }

        this.comments.push({ iid: issues[i].iid, data: data });
      } catch (e) {}
    }
    this.loading = false;
  });
}

export default CommentsModel;
