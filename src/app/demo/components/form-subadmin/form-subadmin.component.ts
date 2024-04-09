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
    selectedFile: File;
    isEdit: boolean = false;
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
        });
        if (!this.isEdit) {
            this.SubadminForm.addControl(
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
        return this.SubadminForm.get(name) as FormControl;
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
                this.subadminService
                    .getById(this.id)
                    .subscribe((subadmin: ISubadmin) => {
                        this.SubadminForm.removeControl('imageFile');

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
                        this.SubadminForm.controls['ssn'].setValue(
                            subadmin.ssn
                        );
                    });
            }
        });
    }

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];

        console.log(this.selectedFile);
        if (!this.isEdit && this.selectedFile) {
            this.SubadminForm.addControl(
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
        const formData = new FormData();
        formData.append('name', this.SubadminForm.value.name);
        formData.append('phone', this.SubadminForm.value.phone);
        formData.append('address', this.SubadminForm.value.address);
        formData.append('email', this.SubadminForm.value.email);
        formData.append('password', this.SubadminForm.value.password);
        formData.append('ssn', this.SubadminForm.value.ssn);

        if (this.isEdit && this.selectedFile) {
            formData.append('imageFile', this.selectedFile);
        } else if (!this.isEdit) {
            formData.append('imageFile', this.selectedFile);
        }

        if (this.SubadminForm.valid) {
            if (this.id) {
                this.subadminService
                    .Edit(this.id, this.SubadminForm.value)
                    .subscribe(() => {});
            } else {
                this.subadminService.Add(formData).subscribe(() => {});
            }
            this.router.navigate(['/subadmin']);
        }
    }

    ngOnDestroy(): void {
        this.myActionSub?.unsubscribe();
    }
}
