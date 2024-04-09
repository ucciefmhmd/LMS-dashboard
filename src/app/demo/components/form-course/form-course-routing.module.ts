import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormCourseComponent } from './form-course.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: FormCourseComponent }]),
    ],
    exports: [RouterModule],
})
export class FormCourseRoutingModule {}
