import { NgModule } from '@angular/core';
import { ExamDetailsComponent } from './exam-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: ExamDetailsComponent }]),
    ],
    exports: [RouterModule],
})
export class ExamDetailsRoutingModule {}
