import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { StudentService } from '../../API-Services/student.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './add-student.component.html',
    styleUrls: ['./add-student.component.scss'],
    providers: [MessageService],
})
export class AddStudentComponent implements OnInit, OnDestroy {
    StudentForm: FormGroup;
    selectedFile: File;
    photoData: string;
    isEdit: boolean = false;

    private myActionSub: Subscription | undefined;

    constructor(
        private studentService: StudentService,
        private router: Router,
        private actRoute: ActivatedRoute
    ) {
        this.StudentForm = new FormGroup({
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
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                ),
            ]),

            age: new FormControl('', [Validators.required, Validators.min(18)]),
            ssn: new FormControl('', [
                Validators.required,
                this.numericValidator,
                Validators.maxLength(14),
                Validators.minLength(14),
            ]),
            title: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
            ]),
        });

        if (!this.isEdit) {
            this.StudentForm.addControl(
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

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];
        console.log(this.selectedFile.name);

        if (!this.isEdit && this.selectedFile) {
            this.StudentForm.addControl(
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
            this.photoData = control.value;
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
        return this.StudentForm.get(name) as FormControl;
    }

    id: number = 0;

    ngOnInit(): void {
        this.actRoute.params.subscribe((params) => {
            this.id = params['id'];
            this.isEdit = !!this.id;
            if (!this.id) {
                this.id = 0;
            }

            if (this.isEdit) {
                this.studentService
                    .getById(this.id)
                    .subscribe((student: any) => {
                        this.StudentForm.removeControl('imageFile');

                        this.StudentForm.patchValue({
                            name: student.name,
                            phone: student.phone,
                            address: student.address,
                            age: student.age,
                            title: student.title,
                            email: student.email,
                            password: student.password,
                            ssn: student.ssn,
                        });
                        console.log(this.StudentForm.value);
                    });
            }
        });
    }

    fetchImageBlob(url: string): Promise<Blob> {
        return fetch(url).then((response) => response.blob());
    }

    extractFileNameAndExtension(url: string): {
        fileName: string;
        extension: string;
    } {
        const parts = url.split('/');
        const fileNameWithExtension = parts[parts.length - 1];
        const fileNameParts = fileNameWithExtension.split('.');
        const extension = fileNameParts.pop() || '';
        const fileName = fileNameParts.join('.');
        return { fileName, extension };
    }

    // onSubmit(e: Event) {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('name', this.StudentForm.value.name);
    //     formData.append('phone', this.StudentForm.value.phone);
    //     formData.append('address', this.StudentForm.value.address);
    //     formData.append('email', this.StudentForm.value.email);
    //     formData.append('password', this.StudentForm.value.password);
    //     formData.append('age', this.StudentForm.value.age);
    //     formData.append('title', this.StudentForm.value.title);
    //     formData.append('ssn', this.StudentForm.value.ssn);
    //     if (this.isEdit && this.selectedFile) {
    //         formData.append('imageFile', this.selectedFile);
    //     }

    //     console.log(this.StudentForm.value);

    //     if (this.StudentForm.valid) {
    //         if (this.id) {
    //             this.studentService
    //                 .Edit(this.id, this.StudentForm.value)
    //                 .subscribe(() => {
    //                     console.log('Edit Success');
    //                 });
    //         } else {
    //             this.studentService.Add(formData).subscribe(() => {
    //                 console.log('Add Success');
    //             });
    //         }
    //         this.router.navigate(['/student']);
    //     }
    // }

    onSubmit(e: Event) {
        e.preventDefault();
        if (this.StudentForm.valid) {
            const formData = new FormData();
            formData.append('name', this.StudentForm.value.name);
            formData.append('phone', this.StudentForm.value.phone);
            formData.append('address', this.StudentForm.value.address);
            formData.append('email', this.StudentForm.value.email);
            formData.append('password', this.StudentForm.value.password);
            formData.append('age', this.StudentForm.value.age);
            formData.append('title', this.StudentForm.value.title);
            formData.append('ssn', this.StudentForm.value.ssn);

            if (this.isEdit && this.selectedFile) {
                formData.append('imageFile', this.selectedFile);
            } else if (!this.isEdit) {
                formData.append('imageFile', this.selectedFile);
            }

            if (this.id) {
                this.studentService.Edit(this.id, this.StudentForm.value).subscribe(
                    () => {
                        console.log('Edit Success');
                        this.router.navigate(['/student']);
                    },
                    (error) => {
                        console.error('Edit Error:', error);
                    }
                );
            } else {
                this.studentService.Add(formData).subscribe(
                    () => {
                        console.log('Add Success');
                        this.router.navigate(['/student']);
                    },
                    (error) => {
                        console.error('Add Error:', error);
                    }
                );
            }
        }
    }

    ngOnDestroy(): void {
        this.myActionSub?.unsubscribe();
    }
}
