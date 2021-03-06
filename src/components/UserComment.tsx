import React from 'react';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { Note } from '../models/Comment';
import Span from '../components/Span';
import ReactMarkdown from 'react-markdown';

type UserCommentProps = {
  notes: Note[];
};

const UserComment: React.FC<UserCommentProps> = ({ notes }) => {
  return (
    <>
      {notes.map((note, key) => {
        return (
          <div className={`user-comment ${key > 0 ? 'nested' : ''}`} key={key}>
            <img
              className="user-avatar"
              src={note.author.avatarUrl}
              alt={note.author.name}
            />
            <div className="comment-data">
              <Span className="user-name" text={note.author.name} />
              <Span
                className="time-posted"
                text={moment(note.updatedAt).fromNow()}
                title={note.updatedAt}
              />
              <div className="comment-text">
                <ReactMarkdown source={note.body} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default observer(UserComment);
