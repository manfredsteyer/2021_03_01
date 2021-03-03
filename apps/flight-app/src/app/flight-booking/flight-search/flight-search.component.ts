/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {Component, OnInit} from '@angular/core';
import {FlightService} from '@flight-workspace/flight-lib';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { flightsLoaded, loadFlights, loadFlightsError, updateFlight } from '../+state/flight-booking.actions';
import { FlightBookingAppStateSlice, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import { selectFlights, selectFlights2 } from '../+state/flight-booking.selectors';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  flights$ = this.store.select(selectFlights2);

  constructor(
    private actions$: Actions,
    private store: Store<FlightBookingAppStateSlice>,
    private flightService: FlightService) {

      actions$.pipe(
        ofType(loadFlightsError)).subscribe(a => {
          // show toast, etc.
        });

  }

  ngOnInit() {
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.store.dispatch(loadFlights({from: this.from, to: this.to, urgent: this.urgent}));
    
  }

  delay(): void {

    this.flights$.pipe(first()).subscribe(f => {

      const flight = {...f[0], date: new Date().toISOString()};
      this.store.dispatch(updateFlight({flight}))

    })

  }

}
