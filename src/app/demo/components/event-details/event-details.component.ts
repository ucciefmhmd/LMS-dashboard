import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../API-Services/instructor.service';
import { ActivatedRoute } from '@angular/router';
import { IInstructor } from '../../Model/iinstructor';
import { CourseService } from '../../API-Services/course.service';
import { EventService } from '../../API-Services/event.service';
import { IEvent } from '../../Model/ievent';
import { ICourse } from '../../Model/icourse';

@Component({
    templateUrl: './event-details.component.html',
    styleUrl: './event-details.component.scss',
})
export class EventDetailsComponent implements OnInit {
    loading: boolean = true;
    eventID: number;
    eventData: IEvent;
    courseData:ICourse[]
    numOfExams: { courseName: string; numOfExams: number }[];

    constructor(
        private eventServices: EventService,
        private actRoute: ActivatedRoute,
        private courseServices: CourseService
    ) {}

    ngOnInit() {
        this.actRoute.params.subscribe((params) => {
            this.eventID = params['id'];

            this.eventServices.getById(this.eventID).subscribe((data) => {
                this.eventData = data;
            });

            this.courseData = [];

            // Retrieve course data for each course ID
            this.eventData.coursesIDs.forEach((courseID) => {
                this.courseServices.getById(courseID).subscribe((course) => {
                    this.courseData.push(course);
                    if (
                        this.courseData.length ===
                        this.eventData.coursesIDs.length
                    ) {
                        this.loading = false;
                    }
                });
            });
        });
    }
}
