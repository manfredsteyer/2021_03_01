import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import { FlightService } from '@flight-workspace/flight-lib';
import { flightsLoaded, loadFlights } from './flight-booking.actions';


@Injectable()
export class FlightBookingEffects
 {

  loadFlightBookings$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(loadFlights),
      switchMap(a => this.flightService.find(a.from, a.to, a.urgent)),
      map(flights => flightsLoaded({flights}))
    );
  });


  constructor(private flightService: FlightService, private actions$: Actions) {}

}
