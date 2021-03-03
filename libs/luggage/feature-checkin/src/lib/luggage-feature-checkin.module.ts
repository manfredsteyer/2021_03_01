import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuggageDomainModule } from '@flight-workspace/luggage/domain';
import { CheckinComponent } from './checkin.component';

//import { FlightLibModule } from '@flight-workspace/flight-lib';

@NgModule({
  imports: [CommonModule, LuggageDomainModule],
  declarations: [CheckinComponent],
  exports: [CheckinComponent],
})
export class FeatureCheckinModule {}
