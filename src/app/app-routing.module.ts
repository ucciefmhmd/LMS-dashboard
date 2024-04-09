import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            canActivate: [AuthGuard],
                            loadChildren: () =>
                                import(
                                    './demo/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'uikit',
                            canActivate: [AuthGuard],
                            loadChildren: () =>
                                import(
                                    './demo/components/uikit/uikit.module'
                                ).then((m) => m.UIkitModule),
                        },
                        {
                            path: 'exam',
                            canActivate: [AuthGuard],
                            loadChildren: () =>
                                import(
                                    './demo/components/exam/exam.module'
                                ).then((m) => m.ExamModule),
                        },
                        {
                            path: 'student',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'student' },
                            loadChildren: () =>
                                import(
                                    './demo/components/student/student.module'
                                ).then((m) => m.StudentModule),
                        },
                        {
                            path: 'student/addstudent',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'student/addstudent' },
                            loadChildren: () =>
                                import(
                                    './demo/components/add-student/add-student.module'
                                ).then((m) => m.AddStudentModule),
                        },
                        {
                            path: 'student/editstudent/:id',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'student/addstudent' },
                            loadChildren: () =>
                                import(
                                    './demo/components/add-student/add-student.module'
                                ).then((m) => m.AddStudentModule),
                        },
                        {
                            path: 'instructor/addinstructor',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'instructor/addinstructor' },
                            loadChildren: () =>
                                import(
                                    './demo/components/form-instructor/forminstructor.module'
                                ).then((m) => m.FormInstructorModule),
                        },
                        {
                            path: 'instructor/eidtinstructor/:id',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'instructor/editinstructor' },
                            loadChildren: () =>
                                import(
                                    './demo/components/form-instructor/forminstructor.module'
                                ).then((m) => m.FormInstructorModule),
                        },
                        {
                            path: 'subadmin/addsubadmin',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'subadmin/addsubadmin' },
                            loadChildren: () =>
                                import(
                                    './demo/components/form-subadmin/form-subadmin.module'
                                ).then((m) => m.FormSubadminModule),
                        },
                        {
                            path: 'subadmin/editsubadmin/:id',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'subadmin/eidtsubadmin' },
                            loadChildren: () =>
                                import(
                                    './demo/components/form-subadmin/form-subadmin.module'
                                ).then((m) => m.FormSubadminModule),
                        },
                        {
                            path: 'instructor',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'instructor' },
                            loadChildren: () =>
                                import(
                                    './demo/components/instructor/instrcutor.module'
                                ).then((m) => m.InstrcutorModule),
                        },
                        {
                            path: 'subadmin',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'subadmin' },
                            loadChildren: () =>
                                import(
                                    './demo/components/subadmin/subadmin.module'
                                ).then((m) => m.SubadminModule),
                        },
                        {
                            path: 'question',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'question' },
                            loadChildren: () =>
                                import(
                                    './demo/components/question/question.module'
                                ).then((m) => m.QuestionModule),
                        },
                        {
                            path: 'course',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'course' },
                            loadChildren: () =>
                                import(
                                    './demo/components/course/course.module'
                                ).then((m) => m.CourseModule),
                        },
                        {
                            path: 'course/formcourse',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'course/formcourse' },
                            loadChildren: () =>
                                import(
                                    './demo/components/form-course/form-course.module'
                                ).then((m) => m.FormCourseModule),
                        },
                        {
                            path: 'course/formcourse/:id',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'course/formcourse' },
                            loadChildren: () =>
                                import(
                                    './demo/components/form-course/form-course.module'
                                ).then((m) => m.FormCourseModule),
                        },
                        {
                            path: 'event',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'event' },
                            loadChildren: () =>
                                import(
                                    './demo/components/event/event.module'
                                ).then((m) => m.EventModule),
                        },
                        {
                            path: 'event/formevent',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'event/formevent' },
                            loadChildren: () =>
                                import(
                                    './demo/components/form-event/form-event.module'
                                ).then((m) => m.FormEventModule),
                        },
                        {
                            path: 'event/formevent/:id',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'event/formevent' },
                            loadChildren: () =>
                                import(
                                    './demo/components/form-event/form-event.module'
                                ).then((m) => m.FormEventModule),
                        },
                        {
                            path: 'exam/formexam',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'exam/formexam' },
                            loadChildren: () =>
                                import(
                                    './demo/components/form-exam/form-exam.module'
                                ).then((m) => m.FormExamModule),
                        },
                        {
                            path: 'exam/formexam/:id',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'exam/formexam' },
                            loadChildren: () =>
                                import(
                                    './demo/components/form-exam/form-exam.module'
                                ).then((m) => m.FormExamModule),
                        },
                        {
                            path: 'question/formquestion',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'question/formquestion' },
                            loadChildren: () =>
                                import(
                                    './demo/components/form-question/form-question.module'
                                ).then((m) => m.FormQuestionModule),
                        },
                        {
                            path: 'question/formquestion/:id',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'question/formquestion' },
                            loadChildren: () =>
                                import(
                                    './demo/components/form-question/form-question.module'
                                ).then((m) => m.FormQuestionModule),
                        },
                        {
                            path: 'student/studentDetails/:id',
                            canActivate: [AuthGuard],
                            data: { breadcrumb: 'student/studentDetails' },
                            loadChildren: () =>
                                import(
                                    './demo/components/student-details/student-details.module'
                                ).then((m) => m.StudentDetailsModule),
                        },
                        {
                            path: 'instructor/instructorDetails/:id',
                            canActivate: [AuthGuard],
                            data: {
                                breadcrumb: 'instructor/instructorDetails',
                            },
                            loadChildren: () =>
                                import(
                                    './demo/components/instructor-details/instructor-details.module'
                                ).then((m) => m.InstructorDetailsModule),
                        },
                        {
                            path: 'exam/examDetails/:id',
                            canActivate: [AuthGuard],
                            data: {
                                breadcrumb: 'exam/examDetails',
                            },
                            loadChildren: () =>
                                import(
                                    './demo/components/exam-details/exam-details.module'
                                ).then((m) => m.ExamDetailsModule),
                        },
                        {
                            path: 'event/eventDetails/:id',
                            canActivate: [AuthGuard],
                            data: {
                                breadcrumb: 'event/eventDetails',
                            },
                            loadChildren: () =>
                                import(
                                    './demo/components/event-details/event-details.module'
                                ).then((m) => m.EventDetailsModule),
                        },
                        {
                            path: 'student/addcourse/:id',
                            canActivate: [AuthGuard],
                            data: {
                                breadcrumb: 'student/addcourse',
                            },
                            loadChildren: () =>
                                import(
                                    './demo/components/form-add-course-for-student/form-add-course-for-student.module'
                                ).then((m) => m.FormAddCourseForStudentModule),
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./demo/components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                {
                    path: 'notfound',
                    canActivate: [AuthGuard],
                    component: NotfoundComponent,
                },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
