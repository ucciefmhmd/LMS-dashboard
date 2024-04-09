import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventDetailsComponent } from './event-details.component';



@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: EventDetailsComponent }]),
    ],
    exports: [RouterModule],
})
export class EventDetailsRoutingModule { }
