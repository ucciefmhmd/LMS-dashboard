import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IInstrcutor } from '../../Model/iinstrcutor';
import { InstructorService } from '../../API-Services/instructor.service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
  templateUrl: './instructor.component.html',
  providers: [MessageService, ConfirmationService]
})
export class InstructorComponent implements OnInit{
    instrcutors: IInstrcutor[] | undefined;

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private instServices: InstructorService) {
    }

    ngOnInit() {
        this.instServices.getAllData().subscribe(data => {
            this.instrcutors = data;
            this.loading = false;

            // @ts-ignore
            this.instrcutors.forEach(inst => inst.date = new Date(inst.date));
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
