import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseComponent } from './course.component';



@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: CourseComponent }]),
    ],
    exports: [RouterModule],
})
export class CourseRoutingModule {}
