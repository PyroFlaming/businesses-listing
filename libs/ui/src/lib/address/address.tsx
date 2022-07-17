
import { AddressType } from '@dev-ocean/api-types';
import React from 'react';

import './address.module.scss';

/* eslint-disable-next-line */
export interface AddressProps {
  address: AddressType
}

export function Address({ address }: AddressProps) {


  return (
    <div>
      {
        address &&
        <React.Fragment>
          <div>{address.number} {address.street}</div>
          <div>{address.city}, {address.country} </div>
          <div>{address.zip}</div>
        </React.Fragment>}
    </div>
  );
}

export default Address;
