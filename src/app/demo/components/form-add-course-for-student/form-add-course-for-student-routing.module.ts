import { NgModule } from '@angular/core';
import { FormAddCourseForStudentComponent } from './form-add-course-for-student.component';
import { RouterModule } from '@angular/router';



@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: FormAddCourseForStudentComponent }]),
    ],
    exports: [RouterModule],
})
export class FormAddCourseForStudentRoutingModule {}
