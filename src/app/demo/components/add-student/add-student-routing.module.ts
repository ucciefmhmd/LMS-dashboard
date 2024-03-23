import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddStudentComponent } from './add-student.component';


@NgModule({
  imports: [ RouterModule.forChild([
		{ path: '', component: AddStudentComponent }
	])],
  exports: [RouterModule]
})
export class AddStudentRoutingModule { }
