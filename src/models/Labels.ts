import { observable } from 'mobx';
import { LabelApiProps } from '../components/Label';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';

@model('issueViewer/Labels')
class Labels extends Model({
  labels: prop<LabelApiProps[]>(),
}) {
  @observable
  loading = true;

  @observable
  failedLoading = false;

  @modelFlow
  load = _async(function* (this: Labels) {
    this.loading = true;

    try {
      let projectData: LabelApiProps[] = [];
      yield* _await(
        import('../services/GitLab').then(async (api) => {
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

export default Labels;