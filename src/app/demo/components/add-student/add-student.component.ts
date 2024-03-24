import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StudentService } from '../../API-Services/student.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from '../../Model/istudent';

@Component({
    templateUrl: './add-student.component.html',
    styleUrls: ['./add-student.component.scss'],
    providers: [MessageService],
})
export class AddStudentComponent implements OnInit, OnDestroy {
    StudentForm: FormGroup;
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
            photo: new FormControl(null, Validators.required),
            age: new FormControl('', Validators.required),
            title: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
            ]),
        });
    }

    getFormControl(name: string): FormControl {
        return this.StudentForm.get(name) as FormControl;
    }

    id: number = 0;
    ngOnInit(): void {
        // Extract id from route parameters
        this.actRoute.params.subscribe((params) => {
            this.id = params['id'];
            // If id is not provided in the route parameters, set it to 0
            if (!this.id) {
                this.id = 0;
            }

            // edit
            if (this.id != 0) {
                this.studentService
                    .getById(this.id)
                    .subscribe((student: IStudent) => {
                        this.StudentForm.controls['name'].setValue(
                            student.name
                        );
                        this.StudentForm.controls['phone'].setValue(
                            student.phone
                        );
                        this.StudentForm.controls['address'].setValue(
                            student.address
                        );
                        this.StudentForm.controls['email'].setValue(
                            student.email
                        );
                        this.StudentForm.controls['password'].setValue(
                            student.password
                        );
                        this.StudentForm.controls['photo'].setValue(
                            student.photo
                        );
                        this.StudentForm.controls['age'].setValue(student.age);
                        this.StudentForm.controls['title'].setValue(
                            student.title
                        );
                    });
            }
        });
    }

    onSubmit(e: Event) {
        e.preventDefault();

        if (this.StudentForm.valid) {
            if (this.id) {
                this.studentService
                    .Edit(this.id, this.StudentForm.value)
                    .subscribe(() => {});
            } else {
                this.studentService
                    .Add(this.StudentForm.value)
                    .subscribe(() => {});
            }
            this.router.navigate(['/uikit/student']);
        }
    }

    ngOnDestroy(): void {
        this.myActionSub?.unsubscribe();
    }
}
