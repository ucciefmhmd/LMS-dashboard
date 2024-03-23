import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubadminComponent } from './subadmin.component';



@NgModule({
  imports: [ RouterModule.forChild([
		{ path: '', component: SubadminComponent }
	])],
  exports: [RouterModule]
})
export class SubadminRoutingModule { }
