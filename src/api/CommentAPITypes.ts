import { AuthorProps } from './IssueAPITypes';

type NoteProps = {
  id: number;
  type: any;
  body: string;
  attachment: any;
  author: AuthorProps;
  created_at: string;
  updated_at: string;
  system: boolean;
  noteable_id: number;
  noteable_type: string;
  resolvable: boolean;
  confidential: boolean;
  noteable_iid: number;
  commands_changes: any;
};

type CommentAPIProps = {
  id: string;
  individual_note: boolean;
  notes: NoteProps[];
};

export type { CommentAPIProps };
