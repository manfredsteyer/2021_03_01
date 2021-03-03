import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as BoardingListActions from './boarding-list.actions';
import { BoardingList } from '../../entities/boarding-list';

export const BOARDINGLIST_FEATURE_KEY = 'boardingList';

export interface State extends EntityState<BoardingList> {
  selectedId ?: string | number;          // which BoardingList record has been selected
  loaded      : boolean;                  // has the BoardingList list been loaded
  error      ?: string | null;            // last known error (if any)
}

export interface BoardingListPartialState {
  readonly [BOARDINGLIST_FEATURE_KEY]: State;
}

export const boardingListAdapter: EntityAdapter<BoardingList> = createEntityAdapter<BoardingList>();

export const initialState: State = boardingListAdapter.getInitialState({
  // set initial required properties
  loaded : false
});

const boardingListReducer = createReducer(
  initialState,
  on(BoardingListActions.loadBoardingList,
    state => ({ ...state, loaded: false, error: null })
  ),
  on(BoardingListActions.loadBoardingListSuccess,
    (state, { boardingList }) => boardingListAdapter.upsertMany(boardingList, { ...state, loaded: true })
  ),
  on(BoardingListActions.loadBoardingListFailure,
    (state, { error }) => ({ ...state, error })
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return boardingListReducer(state, action);
}
