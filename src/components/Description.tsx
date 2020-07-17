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

  let [filtered] = descStore.descriptions.filter(
    (com: any) => com.iid === issueId,
  );

  const HtmlToReactParser = require('html-to-react').Parser;
  return (
    <div className="desc-wrap">
      {new HtmlToReactParser().parse(filtered.html)}
    </div>
  );
};

export default Description;
