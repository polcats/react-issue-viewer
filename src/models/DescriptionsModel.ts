import { observable } from 'mobx';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';
import getGitLabMarkDown from '../services/GitLab';
import { Issue } from './Issue';

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
  load = _async(function* (
    this: DescriptionsModel,
    issues: Map<number, Issue>,
  ) {
    try {
      const items = Array.from(issues);
      for (let i = 0; i < items.length; ++i) {
        yield* _await(this.render(items[i][0], items[i][1].description));
      }
      this.loading = false;
    } catch (error) {}
  });
}

export default DescriptionsModel;
