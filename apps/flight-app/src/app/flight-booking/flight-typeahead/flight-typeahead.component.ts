import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  subscription: Subscription;

  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;
  destroy$ = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.rxjsDemo();

    // Result stream
    this.flights$ =
      // Trigger
      // State provider
      this.control.valueChanges.pipe(
        // Filtering operators
        filter(city => city.length > 2),
        debounceTime(300),
        distinctUntilChanged(),
        // Side Effect
        tap(_ => this.loading = true),
        // State provider
        switchMap(city => this.load(city)),
        // delay(1_000),
        tap(_ => this.loading = false),
        // Completion
        takeUntil(this.destroy$)
      ).pipe(

      );
  }

  load(from: string): Observable<Flight[]>  {
    const url = 'http://www.angular.at/api/flight';

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }

  rxjsDemo(): void {
    this.timer$ = timer(0, 2_000)
      .pipe(
        tap(value => console.log('comes from pipe', value)),
        // share()
      );
    // this.subscription = this.timer$.subscribe(console.log);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
    this.destroy$.next(false);
  }
}
