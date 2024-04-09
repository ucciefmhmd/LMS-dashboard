import { StudentService } from './../../API-Services/student.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ExamService } from './exam.service';
import { CourseService } from '../../API-Services/course.service';
import { IExam } from './iexam';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

interface expandedRows {
    [key: string]: boolean;
}
@Component({
    templateUrl: './exam.component.html',
    providers: [MessageService, ConfirmationService],
})
export class ExamComponent implements OnInit {
    exams: IExam[] | undefined;
    // ExamOfCourses: string[];
    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private examService: ExamService,
        private courseServices: CourseService,
        private stdServices: StudentService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
         this.loadexam();
        this.examService.newExamAdded.subscribe(() => {
            this.loadexam();
        });
    }

    loadexam() {
        this.examService.getAllData().subscribe((examData) => {
            this.exams = examData;
            console.log(this.exams);

            this.exams.forEach((exam: IExam) => {
                this.courseServices
                    .getById(exam.course_ID)
                    .subscribe((courseData) => {
                        this.loading = false;
                        exam.courseName = courseData.name;
                    });
            });
        });
    }

    openPopup(examID: number) {
        const dialogRef = this.dialog.open(PopupComponent, {
            width: '400px',
            height: '230px',
            data: { id: examID, objectType: 'exam' },
        });

         dialogRef.componentInstance.itemDeleted.subscribe(() => {
             this.loadexam();
         });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
