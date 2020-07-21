import { model, Model, prop } from 'mobx-keystone';
import { Author } from './Issue';

@model('issueViewer/Note')
class Note extends Model({
  id: prop<number>(),
  type: prop<any>(),
  body: prop<string>(),
  attachment: prop<any>(),
  author: prop<Author>(),
  createdAt: prop<string>(),
  updatedAt: prop<string>(),
  system: prop<boolean>(),
  noteableId: prop<number>(),
  noteableType: prop<string>(),
  resolvable: prop<boolean>(),
  confidential: prop<boolean>(),
  noteableIid: prop<number>(),
  commandsChanges: prop<any>(),
}) {}

@model('issueViewer/Comment')
class Comment extends Model({
  id: prop<string>(),
  individualNote: prop<boolean>(),
  notes: prop<Note[]>(),
}) {}

export { Comment, Note };
