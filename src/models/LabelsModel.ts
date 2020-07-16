import { observable } from 'mobx';
import { LabelApiProps } from '../components/Label';
import { projectId, gitlabAPI } from '../GitlabAPI';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';

@model('issueViewer/LabelsModel')
class LabelsModel extends Model({
  labels: prop<LabelApiProps[]>(),
}) {
  private retries = 5;

  @observable
  loading = true;

  @observable
  failedLoading = false;

  @modelFlow
  getLabels = _async(function* (this: LabelsModel) {
    if (this.retries === 0) {
      alert('Cannot load labels at the moment.');
      return;
    }

    this.loading = true;
    try {
      let projectLabels = yield* _await(gitlabAPI.Labels.all(projectId));
      let data = JSON.stringify(projectLabels);
      this.labels = JSON.parse(data);
      this.loading = false;
    } catch (e) {
      this.retries--;
      this.failedLoading = true;
      this.getLabels();
    }
  });

  getColorForLabel(text: string) {
    return this.labels.filter((label) => label.name === text)[0].color;
  }
}

export default LabelsModel;
