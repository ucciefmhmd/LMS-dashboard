import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupAddCourseComponent } from './popup-add-course.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [PopupAddCourseComponent],
    imports: [CommonModule, MatDialogModule, MatFormFieldModule,MatSelectModule,ReactiveFormsModule],
})
export class PopupAddCourseModule {}
