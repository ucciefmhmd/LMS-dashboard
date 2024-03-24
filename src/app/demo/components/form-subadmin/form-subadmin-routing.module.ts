import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormSubadminComponent } from './form-subadmin.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: FormSubadminComponent }])],
        exports: [RouterModule],
    
})
export class FormSubadminRoutingModule { }
