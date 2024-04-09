import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ISubadmin } from '../../Model/isubadmin';
import { SubadminService } from '../../API-Services/subadmin.service';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

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

    constructor(
        private subadminServices: SubadminService,
        private dialog: MatDialog
    ) {}

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

    openPopup(sunadminID: number) {
        const dialogRef = this.dialog.open(PopupComponent, {
            width: '400px',
            height: '230px',
            data: { id: sunadminID, objectType: 'subadmin' },
        });

        dialogRef.componentInstance.itemDeleted.subscribe(() => {
            this.loadSubadmin();
        });
    }

    onFileSelected(event: any , subadminID:number) {
        const file: File = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('imageFile', file);
            console.log(formData);

            console.log(subadminID);


             const subadminId = subadminID;
            if (subadminId) {
                this.subadminServices.EditPhoto(subadminId, formData).subscribe(
                    (response) => {
                        console.log('Photo upload successful', response);
                        window.location.reload();
                    },
                    (error) => {
                        console.error('Photo upload failed', error);
                    }
                );
            } else {
                console.error('Subadmin ID is missing.');
            }
        }
    }

    // remove(id: any): void {
    //     console.log(id);
    //     this.subadminServices.Delete(id).subscribe(() => {
    //         this.loadSubadmin();
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
