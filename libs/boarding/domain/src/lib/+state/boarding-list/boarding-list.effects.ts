import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as BoardingListActions from './boarding-list.actions';
import { BoardingListDataService } from '../../infrastructure/boarding-list.data.service';

@Injectable()
export class BoardingListEffects {
  loadBoardingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardingListActions.loadBoardingList),
      switchMap((action) =>
        this.boardingListDataService.load().pipe(
          map((boardingList) =>
            BoardingListActions.loadBoardingListSuccess({ boardingList })
          ),
          catchError((error) =>
            of(BoardingListActions.loadBoardingListFailure({ error }))
          )
        )
      )
    )
  );

 constructor(
   private actions$: Actions,
   private boardingListDataService: BoardingListDataService
  ) { }
}
