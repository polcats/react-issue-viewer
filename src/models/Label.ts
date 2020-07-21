import { model, Model, prop } from 'mobx-keystone';

@model('issueViewer/Label')
class Label extends Model({
  id: prop<number>(),
  name: prop<string>(),
  color: prop<string>(),
  description: prop<string>(),
  descriptionHtml: prop<string>(),
  textColor: prop<string>(),
  subscribed: prop<boolean>(),
  priority: prop<number | null>(),
  isProjectLabel: prop<boolean>(),
}) {}

export default Label;
