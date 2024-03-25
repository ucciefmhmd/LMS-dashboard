
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            // {
            //     path: 'button',
            //     data: { breadcrumb: 'Button' },
            //     loadChildren: () =>
            //         import('./button/buttondemo.module').then(
            //             (m) => m.ButtonDemoModule
            //         ),
            // },
            // {
            //     path: 'charts',
            //     data: { breadcrumb: 'Charts' },
            //     loadChildren: () =>
            //         import('./charts/chartsdemo.module').then(
            //             (m) => m.ChartsDemoModule
            //         ),
            // },
            // {
            //     path: 'file',
            //     data: { breadcrumb: 'File' },
            //     loadChildren: () =>
            //         import('./file/filedemo.module').then(
            //             (m) => m.FileDemoModule
            //         ),
            // },
            // {
            //     path: 'floatlabel',
            //     data: { breadcrumb: 'Float Label' },
            //     loadChildren: () =>
            //         import('./floatlabel/floatlabeldemo.module').then(
            //             (m) => m.FloatlabelDemoModule
            //         ),
            // },
            // {
            //     path: 'formlayout',
            //     data: { breadcrumb: 'Form Layout' },
            //     loadChildren: () =>
            //         import('./formlayout/formlayoutdemo.module').then(
            //             (m) => m.FormLayoutDemoModule
            //         ),
            // },
            // {
            //     path: 'input',
            //     data: { breadcrumb: 'Input' },
            //     loadChildren: () =>
            //         import('./input/inputdemo.module').then(
            //             (m) => m.InputDemoModule
            //         ),
            // },
            // {
            //     path: 'invalidstate',
            //     data: { breadcrumb: 'Invalid State' },
            //     loadChildren: () =>
            //         import('./invalid/invalidstatedemo.module').then(
            //             (m) => m.InvalidStateDemoModule
            //         ),
            // },
            // {
            //     path: 'list',
            //     data: { breadcrumb: 'List' },
            //     loadChildren: () =>
            //         import('./list/listdemo.module').then(
            //             (m) => m.ListDemoModule
            //         ),
            // },
            // {
            //     path: 'media',
            //     data: { breadcrumb: 'Media' },
            //     loadChildren: () =>
            //         import('./media/mediademo.module').then(
            //             (m) => m.MediaDemoModule
            //         ),
            // },
            // {
            //     path: 'message',
            //     data: { breadcrumb: 'Message' },
            //     loadChildren: () =>
            //         import('./messages/messagesdemo.module').then(
            //             (m) => m.MessagesDemoModule
            //         ),
            // },
            // {
            //     path: 'misc',
            //     data: { breadcrumb: 'Misc' },
            //     loadChildren: () =>
            //         import('./misc/miscdemo.module').then(
            //             (m) => m.MiscDemoModule
            //         ),
            // },
            // {
            //     path: 'overlay',
            //     data: { breadcrumb: 'Overlay' },
            //     loadChildren: () =>
            //         import('./overlays/overlaysdemo.module').then(
            //             (m) => m.OverlaysDemoModule
            //         ),
            // },
            // {
            //     path: 'panel',
            //     data: { breadcrumb: 'Panel' },
            //     loadChildren: () =>
            //         import('./panels/panelsdemo.module').then(
            //             (m) => m.PanelsDemoModule
            //         ),
            // },
            // {
            //     path: 'table',
            //     data: { breadcrumb: 'Table' },
            //     loadChildren: () =>
            //         import('./table/tabledemo.module').then(
            //             (m) => m.TableDemoModule
            //         ),
            // },
            // {
            //     path: 'student',
            //     canActivate: [AuthGuard],
            //     data: { breadcrumb: 'student' },
            //     loadChildren: () =>
            //         import('./../student/student.module').then(
            //             (m) => m.StudentModule
            //         ),
            // },
            // {
            //     path: 'student/addstudent',
            //     canActivate: [AuthGuard],
            //     data: { breadcrumb: 'student/addstudent' },
            //     loadChildren: () =>
            //         import('./../add-student/add-student.module').then(
            //             (m) => m.AddStudentModule
            //         ),
            // },
            // {
            //     path: 'student/editstudent/:id',
            //     canActivate: [AuthGuard],
            //     data: { breadcrumb: 'student/addstudent' },
            //     loadChildren: () =>
            //         import('./../add-student/add-student.module').then(
            //             (m) => m.AddStudentModule
            //         ),
            // },
            // {
            //     path: 'instructor/addinstructor',
            //     canActivate: [AuthGuard],
            //     data: { breadcrumb: 'instructor/addinstructor' },
            //     loadChildren: () =>
            //         import('./../form-instructor/forminstructor.module').then(
            //             (m) => m.FormInstructorModule
            //         ),
            // },
            // {
            //     path: 'instructor/eidtinstructor/:id',
            //     canActivate: [AuthGuard],
            //     data: { breadcrumb: 'instructor/editinstructor' },
            //     loadChildren: () =>
            //         import('./../form-instructor/forminstructor.module').then(
            //             (m) => m.FormInstructorModule
            //         ),
            // },
            // {
            //     path: 'subadmin/addsubadmin',
            //     canActivate: [AuthGuard],
            //     data: { breadcrumb: 'subadmin/addsubadmin' },
            //     loadChildren: () =>
            //         import('./../form-subadmin/form-subadmin.module').then(
            //             (m) => m.FormSubadminModule
            //         ),
            // },
            // {
            //     path: 'subadmin/editsubadmin/:id',
            //     canActivate: [AuthGuard],
            //     data: { breadcrumb: 'subadmin/eidtsubadmin' },
            //     loadChildren: () =>
            //         import('./../form-subadmin/form-subadmin.module').then(
            //             (m) => m.FormSubadminModule
            //         ),
            // },
            // {
            //     path: 'instructor',
            //     canActivate: [AuthGuard],
            //     data: { breadcrumb: 'instructor' },
            //     loadChildren: () =>
            //         import('./../instructor/instrcutor.module').then(
            //             (m) => m.InstrcutorModule
            //         ),
            // },
            // {
            //     path: 'subadmin',
            //     canActivate: [AuthGuard],
            //     data: { breadcrumb: 'subadmin' },
            //     loadChildren: () =>
            //         import('./../subadmin/subadmin.module').then(
            //             (m) => m.SubadminModule
            //         ),
            // },
            // {
            //     path: 'tree',
            //     data: { breadcrumb: 'Tree' },
            //     loadChildren: () =>
            //         import('./tree/treedemo.module').then(
            //             (m) => m.TreeDemoModule
            //         ),
            // },
            // {
            //     path: 'menu',
            //     data: { breadcrumb: 'Menu' },
            //     loadChildren: () =>
            //         import('./menus/menus.module').then((m) => m.MenusModule),
            // },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class UIkitRoutingModule {}
