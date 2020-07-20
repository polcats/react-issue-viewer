import { observable } from 'mobx';
import { LabelApiProps } from '../components/Label';
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
  load = _async(function* (this: LabelsModel) {
    this.loading = true;

    try {
      let projectData: LabelApiProps[] = [];
      yield* _await(
        import('../api/GitLab').then(async (api) => {
          const projects = await api.gitBeakerAPI.Labels.all(api.projectId);
          projectData = JSON.parse(JSON.stringify(projects));
        }),
      );
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

export default LabelsModel;
