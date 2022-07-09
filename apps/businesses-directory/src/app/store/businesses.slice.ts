import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const BUSINESSES_FEATURE_KEY = 'businesses';

/*
 * Update these interfaces according to your requirements.
 */
export interface BusinessesEntity {
  id: number;
}

export interface BusinessesState extends EntityState<BusinessesEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const businessesAdapter = createEntityAdapter<BusinessesEntity>();

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
  'businesses/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getBusinessess()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialBusinessesState: BusinessesState = businessesAdapter.getInitialState(
  {
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
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinesses.pending, (state: BusinessesState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchBusinesses.fulfilled,
        (state: BusinessesState, action: PayloadAction<BusinessesEntity[]>) => {
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
const { selectAll, selectEntities } = businessesAdapter.getSelectors();

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
