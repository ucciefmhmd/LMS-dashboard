// // import { Component, OnDestroy, OnInit } from '@angular/core';
// // import {
// //     AbstractControl,
// //     FormControl,
// //     FormGroup,
// //     ValidationErrors,
// //     ValidatorFn,
// //     Validators,
// // } from '@angular/forms';
// // import { MessageService } from 'primeng/api';
// // import { Subscription } from 'rxjs';
// // import { EventService } from '../../API-Services/event.service';
// // import { ActivatedRoute, Router } from '@angular/router';
// // import { IEvent } from '../../Model/ievent';
// // import { ICourse } from '../../Model/icourse';
// // import { CourseService } from '../../API-Services/course.service';

// // @Component({
// //     templateUrl: './form-event.component.html',
// //     styleUrl: './form-event.component.scss',
// //     providers: [MessageService],
// // })
// // export class FormEventComponent implements OnInit, OnDestroy {
// //     EventForm: FormGroup;
// //     start: Date = new Date();
// //     getDate: Date = new Date();
// //     getEndDate: Date = new Date();
// //     allCourses: ICourse[];
// //     CoursesNames: string[]=[];

// //     private myActionSub: Subscription | undefined;

// //     constructor(
// //         private EventsService: EventService,
// //         private router: Router,
// //         private actRoute: ActivatedRoute,
// //         private courseServices: CourseService
// //     ) {
// //         this.EventForm = new FormGroup({
// //             name: new FormControl('', [
// //                 Validators.required,
// //                 Validators.minLength(3),
// //             ]),
// //             description: new FormControl('', Validators.required),
// //             start_Date: new FormControl('', [
// //                 Validators.required,
// //                 this.startValidator(this.start),
// //             ]),
// //             end_Date: new FormControl('', [
// //                 Validators.required,
// //                 this.endValidator(this.start),
// //             ]),
// //             hyperLink: new FormControl('', [Validators.required]),
// //             coursesName: new FormControl('', [Validators.required]),
// //         });
// //     }

// //     startValidator(start: Date): ValidatorFn {
// //         return (control: AbstractControl): ValidationErrors | null => {
// //             const selectedDate: Date = new Date(control.value);
// //             if (selectedDate < start) return { minDate: true };
// //             if (control.value >= this.getEndDate) return { sDate: true };
// //             return null;
// //         };
// //     }

// //     getValue(e: any) {
// //         this.getDate = e.target.value;
// //     }

// //     getEndValue(e: any) {
// //         this.getEndDate = e.target.value;
// //     }

// //     endValidator(start: Date): ValidatorFn {
// //         return (control: AbstractControl): ValidationErrors | null => {
// //             const startDate: Date = start;
// //             if (control.value <= this.getDate)
// //                 return { endDateBeforeStart: true };

// //             return null;
// //         };
// //     }

// //     getFormControl(name: string): FormControl {
// //         return this.EventForm.get(name) as FormControl;
// //     }

// //     id: number = 0;
// //     ngOnInit(): void {
// //         this.courseServices.getAllData().subscribe((data) => {
// //             this.allCourses = data;
// //             this.allCourses.forEach((course: ICourse) => {
// //                 this.CoursesNames.push(course.name);
// //             });
// //         });

// //         this.actRoute.params.subscribe((params) => {
// //             this.id = params['id'];
// //             if (!this.id) {
// //                 this.id = 0;
// //             }

// //             if (this.id != 0) {
// //                 this.EventsService.getById(this.id).subscribe(
// //                     (event: IEvent) => {
// //                         this.EventForm.controls['name'].setValue(event.name);

// //                         this.EventForm.controls['description'].setValue(
// //                             event.description
// //                         );
// //                         this.EventForm.controls['start_Date'].setValue(
// //                             event.start_Date
// //                         );
// //                         this.EventForm.controls['end_Date'].setValue(
// //                             event.end_Date
// //                         );
// //                         this.EventForm.controls['hyperLink'].setValue(
// //                             event.hyperLink
// //                         );
// //                         this.EventForm.controls['coursesName'].setValue(
// //                             event.coursesName
// //                         );
// //                     }
// //                 );
// //             }
// //         });
// //     }

// //     onSubmit(e: Event) {
// //         e.preventDefault();

// //         const formData = new FormData();
// //         formData.append('name', this.EventForm.value.name);
// //         formData.append('description', this.EventForm.value.description);
// //         formData.append('start_Date', this.EventForm.value.start_Date);
// //         formData.append('end_Date', this.EventForm.value.end_Date);
// //         formData.append('hyperLink', this.EventForm.value.hyperLink);
// //         if (Array.isArray(this.EventForm.value.coursesName)) {
// //             const courseNames = this.EventForm.value.coursesName;
// //             courseNames.forEach((coursesName: string) => {
// //                 formData.append('coursesName[]', coursesName);
// //             });
// //         } else {
// //             formData.append('coursesName', this.EventForm.value.coursesName);
// //         }

// //         if (this.EventForm.valid) {
// //             const action = this.id
// //                 ? this.EventsService.Edit(this.id, formData)
// //                 : this.EventsService.Add(formData);
// //             action.subscribe(
// //                 () => {
// //                     this.router.navigate(['/event']);
// //                 },
// //                 (error) => {
// //                     console.error('Error submitting form:', error);
// //                 }
// //             );
// //         }
// //     }

// //     ngOnDestroy(): void {
// //         this.myActionSub?.unsubscribe();
// //     }
// // }

// import { Component, OnDestroy, OnInit } from '@angular/core';
// import {
//     AbstractControl,
//     FormControl,
//     FormGroup,
//     ValidationErrors,
//     ValidatorFn,
//     Validators,
// } from '@angular/forms';
// import { MessageService } from 'primeng/api';
// import { Subscription } from 'rxjs';
// import { EventService } from '../../API-Services/event.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { IEvent } from '../../Model/ievent';
// import { ICourse } from '../../Model/icourse';
// import { CourseService } from '../../API-Services/course.service';

// @Component({
//     templateUrl: './form-event.component.html',
//     styleUrls: ['./form-event.component.scss'],
//     providers: [MessageService],
// })
// export class FormEventComponent implements OnInit, OnDestroy {
//     EventForm: FormGroup;
//     start: Date = new Date();
//     getDate: Date = new Date();
//     getEndDate: Date = new Date();
//     allCourses: ICourse[];
//     CoursesNames: string[] = [];

//     private myActionSub: Subscription | undefined;

//     constructor(
//         private EventsService: EventService,
//         private router: Router,
//         private actRoute: ActivatedRoute,
//         private courseServices: CourseService
//     ) {
//         this.EventForm = new FormGroup({
//             name: new FormControl('', [
//                 Validators.required,
//                 Validators.minLength(3),
//             ]),
//             description: new FormControl('', Validators.required),
//             start_Date: new FormControl('', [
//                 Validators.required,
//                 this.startValidator(this.start),
//             ]),
//             end_Date: new FormControl('', [
//                 Validators.required,
//                 this.endValidator(this.start),
//             ]),
//             hyperLink: new FormControl('', [Validators.required]),
//             coursesName: new FormControl('', [Validators.required]),
//         });
//     }

//     startValidator(start: Date): ValidatorFn {
//         return (control: AbstractControl): ValidationErrors | null => {
//             const selectedDate: Date = new Date(control.value);
//             if (selectedDate < start) return { minDate: true };
//             if (control.value >= this.getEndDate) return { sDate: true };
//             return null;
//         };
//     }

//     getValue(e: any) {
//         this.getDate = e.target.value;
//     }

//     getEndValue(e: any) {
//         this.getEndDate = e.target.value;
//     }

//     endValidator(start: Date): ValidatorFn {
//         return (control: AbstractControl): ValidationErrors | null => {
//             const startDate: Date = start;
//             if (control.value <= this.getDate)
//                 return { endDateBeforeStart: true };

//             return null;
//         };
//     }

//     getFormControl(name: string): FormControl {
//         return this.EventForm.get(name) as FormControl;
//     }

//     id: number = 0;
//     ngOnInit(): void {
//         this.courseServices.getAllData().subscribe((data) => {
//             this.allCourses = data;
//             this.allCourses.forEach((course: ICourse) => {
//                 this.CoursesNames.push(course.name);
//             });
//         });

//         this.actRoute.params.subscribe((params) => {
//             this.id = params['id'] ? params['id'] : 0;

//             if (this.id != 0) {
//                 this.EventsService.getById(this.id).subscribe(
//                     (event: IEvent) => {
//                         this.EventForm.patchValue({
//                             name: event.name,
//                             description: event.description,
//                             start_Date: event.start_Date,
//                             end_Date: event.end_Date,
//                             hyperLink: event.hyperLink,
//                             coursesName: event.coursesName,
//                         });
//                     }
//                 );
//             }
//         });

//       this.EventForm.setValidators(this.dateComparisonValidator());

//       this.EventForm.valueChanges.subscribe(() => {
//           this.EventForm.updateValueAndValidity();
//       });
//     }

//     dateComparisonValidator(): ValidatorFn {
//         return (formGroup: FormGroup) => {
//             const start_Date = formGroup.get('start_Date')?.value;
//             const end_Date = formGroup.get('end_Date')?.value;

//             if (start_Date && end_Date && start_Date >= end_Date) {
//                 return { endDateBeforeStart: true };
//             }

//             return null;
//         };
//     }

//     onSubmit(e: Event) {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('name', this.EventForm.value.name);
//         formData.append('description', this.EventForm.value.description);
//         formData.append('start_Date', this.EventForm.value.start_Date);
//         formData.append('end_Date', this.EventForm.value.end_Date);
//         formData.append('hyperLink', this.EventForm.value.hyperLink);
//         if (Array.isArray(this.EventForm.value.coursesName)) {
//             const courseNames = this.EventForm.value.coursesName;
//             courseNames.forEach((coursesName: string) => {
//                 formData.append('coursesName[]', coursesName);
//             });
//         } else {
//             formData.append('coursesName', this.EventForm.value.coursesName);
//         }

//         if (this.EventForm.valid) {
//             const action = this.id
//                 ? this.EventsService.Edit(this.id, formData)
//                 : this.EventsService.Add(formData);

//             action.subscribe(
//                 () => {
//                     this.router.navigate(['/event']);
//                 },
//                 (error) => {
//                     console.error('Error submitting form:', error);
//                 }
//             );
//         }
//     }

//     ngOnDestroy(): void {
//         this.myActionSub?.unsubscribe();
//     }
// }

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EventService } from '../../API-Services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent } from '../../Model/ievent';
import { ICourse } from '../../Model/icourse';
import { CourseService } from '../../API-Services/course.service';

@Component({
    templateUrl: './form-event.component.html',
    styleUrls: ['./form-event.component.scss'],
    providers: [MessageService],
})
export class FormEventComponent implements OnInit, OnDestroy {
    EventForm: FormGroup;
    start: Date = new Date();
    getDate: Date = new Date();
    getEndDate: Date = new Date();
    allCourses: ICourse[];
    CoursesNames: string[] = [];

    private myActionSub: Subscription | undefined;

    constructor(
        private EventsService: EventService,
        private router: Router,
        private actRoute: ActivatedRoute,
        private courseServices: CourseService
    ) {
        this.EventForm = new FormGroup({
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
            hyperLink: new FormControl('', [Validators.required]),
            coursesName: new FormControl('', [Validators.required]),
        });
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

    getFormControl(name: string): FormControl {
        return this.EventForm.get(name) as FormControl;
    }

    id: number = 0;
    ngOnInit(): void {
        this.courseServices.getAllData().subscribe((data) => {
            this.allCourses = data;
            this.allCourses.forEach((course: ICourse) => {
                this.CoursesNames.push(course.name);
            });
        });

        this.actRoute.params.subscribe((params) => {
            this.id = params['id'] ? params['id'] : 0;

            if (this.id != 0) {
                this.EventsService.getById(this.id).subscribe(
                    (event: IEvent) => {
                        this.EventForm.patchValue({
                            name: event.name,
                            description: event.description,
                            start_Date: event.start_Date,
                            end_Date: event.end_Date,
                            hyperLink: event.hyperLink,
                            coursesName: event.coursesName,
                        });
                    }
                );
            }
        });

        this.EventForm.get('start_Date').valueChanges.subscribe(() => {
            this.EventForm.updateValueAndValidity();
        });

        this.EventForm.get('end_Date').valueChanges.subscribe(() => {
            this.EventForm.updateValueAndValidity();
        });
        this.EventForm.setValidators(this.dateComparisonValidator());

        this.EventForm.valueChanges.subscribe(() => {
            this.EventForm.updateValueAndValidity();
        });
    }

    dateComparisonValidator(): ValidatorFn {
        return (formGroup: FormGroup) => {
            const start_Date = formGroup.get('start_Date')?.value;
            const end_Date = formGroup.get('end_Date')?.value;

            if ( start_Date >= end_Date) {
                return { endDateBeforeStart: true };
            }

            return null;
        };
    }

    onSubmit(e: Event) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', this.EventForm.value.name);
        formData.append('description', this.EventForm.value.description);
        formData.append('start_Date', this.EventForm.value.start_Date);
        formData.append('end_Date', this.EventForm.value.end_Date);
        formData.append('hyperLink', this.EventForm.value.hyperLink);
        if (Array.isArray(this.EventForm.value.coursesName)) {
            const courseNames = this.EventForm.value.coursesName;
            courseNames.forEach((coursesName: string) => {
                formData.append('coursesName[]', coursesName);
            });
        } else {
            formData.append('coursesName', this.EventForm.value.coursesName);
        }

        if (this.EventForm.valid) {
            const action = this.id
                ? this.EventsService.Edit(this.id, formData)
                : this.EventsService.Add(formData);

            action.subscribe(
                () => {
                    this.router.navigate(['/event']);
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
