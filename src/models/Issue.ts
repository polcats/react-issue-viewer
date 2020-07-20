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
  award_emoji: prop<string>(),
  project: prop<string>(),
}) {}

@model('issueViewer/Completion')
class Completion extends Model({
  count: prop<number>(),
  completed_count: prop<number>(),
}) {}

@model('issueViewer/Time')
class Time extends Model({
  time_estimate: prop<number>(),
  total_time_spent: prop<number>(),
  human_time_estimate: prop<any>(),
  human_total_time_spent: prop<any>(),
}) {}

@model('issueViewer/Author')
class Author extends Model({
  id: prop<number>(),
  name: prop<string>(),
  username: prop<string>(),
  state: prop<string>(),
  avatar_url: prop<string>(),
  web_url: prop<string>(),
}) {}

@model('issueViewer/IssueModel')
class Issue extends Model({
  id: prop<number>(),
  iid: prop<number>(),
  project_id: prop<number>(),
  title: prop<string>(),
  description: prop<string>(),
  state: prop<string>(),
  created_at: prop<string>(),
  updated_at: prop<string>(),
  closed_at: prop<string>(),
  closed_by: prop<string>(),
  labels: prop<string[]>(),
  milestone: prop<string>(),
  assignees: prop<Author[]>(),
  author: prop<Author>(),
  assignee: prop<Author>(),
  user_notes_count: prop<number>(),
  merge_requests_count: prop<number>(),
  upvotes: prop<number>(),
  downvotes: prop<number>(),
  due_date: prop<string>(),
  confidential: prop<boolean>(),
  discussion_locked: prop<any>(),
  web_url: prop<string>(),
  time_stats: prop<Time>(),
  task_completion_status: prop<Completion>(),
  has_tasks: prop<boolean>(),
  _links: prop<Links>(),
  references: prop<Reference>(),
  moved_to_id: prop<any>(),
}) {}

@model('issueViewer/IssueKey')
class IssueKey extends Model({
  id: prop<number>(),
  issue: prop<Issue>(),
}) {}

export { Issue, Author };
