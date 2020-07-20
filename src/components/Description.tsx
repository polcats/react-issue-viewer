import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { appContext } from '../models/AppModel';
import ReactMarkdown from 'react-markdown';

type DescriptionProps = {
  issueId: number;
};

const Description: React.FC<DescriptionProps> = ({ issueId }) => {
  const issue = useContext(appContext).issueStore.items.get(issueId);
  return (
    <div className="desc-wrap">
      <ReactMarkdown source={issue?.description} />
    </div>
  );
};

export default observer(Description);
