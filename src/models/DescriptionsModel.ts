import { observable } from 'mobx';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';
import getGitLabMarkDown from '../api/GitLabMarkDownAPI';
import { IssueAPIProps } from '../api/types/IssueAPITypes';

type RenderedDescriptionProps = {
  iid: number;
  html: string;
};

@model('issueViewer/DescriptionsModel')
class DescriptionsModel extends Model({
  descriptions: prop<RenderedDescriptionProps[]>() || undefined,
}) {
  @observable
  loading = true;

  @modelFlow
  render = _async(function* (
    this: DescriptionsModel,
    issueId: number,
    desc: string,
  ) {
    try {
      this.descriptions.push({
        iid: issueId,
        html: yield* _await(getGitLabMarkDown(desc)),
      });
    } catch (e) {}
  });

  @modelFlow
  load = _async(function* (this: DescriptionsModel, issues: IssueAPIProps[]) {
    try {
      for (let i = 0; i < issues.length; ++i) {
        yield* _await(this.render(issues[i].iid, issues[i].description));
      }
      this.loading = false;
    } catch (error) {}
  });
}

export default DescriptionsModel;
