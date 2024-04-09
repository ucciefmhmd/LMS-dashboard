import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../API-Services/student.service';
import { IStudent } from '../../Model/istudent';
import { InstructorService } from '../../API-Services/instructor.service';
import { IInstructor } from '../../Model/iinstructor';
import { Observable, forkJoin } from 'rxjs';

import { IExam } from '../exam/iexam';
import { EventService } from '../../API-Services/event.service';
import { IEvent } from '../../Model/ievent';
import { MatDialog } from '@angular/material/dialog';

@Component({
    templateUrl: './student-details.component.html',
    styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
    StudentData: IStudent;
    instructors: IInstructor[];
    uniqueInstructorNames: string[];
    studentID: number;
    examData: IExam[];
    examCourse: string[] = [];
    loading: boolean = true;
    matchingElements: number[];
    course_IDs: number[];
    matchCourse: string[];
    eventsData: IEvent[];
    instName: string[];

    constructor(
        private actRoute: ActivatedRoute,
        private stdServices: StudentService,
        private instServices: InstructorService,
        private eventServices: EventService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.actRoute.params.subscribe((params) => {
            this.studentID = +params['id'];

            this.stdServices.getById(this.studentID).subscribe(
                (data) => {
                    this.StudentData = data;

                    console.log(this.StudentData);

                    // this.StudentData.instructorIDs.forEach((instID) => {
                    //     this.instServices.getById(instID).subscribe((data) => {
                    //         this.instName.push(data.name);
                    //     });
                    // });

                    // console.log(this.instName);
                    const requests = this.StudentData.instructorIDs.map(
                        (instID) => this.instServices.getById(instID)
                    );
                    forkJoin(requests).subscribe(
                        (data: any[]) => {
                            this.instName = data.map((inst) => inst.name);
                            console.log(this.instName);
                        },
                        (error) => {
                            console.error(
                                'Error fetching instructor data:',
                                error
                            );
                        }
                    );

                    if (this.StudentData && this.StudentData.courseIDs) {
                        const courseIds: number[] = this.StudentData.courseIDs;

                        if (courseIds.length > 0) {
                            const eventRequests: Observable<IEvent[]>[] = [];

                            courseIds.forEach((courseId) => {
                                eventRequests.push(
                                    this.eventServices.getByCourseId(courseId)
                                );
                            });

                            forkJoin(eventRequests).subscribe(
                                (eventsList: IEvent[][]) => {
                                    const allEvents: IEvent[] =
                                        eventsList.flat();
                                    this.eventsData = allEvents;
                                    console.log(this.eventsData);
                                },
                                (error) => {
                                    console.error(
                                        'Error fetching events:',
                                        error
                                    );
                                }
                            );
                        }
                    }

                    this.loading = false;
                },
                (error) => {
                    console.error('Error fetching student data:', error);
                    this.loading = false;
                }
            );
        });
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('imageFile', file);
            console.log(formData);

            const studentId = this.studentID;
            if (studentId) {
                this.stdServices.EditPhoto(studentId, formData).subscribe(
                    (response) => {
                        console.log('Photo upload successful', response);
                        window.location.reload();
                    },
                    (error) => {
                        console.error('Photo upload failed', error);
                    }
                );
            } else {
                console.error('Student ID is missing.');
            }
        }
    }
}
