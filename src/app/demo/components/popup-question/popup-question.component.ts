import { Component, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
    templateUrl: './popup-question.component.html',
    styleUrl: './popup-question.component.scss',
})
export class PopupQuestionComponent {
    constructor(
        private dialogRef: MatDialogRef<PopupComponent>,

        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    closePopup() {
        this.dialogRef.close(false);
    }

    confirmAddAnother() {
        this.dialogRef.close(true);
    }
}
