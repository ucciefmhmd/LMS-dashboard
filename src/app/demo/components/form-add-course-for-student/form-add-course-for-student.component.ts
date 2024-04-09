import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CourseService } from './../../API-Services/course.service';
import { InstructorService } from './../../API-Services/instructor.service';
import { ICourse } from '../../Model/icourse';
import { StudentService } from '../../API-Services/student.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IInstructor } from '../../Model/iinstructor';
import { IStdCourse } from '../../Model/IStd-course';

@Component({
    templateUrl: './form-add-course-for-student.component.html',
    styleUrls: ['./form-add-course-for-student.component.scss'],
})
export class FormAddCourseForStudentComponent implements OnInit, OnDestroy {
    StdCourseInstForm: FormGroup;
    allCourse: ICourse[] = [];
    allInstructors: IInstructor[] = [];
    selectedCourse: ICourse | null = null;
    isShow: boolean = false;
    stdID: number;

    private myActionSub: Subscription | undefined;

    constructor(
        private courseService: CourseService,
        private instructorService: InstructorService,
        private stdServices: StudentService,
        private actRoute: ActivatedRoute,
        private location: Location
    ) {
        this.StdCourseInstForm = new FormGroup({
            courseId: new FormControl('', Validators.required),
            instructorId: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {
        this.actRoute.params.subscribe((params) => {
            this.stdID = params['id'];
        });

        this.courseService.getAllData().subscribe((courses) => {
            this.allCourse = courses;
        });

        this.StdCourseInstForm.controls['courseId'].valueChanges.subscribe(
            (selectedCourse) => {
                this.isShow = true;
                console.log(selectedCourse.id);

                this.instructorService
                    .getInstByCourse(selectedCourse.id)
                    .subscribe((data) => {
                        this.allInstructors = data;
                        this.allInstructors.forEach((inst) => {
                            console.log(inst.name);
                        });
                    });
            }
        );
    }

    onSubmit(e: Event) {
        e.preventDefault();

        if (this.StdCourseInstForm.invalid) return;

         const data: IStdCourse = {
             courseId: this.StdCourseInstForm.get('courseId')?.value.id,
             instructorId: this.StdCourseInstForm.get('instructorId')?.value.id,
         };
        console.log(data);
       console.log(data.courseId);
       console.log(data.instructorId);

        this.stdServices.AddCourse(this.stdID, data).subscribe(() => {
            console.log('add success');
            this.location.back();
        });
    }

    ngOnDestroy(): void {
        this.myActionSub?.unsubscribe();
    }

    getFormControl(name: string): FormControl {
        return this.StdCourseInstForm.get(name) as FormControl;
    }
}
