import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IStudent } from '../../Model/istudent';
import { StudentService } from '../../API-Services/student.service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './student.component.html',
    styleUrl: './student.component.scss',
    providers: [MessageService, ConfirmationService],
})
export class StudentComponent implements OnInit {
    students: IStudent[] | undefined;

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private stdServices: StudentService) {}

    ngOnInit() {
        this.loadStudents();
        this.stdServices.newStudentAdded.subscribe(() => {
            this.loadStudents();
        });
        // @ts-ignore
        //this.students.forEach((std) => (std.date = new Date(std.date)));
    }

    loadStudents() {
        this.stdServices.getAllData().subscribe((data) => {
            this.students = data;
            this.loading = false;
        });
    }

    remove(id: any): void {
        console.log(id);
        this.stdServices.Delete(id).subscribe(() => {
            this.loadStudents();
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
