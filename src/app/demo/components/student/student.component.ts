import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { IStudent } from '../../Model/istudent';
import { StudentService } from '../../API-Services/student.service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
  templateUrl: './student.component.html',
  providers: [MessageService, ConfirmationService]
})


export class StudentComponent implements OnInit{

    students: IStudent[] | undefined;

    items: MenuItem[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private stdServices: StudentService, private confirmationService: ConfirmationService) {
    }

    ngOnInit() {


        this.stdServices.getAllData().subscribe(data => {
            this.students = data;
            this.loading = false;

            // @ts-ignore
            this.students.forEach(std => std.date = new Date(std.date));
        });

        this.items = [
                        { label: 'Edit', icon: 'pi pi-pencil', command: () => this.edit() },
                        ...this.students.map(student => {
                            return {
                                label: 'Delete',
                                icon: 'pi pi-trash',
                                command: () => this.remove(student.id)
                            };
                        })
                    ];


    }


    edit() {

    }

    remove(id: any): void {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this student?',
            accept: () => {
                this.stdServices.Delete(id).subscribe(() => {
                    this.refreshData();
                });
            }
        });
    }

    refreshData() {
        // Refreshing data after deletion
        this.stdServices.getAllData().subscribe(data => {
            this.students = data;
            this.loading = false;
        });
    }
        onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }



}
