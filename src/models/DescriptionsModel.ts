import { observable } from 'mobx';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';

@model('issueViewer/DescriptionsModel')
class DescriptionsModel extends Model({
  descriptions: prop<any[]>() || undefined,
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
      const url = 'https://gitlab.com/api/v4/markdown';
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: desc, gfm: true }),
      };

      const result = yield* _await(fetch(url, options));
      let rendered = yield* _await(result.json());

      this.descriptions.push({ iid: issueId, desc: rendered });
    } catch (e) {}
  });
}

export default DescriptionsModel;
