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

  console.log(filtered.desc);

  return <div className="desc-wrap">Ongoing...</div>;
};

export default Description;
