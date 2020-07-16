import { observable, computed } from 'mobx';
import { LabelApiProps } from '../components/Label';
import { projectId, gitlabAPI } from '../GitlabAPI';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';

@model('issueViewer/LabelsModel')
class LabelsModel extends Model({
  labels: prop<LabelApiProps[]>(),
}) {
  @observable
  loading = true;

  @observable
  failedLoading = false;

  @modelFlow
  getLabels = _async(function* (this: LabelsModel) {
    this.loading = true;

    try {
      let projectLabels = yield* _await(gitlabAPI.Labels.all(projectId));
      let data = JSON.stringify(projectLabels);
      this.labels = JSON.parse(data);
      this.loading = false;
    } catch (e) {
      this.loading = false;
      this.failedLoading = true;
    }
  });

  @computed
  getColorForLabel(text: string) {
    return this.labels.filter((label) => {
      label.name === text;
    })[0].color;
  }
}

export default LabelsModel;
