import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from '../../API-Services/instructor.service';
import { IInstructor } from '../../Model/iinstructor';
import { CourseService } from '../../API-Services/course.service';
import { ICourse } from '../../Model/icourse';

@Component({
    templateUrl: './form-instructor.component.html',
    styleUrl: './form-instructor.component.scss',
    providers: [MessageService],
})
export class FormInstructorComponent implements OnInit, OnDestroy {
    InstructorForm: FormGroup;
    selectedFile: File;
    allCourses: ICourse[];
    isEdit: boolean = false;
    CourseNames: string[] = [];
    private myActionSub: Subscription | undefined;

    constructor(
        private instructorService: InstructorService,
        private router: Router,
        private actRoute: ActivatedRoute,
        private courseServices: CourseService
    ) {
        this.InstructorForm = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)+$'),
            ]),
            phone: new FormControl('', [
                Validators.required,
                Validators.minLength(11),
                Validators.maxLength(11),
                Validators.pattern('^01[0152]+[0-9]{8,}$'),
            ]),
            address: new FormControl('', [
                Validators.required,
                Validators.minLength(5),
            ]),
            ssn: new FormControl('', [
                Validators.required,
                this.numericValidator,
                Validators.maxLength(14),
                Validators.minLength(14),
            ]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                ),
            ]),
            // imageFile: new FormControl(null, [
            //     Validators.required,
            //     this.validateFileType(),
            // ]),
            specialization: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
            ]),
            experience: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
            ]),
            courseName: new FormControl('', [Validators.required]),
        });
         if (!this.isEdit) {
             this.InstructorForm.addControl(
                 'imageFile',
                 new FormControl(null, [
                     Validators.required,
                     this.validateFileType(),
                 ])
             );
         }
    }

    numericValidator(control: FormControl): { [key: string]: any } | null {
        const value = control.value;
        if (!/^\d+$/.test(value)) {
            return { numeric: true };
        }
        return null;
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

    getFormControl(name: string): FormControl {
        return this.InstructorForm.get(name) as FormControl;
    }

    id: number = 0;
    ngOnInit(): void {
        this.courseServices.getAllData().subscribe((data) => {
            this.allCourses = data;
            this.allCourses.forEach((course: ICourse) => {
                this.CourseNames.push(course.name);
            });
        });
        this.actRoute.params.subscribe((params) => {
            this.id = params['id'];
            this.isEdit = !!this.id;
            if (!this.id) {
                this.id = 0;
            }

            if (this.isEdit) {
                this.instructorService
                    .getById(this.id)
                    .subscribe((instructor: IInstructor) => {
                        this.InstructorForm.removeControl('imageFile');
                        this.InstructorForm.controls['name'].setValue(
                            instructor.name
                        );
                        this.InstructorForm.controls['phone'].setValue(
                            instructor.phone
                        );
                        this.InstructorForm.controls['address'].setValue(
                            instructor.address
                        );
                        this.InstructorForm.controls['email'].setValue(
                            instructor.email
                        );
                        this.InstructorForm.controls['password'].setValue(
                            instructor.password
                        );
                        this.InstructorForm.controls['specialization'].setValue(
                            instructor.specialization
                        );
                        this.InstructorForm.controls['ssn'].setValue(
                            instructor.ssn
                        );
                        this.InstructorForm.controls['experience'].setValue(
                            instructor.experience
                        );
                        this.InstructorForm.controls['courseName'].setValue(
                            instructor.courseName
                        );
                    });
            }
        });
    }

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];

        console.log(this.selectedFile);
        if (!this.isEdit && this.selectedFile) {
            this.InstructorForm.addControl(
                'imageFile',
                new FormControl(null, [
                    Validators.required,
                    this.validateFileType(),
                ])
            );
        }
    }

    onSubmit(e: Event) {
        e.preventDefault();

        if (this.InstructorForm.valid) {
            const formData = new FormData();
            formData.append('name', this.InstructorForm.value.name);
            formData.append('phone', this.InstructorForm.value.phone);
            formData.append('address', this.InstructorForm.value.address);
            formData.append('email', this.InstructorForm.value.email);
            formData.append('password', this.InstructorForm.value.password);
            formData.append('ssn', this.InstructorForm.value.ssn);
            formData.append(
                'specialization',
                this.InstructorForm.value.specialization
            );
            formData.append('experience', this.InstructorForm.value.experience);
            if (Array.isArray(this.InstructorForm.value.courseName)) {
                const courseNames = this.InstructorForm.value.courseName;
                courseNames.forEach((courseName: string) => {
                    formData.append('courseName[]', courseName);
                });
            } else {
                formData.append(
                    'courseName',
                    this.InstructorForm.value.courseName
                );
            }
             if (this.isEdit && this.selectedFile) {
                 formData.append('imageFile', this.selectedFile);
             } else if (!this.isEdit) {
                 formData.append('imageFile', this.selectedFile);
             }

             console.log(this.InstructorForm.value);

            const action = this.id
                ? this.instructorService.Edit(this.id, this.InstructorForm.value)
                : this.instructorService.Add(formData);
            action.subscribe(
                () => {
                    this.router.navigate(['/instructor']);
                },
                (error) => {
                    console.error('Error submitting form:', error);
                }
            );
        }
    }

    ngOnDestroy(): void {
        this.myActionSub?.unsubscribe();
    }
}
