import { CourseService } from './../../API-Services/course.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ICourse } from '../../Model/icourse';

@Component({
    templateUrl: './form-course.component.html',
    styleUrl: './form-course.component.scss',
    providers: [MessageService],
})
export class FormCourseComponent implements OnInit, OnDestroy {
    CourseForm: FormGroup;
    private myActionSub: Subscription | undefined;
    start: Date = new Date();
    getDate: Date = new Date();
    getEndDate: Date = new Date();
    today: Date = new Date();
    selectedFile: File;
    isEdit: boolean = false;

    constructor(
        private CourseService: CourseService,
        private router: Router,
        private actRoute: ActivatedRoute
    ) {
        this.CourseForm = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
            ]),
            description: new FormControl('', Validators.required),
            start_Date: new FormControl('', [
                Validators.required,
                this.startValidator(this.start),
            ]),
            end_Date: new FormControl('', [
                Validators.required,
                this.endValidator(this.start),
            ]),
            material: new FormControl('', [Validators.required]),
            // imageFile: new FormControl(null, [
            //     Validators.required,
            //     this.validateFileType(),
            // ]),
        });

        if (!this.isEdit) {
            this.CourseForm.addControl(
                'imageFile',
                new FormControl(null, [
                    Validators.required,
                    this.validateFileType(),
                ])
            );
        }
    }

    validateFileType() {
        const allowedTypes = ['png', 'jpg', 'jpeg'];
        return (control: FormControl): { [key: string]: any } | null => {
            const file = control.value;
            if (file) {
                const extension = file.split('.').pop()?.toLowerCase();
                if (!allowedTypes.includes(extension)) {
                    return { invalidFileType: true };
                }
            }
            return null;
        };
    }

    startValidator(start: Date): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const selectedDate: Date = new Date(control.value);
            if (selectedDate < start) return { minDate: true };
            if (control.value >= this.getEndDate) return { sDate: true };
            return null;
        };
    }

    getValue(e: any) {
        this.getDate = e.target.value;
    }

    getEndValue(e: any) {
        this.getEndDate = e.target.value;
    }

    endValidator(start: Date): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const startDate: Date = start;
            if (control.value <= this.getDate)
                return { endDateBeforeStart: true };

            return null;
        };
    }

    onFileSelected(event: any) {
        this.selectedFile = <File>event.target.files[0];
        console.log(this.selectedFile);

        if (!this.isEdit && this.selectedFile) {
            this.CourseForm.addControl(
                'imageFile',
                new FormControl(null, [
                    Validators.required,
                    this.validateFileType(),
                ])
            );
        }
    }

    getFormControl(name: string): FormControl {
        return this.CourseForm.get(name) as FormControl;
    }

    id: number = 0;
    // ngOnInit(): void {
    //     this.actRoute.params.subscribe((params) => {
    //         this.id = params['id'];

    //         if (!this.id) {
    //             this.id = 0;
    //         }

    //         if (this.id != 0) {
    //             this.CourseService.getById(this.id).subscribe(
    //                 (course: ICourse) => {
    //                     this.CourseForm.controls['name'].setValue(course.name);

    //                     this.CourseForm.controls['description'].setValue(
    //                         course.description
    //                     );
    //                     this.CourseForm.controls['start_Date'].setValue(
    //                         course.start_Date
    //                     );
    //                     this.CourseForm.controls['end_Date'].setValue(
    //                         course.end_Date
    //                     );
    //                     this.CourseForm.controls['material'].setValue(
    //                         course.material
    //                     );
    //                     this.selectedFile = course.imageFile;
    //                     this.CourseForm.updateValueAndValidity();
    //                 }
    //             );
    //         }
    //     });
    // }

    ngOnInit(): void {
        this.actRoute.params.subscribe((params) => {
            this.id = params['id'];
            this.isEdit = !!this.id;

            if (!this.id) {
                this.id = 0;
            }

            if (this.isEdit) {
                this.CourseService.getById(this.id).subscribe((course: any) => {
                    this.CourseForm.removeControl('imageFile');

                    this.CourseForm.controls['name'].setValue(course.name);
                    this.CourseForm.controls['description'].setValue(
                        course.description
                    );
                    this.CourseForm.controls['start_Date'].setValue(
                        course.start_Date
                    );
                    this.CourseForm.controls['end_Date'].setValue(
                        course.end_Date
                    );
                    this.CourseForm.controls['material'].setValue(
                        course.material
                    );

                    Object.keys(this.CourseForm.controls).forEach(
                        (controlName) => {
                            this.CourseForm.controls[controlName].markAsDirty();
                            this.CourseForm.controls[
                                controlName
                            ].markAsTouched();
                        }
                    );

                    this.CourseForm.updateValueAndValidity();
                });
            }
        });
    }

    onSubmit(e: Event) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', this.CourseForm.value.name);
        formData.append('description', this.CourseForm.value.description);
        formData.append('start_Date', this.CourseForm.value.start_Date);
        formData.append('end_Date', this.CourseForm.value.end_Date);
        formData.append('material', this.CourseForm.value.material);
        if (this.isEdit && this.selectedFile) {
            formData.append('imageFile', this.selectedFile);
        } else if (!this.isEdit) {
            formData.append('imageFile', this.selectedFile);
        }

        console.log(formData);

        if (this.CourseForm.valid) {
            if (this.id) {
                this.CourseService.Edit(
                    this.id,
                    this.CourseForm.value
                ).subscribe(() => {});
            } else {
                this.CourseService.Add(formData).subscribe(() => {
                    console.log('Success');
                });
            }
            this.router.navigate(['/course']);
        }
    }

    ngOnDestroy(): void {
        this.myActionSub?.unsubscribe();
    }
}
