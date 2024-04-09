import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormEventComponent } from './form-event.component';



@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: FormEventComponent }]),
    ],
    exports: [RouterModule],
})
export class FormEventRoutingModule {}
