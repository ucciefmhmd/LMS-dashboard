import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StudentService } from '../../API-Services/student.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
  providers: [MessageService]
})
export class AddStudentComponent implements OnInit, OnDestroy {
  StudentForm: FormGroup;
  private myActionSub: Subscription | undefined;

  constructor(
    private studentService: StudentService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.StudentForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)+$')]),
      phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^01[0152]+[0-9]{8,}$')]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      photo: new FormControl(null, Validators.required),
      age: new FormControl('', Validators.required),
      title: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

    getFormControl(name: string): FormControl {
    return this.StudentForm.get(name) as FormControl;
  }


  ngOnInit(): void {
  }

  onSubmit(e:Event) {
    e.preventDefault()
    if (this.StudentForm.valid) {
      this.myActionSub = this.studentService.Add(this.StudentForm.value).subscribe(
        () => {
          this.messageService.add({severity:'success', summary:'Success', detail:'Student Added Successfully!'});
          this.router.navigate(['/uikit/student']);
        },
        error => {
          console.error('Error adding student:', error);
          this.messageService.add({severity:'error', summary:'Error', detail:'Failed to add student. Please try again later.'});
        }
      );
    } else {
      this.StudentForm.markAllAsTouched();
    }
  }

 ngOnDestroy(): void {
    this.myActionSub?.unsubscribe();
  }


}
