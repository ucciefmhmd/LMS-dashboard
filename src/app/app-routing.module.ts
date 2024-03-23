import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { CourseComponent } from './demo/components/course/course.component';
import { ExamComponent } from './demo/components/exam/exam.component';
import { QuestionComponent } from './demo/components/question/question.component';
import { InstructorComponent } from './demo/components/instructor/instructor.component';
import { SubadminComponent } from './demo/components/subadmin/subadmin.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            //{ path: 'student', loadChildren: () => import('./demo/components/student/student.module').then(m => m.StudentModule) },
            //{ path: 'student', component:StudentComponent},
            //{ path: '/uikit/student/addstudent', component:AddStudentModule},

            { path: 'instructor', component:InstructorComponent},
            { path: 'subadmin', component:SubadminComponent},
            { path: 'course', component:CourseComponent},
            { path: 'exam', component:ExamComponent},
            { path: 'event', component:QuestionComponent},
            { path: 'question', component:CourseComponent},
            // { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
