import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IInstructor } from '../../Model/iinstructor';
import { InstructorService } from '../../API-Services/instructor.service';
import { IExam } from './iexam';
import { ExamService } from './exam.service';

interface expandedRows {
    [key: string]: boolean;
}
@Component({
    templateUrl: './exam.component.html',
    providers: [MessageService, ConfirmationService],
})
export class ExamComponent implements OnInit {
    exams: IExam[] | undefined;

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private examService: ExamService) {}

    ngOnInit() {
        this.loadexam();
        this.examService.newInstrcutorAdded.subscribe(() => {
            this.loadexam();
        });
        // @ts-ignore
        //this.instrcutors.forEach((inst) => (inst.date = new Date(inst.date)));
    }

    loadexam() {
        this.examService.getAllData().subscribe((data) => {
            this.exams = data;
            this.loading = false;
        });
    }

    remove(id: any): void {
        console.log(id);
        this.examService.Delete(id).subscribe(() => {
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
