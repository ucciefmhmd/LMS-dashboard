import { CountryService } from './../../service/country.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICourse, } from '../../Model/icourse';
import { CourseService } from '../../API-Services/course.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class CourseComponent implements OnInit {
    Courses: ICourse[] | undefined;

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    loading: boolean = true;

    showFullDescription: { [key: number]: boolean } = {};

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private courseService: CourseService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.loadEvents();
        this.courseService.newCourseAdded.subscribe(() => {
            this.loadEvents();
        });
    }

    toggleDescription(courseId: number) {
        this.showFullDescription[courseId] =
            !this.showFullDescription[courseId];
    }

    loadEvents() {
        this.courseService.getAllData().subscribe((data) => {
            this.Courses = data;
            this.loading = false;
        });
    }

    openPopup(courseID: number) {
        const dialogRef = this.dialog.open(PopupComponent, {
            width: '400px',
            height: '230px',
            data: { id: courseID, objectType: 'course' },
        });

        dialogRef.componentInstance.itemDeleted.subscribe(() => {
            this.loadEvents();
        });
    }

    onFileSelected(event: any, courseID:number) {
        const file: File = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('imageFile', file);
            console.log(formData);

            const courseId = courseID;
            if (courseId) {
                this.courseService.EditPhoto(courseId, formData).subscribe(
                    (response) => {
                        console.log('Photo upload successful', response);
                        window.location.reload();
                    },
                    (error) => {
                        console.error('Photo upload failed', error);
                    }
                );
            } else {
                console.error('course ID is missing.');
            }
        }
    }

    // remove(id: any): void {
    //     console.log(id);
    //     this.courseService.Delete(id).subscribe(() => {
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
