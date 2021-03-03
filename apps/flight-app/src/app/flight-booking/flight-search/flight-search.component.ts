/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Flight } from '@flight-workspace/flight-lib';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { loadFlights, loadFlightsError, updateFlight } from '../+state/flight-booking.actions';
import { FlightBookingAppStateSlice } from '../+state/flight-booking.reducer';
import { selectFlights } from '../+state/flight-booking.selectors';


export interface Filter {
  from: string;
  to: string;
  urgent: boolean;
}

export interface LocalState {
  flights: Flight[];
  filters: Filter[];
}

export const initalLocalState: LocalState = {
  flights: [],
  filters: []
}


@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  providers: [
    ComponentStore
  ]
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  addFilter = this.localStore.updater(
    (state, filter: Filter) => ({
      ...state,
      filters: [
        ...state.filters,
        filter
      ]
    })
  );

  updateFlights = this.localStore.updater(
    (state, flights: Flight[]) => ({
      ...state,
      flights
    })
  );

  selectFilters$ = this.localStore.select(
    // Selectors
    // Projector
    state => state.filters
  );
  selectFlights$ = this.localStore.select(state => state.flights);
  selectCurrentFilter$ = this.localStore.select(
    state => state.filters[state.filters.length - 1]
  );

  searchFlights = this.localStore.effect(
    (filterChange$: Observable<Filter>) =>
      filterChange$.pipe(tap((filter: Filter) =>
        this.globalStore.dispatch(
          loadFlights(filter)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private localStore: ComponentStore<LocalState>,
    private globalStore: Store<FlightBookingAppStateSlice>) {

      actions$.pipe(
        ofType(loadFlightsError)).subscribe(a => {
          // show toast, etc.
        });

  }

  ngOnInit() {
    this.localStore.setState(initalLocalState);

    this.updateFlights(
      this.globalStore.select(selectFlights)
    );

    this.searchFlights(this.selectCurrentFilter$);
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.addFilter({ from: this.from, to: this.to, urgent: this.urgent });
  }

  delay(): void {

    this.selectFlights$.pipe(first()).subscribe(f => {

      const flight = {...f[0], date: new Date().toISOString()};
      this.globalStore.dispatch(updateFlight({flight}))

    })

  }

}
