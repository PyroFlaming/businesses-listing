import React from 'react';
import { useParams } from 'react-router-dom';

import './business-view.module.scss';

/* eslint-disable-next-line */
export interface BusinessViewProps { }

export function BusinessView(props: BusinessViewProps) {

  const { businessId } = useParams();

  return (
    <div>
      {businessId}
      <h1>Welcome to business-view!</h1>
    </div>
  );
}

export default BusinessView;
