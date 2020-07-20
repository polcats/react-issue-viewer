import { model, Model, prop } from 'mobx-keystone';

@model('issueViewer/Label')
class Label extends Model({
  items: prop<number>(),
  name: prop<string>(),
  color: prop<string>(),
  description: prop<string>(),
  description_html: prop<string>(),
}) {}

export default Label;
