import { QuestionInExamService } from './../../API-Services/question-in-exam.service';
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
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../exam/exam.service';
import { IExam } from '../exam/iexam';
import { ICourse } from '../../Model/icourse';
import { QuestionService } from '../../API-Services/question.service';
import { IQuestion } from '../../Model/iquestion';

@Component({
    templateUrl: './form-exam.component.html',
    styleUrl: './form-exam.component.scss',
    providers: [MessageService],
})
export class FormExamComponent implements OnInit, OnDestroy {
    minNumber: number;
    ExamForm: FormGroup;
    start: Date = new Date();
    questionNames: string[] = [];
    allCourse: ICourse[] = [];
    courseNames: string[] = [];
    courseID: number;
    SelectedCourse: number;

    private myActionSub: Subscription | undefined;
    dialog: any;
    selectTime: any;
    selectedQuestions: IQuestion[];

    constructor(
        private examService: ExamService,
        private router: Router,
        private actRoute: ActivatedRoute,
        private quesServices: QuestionService,
        private courseServies: CourseService,
        private questionInExamService: QuestionInExamService
    ) {
        this.ExamForm = new FormGroup(
            {
                name: new FormControl('', [
                    Validators.required,
                    Validators.minLength(3),
                ]),
                duration: new FormControl('', Validators.required),
                time: new FormControl('', Validators.required),
                max_Degree: new FormControl('', Validators.required),
                min_Degree: new FormControl('', Validators.required),
                courseName: new FormControl('', Validators.required),
                //allQuestion: new FormControl('', Validators.required),
                date: new FormControl('', [
                    Validators.required,
                    this.endValidator(this.start),
                ]),
            },
            { validators: this.degreeRangeValidator }
        );
    }

    formatTime(time: string): string {
        const [hours, minutes] = time.split(':');
        const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(
            2,
            '0'
        )}:00`;
        return formattedTime;
    }

    degreeRangeValidator: ValidatorFn = (
        control: FormGroup
    ): ValidationErrors | null => {
        const minDegree = control.get('min_Degree').value;
        const maxDegree = control.get('max_Degree').value;

        if (minDegree !== null && maxDegree !== null && minDegree > maxDegree) {
            control.get('min_Degree').setErrors({ minGreaterThanMax: true });
            return { minGreaterThanMax: true };
        } else {
            if (control.get('min_Degree').hasError('minGreaterThanMax')) {
                control.get('min_Degree').setErrors(null);
            }
            return null;
        }
    };

    endValidator(day: Date): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const selectedDate: Date = new Date(control.value);
            if (selectedDate < day) {
                return { past: true };
            }
            return null;
        };
    }

    getFormControl(name: string): FormControl {
        return this.ExamForm.get(name) as FormControl;
    }

    id: number = 0;
    ngOnInit(): void {
        this.selectedQuestions =
            this.questionInExamService.getSelectedQuestions();
        console.log('DataOfQuestions after adding:', this.selectedQuestions);

        this.courseServies.getAllData().subscribe((data) => {
            this.allCourse = data;
            this.allCourse.forEach((course: ICourse) => {
                this.courseNames.push(course.name);
                if (!this.SelectedCourse) {
                    this.SelectedCourse = course.id;
                }
            });
        });

        this.actRoute.params.subscribe((params) => {
            this.id = params['id'];

            if (!this.id) {
                this.id = 0;
            }

            if (this.id != 0) {
                this.examService.getById(this.id).subscribe((exam: IExam) => {
                    this.ExamForm.controls['name'].setValue(exam.name);
                    this.ExamForm.controls['duration'].setValue(exam.duration);
                    this.ExamForm.controls['time'].setValue(exam.time);
                    this.ExamForm.controls['date'].setValue(exam.date);
                    this.ExamForm.controls['max_Degree'].setValue(
                        exam.max_Degree
                    );
                    this.ExamForm.controls['min_Degree'].setValue(
                        exam.min_Degree
                    );
                    this.ExamForm.controls['courseName'].setValue(
                        exam.courseName
                    );
                    this.ExamForm.controls['allQuestion'].setValue(
                        exam.allQuestion
                    );
                });
            }
        });
        //this.loadQuestionsByCourse(this.SelectedCourse);
    }

    // loadQuestionsByCourse(courseId: number): void {
    //     this.quesServices.getAllData().subscribe((data) => {
    //         this.allQuestions = data.filter((ques) => ques.exam_ID == courseId);
    //     });
    // }

    // getID(e: any) {
    //     this.SelectedCourse = e.value.id;
    //     this.loadQuestionsByCourse(this.SelectedCourse);
    // }
    getTime(e: any) {
        this.selectTime = e.target.value;
        console.log(this.selectTime);
    }

    // onSubmit(e: Event) {
    //     e.preventDefault();

    //     const formattedTime = this.formatTime(this.ExamForm.get('time')?.value);
    //     this.ExamForm.get('time')?.setValue(formattedTime);

    //     const examData = this.ExamForm.value;

    //     console.log(examData);

    //     const courseId = examData.courseName.id;
    //     const selectedQuestions =
    //         this.questionInExamService.getSelectedQuestions();

    //     const allDataQuestions = selectedQuestions.map((question) => ({
    //         question: question.question,
    //         questionType: question.questionType,
    //         correctAnswer: question.correctAnswer,
    //         choosesName: [...question.choosesName],
    //     }));

    //     const exams = {
    //         ...examData,
    //         course_ID: courseId,
    //         allQuestion: allDataQuestions,
    //     };

    //     console.log('exam allQuestion', exams.allQuestion);

    //     console.log(exams);

    //     if (this.ExamForm.valid) {
    //         if (this.id) {
    //             this.examService.Edit(this.id, exams).subscribe(() => {});
    //         } else {
    //             this.examService.Add(exams).subscribe(() => {});
    //         }
    //         this.router.navigate(['/exam']);
    //     }
    // }

    onSubmit(e: Event) {
        e.preventDefault();

        const formattedTime = this.formatTime(this.ExamForm.get('time')?.value);
        this.ExamForm.get('time')?.setValue(formattedTime);

        const examData = this.ExamForm.value;

        const courseId = examData.courseName.id;
        const selectedQuestions =
            this.questionInExamService.getSelectedQuestions();

       const allDataQuestions = selectedQuestions.map((question, index) => {
           console.log(question.choosesName);

           return {
               question: question.question,
               questionType: question.questionType,
               correctAnswer: question.correctAnswer,
               choosesName: [...question.choosesName],
           };
       });

       console.log(allDataQuestions);


        const examDetails = {
            ...examData,
            course_ID: courseId,
            allQuestion: [...allDataQuestions],
        };




        if (this.ExamForm.valid) {
            if (this.id) {
                this.examService.Edit(this.id, examDetails).subscribe(() => {});
            } else {
                this.examService.Add(examDetails).subscribe(() => {
                    console.log('Exam Details', examDetails)
                });

            }
            this.router.navigate(['/exam']);
        }
    }

    ngOnDestroy(): void {
        this.myActionSub?.unsubscribe();
    }
}
