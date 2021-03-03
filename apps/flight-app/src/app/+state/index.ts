import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';


export interface State {

}

export const reducers: ActionReducerMap<State> = {
  // x: xRuducer
  // y: yReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
