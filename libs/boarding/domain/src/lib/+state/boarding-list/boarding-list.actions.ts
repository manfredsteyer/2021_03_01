import { createAction, props } from '@ngrx/store';
import { BoardingList } from '../../entities/boarding-list';

export const loadBoardingList = createAction(
  '[BoardingList] Load BoardingList'
);

export const loadBoardingListSuccess = createAction(
  '[BoardingList] Load BoardingList Success',
  props<{ boardingList: BoardingList[] }>()
);

export const loadBoardingListFailure = createAction(
  '[BoardingList] Load BoardingList Failure',
  props<{ error: any }>()
);
