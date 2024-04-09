import { Component, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from '../../API-Services/student.service';
import { InstructorService } from '../../API-Services/instructor.service';
import { CourseService } from '../../API-Services/course.service';
import { ExamService } from '../exam/exam.service';
import { SubadminService } from '../../API-Services/subadmin.service';
import { QuestionService } from '../../API-Services/question.service';
import { EventService } from '../../API-Services/event.service';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
    id: any;
    objectType: string;
    itemDeleted: EventEmitter<void> = new EventEmitter<void>();
    constructor(
        private dialogRef: MatDialogRef<PopupComponent>,
        private stdServices: StudentService,
        private instructorService: InstructorService,
        private examServices: ExamService,
        private courseService: CourseService,
        private subadminServices: SubadminService,
        private quesServices: QuestionService,
        private eventServices: EventService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.id = data.id;
        this.objectType = data.objectType;
    }

    closePopup() {
        this.dialogRef.close();
    }

    confirmDelete() {
        switch (this.objectType) {
            case 'student':
                this.stdServices.Delete(this.id).subscribe(() => {
                    this.itemDeleted.emit();
                });
                break;
            case 'instructor':
                this.instructorService.Delete(this.id).subscribe(() => {
                    this.itemDeleted.emit();
                });
                break;
            case 'exam':
                this.examServices.Delete(this.id).subscribe(() => {
                    this.itemDeleted.emit();
                });
                break;
            case 'course':
                this.courseService.Delete(this.id).subscribe(() => {
                    this.itemDeleted.emit();
                });
                break;
            case 'question':
                this.quesServices.Delete(this.id).subscribe(() => {
                    this.itemDeleted.emit();
                });
                break;
            case 'event':
                this.eventServices.Delete(this.id).subscribe(() => {
                    this.itemDeleted.emit();
                });
                break;
            case 'subadmin':
                this.subadminServices.Delete(this.id).subscribe(() => {
                    this.itemDeleted.emit();
                });
                break;
            default:
                break;
        }
        this.closePopup();
    }
}
