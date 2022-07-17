import { BusinessCard, LoadingHoc, LoadingHocProps } from '@dev-ocean/ui';
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { fetchBusinesses, selectAllBusinesses } from '../../store/businesses.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';

import style from './businesses-listing.module.scss';

/* eslint-disable-next-line */
export interface BusinessesListingProps extends LoadingHocProps { }

export function BusinessesListing({ setLoading }: BusinessesListingProps) {
  const businessesList = useAppSelector(selectAllBusinesses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBusinesses()).then((res) => {
      setLoading(false);
    })
  }, [dispatch]);

  const navigate = useNavigate();
  const navigateToDetails = (businessId) => {
    navigate(`/business/${businessId}`);
  }

  return (
    <div className={style.businessesListingContent}>
      <Grid container spacing={1}>
        <Grid item xs={12} className="business-header">
          <BusinessCard name='Name' description='Description' />
        </Grid>
        {
          businessesList.map((business) =>
            <Grid e2e-business-item={business.id} item xs={12} className='business-item' key={business.id} onClick={() => navigateToDetails(business.id)}>
              <BusinessCard name={business.name} description={business.description} />
            </Grid>
          )
        }
      </Grid>
    </div>
  );
}

export default LoadingHoc(BusinessesListing);
