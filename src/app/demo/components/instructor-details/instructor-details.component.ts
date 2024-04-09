import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../API-Services/instructor.service';
import { ActivatedRoute } from '@angular/router';
import { IInstructor } from '../../Model/iinstructor';
import { CourseService } from '../../API-Services/course.service';

@Component({
    templateUrl: './instructor-details.component.html',
    styleUrls: ['./instructor-details.component.scss'],
})
export class InstructorDetailsComponent implements OnInit {
    loading: boolean = true;
    instID: number;
    InstructorData: IInstructor;
    numOfExams: { courseName: string; numOfExams: number }[];

    constructor(
        private instServices: InstructorService,
        private actRoute: ActivatedRoute,
        private courseServices: CourseService
    ) {}

    ngOnInit() {
        this.actRoute.params.subscribe((params) => {
            this.instID = params['id'];

            this.instServices.getById(this.instID).subscribe((data) => {
                this.InstructorData = data;
            });

            this.courseServices.getAllData().subscribe((data) => {
                this.numOfExams = data.map((course) => ({
                    courseName: course.name,
                    numOfExams: course.numOfExam,
                }));
                this.loading = false;
            });
        });
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('imageFile', file);
            console.log(formData);

            const instId = this.instID;
            if (instId) {
                this.instServices.EditPhoto(instId, formData).subscribe(
                    (response) => {
                        console.log('Photo upload successful', response);
                        window.location.reload();
                    },
                    (error) => {
                        console.error('Photo upload failed', error);
                    }
                );
            } else {
                console.error('Instructor ID is missing.');
            }
        }
    }

    getNumberOfExams(courseName: string): number {
        if (!this.numOfExams) return 0;

        const course = this.numOfExams.find(
            (course) => course.courseName === courseName
        );
        return course ? course.numOfExams : 0;
    }
}
