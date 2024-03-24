import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from '../../API-Services/instructor.service';
import { IInstructor } from '../../Model/iinstructor';

@Component({
    templateUrl: './form-instructor.component.html',
    styleUrl: './form-instructor.component.scss',
    providers: [MessageService],
})
export class FormInstructorComponent implements OnInit, OnDestroy {
    InstructorForm: FormGroup;
    private myActionSub: Subscription | undefined;

    constructor(
        private instructorService: InstructorService,
        private router: Router,
        private actRoute: ActivatedRoute
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
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                ),
            ]),
            photo: new FormControl(null, Validators.required),
            specialization: new FormControl('', [Validators.required, Validators.minLength(2)]),
        });
    }

    getFormControl(name: string): FormControl {
        return this.InstructorForm.get(name) as FormControl;
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
                this.instructorService
                    .getById(this.id)
                    .subscribe((instructor: IInstructor) => {
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
                        this.InstructorForm.controls['photo'].setValue(
                            instructor.photo
                        );
                        this.InstructorForm.controls['specialization'].setValue(
                            instructor.specialization
                        );

                    });
            }
        });
    }

    onSubmit(e: Event) {
        e.preventDefault();
        if (this.InstructorForm.valid) {
            if (this.id) {
                this.instructorService.Edit(this.id, this.InstructorForm.value).subscribe(() => {});
            } else {
                this.instructorService.Add(this.InstructorForm.value).subscribe(() => {});
            }
            this.router.navigate(['/uikit/instructor']);
        }
    }

    ngOnDestroy(): void {
        this.myActionSub?.unsubscribe();
    }
}
