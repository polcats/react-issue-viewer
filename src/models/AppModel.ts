import { model, Model, prop } from 'mobx-keystone';
import IssuesModel from './IssuesModel';
import LabelsModel from './LabelsModel';

@model('issueViewer/AppModel')
class AppModel extends Model({
  issueStore: prop<IssuesModel>(),
  labelStore: prop<LabelsModel>(),
}) {
  constructor(data: any) {
    super(data);
    this.issueStore.getIssues();
    this.labelStore.getLabels();
  }
}

export default AppModel;
