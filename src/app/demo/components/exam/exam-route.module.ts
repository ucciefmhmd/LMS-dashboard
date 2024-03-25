import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExamComponent } from './exam.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ExamComponent }])],
    exports: [RouterModule],
})
export class ExamRouteModule {}
