import { observable } from 'mobx';
import Label from '../models/Label';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';
import { gitBeakerAPI, projectId } from '../services/GitLab';

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
      const projectData = (yield* _await(
        gitBeakerAPI.Labels.all(projectId as string),
      )) as Label[];
      this.labels = projectData;
      this.loading = false;
    } catch (e) {
      this.failedLoading = true;
    }
  });

  getColorForLabel(text: string) {
    return this.labels.filter((label) => label.name === text)[0].color;
  }
}

export default Labels;
