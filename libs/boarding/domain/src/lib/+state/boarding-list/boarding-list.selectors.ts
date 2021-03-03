import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BOARDINGLIST_FEATURE_KEY, State, BoardingListPartialState, boardingListAdapter } from './boarding-list.reducer';

// Lookup the 'BoardingList' feature state managed by NgRx
export const getBoardingListState = createFeatureSelector<BoardingListPartialState, State>(BOARDINGLIST_FEATURE_KEY);

const { selectAll, selectEntities } = boardingListAdapter.getSelectors();

export const getBoardingListLoaded = createSelector(
  getBoardingListState,
  (state: State) => state.loaded
);

export const getBoardingListError = createSelector(
  getBoardingListState,
  (state: State) => state.error
);

export const getAllBoardingList = createSelector(
  getBoardingListState,
  (state: State) => selectAll(state)
);

export const getBoardingListEntities = createSelector(
  getBoardingListState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getBoardingListState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getBoardingListEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
