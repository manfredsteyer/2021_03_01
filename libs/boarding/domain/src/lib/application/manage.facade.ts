import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { loadBoardingList, loadBoardingListSuccess } from '../+state/boarding-list/boarding-list.actions';

import * as fromBoardingList from '../+state/boarding-list/boarding-list.reducer';
import * as BoardingListSelectors from '../+state/boarding-list/boarding-list.selectors';
import { BoardingList } from '../entities/boarding-list';
import { BoardingListDataService } from '../infrastructure/boarding-list.data.service';

// @Injectable({ providedIn: 'root' })
// export class ManageFacade {
//   loaded$ = this.store.pipe(select(BoardingListSelectors.getBoardingListLoaded));
//   boardingListList$ = this.store.pipe(select(BoardingListSelectors.getAllBoardingList));
//   selectedBoardingList$ = this.store.pipe(select(BoardingListSelectors.getSelected));

//   constructor(private store: Store<fromBoardingList.BoardingListPartialState>) { }

//   load() {
//     this.store.dispatch(loadBoardingList());
//   }
// }


// @Injectable({ providedIn: 'root' })
// export class ManageFacade {
//   loaded$ = this.store.pipe(select(BoardingListSelectors.getBoardingListLoaded));
//   boardingListList$ = this.store.pipe(select(BoardingListSelectors.getAllBoardingList));
//   selectedBoardingList$ = this.store.pipe(select(BoardingListSelectors.getSelected));

//   constructor(
//     private boardingListService: BoardingListDataService,
//     private store: Store<fromBoardingList.BoardingListPartialState>) { }

//   load() {
//     this.boardingListService.load().subscribe(
//       bl => this.store.dispatch(loadBoardingListSuccess({boardingList : bl}))
//     )
//   }
// }


// @Injectable({ providedIn: 'root' })
// export class ManageFacade {
//   //loaded$ = this.store.pipe(select(x => x.that.this.bla.blubb));

//   loaded$ = this.store.pipe(select(BoardingListSelectors.getBoardingListLoaded));
//   boardingListList$ = this.store.pipe(select(BoardingListSelectors.getAllBoardingList));
//   selectedBoardingList$ = this.store.pipe(select(BoardingListSelectors.getSelected));

//   constructor(
//     private boardingListService: BoardingListDataService,
//     private store: Store<fromBoardingList.BoardingListPartialState>) { }

//   load() {
//     this.boardingListService.load().subscribe(
//       bl => this.store.dispatch(loadBoardingListSuccess({boardingList : bl}))
//     )
//   }
// }


@Injectable({ providedIn: 'root' })
export class ManageFacade {
  //loaded$ = this.store.pipe(select(x => x.that.this.bla.blubb));

  loaded$ = this.store.pipe(select(BoardingListSelectors.getBoardingListLoaded));
  selectedBoardingList$ = this.store.pipe(select(BoardingListSelectors.getSelected));

  private boardingListSubject = new BehaviorSubject<BoardingList[]>([]);
  boardingListList$ = this.boardingListSubject.asObservable();

  constructor(
    private boardingListService: BoardingListDataService,
    private store: Store<fromBoardingList.BoardingListPartialState>) { }

  load() {
    this.boardingListService.load().subscribe(
      bl => this.boardingListSubject.next(bl)
    );
  }
}