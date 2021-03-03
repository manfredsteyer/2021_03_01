import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Luaggage } from '../entities/luaggage';
import { LuaggageDataService } from '../infrastructure/luaggage.data.service';


@Injectable({ providedIn: 'root' })
export class CheckinFacade {

    private luaggageListSubject = new BehaviorSubject<Luaggage[]>([]); 
    luaggageList$ = this.luaggageListSubject.asObservable();

    constructor(private luaggageDataService: LuaggageDataService) {
    }

    load(): void {
        this.luaggageDataService.load().subscribe(
            luaggageList => {
                this.luaggageListSubject.next(luaggageList)
            },
            err => {
                console.error('err', err);
            }
        );
    }

}
