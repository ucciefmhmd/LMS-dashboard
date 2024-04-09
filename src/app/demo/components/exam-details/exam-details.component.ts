// import { Component, OnInit } from '@angular/core';
// import { ExamService } from '../exam/exam.service';
// import { ActivatedRoute } from '@angular/router';
// import { IExam } from '../exam/iexam';
// import { QuestionService } from '../../API-Services/question.service';
// import { IQuestion } from '../../Model/iquestion';
// import { CourseService } from '../../API-Services/course.service';

// @Component({
//     templateUrl: './exam-details.component.html',
//     styleUrl: './exam-details.component.scss',
// })
// export class ExamDetailsComponent implements OnInit {
//     examID: number;
//     examData: IExam;
//     questions: IQuestion[];
//     courseID: number;
//     constructor(
//         private examServices: ExamService,
//         private actRoute: ActivatedRoute,
//         private quesServices: QuestionService,
//         private courseServices: CourseService
//     ) {}

//     ngOnInit() {
//         this.actRoute.params.subscribe((params) => {
//             this.examID = params['id'];

//             this.examServices.getById(this.examID).subscribe((data) => {
//                 this.examData = data;
//                 console.log(this.examData);
//                 this.courseID = this.examData.course_ID;

//                 this.fetchQuestionsForExam();
//                 this.fetchCourseName();
//             });

//         });
//     }

//     fetchCourseName() {
//         this.courseServices.getById(this.courseID).subscribe((courseData) => {
//             this.examData.courseName = courseData.name;
//             console.log(this.examData.courseName);
//         });
//     }

//     fetchQuestionsForExam() {
//         if (this.examData) {
//             this.quesServices.getAllData().subscribe((data) => {
//                 this.questions = [];
//                 data.forEach((ele) => {
//                     if (this.examData.id == ele.exam_ID) {
//                         console.log(ele);
//                         this.questions.push(ele);
//                     }
//                 });
//                 console.log(this.questions);
//             });
//         }
//     }
// }

import { Component, OnInit } from '@angular/core';
import { ExamService } from '../exam/exam.service';
import { ActivatedRoute } from '@angular/router';
import { IExam } from '../exam/iexam';
import { QuestionService } from '../../API-Services/question.service';
import { IQuestion } from '../../Model/iquestion';
import { CourseService } from '../../API-Services/course.service';

@Component({
    templateUrl: './exam-details.component.html',
    styleUrls: ['./exam-details.component.scss'],
})
export class ExamDetailsComponent implements OnInit {
    examID: number;
    examData: IExam;
    questions: any;
    courseName: string;

    constructor(
        private examServices: ExamService,
        private actRoute: ActivatedRoute,
        private courseServices: CourseService
    ) {}

    ngOnInit() {
        this.actRoute.params.subscribe((params) => {
            this.examID = params['id'];

            this.loadExam();
             this.examServices.newExamAdded.subscribe(() => {
                 this.loadExam();
             });
        });
    }

    loadExam() {
        this.examServices.getById(this.examID).subscribe((data) => {
            this.examData = data;
            this.questions = this.examData.allQuestion;

            this.courseServices.getById(this.examData.course_ID).subscribe(
                (courseData) => {
                    this.courseName = courseData.name;
                    console.log(this.courseName);
                },
                (error) => {
                    console.error('Error fetching course name:', error);
                }
            );
        });
    }

}
