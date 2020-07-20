import { model, Model, prop } from 'mobx-keystone';
import { Author } from './Issue';

@model('issueViewer/Note')
class Note extends Model({
  id: prop<number>(),
  type: prop<any>(),
  body: prop<string>(),
  attachment: prop<any>(),
  author: prop<Author>(),
  created_at: prop<string>(),
  updated_at: prop<string>(),
  system: prop<boolean>(),
  noteable_id: prop<number>(),
  noteable_type: prop<string>(),
  resolvable: prop<boolean>(),
  confidential: prop<boolean>(),
  noteable_iid: prop<number>(),
  commands_changes: prop<any>(),
}) {}

@model('issueViewer/Comment')
class Comment extends Model({
  id: prop<string>(),
  individual_note: prop<boolean>(),
  notes: prop<Note[]>(),
}) {}

export { Comment, Note };
