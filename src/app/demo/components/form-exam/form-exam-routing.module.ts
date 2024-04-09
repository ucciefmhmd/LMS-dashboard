import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormExamComponent } from './form-exam.component';



@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: FormExamComponent }]),
    ],
    exports: [RouterModule],
})
export class FormExamRoutingModule {}
