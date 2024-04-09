import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    EventEmitter,
} from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IStudent } from '../../Model/istudent';
import { StudentService } from '../../API-Services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

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

    isOpen: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private stdServices: StudentService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.loadStudents();
        this.stdServices.newStudentAdded.subscribe(() => {
            this.loadStudents();
        });
    }

    loadStudents() {
        this.stdServices.getAllData().subscribe((data) => {
            this.students = data;
            this.loading = false;
        });
    }

    openPopup(studentID: number) {
        const dialogRef = this.dialog.open(PopupComponent, {
            width: '400px',
            height: '230px',
            data: { id: studentID, objectType: 'student' },
        });

         dialogRef.componentInstance.itemDeleted.subscribe(() => {
             this.loadStudents();
         });
    }

    // remove(id: any): void {
    //     console.log(id);
    //     this.stdServices.Delete(id).subscribe(() => {
    //         this.loadStudents();
    //     });
    // }

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
