import { BusinessType } from '@dev-ocean/api-types';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const BUSINESSES_FEATURE_KEY = 'businesses';

export interface BusinessesState extends EntityState<BusinessType> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const businessesAdapter = createEntityAdapter<BusinessType>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchBusinesses())
 * }, [dispatch]);
 * ```
 */
export const fetchBusinesses = createAsyncThunk(
  'businesses/fetchBusinesses',
  async () => {
    const response = await fetch(
      'https://feinterviewtask.azurewebsites.net/b/6231abada703bb67492d2b8f'
    ).then((response) => response.json());

    return response;
  }
);

export const initialBusinessesState: BusinessesState = businessesAdapter.getInitialState(
  {
    // businesses: [],
    loadingStatus: 'not loaded',
    error: null,
  }
);

export const businessesSlice = createSlice({
  name: BUSINESSES_FEATURE_KEY,
  initialState: initialBusinessesState,
  reducers: {
    add: businessesAdapter.addOne,
    remove: businessesAdapter.removeOne,
    //...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinesses.pending, (state: BusinessesState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchBusinesses.fulfilled,
        (state: BusinessesState, action: PayloadAction<BusinessType[]>) => {
          businessesAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchBusinesses.rejected, (state: BusinessesState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const businessesReducer = businessesSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(businessesActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const businessesActions = businessesSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllBusinesses);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const {
  selectAll,
  selectEntities,
  selectById,
} = businessesAdapter.getSelectors();

export const getBusinessesState = (rootState: unknown): BusinessesState =>
  rootState[BUSINESSES_FEATURE_KEY];

export const selectAllBusinesses = createSelector(
  getBusinessesState,
  selectAll
);

export const selectBusinessesEntities = createSelector(
  getBusinessesState,
  selectEntities
);

export const selectBusinessById = (id) => {
  return createSelector(getBusinessesState, (state) => selectById(state, id));
};

export const selectNearByBusinesses = (city) => {
  return createSelector(selectAllBusinesses, (state: BusinessType[]) => {
    return state.filter((business) => {
      return business?.address?.city === city;
    });
  });
};
