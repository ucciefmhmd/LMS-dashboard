import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormInstructorComponent } from './form-instructor.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: FormInstructorComponent }])],
    exports: [RouterModule],
})
export class FormInstructorRoutingModule {}
