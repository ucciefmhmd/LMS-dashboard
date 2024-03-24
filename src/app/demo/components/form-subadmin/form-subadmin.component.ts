import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { SubadminService } from '../../API-Services/subadmin.service';
import { ISubadmin } from '../../Model/isubadmin';

@Component({
    templateUrl: './form-subadmin.component.html',
    styleUrl: './form-subadmin.component.scss',
    providers: [MessageService],
})
export class FormSubadminComponent {
     SubadminForm: FormGroup;
    private myActionSub: Subscription | undefined;

    constructor(
        private subadminService: SubadminService,
        private router: Router,
        private actRoute: ActivatedRoute
    ) {
        this.SubadminForm = new FormGroup({
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
            photo: new FormControl(null, Validators.required)
        });
    }

    getFormControl(name: string): FormControl {
        return this.SubadminForm.get(name) as FormControl;
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
                this.subadminService
                    .getById(this.id)
                    .subscribe((subadmin: ISubadmin) => {
                        this.SubadminForm.controls['name'].setValue(
                            subadmin.name
                        );
                        this.SubadminForm.controls['phone'].setValue(
                            subadmin.phone
                        );
                        this.SubadminForm.controls['address'].setValue(
                            subadmin.address
                        );
                        this.SubadminForm.controls['email'].setValue(
                            subadmin.email
                        );
                        this.SubadminForm.controls['password'].setValue(
                            subadmin.password
                        );
                        this.SubadminForm.controls['photo'].setValue(
                            subadmin.photo
                        );
                    });
            }
        });
    }

    onSubmit(e: Event) {
        e.preventDefault();
        if (this.SubadminForm.valid) {
            if (this.id) {
                this.subadminService
                    .Edit(this.id, this.SubadminForm.value)
                    .subscribe(() => {});
            } else {
                this.subadminService
                    .Add(this.SubadminForm.value)
                    .subscribe(() => {});
            }
            this.router.navigate(['/uikit/subadmin']);
        }
    }

    ngOnDestroy(): void {
        this.myActionSub?.unsubscribe();
    }
}
