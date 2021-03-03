import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardingListEffects } from './+state/boarding-list/boarding-list.effects';
import * as fromBoardingList from './+state/boarding-list/boarding-list.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(fromBoardingList.BOARDINGLIST_FEATURE_KEY, fromBoardingList.reducer), EffectsModule.forFeature([BoardingListEffects])],
})
export class BoardingDomainModule {}
