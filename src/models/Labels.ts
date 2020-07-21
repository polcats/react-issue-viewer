import { observable } from 'mobx';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';
import { gitBeakerAPI, projectId } from '../services/GitLab';
import camelcase from 'camelcase';
import Label from '../models/Label';

@model('issueViewer/Labels')
class Labels extends Model({
  labels: prop<Label[]>(),
}) {
  @observable
  loading = true;

  @observable
  failedLoading = false;

  @modelFlow
  load = _async(function* (this: Labels) {
    this.loading = true;

    try {
      const projectLabels = yield* _await(
        gitBeakerAPI.Labels.all(projectId as string),
      );

      const camelCaseLabels = JSON.parse(
        camelcase(JSON.stringify(projectLabels)),
      ) as Label[];

      this.labels = camelCaseLabels;
      this.loading = false;
    } catch (e) {
      console.log(e);
      this.failedLoading = true;
    }
  });

  getColorForLabel(name: string) {
    return this.labels.filter((label) => label.name === camelcase(name))[0]
      .color;
  }
}

export default Labels;
