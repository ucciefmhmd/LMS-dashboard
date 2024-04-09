import { NgModule } from '@angular/core';
import { FormQuestionComponent } from './form-question.component';
import { RouterModule } from '@angular/router';



@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: FormQuestionComponent }]),
    ],
    exports: [RouterModule],
})
export class FormQuestionRoutingModule {}
