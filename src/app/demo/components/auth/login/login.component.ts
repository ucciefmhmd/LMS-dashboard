import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from 'src/app/demo/API-Services/student.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit , OnDestroy{
     StudentForm: FormGroup = new FormGroup({
    name: new FormControl( '',[Validators.required , Validators.minLength(3) , Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)+$')]),
    role: new FormControl('student', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(11),Validators.maxLength(11),
    Validators.pattern('^01[0152]+[0-9]{8,}$')
    ]),
    address: new FormControl('', [Validators.required,Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required, Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
     ]),
    photo: new FormControl(null, Validators.pattern('.*\.(jpg|jpeg|png|gif)$')),
    age : new FormControl('', Validators.required),
    title: new FormControl('', [Validators.required,Validators.minLength(4)])
  });

  constructor(private studentService : StudentService , private myRoute : Router , private act : ActivatedRoute){}

  ngOnDestroy(): void {
    this.myGetSub?.unsubscribe();
    this.myActionSub?.unsubscribe();
  }

  myGetSub: Subscription | undefined;
  myActionSub: Subscription | undefined;

  ngOnInit(): void {
  }

  get nameControl() {
    return this.StudentForm.controls['name'];
  }
  get ageControl() {
    return this.StudentForm.controls['age'];
  }
  get phoneControl() {
    return this.StudentForm.controls['phone'];
  }
  get addressControl() {
    return this.StudentForm.controls['address'];
  }
  get titleControl() {
    return this.StudentForm.controls['title'];
  }
  get emailControl() {
    return this.StudentForm.controls['email'];
  }
  get passwordControl() {
    return this.StudentForm.controls['password'];
  }
  get photoControl() {
    return this.StudentForm.controls['photo'];
  }
  get roleControl() {
    return this.StudentForm.controls['role'];
  }

  onSubmit(e:Event){
    e.preventDefault();
    this.myActionSub = this.studentService.Add(this.StudentForm.value).subscribe();
    this.myRoute.navigate(['student/table']);
  }

    // valCheck: string[] = ['remember'];

    // password!: string;

    // constructor(public layoutService: LayoutService) { }
}
