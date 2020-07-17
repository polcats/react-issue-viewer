import React from 'react';
import DescriptionsModel from '../models/DescriptionsModel';

type DescriptionProps = {
  issueId: number;
  descStore: DescriptionsModel;
};

const Description: React.FC<DescriptionProps> = ({ issueId, descStore }) => {
  if (descStore.loading) {
    return <>Loading descriptions...</>;
  }

  const commentsForIssue = JSON.parse(JSON.stringify(descStore.descriptions));
  let [filtered] = commentsForIssue.filter((com: any) => com.iid === issueId);

  const HtmlToReactParser = require('html-to-react').Parser;
  return (
    <div className="desc-wrap">
      {new HtmlToReactParser().parse(filtered.desc.html)}
    </div>
  );
};

export default Description;
