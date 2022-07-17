import { Address, BusinessCard, Contact, LoadingHoc, LoadingHocProps } from '@dev-ocean/ui';
import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBusinesses, selectBusinessById, selectBusinessesEntities, selectNearByBusinesses } from '../../store/businesses.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';


import styles from './business-view.module.scss';

/* eslint-disable-next-line */
export interface BusinessViewProps extends LoadingHocProps { }

export function BusinessView({ setLoading }: BusinessViewProps) {
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

  const { businessId } = useParams();
  const business = useAppSelector(selectBusinessById(businessId))
  const nearByBusinesses = useAppSelector(selectNearByBusinesses(business?.address?.city || '')).filter(el => el.id != businessId).slice(0, 5);

  return (
    <div className={styles.businessView}>
      {business && <Grid e2e-business-view={businessId} container spacing={2}>
        <Grid item xs={12} md={8}>
          <img src={business?.image} alt={business?.name} />
        </Grid>
        <Grid item xs={12} md={4}>
          <h1>{business?.name}</h1>
          <p>
            {business?.description}
          </p>
        </Grid>
        <Grid item xs={12} md={3}>
          <h3> Address </h3>
          <Address address={business?.address}></Address>
        </Grid>
        <Grid item xs={12} md={3}>
          <h3> Contact </h3>
          <Contact contact={{ phone: business?.phone, email: business?.email }} ></Contact>
        </Grid>
        <Grid className='nearby-places-list' container item xs={12} md={6}>
          <h3> Nearby Places</h3>
          {
            nearByBusinesses?.slice(0, 5)?.map(business => {
              return <Grid e2e-nearby-business={business.id} className='nearby-place-item' item xs={12} key={business.id} onClick={() => navigateToDetails(business.id)}>
                <BusinessCard name={business.name} description={business.description} />
              </Grid>
            })
          }
        </Grid>
      </Grid>}



    </div>
  );
}

export default LoadingHoc(BusinessView);
