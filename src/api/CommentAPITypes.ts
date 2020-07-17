import { AuthorAPIProps } from './IssueAPITypes';

type NoteAPIProps = {
  id: number;
  type: any;
  body: string;
  attachment: any;
  author: AuthorAPIProps;
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
  notes: NoteAPIProps[];
};

export type { NoteAPIProps, CommentAPIProps };
