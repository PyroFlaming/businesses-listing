import { Grid } from '@mui/material';
import React from 'react';

import businessStyle from './business-card.module.scss';

/* eslint-disable-next-line */
export interface BusinessCardProps {
  name: string,
  description: string
}

export function BusinessCard({ name, description }: BusinessCardProps) {
  return (
    <div className={businessStyle.business}>
      <Grid container item xs={12}>
        <Grid item xs={4}>
          {name}
        </Grid>
        <Grid item xs={8}>
          {description}
        </Grid>
      </Grid>
    </div>
  );
}

export default BusinessCard;
