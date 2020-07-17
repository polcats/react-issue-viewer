type ReferenceProps = {
  short: string;
  relative: string;
  full: string;
};

type LinksProps = {
  self: string;
  notes: string;
  award_emoji: string;
  project: string;
};

type CompletionProps = { count: number; completed_count: number };

type TimeProps = {
  time_estimate: number;
  total_time_spent: number;
  human_time_estimate: any;
  human_total_time_spent: any;
};

type AuthorProps = {
  id: number;
  name: string;
  username: string;
  state: string;
  avatar_url: string;
  web_url: string;
};

type IssueAPIProps = {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: string;
  created_at: string;
  updated_at: string;
  closed_at: string;
  closed_by: AuthorProps;
  labels: string[];
  milestone: any;
  assignees: AuthorProps[];
  author: AuthorProps;
  assignee: AuthorProps;
  user_notes_count: number;
  merge_requests_count: number;
  upvotes: number;
  downvotes: number;
  due_date: any;
  confidential: boolean;
  discussion_locked: any;
  web_url: string;
  time_stats: TimeProps;
  task_completion_status: CompletionProps;
  has_tasks: boolean;
  _links: LinksProps;
  references: ReferenceProps;
  moved_to_id: any;
};

export type { IssueAPIProps, AuthorProps };
