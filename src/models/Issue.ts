import { model, Model, prop } from 'mobx-keystone';

@model('issueViewer/Reference')
class Reference extends Model({
  short: prop<string>(),
  relative: prop<string>(),
  full: prop<string>(),
}) {}

@model('issueViewer/Links')
class Links extends Model({
  self: prop<string>(),
  notes: prop<string>(),
  awardEmoji: prop<string>(),
  project: prop<string>(),
}) {}

@model('issueViewer/Completion')
class Completion extends Model({
  count: prop<number>(),
  completedCount: prop<number>(),
}) {}

@model('issueViewer/Time')
class Time extends Model({
  timeEstimate: prop<number>(),
  totalTimeSpent: prop<number>(),
  humanTimeEstimate: prop<any>(),
  humanTotalTimeSpent: prop<any>(),
}) {}

@model('issueViewer/Author')
class Author extends Model({
  id: prop<number>(),
  name: prop<string>(),
  username: prop<string>(),
  state: prop<string>(),
  avatarUrl: prop<string>(),
  webUrl: prop<string>(),
}) {}

@model('issueViewer/IssueModel')
class Issue extends Model({
  id: prop<number>(),
  iid: prop<number>(),
  projectId: prop<number>(),
  title: prop<string>(),
  description: prop<string>(),
  state: prop<string>(),
  createdAt: prop<string>(),
  updatedAt: prop<string>(),
  closedAt: prop<string>(),
  closedBy: prop<string>(),
  labels: prop<string[]>(),
  milestone: prop<string>(),
  assignees: prop<Author[]>(),
  author: prop<Author>(),
  assignee: prop<Author>(),
  userNotesCount: prop<number>(),
  mergeRequestsCount: prop<number>(),
  upvotes: prop<number>(),
  downvotes: prop<number>(),
  dueDate: prop<string>(),
  confidential: prop<boolean>(),
  discussionLocked: prop<any>(),
  webUrl: prop<string>(),
  timeStats: prop<Time>(),
  taskCompletionStatus: prop<Completion>(),
  hasTasks: prop<boolean>(),
  links: prop<Links>(),
  references: prop<Reference>(),
  movedToId: prop<any>(),
}) {}

@model('issueViewer/IssueKey')
class IssueKey extends Model({
  id: prop<number>(),
  issue: prop<Issue>(),
}) {}

export { Issue, Author };
