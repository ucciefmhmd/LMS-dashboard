import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IInstructor } from '../../Model/iinstructor';
import { InstructorService } from '../../API-Services/instructor.service';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './instructor.component.html',
    styleUrls: ['./instructor.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class InstructorComponent implements OnInit {
    instructors: IInstructor[] | undefined;

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    loading: boolean = true;

    showFullExperience: { [key: number]: boolean } = {};

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private instServices: InstructorService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.loadInstructor();
        this.instServices.newInstrcutorAdded.subscribe(() => {
            this.loadInstructor();
        });
        // @ts-ignore
        //this.instrcutors.forEach((inst) => (inst.date = new Date(inst.date)));
    }

    toggleExperience(instId: number) {
        this.showFullExperience[instId] = !this.showFullExperience[instId];
    }

    loadInstructor() {
        this.instServices.getAllData().subscribe((data) => {
            this.instructors = data;
            this.loading = false;
        });
    }

    openPopup(instID: number) {
        const dialogRef = this.dialog.open(PopupComponent, {
            width: '400px',
            height: '230px',
            data: { id: instID, objectType: 'instructor' },
        });
        dialogRef.componentInstance.itemDeleted.subscribe(() => {
            this.loadInstructor();
        });
    }

    // remove(id: any): void {
    //     console.log(id);
    //     this.instServices.Delete(id).subscribe(() => {
    //         this.loadInstructor();
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
