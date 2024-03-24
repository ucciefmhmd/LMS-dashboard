import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ISubadmin } from '../../Model/isubadmin';
import { SubadminService } from '../../API-Services/subadmin.service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './subadmin.component.html',
    providers: [MessageService, ConfirmationService],
})
export class SubadminComponent implements OnInit {
    subadmins: ISubadmin[] | undefined;

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private subadminServices: SubadminService) {}

    ngOnInit() {
        this.loadSubadmin();
        this.subadminServices.newSubadminAdded.subscribe(() => {
            this.loadSubadmin();
        });
    }

    loadSubadmin() {
        this.subadminServices.getAllData().subscribe((data) => {
            this.subadmins = data;
            this.loading = false;
        });
    }

    remove(id: any): void {
        console.log(id);
        this.subadminServices.Delete(id).subscribe(() => {
            this.loadSubadmin();
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
