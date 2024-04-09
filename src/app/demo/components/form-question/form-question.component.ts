import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../API-Services/question.service';
import { IQuestion } from '../../Model/iquestion';
import { CourseService } from '../../API-Services/course.service';
import { ICourse } from '../../Model/icourse';
import { QuestionInExamService } from '../../API-Services/question-in-exam.service';
import { Location } from '@angular/common';
import { PopupQuestionComponent } from '../popup-question/popup-question.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
    templateUrl: './form-question.component.html',
    styleUrls: ['./form-question.component.scss'],
})
export class FormQuestionComponent implements OnInit, OnDestroy {
    QuestionForm: FormGroup;
    allCourses: ICourse[] = [];
    numOfQuestions: number[] = [2, 3, 4, 5, 6];
    allDataQuestion: any[] = [];

    constructor(
        private quesServices: QuestionService,
        private router: Router,
        private actRoute: ActivatedRoute,
        private courseServices: CourseService,
        private fb: FormBuilder,
        private questionInExamService: QuestionInExamService,
        private dialog: MatDialog,
        private location: Location
    ) {
        this.QuestionForm = this.fb.group({
            question: ['', [Validators.required, Validators.minLength(3)]],
            selectNumber: ['', Validators.required],
            choosesName: this.fb.array([]),
            questionType: ['', Validators.required],
            correctAnswer: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.courseServices.getAllData().subscribe((data) => {
            this.allCourses = data;
        });

        this.actRoute.params.subscribe((params) => {
            const id = params['id'] || 0;

            if (id !== 0) {
                this.quesServices.getById(id).subscribe((ques: IQuestion) => {
                    this.QuestionForm.patchValue({
                        question: ques.question,
                        questionType: ques.questionType,
                        // courseName: ques.courseName,
                        correctAnswer: ques.correctAnswer,
                    });

                    const selectsNumber = ques.choosesName.length;
                    // console.log(ques.choosesName.length);

                    this.QuestionForm.get('selectNumber')?.setValue(
                        selectsNumber
                    );

                    this.buildQuestionTypeControls(selectsNumber);

                    // Patch choosesName values individually
                    for (let i = 0; i < ques.choosesName.length; i++) {
                        this.QuestionForm.get(`choosesName.${i}`).setValue(
                            ques.choosesName[i]
                        );
                    }
                });
            }
        });

        this.QuestionForm.get('selectNumber')?.valueChanges.subscribe(
            (value: number) => {
                this.buildQuestionTypeControls(value);
            }
        );
    }

    buildQuestionTypeControls(num: number): void {
        const controls = [];
        for (let i = 0; i < num; i++) {
            controls.push(this.fb.control('', Validators.required));
        }
        this.QuestionForm.setControl('choosesName', this.fb.array(controls));
    }

    getFormControl(name: string): FormControl {
        return this.QuestionForm.get(name) as FormControl;
    }
    get choosesName() {
        return this.QuestionForm.get('choosesName') as FormArray;
    }

    getArrayFromNumber(num: number): number[] {
        return Array.from({ length: num }, (_, index) => index);
    }

    openPopup() {
        const dialogRef = this.dialog.open(PopupQuestionComponent, {
            width: '400px',
            height: '230px',
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.questionInExamService.setSelectedQuestions(
                    this.allDataQuestion
                );
            } else {
                //this.router.navigate(['/exam/formexam']);
                this.location.back();
            }
        });
    }

    // onSubmit(e: Event) {
    //     e.preventDefault();

    //     console.log(this.QuestionForm.value);

    //     const questionData = this.QuestionForm.value;
    //     const examId = questionData.examName.id;
    //     const questions = {
    //         ...questionData,
    //         Exam_ID: examId,
    //     };

    //     const selectedNumber = this.QuestionForm.get('selectNumber').value;

    //     const choosesNames = [];
    //     for (let i = 0; i < selectedNumber; i++) {
    //         choosesNames.push(questionData['choosesName' + i]);
    //     }

    //     questions['choosesName'] = choosesNames;

    //     console.log(questions);

    //     if (this.QuestionForm.valid) {
    //         const id = this.actRoute.snapshot.params['id'] || 0;
    //         if (id) {
    //             this.quesServices.Edit(id, questions).subscribe(() => {});
    //         } else {
    //             this.quesServices.Add(questions).subscribe(() => {});
    //         }
    //         this.router.navigate(['/question']);
    //     }
    // }
    // onClose() {
    //     // Navigate back to the previous page
    //     // this.router.navigate(['/exam/formexam'], { relativeTo: this.actRoute });
    //     this.location.back();
    // }

    onSubmit(e: Event) {
        e.preventDefault();

        if (this.QuestionForm.valid) {
            const questionData = this.QuestionForm.value;
            // const courseId = questionData.courseName.id;

            const questions = {
                ...questionData,
                // course_ID: courseId,
                // choosesName: questionData.choosesName.slice(
                //     0,
                //     questionData.selectNumber
                // ),
            };

            console.log(questions);
            this.allDataQuestion.push(questions);
            console.log(this.allDataQuestion);

            const id = this.actRoute.snapshot.params['id'] || 0;
            if (id) {
                this.quesServices.Edit(id, questions).subscribe(() => {});
                 this.location.back();
            }
            else {
                this.openPopup();
                //this.quesServices.Add(questions).subscribe(() => {});
            }
            this.QuestionForm.reset();


            //this.location.back();
        } else {
        }
    }

    ngOnDestroy(): void {}
}
