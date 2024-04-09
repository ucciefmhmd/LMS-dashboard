import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentDetailsComponent } from './student-details.component';



@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: StudentDetailsComponent }]),
    ],
    exports: [RouterModule],
})
export class StudentDetailsRoutingModule {}
