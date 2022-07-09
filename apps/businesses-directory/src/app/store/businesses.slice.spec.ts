import {
  fetchBusinesses,
  businessesAdapter,
  businessesReducer,
} from './businesses.slice';

describe('businesses reducer', () => {
  it('should handle initial state', () => {
    const expected = businessesAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(businessesReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchBusinessess', () => {
    let state = businessesReducer(
      undefined,
      fetchBusinesses.pending(null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = businessesReducer(
      state,
      fetchBusinesses.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = businessesReducer(
      state,
      fetchBusinesses.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
