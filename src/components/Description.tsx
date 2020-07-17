import React from 'react';
import { observer } from 'mobx-react-lite';
import DescriptionsModel from '../models/DescriptionsModel';
import loader from '../loader.gif';

type DescriptionProps = {
  issueId: number;
  descStore: DescriptionsModel;
};

const Description: React.FC<DescriptionProps> = ({ issueId, descStore }) => {
  let [filtered] = descStore.descriptions.filter(
    (com: any) => com.iid === issueId,
  );

  const HtmlToReactParser = require('html-to-react').Parser;
  return (
    <div className="desc-wrap">
      {descStore.loading ? (
        <img src={loader} alt="Loading..." />
      ) : (
        new HtmlToReactParser().parse(filtered.html)
      )}
    </div>
  );
};

export default observer(Description);
