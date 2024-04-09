export interface IQuestion {
    id: number;
    question: string;
    questionType: string;
    correctAnswer: string;
    exam_ID: number;
    course_ID: number;
    examName: string;
    //courseName: string;
    choosesIDs: number[];
    choosesName: string[];
}
