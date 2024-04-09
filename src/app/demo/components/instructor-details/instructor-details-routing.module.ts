import { InstructorDetailsComponent } from './instructor-details.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';



@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: InstructorDetailsComponent }]),
    ],
    exports: [RouterModule],
})
export class InstructorDetailsRoutingModule {}
