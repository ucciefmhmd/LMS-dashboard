import { Injectable } from '@angular/core';
import { IQuestion } from '../Model/iquestion';

@Injectable({
    providedIn: 'root',
})
export class QuestionInExamService {
    private selectedQuestions: IQuestion[] = [];
    constructor() {}

    setSelectedQuestions(questions: IQuestion[]) {
        this.selectedQuestions = questions;
    }

    getSelectedQuestions(): IQuestion[] {
        return this.selectedQuestions;
    }
}
