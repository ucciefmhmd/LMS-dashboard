import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from '../../API-Services/course.service';
import { InstructorService } from '../../API-Services/instructor.service';
import { ICourse } from '../../Model/icourse';
import { IInstructor } from '../../Model/iinstructor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './popup-add-course.component.html',
    styleUrls: ['./popup-add-course.component.scss'],
})
export class PopupAddCourseComponent {
    FormCourseInst: FormGroup;
    allCourse: ICourse[];
    coursesName: string[];
    allInstructor: IInstructor[];
    instructorsName: string[];
    constructor(
        private dialogRef: MatDialogRef<PopupAddCourseComponent>,
        private courseService: CourseService,
        private instructorService: InstructorService,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.FormCourseInst = this.formBuilder.group({
            courseName: ['', Validators.required],
            instName: ['', Validators.required],

        });
        this.loadCourses();
        this.loadInstructors();
    }

    confirmAddAnother() {
        if (this.FormCourseInst.valid) {
            console.log('Form submitted successfully');
            this.dialogRef.close();
        }
    }

    closePopup() {
        console.log('Popup closed');
        this.dialogRef.close();
    }

    private loadCourses() {
        this.courseService.getAllData().subscribe(
            (courses: ICourse[]) => {
                this.allCourse = courses;
            },
            (error) => {
                console.error('Error loading courses:', error);
            }
        );
    }

    private loadInstructors() {
        this.instructorService.getAllData().subscribe(
            (instructors: IInstructor[]) => {
                this.allInstructor = instructors;
                this.allInstructor.forEach((course)=>{
                    this.coursesName.push(course.name)
                })
            },
            (error) => {
                console.error('Error loading instructors:', error);
            }
        );
    }
}
