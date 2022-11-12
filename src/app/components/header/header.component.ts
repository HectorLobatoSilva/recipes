import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DropdownOption } from 'src/app/models/dropdow-option.model';
import { AuthService } from 'src/app/auth/auth.service';
import { SessionStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private sessionStorage: SessionStorageService
  ) {}
  isAuth: boolean = Boolean(this.sessionStorage.getItem('token')) || false;
  dropdownOptions: Array<DropdownOption> = [
    new DropdownOption('Sign out', () =>
      this.auth.logOut().then(() => this.router.navigate(['auth']))
    ),
  ];

  ngOnInit(): void {
    this.auth.onAuthChange.subscribe((isAuth) => (this.isAuth = isAuth));
  }
}
