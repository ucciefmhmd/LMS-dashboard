import { EventService } from '../../API-Services/event.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IEvent } from '../../Model/ievent';
import { Table } from 'primeng/table';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Pipe, PipeTransform } from '@angular/core';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './event.component.html',
    styleUrl: './event.component.scss',

    providers: [MessageService, ConfirmationService],
})
export class EventComponent implements OnInit {
    Events: IEvent[] | undefined;

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    loading: boolean = true;
    showFullDescription: { [key: number]: boolean } = {};

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private eventService: EventService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.loadEvents();
        this.eventService.newEventAdded.subscribe(() => {
            this.loadEvents();
        });
    }

    loadEvents() {
        this.eventService.getAllData().subscribe((data) => {
            this.Events = data;
            this.loading = false;
        });
    }

    toggleDescription(eventId: number) {
        this.showFullDescription[eventId] = !this.showFullDescription[eventId];
    }

    shortenLink(link: string): string {
        const maxLength = 20;
        if (link.length <= maxLength) {
            return link;
        } else {
            return link.substr(0, maxLength - 3) + '...';
        }
    }

    openPopup(eventID: number) {
        const dialogRef = this.dialog.open(PopupComponent, {
            width: '400px',
            height: '230px',
            data: { id: eventID, objectType: 'event' },
        });

        dialogRef.componentInstance.itemDeleted.subscribe(() => {
            this.loadEvents();
        });
    }

    // remove(id: any): void {
    //     console.log(id);
    //     this.eventService.Delete(id).subscribe(() => {
    //         this.loadEvents();
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
