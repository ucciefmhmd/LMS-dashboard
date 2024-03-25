import { QuestionService } from './../../API-Services/question.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IQuestion } from '../../Model/iquestion';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './question.component.html',
    providers: [MessageService, ConfirmationService],
})
export class QuestionComponent implements OnInit {
    Questions: IQuestion[] | undefined;

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private questionService: QuestionService) {}

    ngOnInit() {
        this.loadquestion();
        this.questionService.newQuestionAdded.subscribe(() => {
            this.loadquestion();
        });
    }

    loadquestion() {
        this.questionService.getAllData().subscribe((data) => {
            this.Questions = data;
            this.loading = false;
        });
    }

    remove(id: any): void {
        console.log(id);
        this.questionService.Delete(id).subscribe(() => {
            this.loadquestion();
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
