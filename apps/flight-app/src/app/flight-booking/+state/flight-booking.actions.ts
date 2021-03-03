import { Flight } from '@flight-workspace/flight-lib';
import { createAction, props } from '@ngrx/store';

export const flightsLoaded = createAction(
  '[FlightBooking] flightsLoaded',  
  props<{flights: Flight[]}>()
);

export const loadFlights = createAction(
  '[FlightBooking] loadFlights',  
  props<{from: string, to: string, urgent: boolean}>()
);

export const updateFlight = createAction(
  '[FlightBooking] updateFlight',  
  props<{flight: Flight}>()
);

export const loadFlightsError = createAction(
  '[FlightBooking] loadFlightsError',  
  props<{error: string}>()
);