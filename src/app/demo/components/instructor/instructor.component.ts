import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IInstructor } from '../../Model/iinstructor';
import { InstructorService } from '../../API-Services/instructor.service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './instructor.component.html',
    providers: [MessageService, ConfirmationService],
})
export class InstructorComponent implements OnInit {
    instructors: IInstructor[] | undefined;

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private instServices: InstructorService) {}

    ngOnInit() {
        this.loadInstructor();
        this.instServices.newInstrcutorAdded.subscribe(() => {
            this.loadInstructor();
        });
        // @ts-ignore
        //this.instrcutors.forEach((inst) => (inst.date = new Date(inst.date)));
    }

    loadInstructor() {
        this.instServices.getAllData().subscribe((data) => {
            this.instructors = data;
            this.loading = false;
        });
    }

    remove(id: any): void {
        console.log(id);
        this.instServices.Delete(id).subscribe(() => {
            this.loadInstructor();
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
