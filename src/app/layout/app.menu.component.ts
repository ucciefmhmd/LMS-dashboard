import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { LoginService } from '../demo/API-Services/login.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];
    isLogin: boolean = true;

    constructor(
        public layoutService: LayoutService,
        private loginServices: LoginService
    ) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                ],
            },
            {
                label: 'Members',

                items: [
                    {
                        label: 'Student',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Student Card',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/student'],
                            },
                        ],
                    },
                    {
                        label: 'Instructor',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Instructor Card',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/instructor'],
                            },
                        ],
                    },
                    {
                        label: 'Subadmin',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Subadmin Card',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/subadmin'],
                            },
                        ],
                        visible: this.shouldShowSubadmin(),
                    },
                ],
            },

            {
                label: 'Subjects',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Course',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Course Card',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/course'],
                            },
                        ],
                    },
                    {
                        label: 'Exam',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Exam Card',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/exam'],
                            },
                        ],
                    },
                    {
                        label: 'Questions',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Question Card',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/question'],
                            },
                        ],
                    },
                    {
                        label: 'Events',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Events Card',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/event'],
                            },
                        ],
                    },
                ],
            },
        ];
    }

    shouldShowSubadmin() {
        const currentUser = this.loginServices.currentUser.value;
        return currentUser && currentUser.role !== 'subadmin';
    }
}
