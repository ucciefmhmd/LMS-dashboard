import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InstructorComponent } from './instructor.component';



@NgModule({
  imports: [ RouterModule.forChild([
		{ path: '', component: InstructorComponent }
	])],
  exports: [RouterModule]
})
export class InstrcutorRoutingModule { }
