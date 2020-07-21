import { observable } from 'mobx';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';
import { gitBeakerAPI, projectId } from '../services/GitLab';
import camelcaseKeys from 'camelcase-keys';
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
      const projectLabels = camelcaseKeys(
        (yield* _await(
          gitBeakerAPI.Labels.all(projectId as string),
        )) as Label[],
      );

      this.labels = projectLabels;
      this.loading = false;
    } catch (e) {
      this.failedLoading = true;
    }
  });

  getColorForLabel(name: string) {
    return this.labels.filter((label) => label.name === name)[0].color;
  }
}

export default Labels;
